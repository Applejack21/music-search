const infoDiv = document.querySelector("#info");
const nameDiv = document.querySelector("#storeMapName");
const descDiv = document.querySelector("#storeMapDesc");


function initMap(lat, long)
    {
        myMap = L.map('map', 
        {
            gestureHandling: true //comment out this line if you want to view the map on desktop
        }
        ).setView([lat, long], 17);

        L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
	   maxZoom: 18,
	   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(myMap);
   
        musicStores.forEach(function(musicStore)
    {
        let musicStoreName = musicStore.name;
        let musicStoreDesc = musicStore.description;
        let musicStoreLat = musicStore.geometry.coordinates[0];
        let musicStoreLon = musicStore.geometry.coordinates[1];
        let musicStoreMark = L.marker([musicStoreLat, musicStoreLon]).addTo(myMap);
        musicStoreMark.bindPopup(musicStoreName + " - " + musicStoreDesc );
        musicStoreMark.addEventListener("click", getTInfo(musicStore),false);
    });
}

function getTInfo(musicStore){
    return function(){
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
