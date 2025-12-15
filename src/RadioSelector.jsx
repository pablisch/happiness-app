// RadioSelector.jsx
function RadioSelector({ name, title, options, value, onChange }) {
    return (
        <div style={{ marginBottom: "1rem" }}>
            {title && <h3>{title}</h3>}
            {options.map((opt) => (
                <label
                    key={opt.value}
                    style={{ display: "block", marginBottom: "4px", marginRight: "1rem" }}
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
