
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
const titleH2=document.getElementById("title");
const infoP=document.getElementById("info");

//allow \n to work on the info of the stores.
infoP.setAttribute('style', 'white-space: pre;');

function createHandler(country)
{
	return function(){
		titleH2.textContent=country.name;
        infoP.textContent = `Music Store Name: ${country.name}. \n`;
        infoP.textContent +=`Music Store Description: ${country.description}. \n`;
        infoP.textContent += `Music Store Coordinates: Latitude: ${country.coordinates[0]}, Longitude: ${country.coordinates[1]}.`;
	}
}

function populateList(countries)
{
	countries.forEach(function(country){
		var newLi=document.createElement("li");
		newLi.textContent=country.name;
	    newLi.addEventListener("click", createHandler(country), false)
		navList.appendChild(newLi);
	})
}

function init(){
	ajax("../data/musicStoreInfo.json",populateList);
}

init();

