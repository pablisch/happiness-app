import { useMemo, useState } from "react";
import { SelectorContext } from "./selectorContext.js";

export function SelectorProvider({ children }) {
    const [year, setYear] = useState("2021");
    const [geoArea, setGeoArea] = useState("France");
    const [showEU, setShowEU] = useState(false);

    const value = useMemo(
        () => ({
            geoArea,
            setGeoArea,
            year,
            setYear,
            showEU,
            setShowEU,
        }),
        [geoArea, year, showEU]
    );

    return (
        <SelectorContext.Provider value={value}>
            {children}
        </SelectorContext.Provider>
    );
}
