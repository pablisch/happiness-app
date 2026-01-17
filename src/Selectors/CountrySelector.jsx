import DropdownSelector from "../DropdownSelector.jsx";
import { EU_COUNTRIES } from "../data/euCountries.js";
import {useSelectorContext} from "../Context/SelectorContext.js";

const countryOptions = EU_COUNTRIES.map((c) => ({ label: c, value: c }));

function CountrySelector() {
    const { country, setCountry } = useSelectorContext();

    return (
        <DropdownSelector
            title="Country:"
            value={country}
            options={countryOptions}
            onChange={setCountry}
            variant="toolbar"
        />
    );

}

export default CountrySelector;
