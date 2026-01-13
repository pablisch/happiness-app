function CheckboxSelector({ label, checked, onChange }) {
    return (
        <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span>{label}</span>
            </label>
        </div>
    );
}

export default CheckboxSelector;
