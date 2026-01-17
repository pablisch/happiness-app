import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

/**
 * FitBox
 * Scales its children to fit within the container using CSS transform: scale().
 *
 * baseWidth/baseHeight:
 *   The "designed for" size of the child content in pixels.
 *
 * extraScale:
 *   Optional multiplier you can use like a "manual scale knob" per element.
 */
export default function FitBox({
                                   baseWidth,
                                   baseHeight,
                                   extraScale = 1,
                                   padding = 0,
                                   debug = false,
                                   children,
                               }) {
    const ref = useRef(null);
    const [box, setBox] = useState({ w: 0, h: 0 });

    // Measure available space
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const ro = new ResizeObserver((entries) => {
            const cr = entries[0]?.contentRect;
            if (!cr) return;
            setBox({ w: cr.width, h: cr.height });
        });

        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const scale = useMemo(() => {
        const availW = Math.max(0, box.w - padding * 2);
        const availH = Math.max(0, box.h - padding * 2);

        if (!availW || !availH || !baseWidth || !baseHeight) return 1;

        const s = Math.min(availW / baseWidth, availH / baseHeight);
        // Never scale up massively; keep it sane. (You can raise this if you want.)
        const capped = Math.min(s, 1);
        return capped * extraScale;
    }, [box.w, box.h, baseWidth, baseHeight, padding, extraScale]);

    // Center the scaled content inside the box
    const innerLeft = useMemo(() => {
        const availW = Math.max(0, box.w - padding * 2);
        const scaledW = baseWidth * scale;
        return padding + Math.max(0, (availW - scaledW) / 2);
    }, [box.w, baseWidth, scale, padding]);

    const innerTop = useMemo(() => {
        const availH = Math.max(0, box.h - padding * 2);
        const scaledH = baseHeight * scale;
        return padding + Math.max(0, (availH - scaledH) / 2);
    }, [box.h, baseHeight, scale, padding]);

    return (
        <div ref={ref} style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
            <div
                style={{
                    position: "absolute",
                    left: `${innerLeft}px`,
                    top: `${innerTop}px`,
                    width: `${baseWidth}px`,
                    height: `${baseHeight}px`,
                    transformOrigin: "top left",
                    transform: `scale(${scale})`,
                }}
            >
                {children}
            </div>

            {debug && (
                <div
                    style={{
                        position: "absolute",
                        right: 6,
                        bottom: 6,
                        fontSize: 10,
                        background: "rgba(0,0,0,0.06)",
                        padding: "2px 6px",
                        borderRadius: 6,
                    }}
                >
                    {Math.round(box.w)}×{Math.round(box.h)} • scale {scale.toFixed(2)}
                </div>
            )}
        </div>
    );
}
