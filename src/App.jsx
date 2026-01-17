import "./Dashboard.css";

import CountrySelector from "./Selectors/CountrySelector.jsx";
import ShowEuCheckbox from "./Selectors/ShowEuCheckbox.jsx";
import YearSelector from "./Selectors/YearSelector.jsx";
import FixedScaleCheckbox from "./Selectors/fixedScaleCheckbox.jsx";

import EUMap from "./Map/EUMap.jsx";
import ScoreCard from "./ScoreCard/ScoreCard.jsx";
import FactorDonut from "./Donut/FactorDonut.jsx";
import ContributionBarChart from "./ContributionBarChart/ContributionBarChart.jsx";
import TimeLineGraph from "./TimeLineGraph/TimeLineGraph.jsx";

function App() {
    return (
        <div className="page">
            <header className="header">
                <h1>Happiness Dashboard</h1>
                <p>European countries — factors &amp; trends</p>
            </header>

            <section className="controls">
                <CountrySelector />
                <ShowEuCheckbox />
                <YearSelector />
                <FixedScaleCheckbox />
            </section>

            <section className="block">
                <h2>Map</h2>
                <EUMap />
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
