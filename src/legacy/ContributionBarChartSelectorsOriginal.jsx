import RadioSelector from "../RadioSelector";
import DropdownSelector from "../DropdownSelector";
import { EU_COUNTRIES } from "../data/euCountries";

const geoAreaOptions = [
    { label: "EU (average across member states)", value: "EU" },
    ...EU_COUNTRIES.map((c) => ({ label: c, value: c })),
];

const yearOptions = [
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
];

function ContributionBarChartSelectorsOriginal({ geoArea, year, onGeoAreaChange, onYearChange }) {
    return (
        <div style={{ marginTop: "1rem" }}>
            <DropdownSelector
                title="Select Geo Area:"
                value={geoArea}
                options={geoAreaOptions}
                onChange={onGeoAreaChange}
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

export default ContributionBarChartSelectorsOriginal;
