import { useEffect, useMemo, useState } from "react";
import { useSelectorContext } from "../Context/SelectorContext.js";
import DropdownSelector from "../DropdownSelector.jsx";
import Donut from "./Donut.jsx";

const FACTOR_OPTIONS = [
    { label: "Combined score", value: "combined_score" },
    { label: "GDP", value: "GDP" },
    { label: "Social support", value: "social_support" },
    { label: "Life expectancy", value: "life_expectancy" },
    { label: "Freedom", value: "freedom" },
    { label: "Generosity", value: "generosity" },
    { label: "Corruption", value: "corruption" },
    { label: "Other", value: "other" },
];

function FactorDonut() {
    const { country, year, setCountry } = useSelectorContext();

    const { factor, setFactor } = useSelectorContext();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    // Always request ALL EU countries (no grouping)
    const donutUrl = useMemo(() => {
        const f = encodeURIComponent(factor);
        return `http://127.0.0.1:8000/donut/${f}/${year}?eu_only=true&group_other=false`;
    }, [factor, year]);

    useEffect(() => {
        let cancelled = false;

        async function fetchDonut() {
            try {
                setError(null);
                setData(null);

                const res = await fetch(donutUrl);
                if (!res.ok) throw new Error(`Donut request failed: ${res.status}`);

                const json = await res.json();
                if (!cancelled) setData(json);
            } catch (e) {
                if (!cancelled) setError(e.message);
            }
        }

        fetchDonut();
        return () => {
            cancelled = true;
        };
    }, [donutUrl]);

    return (
        <div style={{ marginTop: "2rem" }}>
            {/* Selector – visually identical to CountrySelector */}
            <DropdownSelector
                title="Select Factor:"
                value={factor}
                options={FACTOR_OPTIONS}
                onChange={setFactor}
            />

            {error ? (
                <div style={{ marginTop: "0.75rem" }}>
                    <strong>Donut unavailable</strong>
                    <div style={{ fontSize: "0.9rem" }}>{error}</div>
                </div>
            ) : (
                <div style={{ marginTop: "1rem" }}>
                    <Donut
                        data={data}
                        selectedCountry={country}
                        size={400}
                        innerRatio={0.5}
                        onClickCountry={(clickedCountry) => {
                            if (!clickedCountry) return;
                            if (clickedCountry === "Other EU") return;

                            if (typeof setCountry === "function") {
                                setCountry(clickedCountry);
                            } else {
                                console.log("Clicked country:", clickedCountry);
                            }
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default FactorDonut;
