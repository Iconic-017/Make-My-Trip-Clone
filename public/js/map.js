mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: Listing.geometry.coordinates,
    zoom: 8 
});

if (Listing.geometry.coordinates.length) {
    const marker = new mapboxgl.Marker({color:"red"})
        .setLngLat(Listing.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({offset: 25}).setHTML(`<h3>${Listing.location}</h3>`))
        .addTo(map);
}
