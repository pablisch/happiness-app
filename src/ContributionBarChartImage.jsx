// // ContributionBarChartImage.jsx
// function ContributionBarChartImage({ region, year }) {
//     const encodedRegion = encodeURIComponent(region);
//     const src = `http://127.0.0.1:8000/chart/${encodedRegion}/${year}`;
//
//     return (
//         <img
//             src={src}
//             alt={`Happiness contribution chart for ${region} in ${year}`}
//             style={{ maxWidth: "600px", border: "1px solid #ccc", padding: "8px" }}
//             onError={() => console.log("Image failed to load:", src)}
//         />
//     );
// }
//
// export default ContributionBarChartImage;

// ChartImage.jsx
function ChartImage({ title, styleName, region, year }) {
    const encodedRegion = encodeURIComponent(region);
    const src = `http://127.0.0.1:8000/chart/${styleName}/${encodedRegion}/${year}`;

    return (
        <div style={{ textAlign: "center", margin: "0 1rem 2rem" }}>
            <h3>{title}</h3>
            <img
                src={src}
                alt={`${title} for ${region} in ${year}`}
                style={{ maxWidth: "650px", border: "1px solid #ccc", padding: "8px" }}
                onError={() => console.log("Image failed to load:", src)}
            />
        </div>
    );
}

export default ChartImage;

