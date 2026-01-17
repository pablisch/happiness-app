import { useMemo, useState } from "react";
import { SelectorContext } from "./SelectorContext.js";

export function SelectorProvider({ children }) {
    const [year, setYear] = useState("2021");
    const [country, setCountry] = useState("France");
    const [showEU, setShowEU] = useState(true);
    const [fixedScale, setFixedScale] = useState(false);

    // ✅ NEW: global factor selection (default = Combined score)
    const [factor, setFactor] = useState("combined_score");

    const value = useMemo(
        () => ({
            country,
            setCountry,

            year,
            setYear,

            showEU,
            setShowEU,

            fixedScale,
            setFixedScale,

            factor,
            setFactor,
        }),
        [country, year, showEU, fixedScale, factor]
    );

    return (
        <SelectorContext.Provider value={value}>
            {children}
        </SelectorContext.Provider>
    );
}
