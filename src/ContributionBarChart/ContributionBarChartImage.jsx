import { useEffect, useState } from "react";
import {useSelectorContext} from "../context/SelectorContext.js";

function ContributionBarChartImage() {
    const { geoArea, showEU, year } = useSelectorContext();
    const [title, setTitle] = useState("");
    const [error, setError] = useState(null);

    const encodedGeoArea = encodeURIComponent(geoArea);
    const showEUParam = showEU ? "true" : "false";

    const metaUrl = `http://127.0.0.1:8000/contrib_bar_meta/${encodedGeoArea}/${year}?show_eu=${showEUParam}`;
    const imgUrl = `http://127.0.0.1:8000/contrib_bar/${encodedGeoArea}/${year}?show_eu=${showEUParam}&v=${encodedGeoArea}-${year}-${showEUParam}`;

    useEffect(() => {
        let cancelled = false;

        async function fetchMeta() {
            try {
                setError(null);

                const res = await fetch(metaUrl);
                if (!res.ok) {
                    throw new Error(`Meta request failed: ${res.status}`);
                }

                const json = await res.json();
                if (!cancelled) {
                    setTitle(json.title ?? "");
                }
            } catch (e) {
                if (!cancelled) {
                    setError(e.message);
                }
            }
        }

        fetchMeta();

        return () => {
            cancelled = true;
        };
    }, [metaUrl]);

    return (
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            {/* Title from backend */}
            {error ? (
                <div style={{ marginBottom: "0.75rem" }}>
                    <strong>Chart title unavailable</strong>
                    <div style={{ fontSize: "0.9rem" }}>{error}</div>
                </div>
            ) : (
                <h3 style={{ margin: "0 0 0.75rem 0", whiteSpace: "pre-line" }}>
                    {title || "Loading title..."}
                </h3>
            )}

            {/* Image from backend */}
            <img
                src={imgUrl}
                alt={title || `Factor contributions for ${geoArea} in ${year}`}
                style={{ maxWidth: "650px" }}
                onError={() => console.log("Image failed to load:", imgUrl)}
            />
        </div>
    );
}

export default ContributionBarChartImage;
