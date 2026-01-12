function DropdownSelector({ title, value, options, onChange }) {
    return (
        <div style={{ marginBottom: "1rem" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>{title}</h3>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{ padding: "0.4rem", minWidth: "320px" }}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DropdownSelector;
