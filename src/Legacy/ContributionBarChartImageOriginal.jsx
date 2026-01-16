function ContributionBarChartImageOriginal({ geoArea, year }) {
    const encodedGeoArea = encodeURIComponent(geoArea);
    const src = `http://127.0.0.1:8000/contrib_bar/${encodedGeoArea}/${year}?v=${encodedGeoArea}-${year}`;

    return (
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <img
                src={src}
                alt={`Factor contributions for ${geoArea} in ${year}`}
                style={{ maxWidth: "650px" }}
                onError={() => console.log("Image failed to load:", src)}
            />
        </div>
    );
}

export default ContributionBarChartImageOriginal;
