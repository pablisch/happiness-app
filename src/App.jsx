import "./Dashboard.css";

import ContributionBarChart from "./ContributionBarChart/ContributionBarChart.jsx";
import TimeLineGraph from "./TimeLineGraph/TimeLineGraph.jsx";

import CountrySelector from "./Selectors/CountrySelector.jsx";
import ShowEuCheckbox from "./Selectors/ShowEuCheckbox.jsx";
import YearSelector from "./Selectors/YearSelector.jsx";
import FixedScaleCheckbox from "./Selectors/fixedScaleCheckbox.jsx";

import ScoreCard from "./ScoreCard/ScoreCard.jsx";
import FactorDonut from "./Donut/FactorDonut.jsx";
import EUMap from "./Map/EUMap.jsx";

import FitBox from "./Layout/FitBox.jsx";

/**
 * Per-element fit knobs.
 * These DO NOT re-architect anything — they just scale visuals inside their panels
 * so nothing gets clipped.
 */
const MAP_BASE = { w: 570, h: 690 };
const SCORE_BASE = { w: 360, h: 260 };
const DONUT_BASE = { w: 360, h: 360 };

// Manual multipliers (start at 1; tweak if you want a little smaller/bigger)
const MAP_SCALE = 0.9;
const SCORE_SCALE = 0.5
;
const DONUT_SCALE = 1.0;

function App() {
    return (
        <div className="dashboard-root">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Happiness Dashboard</h1>
                <div className="dashboard-subtitle">European countries — factors & trends</div>
            </header>

            {/* Selectors bar */}
            <div className="selectors-bar">
                <div className="selectors-left">
                    <CountrySelector />
                </div>

                <div className="selectors-right">
                    <div className="inline-selector"><ShowEuCheckbox /></div>
                    <div className="inline-selector"><YearSelector /></div>
                    <div className="inline-selector"><FixedScaleCheckbox /></div>
                </div>
            </div>

            <main className="dashboard-grid">
                <section className="panel map-panel">
                    <FitBox
                        baseWidth={MAP_BASE.w}
                        baseHeight={MAP_BASE.h}
                        extraScale={MAP_SCALE}
                        padding={8}
                        debug={false}
                    >
                        <EUMap />
                    </FitBox>
                </section>

                <aside className="right-column">
                    <div className="panel score-panel">
                        <FitBox
                            baseWidth={SCORE_BASE.w}
                            baseHeight={SCORE_BASE.h}
                            extraScale={SCORE_SCALE}
                            padding={8}
                            debug={false}
                        >
                            <ScoreCard />
                        </FitBox>
                    </div>

                    <div className="panel donut-panel">
                        <FitBox
                            baseWidth={DONUT_BASE.w}
                            baseHeight={DONUT_BASE.h}
                            extraScale={DONUT_SCALE}
                            padding={8}
                            debug={false}
                        >
                            <FactorDonut />
                        </FitBox>
                    </div>
                </aside>

                <section className="panel chart-panel contrib-panel">
                    <ContributionBarChart />
                </section>

                <section className="panel chart-panel timeline-panel">
                    <TimeLineGraph />
                </section>
            </main>

            <footer className="dashboard-footer">
                <small>Data: World Happiness dataset — UI prototype</small>
            </footer>
        </div>
    );
}

export default App;
