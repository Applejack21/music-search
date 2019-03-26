function ajax(url,success)
{
	const ajaxRequest = new XMLHttpRequest(); 
	function handleResponse()
	{
		if(ajaxRequest.readyState===4)
		{
			if(ajaxRequest.status===200)
			{
		    	var data=JSON.parse(ajaxRequest.responseText);
		    	success(data); //this will call populateList
			}
		}
	}
	ajaxRequest.addEventListener("readystatechange",handleResponse,false); 
	ajaxRequest.open('GET', url, true);
	ajaxRequest.send("test");
}


const navList=document.getElementById("nav");
const storeName=document.getElementById("storeName");
const storeInfo=document.getElementById("storeInfo");

function createHandler(musicStore)
{
	return function()
    {
		storeName.textContent=musicStore.name;
        storeInfo.textContent =`${musicStore.description} \n`;
        storeInfo.textContent += `${musicStore.name} can be found at these coordinates: Latitude: ${musicStore.coordinates[0]}, Longitude: ${musicStore.coordinates[1]}`;
	}
}

function populateList(musicStores)
{
	musicStores.forEach(function(musicStore)
    {
		var newLi=document.createElement("li");
		newLi.textContent=musicStore.name;
	    newLi.addEventListener("click", createHandler(musicStore), false)
		navList.appendChild(newLi);
	})
}

function init()
{
	ajax("../data/musicStoreInfo.json",populateList);
}

init();