const musicStores=[
    {
        "name":"General Music",
	    "description":"General Music has a collection of different songs in CD format. We specialising in rock music from the 80s-today.",
        "coordinates": [53.647828, -1.79016],
        "songs": {
            "band1":"The Rolling Stones",
            "song1":"Paint It Black",
            "band2":"Foo Fighters",
            "song2":"Something from Nothing"
        }
    },
	{
        "name":"Vinyl Tap",
	    "description":"Vinyl Tap has a range of classic songs & modern songs that are available in vinyl for avid collectors to buy.",
        "coordinates": [53.648092, -1.782609],
        "songs": {
            "band1":"Elvis",
            "song1":"Hound Dog",
            "band2":"The Beatles",
            "song2":"Hey Jude"
        }
	},
	{
        "name":"Music Inc",
	    "description":"Music Inc offers both CD, and Vinyl formats for a range of songs and genres.",
        "coordinates": [53.658964, -1.788794],
        "songs": {
            "band1":"Red Hot Chili Peppers",
            "song1":"Under the Bridge",
            "band2":"AC/DC",
            "song2":"Back in Black"
        }
    }
];

const infoDiv = document.querySelector("#info");
const nameDiv = document.querySelector("#storeMapName");
const descDiv = document.querySelector("#storeMapDesc");


function initMap(lat, long){
	myMap = L.map('map').setView([lat, long], 17);

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	 	attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
	    maxZoom: 18
	 }).addTo(myMap);
   
    musicStores.forEach(function(musicStore)
    {
        let musicStoreName = musicStore.name
        let musicStoreDesc = musicStore.description;
        let musicStoreLat = musicStore.coordinates[0];
        let musicStoreLon = musicStore.coordinates[1];
        let musicStoreMark = L.marker([musicStoreLat, musicStoreLon]).addTo(myMap);
        musicStoreMark.bindPopup(musicStoreName + " - " + musicStoreDesc );
        musicStoreMark.addEventListener("click", getTInfo(musicStore),false);
    });
}

function getTInfo(musicStore){
    return function(){
        console.log(musicStore.name);
        nameDiv.textContent = musicStore.name;
        descDiv.textContent = musicStore.description;
    }
}


function itWorks(position) 
{
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	console.log('latitude: '+latitude);
	console.log('longitude: '+longitude);
    initMap(latitude, longitude);
    let mark = L.marker([latitude, longitude]).addTo(myMap);
    mark.bindPopup("You are here").openPopup();
}

function itDoesntWork(error) 
{
	console.log('There is an error '+error);
}

function getUserPosition()
{
    navigator.geolocation.getCurrentPosition(itWorks, itDoesntWork);
}


window.addEventListener("load",getUserPosition,false);