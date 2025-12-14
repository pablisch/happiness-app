import { useState } from "react";

const regions = [
    "Western Europe",
    "North America and ANZ",
    "Middle East and North Africa",
    "Latin America and Caribbean",
    "Central and Eastern Europe",
    "East Asia",
    "Southeast Asia",
    "Commonwealth of Independent States",
    "Sub-Saharan Africa",
    "South Asia",
];

// What users see vs what API gets
const years = [
    { label: "2021", value: "2021" }, // will be treated as _21
    { label: "2022", value: "2022" }, // -> _22
    { label: "2023", value: "2023" }, // -> _23
];

function ContributionChart() {
    const [region, setRegion] = useState("Central and Eastern Europe");
    const [year, setYear] = useState(years[0].value); // "2021"

    const encodedRegion = encodeURIComponent(region);

    const src = `http://127.0.0.1:8000/chart/${encodedRegion}/${year}`;

    return (
        <div style={{ marginTop: "2rem" }}>
            <h2>Chart from Python</h2>

            {/* Region Selection */}
            <div style={{ marginBottom: "1rem" }}>
                <h3>Select Region:</h3>
                {regions.map((r) => (
                    <label key={r} style={{ display: "block", marginBottom: "4px" }}>
                        <input
                            type="radio"
                            name="region"
                            value={r}
                            checked={region === r}
                            onChange={() => setRegion(r)}
                        />
                        {" "}{r}
                    </label>
                ))}
            </div>

            {/* Year Selection */}
            <div style={{ marginBottom: "1rem" }}>
                <h3>Select Year:</h3>
                {years.map((y) => (
                    <label key={y.value} style={{ marginRight: "1rem" }}>
                        <input
                            type="radio"
                            name="year"
                            value={y.value}
                            checked={year === y.value}
                            onChange={() => setYear(y.value)}
                        />
                        {" "}{y.label}
                    </label>
                ))}
            </div>

            {/* Chart Image */}
            <img
                src={src}
                alt="Chart"
                style={{ maxWidth: "600px", border: "1px solid #ccc", padding: "8px" }}
                onError={() => console.log("Image failed to load:", src)}
            />
        </div>
    );
}

export default ContributionChart;
