import CheckboxSelector from "../CheckboxSelector.jsx";
import {useSelectorContext} from "../context/SelectorContext.js";

function ContributionBarChartShowEuCheckbox() {
    const { showEU, setShowEU } = useSelectorContext();

    return (
            <CheckboxSelector
                label="Show EU average"
                checked={showEU}
                onChange={setShowEU}
            />
    );
}

export default ContributionBarChartShowEuCheckbox;
