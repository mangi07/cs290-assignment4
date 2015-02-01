/* JSON PERSISTENCE UNTESTED IN THIS DOCUMENT */
/* LOAD FAVORITES PARTIALLY TESTED SUCCESSFULLY - NEED TO TEST ACTUALLY LOADING FROM LOCAL STORAGE, THOUGH */

var  favorites = [];

window.onload = function() {

	/* localStorage code adapted from lecture javascript-applied-local-storage.mp4 */
	/*
	var favorites = localStorage.getItem("favorites");
		if( favorites === null) {
			favorites = [];
			//{"gistArr": [{"key1":"value1"},{"key2":"value2"}]}
			localStorage.setItem('favorites', JSON.stringify(favorites));
		}
		else {
			favorites = JSON.parse(favorites);
			favoritesArray = favorites;
		}
	*/
	
	/* localStorage code adapted from lecture javascript-applied-local-storage.mp4 */
	favorites = localStorage.getItem("favorites");
		if( favorites === null) {
			favorites = [];
		}
		else {
			favorites = JSON.parse(favorites);
		}

}

var pages = 1;
var searchResultsJSON;
var gistArray = [];	// an array of gist objects
//var favoritesArray = [];// an array filled with gist objects from local storage


/*input: number of pages requested (ie: number of requests made)
  return: JSON object representing response (optionally filtered)
*/
function search() {
	
	/*set the number of pages to return*/
	pages = document.getElementsByName("pages")[0].value;
	if (pages <=5 && pages >= 1) {


	  makeRequest(pages);

	  //eg request url: https://api.github.com/gists?page=2

	} else {
		alert("Invalid number of pages (must be 1 through 5).");
	}
}

/* creates gistArray based on filters */
function makeRequest(pages) {

/* UNCOMMENT THE FOLLOWING WHEN DONE TESTING LOAD FAVORITES */
	/* code adapted from lecture "ajax.mp4" */
//	var req = new XMLHttpRequest();
//	if(!req){
//		throw 'Unable to create HttpRequest.';
//	} /* or do it the way mozilla shows - see this week's readings */
	
//	for (var i = 0; i < pages; i++) {
	
//	var url = "https://api.github.com/gists";
//	url += "?page=" + i;
//	req.onreadystatechange = function(){
//		if(this.readyState === 4){
//			searchResultsJSON = JSON.parse(this.responseText);
//			makeGistArray();
			loadResults(gistArray);
//		}
//	};
//	req.open('GET', url);
//	req.send();
	
//	}
	

}

/* Returns an array of gist objects based on user filters*/
function makeGistArray() {
	//var fileNames = [];
	var gist;		//a single gist object
	var description;
	var fileName;
	var gistUrl;	//url of gist
	var allFiltersOff = false;
	
	//get language filters from user
		//  (cBoxes property name corresponds to gist language value)
		var filters = [false, false, false, false];
		var cBoxes = document.getElementsByClassName("cBox");
		for (var j = 0; j < cBoxes.length; j++) {
			if (cBoxes[j].checked) {
				filters[j] = cBoxes[j].name;
			}
		}
		//...but if all filters are false (unchecked), set allFiltersOff to true:
		var falseCount = 0;
		for (j = 0; j < filters.length; j++)
			if (!filters[j]) falseCount++;
		if (falseCount == filters.length) {
			allFiltersOff = true;
		}
	
	//get file objects into array so we can filter each gist by language
	for (var i = 0; i < searchResultsJSON.length; i++) {
		description = searchResultsJSON[i].description;
		fileName = Object.keys(searchResultsJSON[i].files)[0];
		gistUrl = searchResultsJSON[i].url;		
		
		//check if all checkboxes are unchecked
		if (allFiltersOff) {
			gist = {"description":description,
					"fileName":fileName,
					"gistUrl":gistUrl};
			gistArray.push(gist);
		}
		else if (filters[0] && /.py$/.test(fileName) ||
			filters[1] && /.json$/.test(fileName) ||
			filters[2] && /.js$/.test(fileName) ||
			filters[3] && /.sql$/.test(fileName)) {
			gist = {"description":description,
					"fileName":fileName,
					"gistUrl":gistUrl};
			gistArray.push(gist);	
		}	
	}
}

