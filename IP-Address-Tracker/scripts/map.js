let map, marker;

function setMap({ lat, lng }) {
	/* reset map when it's to be refreshed for the queried ipAddress/domain */
	if (map) {
		map.remove();
		map = undefined;
		document.getElementById('map').innerHTML = '';
	}

	map = L.map('map').setView([ lat, lng ], 13);

	const tileAttribution =
		`<a href="https://www.maptiler.com/copyright/" target="_blank">
			&copy; MapTiler
		 </a>
		 <a href="https://www.openstreetmap.org/copyright" target="_blank">
			&copy; OpenStreetMap contributors
		 </a>`;


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);





	let markerIcon = L.icon({
		iconUrl: './images/icon-location.svg',
	})

	marker = L.marker([ lat, lng ], { icon: markerIcon }).addTo(map);
}

export default setMap;