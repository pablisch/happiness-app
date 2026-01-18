import { useEffect, useMemo, useRef, useState } from "react";
import { useSelectorContext } from "../Context/selectorContext.js";

function clamp(n, lo, hi) {
    return Math.max(lo, Math.min(hi, n));
}

function ContributionBarChartImage() {
    const { country, year, showEU, fixedScale } = useSelectorContext();

    const wrapRef = useRef(null);
    const [size, setSize] = useState({ w: 720, h: 260 });

    const [title, setTitle] = useState("");
    const [error, setError] = useState(null);

    // Measure the *panel* size (stable), not an inner div with unknown height
    useEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;

        const panel = wrap.closest(".panel") || wrap;

        const ro = new ResizeObserver((entries) => {
            const cr = entries[0]?.contentRect;
            if (!cr) return;

            // Leave room for title (and a bit of padding)
            const usableW = Math.floor(cr.width);
            const usableH = Math.floor(cr.height);

            // Chart image height: panel height minus ~28px title + small gap
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
            `http://127.0.0.1:8000/contrib_bar_meta/${encodedCountry}/${year}` +
            `?show_eu=${showEUParam}&fixed_scale=${fixedScaleParam}`;

        const imgUrl =
            `http://127.0.0.1:8000/contrib_bar/${encodedCountry}/${year}` +
            `?show_eu=${showEUParam}&fixed_scale=${fixedScaleParam}` +
            `` +
            `&v=${encodedCountry}-${year}-${showEUParam}-${fixedScaleParam}-${size.w}x${size.h}`;

        return { metaUrl, imgUrl };
    }, [country, year, showEU, fixedScale, size.w, size.h]);

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
        <div ref={wrapRef} className="chart-image-block">
            <div className="chart-image-title">
                {error ? "Chart title unavailable" : (title || "Loading…")}
            </div>

            <img
                className="chart-image"
                src={imgUrl}
                alt={title || `Factor contributions for ${country} in ${year}`}
                loading="lazy"
                decoding="async"
            />
        </div>
    );




}

export default ContributionBarChartImage;
