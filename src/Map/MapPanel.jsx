import EUMap from "./EUMap.jsx";
import { useSelectorContext } from "../Context/SelectorContext.js";

// Optional: nicer labels for factors
const FACTOR_LABELS = {
    combined_score: "Happiness (combined score)",
    GDP: "GDP",
    social_support: "Social support",
    life_expectancy: "Life expectancy",
    freedom: "Freedom",
    generosity: "Generosity",
    corruption: "Corruption",
    other: "Other",
};

function MapPanel() {
    const { year, factor } = useSelectorContext();

    const factorLabel = FACTOR_LABELS[factor] ?? factor;
    const title = `Map showing ${factorLabel} in ${year} across EU`;

    return (
        <div className="map-panel-wrap">
            <div className="map-panel-title">{title}</div>
            <div className="map-panel-body">
                <EUMap />
            </div>
        </div>
    );
}

export default MapPanel;
