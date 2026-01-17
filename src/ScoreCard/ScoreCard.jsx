import { useEffect, useMemo, useState } from "react";
import { useSelectorContext } from "../Context/selectorContext.js";
import {deltaToBgYear, deltaToBg, rankToBg} from "../helpers/dataHelper.js"

const RANK_VALUE_SCALE = 1.5;
const YEAR_DELTA_VALUE_SCALE = 1.3;

const RANK_BASE_FONT = 1.05;
const YEAR_DELTA_BASE_FONT = 1.1;

const BOX_W = 150;
const BOX_H = 78;
const BOX_PAD_Y = 0.55;
const BOX_PAD_X = 0.6;

const BOX_STYLE = {
    width: `${BOX_W}px`,
    height: `${BOX_H}px`,
    padding: `${BOX_PAD_Y}rem ${BOX_PAD_X}rem`,
    borderRadius: "10px",
    border: "1px solid #e5e5e5",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
};

const LABEL_STYLE = {
    fontSize: "0.85rem",
    color: "#666",
    textAlign: "center",
};

const VALUE_CENTER_STYLE = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    lineHeight: 1.1,
};

const signedFmt = (x) => {
    const s = fmt(x);
    return s === "0.00" ? s : (Number(s) > 0 ? `+${s}` : s);
};


function fmt(x) {
    if (x === null || x === undefined) return "—";

    const n = Number(x);
    if (!Number.isFinite(n)) return "—";

    // Round to 2dp first
    const s = n.toFixed(2);

    // If rounding produced a signed zero, normalise it
    if (s === "-0.00" || s === "+0.00") return "0.00";

    return s;
}

function ValueBox({
                      label,
                      value,
                      background = "white",
                      boxStyle,
                      labelStyle,
                      valueCenterStyle,
                      valueStyle,
                  }) {
    return (
        <div style={{ ...boxStyle, background }}>
            <div style={labelStyle}>{label}</div>
            <div style={{ ...valueCenterStyle, ...valueStyle }}>
                {value}
            </div>
        </div>
    );
}

function SectionTitle({ children }) {
    return (
        <div style={{ fontSize: "0.9rem", color: "#666", marginBottom: "0.4rem" }}>
            {children}
        </div>
    );
}

