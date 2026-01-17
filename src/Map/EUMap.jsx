import { useEffect, useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";

import { useSelectorContext } from "../Context/SelectorContext.js";
import { EU_ISO2 } from "../data/EuToIso2.js";
import { ISO2_TO_COUNTRY } from "../data/iso2ToCountry.js";

const GEO_URL = "/europe.geojson";

/* -------------------------------------------------------
   MAP VIEW CONTROLS (LOCKED VALUES)
   ------------------------------------------------------- */
const MAP_WIDTH = 570;
const MAP_HEIGHT = 690;

const MAP_CENTER_LON = 13;
const MAP_CENTER_LAT = 55;
const MAP_SCALE = 560;
/* ------------------------------------------------------- */

function getIso2(props) {
    if (!props) return null;

    const candidates = [
        props.ISO_A2,
        props.ISO_A2_EH,
        props.WB_A2,
        props.FIPS_10,
        props.POSTAL,
    ];

    for (const v of candidates) {
        if (typeof v === "string") {
            const s = v.trim().toUpperCase();
            if (s && s !== "-99" && s !== "NULL") return s;
        }
    }
    return null;
}

function yearToSuffix(year) {
    const ys = String(year ?? "").trim();
    if (ys.length === 4) return ys.slice(-2);
    return ys;
}

function getValueColumn(factor, year) {
    const yy = yearToSuffix(year);
    if (!yy) return null;

    if (factor === "combined_score") return `ladder_score_${yy}`;
    return `${factor}_${yy}`;
}

function fmt2(x) {
    const n = Number(x);
    if (!Number.isFinite(n)) return "—";
    return n.toFixed(2);
}

function formatFactorLabel(factor) {
    if (!factor) return "";
    if (factor === "combined_score") return "Combined score";
    if (factor === "GDP") return "GDP";

    const parts = String(factor).split("_");
    return parts
        .map((w, i) =>
            i === 0
                ? w.charAt(0).toUpperCase() + w.slice(1)
                : w.toLowerCase()
        )
        .join(" ");
}

function valueToFill(value, minV, maxV) {
    const v = Number(value);
    if (!Number.isFinite(v)) return "#efefef";

    const min = Number(minV);
    const max = Number(maxV);
    if (!Number.isFinite(min) || !Number.isFinite(max) || min === max) {
        return "hsl(210, 60%, 82%)";
    }

    const t = Math.max(0, Math.min(1, (v - min) / (max - min)));

    const lightness = 92 - t * 37;
    const saturation = 65;
    const hue = 210;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function EUMap() {
    const { country, setCountry, year, factor } = useSelectorContext();

    const selectedFactor = factor ?? "combined_score";
    const selectedYear = year ?? 2023;

    const [geo, setGeo] = useState(null);
    const [dataRows, setDataRows] = useState(null);
    const [error, setError] = useState(null);

    const [tooltip, setTooltip] = useState({
        visible: false,
        x: 0,
        y: 0,
        textTop: "",
        textBottom: "",
    });

    useEffect(() => {
        let cancelled = false;

        async function fetchGeo() {
            try {
                const res = await fetch(GEO_URL);
                if (!res.ok) throw new Error(`Failed to load europe.geojson: ${res.status}`);
                const json = await res.json();
                if (!cancelled) setGeo(json);
            } catch (e) {
                if (!cancelled) setError(e.message);
            }
        }

        fetchGeo();
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            try {
                const res = await fetch("http://127.0.0.1:8000/data");
                if (!res.ok) throw new Error(`Data request failed: ${res.status}`);
                const json = await res.json();
                if (!cancelled) setDataRows(Array.isArray(json) ? json : []);
            } catch (e) {
                if (!cancelled) setError(e.message);
            }
        }

        fetchData();
        return () => { cancelled = true; };
    }, []);

    const COUNTRY_TO_ISO2 = useMemo(() => {
        const rev = {};
        for (const [iso2, name] of Object.entries(ISO2_TO_COUNTRY)) {
            if (typeof name === "string" && name.trim()) {
                rev[name.trim()] = iso2;
            }
        }
        return rev;
    }, []);

    const { iso2ToValue, minValue, maxValue, valueCol } = useMemo(() => {
        const valueCol = getValueColumn(selectedFactor, selectedYear);

        if (!dataRows || !Array.isArray(dataRows) || !valueCol) {
            return { iso2ToValue: {}, minValue: null, maxValue: null, valueCol };
        }

        const euCountryNames = Object.values(ISO2_TO_COUNTRY);

        const rows = dataRows
            .filter((r) => r && typeof r.country === "string")
            .map((r) => ({ ...r, country: r.country.trim() }))
            .filter((r) => r.country && euCountryNames.includes(r.country));

        const acc = new Map();
        for (const r of rows) {
            const v = Number(r[valueCol]);
            if (!Number.isFinite(v)) continue;

            const cur = acc.get(r.country) ?? { sum: 0, n: 0 };
            cur.sum += v;
            cur.n += 1;
            acc.set(r.country, cur);
        }

        const iso2ToValue = {};
        const vals = [];

        for (const [name, { sum, n }] of acc.entries()) {
            if (!n) continue;
            const mean = sum / n;
            const iso2 = COUNTRY_TO_ISO2[name];
            if (!iso2) continue;

            iso2ToValue[iso2] = mean;
            vals.push(mean);
        }

        return {
            iso2ToValue,
            minValue: vals.length ? Math.min(...vals) : null,
            maxValue: vals.length ? Math.max(...vals) : null,
            valueCol,
        };
    }, [dataRows, selectedFactor, selectedYear, COUNTRY_TO_ISO2]);

    const { paths } = useMemo(() => {
        if (!geo?.features?.length) return { paths: [] };

        const projection = geoMercator()
            .center([MAP_CENTER_LON, MAP_CENTER_LAT])
            .scale(MAP_SCALE)
            .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2])
            .clipExtent([[0, 0], [MAP_WIDTH, MAP_HEIGHT]]);

        const pathGen = geoPath(projection);

        return {
            paths: geo.features.map((feature, index) => {
                const props = feature.properties ?? {};
                const iso2 = getIso2(props);
                const nameFromProps = props.NAME ?? props.ADMIN ?? "";

                return {
                    key: iso2 ? `${iso2}-${index}` : `${nameFromProps}-${index}`,
                    iso2,
                    countryName: iso2 && ISO2_TO_COUNTRY[iso2] ? ISO2_TO_COUNTRY[iso2] : nameFromProps,
                    d: pathGen(feature),
                };
            }),
        };
    }, [geo]);

    if (error) {
        return <div style={{ marginTop: "2rem" }}>Map unavailable</div>;
    }

    if (!geo || !dataRows) {
        return <div style={{ marginTop: "2rem" }}>Loading map…</div>;
    }

    return (
        <div style={{ marginTop: "2rem" }}>
            <h2>Map</h2>

            <div
                style={{
                    width: MAP_WIDTH,
                    height: MAP_HEIGHT,
                    border: "1px solid #bdbdbd",
                    borderRadius: "12px",
                    background: "white",
                    overflow: "hidden",
                    margin: "0 auto",
                    position: "relative",
                }}
                onMouseLeave={() => setTooltip((t) => ({ ...t, visible: false }))}
            >
                {/* Legend – TOP LEFT */}
                <div
                    style={{
                        position: "absolute",
                        left: 12,
                        top: 12,
                        background: "white",
                        border: "1px solid #666",
                        borderRadius: "10px",
                        padding: "8px 10px",
                        fontSize: "12px",
                        color: "#222",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                        zIndex: 5,
                        minWidth: 160,
                    }}
                >
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>
                        {formatFactorLabel(selectedFactor)} ({selectedYear})
                    </div>

                    <div
                        style={{
                            height: 10,
                            borderRadius: 6,
                            border: "1px solid #bbb",
                            background: `linear-gradient(to right,
                                ${valueToFill(minValue, minValue, maxValue)},
                                ${valueToFill((Number(minValue) + Number(maxValue)) / 2, minValue, maxValue)},
                                ${valueToFill(maxValue, minValue, maxValue)}
                            )`,
                            marginBottom: 6,
                        }}
                    />

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>Min: <strong>{fmt2(minValue)}</strong></div>
                        <div>Max: <strong>{fmt2(maxValue)}</strong></div>
                    </div>
                </div>

                {/* Tooltip */}
                {tooltip.visible && (
                    <div
                        style={{
                            position: "absolute",
                            left: tooltip.x,
                            top: tooltip.y,
                            transform: "translate(10px, 10px)",
                            background: "white",
                            border: "1px solid #666",
                            borderRadius: "8px",
                            padding: "6px 8px",
                            fontSize: "12px",
                            color: "#222",
                            pointerEvents: "none",
                            whiteSpace: "nowrap",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                            zIndex: 10,
                        }}
                    >
                        <div style={{ fontWeight: 700 }}>{tooltip.textTop}</div>
                        <div>{tooltip.textBottom}</div>
                    </div>
                )}

                <svg
                    viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {paths.map((p) => {
                        const isEU = p.iso2 && EU_ISO2.has(p.iso2);
                        const isSelected = p.countryName === country;
                        const value = p.iso2 ? iso2ToValue[p.iso2] : null;

                        return (
                            <path
                                key={p.key}
                                d={p.d}
                                fill={isEU ? valueToFill(value, minValue, maxValue) : "#efefef"}
                                stroke={isSelected ? "#222" : "#888"}
                                strokeWidth={isSelected ? 1.8 : 0.6}
                                style={{ cursor: isEU ? "pointer" : "default" }}
                                onMouseMove={(e) => {
                                    const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                                    setTooltip({
                                        visible: true,
                                        x: e.clientX - rect.left,
                                        y: e.clientY - rect.top,
                                        textTop: p.countryName,
                                        textBottom: isEU
                                            ? `${formatFactorLabel(selectedFactor)}: ${fmt2(value)}`
                                            : "Non-EU",
                                    });
                                }}
                                onClick={() => isEU && setCountry(p.countryName)}
                            />
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}

export default EUMap;
