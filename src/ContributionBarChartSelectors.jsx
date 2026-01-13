import RadioSelector from "./RadioSelector";
import DropdownSelector from "./DropdownSelector";
import CheckboxSelector from "./CheckboxSelector";
import { EU_COUNTRIES } from "./data/euCountries";

const geoAreaOptions = [
    ...EU_COUNTRIES.map((c) => ({ label: c, value: c })),
];

const yearOptions = [
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
];

function ContributionBarChartSelectors({
                                           geoArea,
                                           year,
                                           showEU,
                                           onGeoAreaChange,
                                           onYearChange,
                                           onShowEUChange,
                                       }) {
    return (
        <div style={{ marginTop: "1rem" }}>
            <DropdownSelector
                title="Select Country:"
                value={geoArea}
                options={geoAreaOptions}
                onChange={onGeoAreaChange}
            />

            <CheckboxSelector
                label="Show EU average"
                checked={showEU}
                onChange={onShowEUChange}
            />

            <RadioSelector
                name="year"
                title="Select Year:"
                options={yearOptions}
                value={year}
                onChange={onYearChange}
            />
        </div>
    );
}

export default ContributionBarChartSelectors;
