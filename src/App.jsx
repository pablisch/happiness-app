import "./Dashboard.css";

import CountrySelector from "./Selectors/CountrySelector.jsx";
import ShowEuCheckbox from "./Selectors/ShowEuCheckbox.jsx";
import YearSelector from "./Selectors/YearSelector.jsx";
import FixedScaleCheckbox from "./Selectors/fixedScaleCheckbox.jsx";

import ScoreCard from "./ScoreCard/ScoreCard.jsx";
import FactorDonut from "./Donut/FactorDonut.jsx";
import ContributionBarChart from "./ContributionBarChart/ContributionBarChart.jsx";
import TimeLineGraph from "./TimeLineGraph/TimeLineGraph.jsx";
import MapPanel from "./Map/MapPanel.jsx";

function App() {
    return (
        <div className="page">
            <header className="header">
                <h1>Happiness Dashboard</h1>
                <p>European countries — factors &amp; trends</p>
            </header>

            <section className="controls">
                <div className="control-item control-country">
                    <CountrySelector />
                </div>

                <div className="control-item control-checkbox checkbox-lg">
                    <ShowEuCheckbox />
                </div>

                <div className="control-item control-year">
                    <YearSelector />
                </div>

                <div className="control-item control-checkbox checkbox-lg">
                    <FixedScaleCheckbox />
                </div>
            </section>

            <section className="block">
                <MapPanel />
            </section>

            <section className="block">
                <ScoreCard />
            </section>

            <section className="block">
                <FactorDonut />
            </section>

            <section className="block">
                <ContributionBarChart />
            </section>

            <section className="block">
                <TimeLineGraph />
            </section>

            <footer className="footer">
                Data: World Happiness dataset — UI prototype
            </footer>
        </div>
    );
}

export default App;
