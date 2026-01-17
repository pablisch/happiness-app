function RadioSelector({ name, title, options, value, onChange, variant = "default" }) {
    const compact = variant === "toolbar";

    return (
        <div style={{ marginBottom: compact ? 0 : "1rem" }}>
            <div
                style={{
                    display: compact ? "inline-flex" : "block",
                    alignItems: compact ? "center" : "stretch",
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

                <div
                    style={{
                        display: compact ? "inline-flex" : "block",
                        gap: compact ? "10px" : 0,
                        alignItems: "center",
                    }}
                >
                    {options.map((opt) => (
                        <label
                            key={opt.value}
                            style={{
                                display: compact ? "inline-flex" : "block",
                                alignItems: "center",
                                gap: "6px",
                                marginBottom: compact ? 0 : "0.25rem",
                                padding: compact ? "6px 10px" : 0,
                                border: compact ? "1px solid #e5e5e5" : "none",
                                borderRadius: compact ? "999px" : 0,
                                cursor: "pointer",
                                userSelect: "none",
                            }}
                        >
                            <input
                                type="radio"
                                name={name}
                                value={opt.value}
                                checked={value === opt.value}
                                onChange={() => onChange(opt.value)}
                                style={{ margin: 0 }}
                            />
                            <span>{opt.label}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RadioSelector;
