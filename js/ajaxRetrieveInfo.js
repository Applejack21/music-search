var musicStores;

function ajax(url,success)
{
	const ajaxRequest = new XMLHttpRequest(); 
	function handleResponse()
	{
		if(ajaxRequest.readyState===4)
		{
			if(ajaxRequest.status===200)
			{
		    	musicStores = JSON.parse(ajaxRequest.responseText);
                success(musicStores); //this will call populateList
		    	getUserPosition();
            }
		}
	}
	ajaxRequest.addEventListener("readystatechange",handleResponse,false); 
	ajaxRequest.open('GET', url, true);
	ajaxRequest.send("test");
}


const navList=document.getElementById("storeList");
const storeName=document.getElementById("storeName");
const storeInfo=document.getElementById("storeInfo");

function createHandler(musicStore)
{
	return function()
    {
        storeInfo.textContent =`${musicStore.description} \n`;
        storeInfo.textContent += `${musicStore.name} can be found at these coordinates: Latitude: ${musicStore.geometry.coordinates[0]}, Longitude: ${musicStore.geometry.coordinates[1]}`;
	}
}

function populateList(musicStores)
{
	musicStores.forEach(function(musicStore)
    {
		var newLi=document.createElement("li");
        newLi.setAttribute("class", "storeNames");
		newLi.textContent=musicStore.name;
	    newLi.addEventListener("click", createHandler(musicStore), false)
		navList.appendChild(newLi);
	})
}

let btn=document.querySelector("#goBtn");
btn.addEventListener("click", doSearch, true);

function doSearch(musicStores)
{
    console.log(musicStores.name);
    const divElem = document.querySelector("#searchResults");
    const searchTerm = search.value;
    
    while(divElem.firstChild)
        {
            divElem.removeChild(divElem.firstChild);
        }
    
    musicStores.forEach(function(musicStore)
    {
        if(musicStore.name.search(searchTerm)>-1)
            {
                const newParagraph = document.createElement("li");
                const newText = document.createTextNode(musicStore.name);
                newParagraph.appendChild(newText);
                divElem.appendChild(newParagraph);
            }
    });
}

function init()
{
	ajax("../data/musicStoreInfo.json",populateList);
}
init();