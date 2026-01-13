function RadioSelector({ name, title, options, value, onChange }) {
    return (
        <div style={{ marginBottom: "1rem" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>{title}</h3>

            {options.map((opt) => (
                <label
                    key={opt.value}
                    style={{ display: "block", marginBottom: "0.25rem" }}
                >
                    <input
                        type="radio"
                        name={name}
                        value={opt.value}
                        checked={value === opt.value}
                        onChange={() => onChange(opt.value)}
                    />
                    {" "}{opt.label}
                </label>
            ))}
        </div>
    );
}

export default RadioSelector;
