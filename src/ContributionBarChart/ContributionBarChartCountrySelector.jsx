import DropdownSelector from "../DropdownSelector.jsx";
import { EU_COUNTRIES } from "../data/euCountries.js";
import {useSelectorContext} from "../context/SelectorContext.js";

const countryOptions = EU_COUNTRIES.map((c) => ({ label: c, value: c }));

function ContributionBarChartCountrySelector() {
    const { geoArea, setGeoArea } = useSelectorContext();

    return (
            <DropdownSelector
                title="Select Country:"
                value={geoArea}
                options={countryOptions}
                onChange={setGeoArea}
            />
    );
}

export default ContributionBarChartCountrySelector;
