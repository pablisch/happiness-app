import { useMemo, useState } from "react";
import { SelectorContext } from "./SelectorContext.js";

export function SelectorProvider({ children }) {
    const [year, setYear] = useState("2021");
    const [country, setCountry] = useState("France");
    const [showEU, setShowEU] = useState(true);
    const [fixedScale, setFixedScale] = useState(true);

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
        }),
        [country, year, showEU, fixedScale]
    );

    return (
        <SelectorContext.Provider value={value}>
            {children}
        </SelectorContext.Provider>
    );
}
