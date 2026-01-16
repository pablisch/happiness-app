import CheckboxSelector from "../CheckboxSelector.jsx";
import {useSelectorContext} from "../Context/SelectorContext.js";

function ShowEuCheckbox() {
    const { showEU, setShowEU } = useSelectorContext();

    return (
            <CheckboxSelector
                label="Show EU average"
                checked={showEU}
                onChange={setShowEU}
            />
    );
}

export default ShowEuCheckbox;
