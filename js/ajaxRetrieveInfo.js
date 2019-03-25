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
const titleH3=document.getElementById("title");
const infoP=document.getElementById("info");

//allow \n to work on the info of the stores.
infoP.setAttribute('style', 'white-space: pre;');

function createHandler(musicStore)
{
	return function()
    {
		titleH3.textContent=musicStore.name;
        infoP.textContent =`${musicStore.description} \n`;
        infoP.textContent += `${musicStore.name} can be found at these coordinates - Latitude: ${musicStore.coordinates[0]}, Longitude: ${musicStore.coordinates[1]}`;
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