// import { useEffect, useState } from "react";

function ContributionChart() {

    let region = "Central%20and%20Eastern%20Europe"
    let year = "2021"

    return (
                <div style={{ marginTop: "2rem" }}>
                    <h2>Chart from Python</h2>
                    <img src={`http://127.0.0.1:8000/chart/${region}/${year}`} alt="Chart" />
                </div>

    );
}

export default ContributionChart;
