import RadioSelector from "../RadioSelector.jsx";
import { useSelectorContext } from "../Context/SelectorContext.js";

const yearOptions = [
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
];

function YearSelector() {
    const { year, setYear } = useSelectorContext();

    return (
        <RadioSelector
            name="year"
            title="Year:"
            options={yearOptions}
            value={year}
            onChange={setYear}
            variant="toolbar"
        />
    );

}

export default YearSelector;
