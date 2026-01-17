import { useEffect, useMemo, useRef, useState } from "react";
import { useSelectorContext } from "../context/SelectorContext.js";

function clamp(n, lo, hi) {
    return Math.max(lo, Math.min(hi, n));
}

function TimeLineGraphImage() {
    const { country, showEU, fixedScale } = useSelectorContext();

    const wrapRef = useRef(null);
    const [size, setSize] = useState({ w: 420, h: 260 });

    const [title, setTitle] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;

        const panel = wrap.closest(".panel") || wrap;

        const ro = new ResizeObserver((entries) => {
            const cr = entries[0]?.contentRect;
            if (!cr) return;

            const usableW = Math.floor(cr.width);
            const usableH = Math.floor(cr.height);

            const imgW = clamp(usableW, 300, 2000);
            const imgH = clamp(usableH - 28 - 6, 150, 1600);

            setSize({ w: imgW, h: imgH });
        });

        ro.observe(panel);
        return () => ro.disconnect();
    }, []);

    const { metaUrl, imgUrl } = useMemo(() => {
        const encodedCountry = encodeURIComponent(country);
        const showEUParam = showEU ? "true" : "false";
        const fixedScaleParam = fixedScale ? "true" : "false";

        const metaUrl =
            `http://127.0.0.1:8000/timeline_meta/${encodedCountry}` +
            `?show_eu=${showEUParam}&fixed_scale=${fixedScaleParam}`;

        const imgUrl =
            `http://127.0.0.1:8000/timeline/${encodedCountry}` +
            `?show_eu=${showEUParam}&fixed_scale=${fixedScaleParam}` +
            `&w=${size.w}&h=${size.h}` +
            `&v=${encodedCountry}-${showEUParam}-${fixedScaleParam}-${size.w}x${size.h}`;

        return { metaUrl, imgUrl };
    }, [country, showEU, fixedScale, size.w, size.h]);

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
        <div ref={wrapRef} className="chart-image-wrap">
            <div className="chart-image-title">
                {error ? "Chart title unavailable" : (title || "Loading…")}
            </div>

            <div className="chart-image-frame">
                <img
                    className="chart-image"
                    src={imgUrl}
                    alt={title || `Happiness over time for ${country}`}
                    loading="lazy"
                    decoding="async"
                />
            </div>
        </div>
    );
}

export default TimeLineGraphImage;
