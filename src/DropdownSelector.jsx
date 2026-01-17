function DropdownSelector({ title, value, options, onChange, variant = "default" }) {
    const compact = variant === "toolbar";

    return (
        <div style={{ marginBottom: compact ? 0 : "1rem" }}>
            <div
                style={{
                    display: compact ? "inline-flex" : "block",
                    alignItems: "center",
                    gap: compact ? "10px" : 0,
                    whiteSpace: compact ? "nowrap" : "normal",
                }}
            >
                <div
                    style={{
                        marginBottom: compact ? 0 : "0.5rem",
                        fontWeight: 700,
                        fontSize: compact ? "0.95rem" : "1.05rem",
                    }}
                >
                    {title}
                </div>

                <div style={{ position: "relative", display: "inline-block" }}>
                    <select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        style={{
                            paddingTop: compact ? "0.35rem" : "0.45rem",
                            paddingBottom: compact ? "0.35rem" : "0.45rem",
                            paddingLeft: "0.6rem",
                            paddingRight: "2.2rem",

                            width: compact ? "240px" : "200px", // you can tweak
                            borderRadius: "10px",
                            border: "1px solid #bbb",
                            background: "white",
                            fontSize: compact ? "0.95rem" : "1rem",

                            appearance: "none",
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                        }}
                    >
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>

                    <div
                        style={{
                            position: "absolute",
                            right: "0.8rem",
                            top: "50%",
                            transform: "translateY(-50%)",
                            pointerEvents: "none",
                            color: "#666",
                            fontSize: compact ? "0.8rem" : "0.9rem",
                            lineHeight: 1,
                        }}
                    >
                        ▼
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DropdownSelector;
