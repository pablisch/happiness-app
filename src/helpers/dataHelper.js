function clamp01(x) {
    return Math.max(0, Math.min(1, x));
}

export function deltaToBgYear(delta) {
    return deltaToBg(delta, -1, 1); // same mapping, different bounds if needed later
}


export function deltaToBg(delta, minDelta, maxDelta) {
    if (delta == null || minDelta == null || maxDelta == null) {
        return "transparent";
    }

    // Treat +0, -0, and tiny noise as true zero
    const ZERO_EPS = 1e-6;
    if (Math.abs(delta) < ZERO_EPS) {
        return "hsl(0, 0%, 99%)"; // neutral, no colour
    }

    // Clamp delta into bounds
    const d = Math.max(minDelta, Math.min(maxDelta, delta));

    let t;
    let hue;

    if (d > 0) {
        t = clamp01(d / maxDelta);
        hue = 120; // green
    } else {
        t = clamp01(d / minDelta); // minDelta is negative
        hue = 0; // red
    }

    const saturation = 60;

    // Endpoints you chose
    const L0 = 99; // neutral
    const L1 = 78; // lighter extreme (readable)

    const lightness = L0 + t * (L1 - L0);

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// rank 1 => green, rank=total => red
export function rankToBg(rank, total) {
    if (rank == null || total == null || total <= 1) return "transparent";

    // 1 = best (green), total = worst (red)
    const t = (total - rank) / (total - 1); // 0..1
    const hue = 120 * Math.max(0, Math.min(1, t));
    return `hsl(${hue}, 60%, 90%)`;
}