function ScoreCard() {
    const { country, year, showEU } = useSelectorContext();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const encodedCountry = encodeURIComponent(country);
    const showEUParam = showEU ? "true" : "false";

    const metaUrl = useMemo(() => {
        return `http://127.0.0.1:8000/score_card_meta/${encodedCountry}/${year}?show_eu=${showEUParam}`;
    }, [encodedCountry, year, showEUParam]);

    useEffect(() => {
        let cancelled = false;

        async function fetchMeta() {
            try {
                setError(null);
                setData(null);
                const res = await fetch(metaUrl);
                if (!res.ok) throw new Error(`Score card request failed: ${res.status}`);
                const json = await res.json();
                if (!cancelled) setData(json);
            } catch (e) {
                if (!cancelled) setError(e.message);
            }
        }

        fetchMeta();
        return () => {
            cancelled = true;
        };
    }, [metaUrl]);

    return (
        <div style={{ marginTop: "1.5rem" }}>
            {error ? (
                <div style={{ marginBottom: "0.75rem" }}>
                    <strong>Score card unavailable</strong>
                    <div style={{ fontSize: "0.9rem" }}>{error}</div>
                </div>
            ) : (
                <div
                    style={{
                        maxWidth: "650px",
                        margin: "0 auto",
                        padding: "1rem 1.25rem",
                        border: "1px solid #e5e5e5",
                        borderRadius: "12px",
                        background: "white",
                    }}
                >
                    <div style={{ fontSize: "1.1rem", marginBottom: "0.75rem", textAlign: "center" }}>
                        <strong>{data?.title ?? "Loading..."}</strong>
                    </div>

                    {/* Top summary row */}
                    <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", justifyContent: "flex-start" }}>
                        <ValueBox
                            label="Overall score"
                            value={fmt(data?.country_score)}
                            background={deltaToBg(data?.delta_vs_eu, data?.delta_min, data?.delta_max)}
                            boxStyle={BOX_STYLE}
                            labelStyle={LABEL_STYLE}
                            valueCenterStyle={VALUE_CENTER_STYLE}
                            valueStyle={{ fontSize: "1.6rem", fontWeight: 800 }}
                        />

                        {showEU && (
                            <>
                                <ValueBox
                                    label="EU average"
                                    value={fmt(data?.eu_score)}
                                    boxStyle={BOX_STYLE}
                                    labelStyle={LABEL_STYLE}
                                    valueCenterStyle={VALUE_CENTER_STYLE}
                                    valueStyle={{ fontSize: "1.35rem", fontWeight: 700 }}
                                />
                                <ValueBox
                                    label="Δ vs EU"
                                    value={signedFmt(data?.delta_vs_eu)}
                                    boxStyle={BOX_STYLE}
                                    labelStyle={LABEL_STYLE}
                                    valueCenterStyle={VALUE_CENTER_STYLE}
                                    valueStyle={{ fontSize: "1.35rem", fontWeight: 700 }}
                                />
                            </>
                        )}
                    </div>

                    {/* Change vs selected year */}
                    <div style={{ marginTop: "1rem" }}>
                        <SectionTitle>Change vs selected year</SectionTitle>

                        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", justifyContent: "flex-start" }}>
                            {[2021, 2022, 2023].map((yy) => {
                                const isSelected = Number(data?.selected_year) === yy;
                                const d = data?.deltas_vs_selected_year?.[yy];

                                return (
                                    <ValueBox
                                        key={yy}
                                        label={String(yy)}
                                        value={isSelected ? "selected" : signedFmt(d)}
                                        background={deltaToBgYear(isSelected ? 0 : d)}
                                        boxStyle={BOX_STYLE}
                                        labelStyle={LABEL_STYLE}
                                        valueCenterStyle={VALUE_CENTER_STYLE}
                                        valueStyle={{
                                            fontSize: isSelected
                                                ? `${YEAR_DELTA_BASE_FONT}rem`
                                                : `${YEAR_DELTA_BASE_FONT * YEAR_DELTA_VALUE_SCALE}rem`,
                                            fontWeight: 700,
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* Rankings */}
                    <div style={{ marginTop: "1rem" }}>
                        <SectionTitle>EU rank (1 = best)</SectionTitle>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(4, 1fr)",
                                gap: "0.6rem",
                                justifyItems: "start",
                            }}
                        >
                            {[
                                { key: "overall", label: "Overall score", rank: data?.overall_rank, total: data?.overall_total },
                                { key: "GDP", label: "GDP", rank: data?.factor_ranks?.GDP?.rank, total: data?.factor_ranks?.GDP?.total },
                                { key: "social_support", label: "Social support", rank: data?.factor_ranks?.social_support?.rank, total: data?.factor_ranks?.social_support?.total },
                                { key: "life_expectancy", label: "Life expectancy", rank: data?.factor_ranks?.life_expectancy?.rank, total: data?.factor_ranks?.life_expectancy?.total },
                                { key: "freedom", label: "Freedom", rank: data?.factor_ranks?.freedom?.rank, total: data?.factor_ranks?.freedom?.total },
                                { key: "generosity", label: "Generosity", rank: data?.factor_ranks?.generosity?.rank, total: data?.factor_ranks?.generosity?.total },
                                { key: "corruption", label: "Corruption", rank: data?.factor_ranks?.corruption?.rank, total: data?.factor_ranks?.corruption?.total },
                                { key: "other", label: "Other", rank: data?.factor_ranks?.other?.rank, total: data?.factor_ranks?.other?.total },
                            ].map((it) => (
                                <ValueBox
                                    key={it.key}
                                    label={it.label}
                                    value={it.rank == null || it.total == null ? "—" : `${it.rank} / ${it.total}`}
                                    background={rankToBg(it.rank, it.total)}
                                    boxStyle={BOX_STYLE}
                                    labelStyle={LABEL_STYLE}
                                    valueCenterStyle={VALUE_CENTER_STYLE}
                                    valueStyle={{
                                        fontSize: `${RANK_BASE_FONT * RANK_VALUE_SCALE}rem`,
                                        fontWeight: 800,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );


}

export default ScoreCard;