/* This will include loading the favorites into HTML as well. */
function loadResults(gistArr) {


/* UNCOMMENT THE FOLLOWING COMMENT WHEN DONE TESTING LOAD FAVORITES */
/*
	resultsDiv = document.getElementById("results");
	var textString;
	var entryTextNode;
	var entryContainer;
	var entryLink;
	var saveButton;
	var buttonText;

	for (var i = 0; i < gistArr.length; i++) {
		//if (gistArray[i].url != favorites[i].url) {
			textString = "DESCRIPTION: " + gistArr[i].description +
						" FILE NAME: " + gistArr[i].fileName + 
						" GIST URL: " + gistArr[i].gistUrl;
		//}
		entryTextNode = document.createTextNode(textString);
		entryContainer = document.createElement("p");
		entryLink = document.createElement("a");
		entryLink.href = gistArr[i].gistUrl;
		saveButton = document.createElement("button");
		saveButton.addEventListener("click", function(){
			saveGist(this);
		});
		
		buttonText = document.createTextNode("Save Gist To Favorites: " + i);
		saveButton.appendChild(buttonText);
		entryLink.appendChild(entryTextNode); //<a>
		entryContainer.appendChild(entryLink); //<p>
		entryContainer.appendChild(saveButton); //<button>
		resultsDiv.appendChild(entryContainer); //<div>
	}
*/
	
	
/* TEST WHETHER favorites CAN LOAD INTO HTML */
	favorites = [{"description":"description1",
					"fileName":"fileName1",
					"gistUrl":"gistUrl1"},
				{"description":"description2",
					"fileName":"fileName2",
					"gistUrl":"gistUrl2"},
				{"description":"description3",
					"fileName":"fileName3",
					"gistUrl":"gistUrl3"}	
	];
/* END TEST DATA */	
	
	/* UNTESTED */
	/* LOAD FAVORITES INTO HTML */
	favsDiv = document.getElementById("favorites");
	var favString;
	var favTextNode;
	var favContainer;
	var favLink;
	var removeButton;
	var removeText;

	for (i = 0; i < favorites.length; i++) {
			favString = "DESCRIPTION: " + favorites[i].description +
						" FILE NAME: " + favorites[i].fileName + 
						" GIST URL: " + favorites[i].gistUrl;
		//}
		favTextNode = document.createTextNode(favString);
		favContainer = document.createElement("p");
		favLink = document.createElement("a");
		favLink.href = favorites[i].gistUrl;
		removeButton = document.createElement("button");
		removeButton.addEventListener("click", function(){
			removeFav(this);
		});
		
		removeText = document.createTextNode("Remove Gist From Favorites: " + i);
		removeButton.appendChild(removeText);
		favLink.appendChild(favTextNode); //<a>
		favContainer.appendChild(favLink); //<p>
		favContainer.appendChild(removeButton); //<button>
		favsDiv.appendChild(favContainer); //<div>
	}
}

/* Saves a gist object to local storage */
function saveGist(buttonObj) {

	/*old code
	var index = buttonObj.textContent.match(/\d+$/)[0];
	index = parseInt(index);
	favoritesArray.push(gistArray[index]);
	localStorage.setItem('favorites', JSON.stringify(gistArray[index].gist));
	*/
	
	/*new code*/
	var index = buttonObj.textContent.match(/\d+$/)[0];
	alert(index);
	index = parseInt(index);
	favorites.push(gistArray[index]);
	localStorage.setItem('favorites', JSON.stringify(favorites));
	
	
	
	
}

function removeFav () {
	alert("removeFav called");
}

/*
function removeResults() {
	var entries = document.getElementsByName("p");
	for (var i = 0; i < entries.length; i++) {
		entries[i].remove();
	}
}
*/
