import ContributionBarChartShowEuCheckbox from "./ContributionBarChartShowEuCheckbox.jsx";
import ContributionBarChartImage from "./ContributionBarChartImage.jsx";
import ContributionBarChartYearSelector from "./ContributionBarChartYearSelector.jsx";
import ContributionBarChartCountrySelector from "./ContributionBarChartCountrySelector.jsx";

function ContributionBarChart() {

    return (
        <div style={{ marginTop: "2rem" }}>
            <h2>Happiness Contributors</h2>

            <ContributionBarChartCountrySelector />

            <ContributionBarChartShowEuCheckbox />

            <ContributionBarChartYearSelector />

            <ContributionBarChartImage />
        </div>
    );
}

export default ContributionBarChart;
