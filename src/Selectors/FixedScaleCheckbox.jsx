import CheckboxSelector from "../CheckboxSelector.jsx";
import {useSelectorContext} from "../Context/SelectorContext.js";

function FixedScaleCheckbox() {
    const { fixedScale, setFixedScale } = useSelectorContext();

    return (
            <CheckboxSelector
                label="Use fixed scale"
                checked={fixedScale}
                onChange={setFixedScale}
            />
    );
}

export default FixedScaleCheckbox;
