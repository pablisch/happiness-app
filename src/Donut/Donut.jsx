import React, { useMemo, useState } from "react";

const BASE_FILL = "hsl(50, 40%, 75%)";      // all non-selected countries
const SELECTED_FILL = "hsl(210, 65%, 55%)"; // selected country
const EU_COUNTRY_COUNT = 27;

function arcPath(cx, cy, rOuter, rInner, startAngle, endAngle) {
    const large = endAngle - startAngle > Math.PI ? 1 : 0;

    const sxOuter = cx + rOuter * Math.cos(startAngle);
    const syOuter = cy + rOuter * Math.sin(startAngle);
    const exOuter = cx + rOuter * Math.cos(endAngle);
    const eyOuter = cy + rOuter * Math.sin(endAngle);

    const sxInner = cx + rInner * Math.cos(endAngle);
    const syInner = cy + rInner * Math.sin(endAngle);
    const exInner = cx + rInner * Math.cos(startAngle);
    const eyInner = cy + rInner * Math.sin(startAngle);

    return [
        `M ${sxOuter} ${syOuter}`,
        `A ${rOuter} ${rOuter} 0 ${large} 1 ${exOuter} ${eyOuter}`,
        `L ${sxInner} ${syInner}`,
        `A ${rInner} ${rInner} 0 ${large} 0 ${exInner} ${eyInner}`,
        "Z",
    ].join(" ");
}

function toTitleCase(x) {
    const s = String(x ?? "").trim().replace(/_/g, " ");
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

function formatFactorLabel(factor) {
    if (!factor) return "";

    // Preserve known acronyms
    const ACRONYMS = new Set(["GDP"]);

    if (ACRONYMS.has(factor)) {
        return factor;
    }

    // Combined score special case
    if (factor === "combined_score") {
        return "Combined score";
    }

    // snake_case → "Sentence case"
    const words = factor.split("_");
    return words
        .map((w, i) =>
            i === 0
                ? w.charAt(0).toUpperCase() + w.slice(1)
                : w.toLowerCase()
        )
        .join(" ");
}

export default function Donut({
                                  data,
                                  selectedCountry,
                                  onClickCountry = null,
                                  size = 400,
                                  innerRatio = 0.5,
                              }) {
    const rows = data?.rows ?? [];

    const [hoverRow, setHoverRow] = useState(null);
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

    const cx = size / 2;
    const cy = size / 2;
    const rOuter = size * 0.45;
    const rInner = rOuter * innerRatio;

    const segments = useMemo(() => {
        let angle = -Math.PI / 2;

        return rows.map((row) => {
            const fraction = Number(row.proportion ?? 0);
            const sweep = fraction * Math.PI * 2;
            const isSelected = row.country === selectedCountry;

            const seg = {
                country: row.country,
                value: Number(row.value ?? 0),
                proportion: fraction,
                start: angle,
                end: angle + sweep,
                fill: isSelected ? SELECTED_FILL : BASE_FILL,
                isSelected,
            };

            angle += sweep;
            return seg;
        });
    }, [rows, selectedCountry]);

    const selectedRow = useMemo(
        () => rows.find((r) => r.country === selectedCountry) ?? null,
        [rows, selectedCountry]
    );

    const selectedRank = useMemo(() => {
        if (!selectedRow) return null;
        const values = rows
            .map((r) => Number(r.value))
            .filter(Number.isFinite)
            .sort((a, b) => b - a);
        const idx = values.findIndex((v) => v === selectedRow.value);
        return idx >= 0 ? idx + 1 : null;
    }, [rows, selectedRow]);

    const factorLabel = formatFactorLabel(data?.factor);

    return (
        <div style={{ width: size, position: "relative", fontFamily: "system-ui, sans-serif" }}>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                role="img"
                aria-label={`${factorLabel} distribution`}
            >
                <g>
                    {segments.map((s) => {
                        const path = arcPath(cx, cy, rOuter, rInner, s.start, s.end);

                        return (
                            <path
                                key={s.country}
                                d={path}
                                fill={s.fill}
                                opacity={s.isSelected ? 1 : 0.7}
                                stroke={s.isSelected ? "#222" : "rgba(255,255,255,0.7)"}
                                strokeWidth={s.isSelected ? 2.2 : 0.8}
                                transform={
                                    s.isSelected
                                        ? `translate(${cx},${cy}) scale(1.02) translate(${-cx},${-cy})`
                                        : undefined
                                }
                                style={{ cursor: "pointer" }}
                                onMouseEnter={(e) => {
                                    setHoverRow(s);
                                    setHoverPos({ x: e.clientX, y: e.clientY });
                                }}
                                onMouseMove={(e) => {
                                    setHoverPos({ x: e.clientX, y: e.clientY });
                                }}
                                onMouseLeave={() => setHoverRow(null)}
                                onClick={() => onClickCountry && onClickCountry(s.country)}
                            />
                        );
                    })}

                    {/* Donut hole */}
                    <circle
                        cx={cx}
                        cy={cy}
                        r={rInner}
                        fill="hsl(0, 0%, 94%)"
                        pointerEvents="none"
                    />

                    {/* Center text */}
                    <text
                        x={cx}
                        y={cy - 38}
                        textAnchor="middle"
                        style={{ fontSize: 16, fontWeight: 800, fill: "#111" }}
                        pointerEvents="none"
                    >
                        {selectedCountry ?? ""}
                    </text>

                    <text
                        x={cx}
                        y={cy - 16}
                        textAnchor="middle"
                        style={{ fontSize: 13, fill: "#555" }}
                        pointerEvents="none"
                    >
                        {factorLabel}
                    </text>

                    {selectedRow && (
                        <>
                            <text x={cx} y={cy + 6} textAnchor="middle" style={{ fontSize: 13, fill: "#333" }}>
                                Value:{" "}
                                <tspan style={{ fontWeight: 800 }}>
                                    {selectedRow.value.toFixed(2)}
                                </tspan>
                            </text>

                            <text x={cx} y={cy + 26} textAnchor="middle" style={{ fontSize: 13, fill: "#333" }}>
                                Rank:{" "}
                                <tspan style={{ fontWeight: 800 }}>
                                    {selectedRank ?? "—"}
                                </tspan>
                                /{EU_COUNTRY_COUNT}
                            </text>

                            <text x={cx} y={cy + 46} textAnchor="middle" style={{ fontSize: 13, fill: "#666" }}>
                                {(selectedRow.proportion * 100).toFixed(1)}% of EU total
                            </text>
                        </>
                    )}
                </g>
            </svg>

            {/* Hover tooltip (white box, dark border, two lines) */}
            {hoverRow && (
                <div
                    style={{
                        position: "fixed",
                        left: hoverPos.x + 12,
                        top: hoverPos.y + 12,
                        background: "white",
                        color: "#222",
                        padding: "0.4rem 0.6rem",
                        borderRadius: "6px",
                        border: "1px solid #999",
                        fontSize: "0.8rem",
                        pointerEvents: "none",
                        zIndex: 1000,
                        whiteSpace: "nowrap",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                    }}
                >
                    <div style={{ fontWeight: 600 }}>
                        {hoverRow.country}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#555" }}>
                        {(hoverRow.proportion * 100).toFixed(1)}% of EU total
                    </div>
                </div>
            )}
        </div>
    );
}
