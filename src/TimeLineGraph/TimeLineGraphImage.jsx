import { useEffect, useState } from "react";
import { useSelectorContext } from "../context/SelectorContext.js";

function TimeLineGraphImage() {
    const { country, showEU, fixedScale } = useSelectorContext();

    const [title, setTitle] = useState("");
    const [error, setError] = useState(null);

    const encodedCountry = encodeURIComponent(country);
    const showEUParam = showEU ? "true" : "false";
    const fixedScaleParam = fixedScale ? "true" : "false";

    const metaUrl =
        `http://127.0.0.1:8000/timeline_meta/${encodedCountry}` +
        `?show_eu=${showEUParam}&fixed_scale=${fixedScaleParam}`;

    const imgUrl =
        `http://127.0.0.1:8000/timeline/${encodedCountry}` +
        `?show_eu=${showEUParam}&fixed_scale=${fixedScaleParam}` +
        `&v=${encodedCountry}-${showEUParam}-${fixedScaleParam}`;

    useEffect(() => {
        let cancelled = false;

        async function fetchMeta() {
            try {
                setError(null);
                const res = await fetch(metaUrl);
                if (!res.ok) throw new Error(`Meta request failed: ${res.status}`);
                const json = await res.json();
                if (!cancelled) setTitle(json.title ?? "");
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
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
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

            <img
                src={imgUrl}
                alt={title || `Happiness over time for ${country}`}
                style={{ maxWidth: "650px" }}
                onError={() => console.log("Image failed to load:", imgUrl)}
            />
        </div>
    );
}

export default TimeLineGraphImage;
