window.onload = function() {

//put function calls here...
/*modify the following...*/
/*
var settingsStr = localStorage.getItem('userSettings');
	if( settings === null) {
		settings = {'sports':[]};
		localStorage.setItem('userSettings', JSON.stringify(settings));
	}
	else {
		settings = JSON.parse(settingsStr);
	}
	createSportList(document.getElementById('sport-list'));
*/

}

var pages = 1;
var searchResultsJSON;
var gistArray = [];	// an array of gist objects


/*input: number of pages requested (ie: number of requests made)
  return: JSON object representing response (optionally filtered)
*/
function search() {
	
	/*set the number of pages to return*/
	pages = document.getElementsByName("pages")[0].value;
	if (pages <=5 && pages >= 1) {
	  //make request
	  makeRequest(pages);
	  //https://api.github.com/gists?page=2
	} else {
		alert("Invalid number of pages (must be 1 through 5).");
	}
}


function makeRequest(numPages) {
	
	/* code adapted from lecture "ajax.mp4" */
	var req = new XMLHttpRequest();
	if(!req){
		throw 'Unable to create HttpRequest.';
	} /* or do it the way mozilla shows - see this week's readings */
	
	//for (var i = 0; i < numPages; i++) {
	
	var url = 'https://api.github.com/gists?page=2';
	url += '?page=' + numPages;
	req.onreadystatechange = function(){
		if(this.readyState === 4){
			searchResultsJSON = JSON.parse(this.responseText);
			
			/*DEBUG*/
			console.log(searchResultsJSON);
			makeGistArray();
			
		}
	};
	req.open('GET', url); /* !! Note: For POST, the methods calls here on req would be a little different - so read the documentation !! */
	req.send();
	
	//}
	
	
	
	
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
		//...but if all filters are false, set them all to true:
		var falseCount = 0;
		for (j = 0; j < filters.length; j++)
			if (!filters[j]) falseCount++;
		if (falseCount == filters.length) {
			allFiltersOff = true;
		}
		/*debug*/
		console.log(falseCount == filters.length);
		console.log(falseCount);
		console.log(filters.length);
	
	//get file objects into array so we can filter each gist by language
	for (var i = 0; i < searchResultsJSON.length; i++) {
		//fileObjs.push(gist[0].files);
		//console.log(gist[0].files);
		//for (var obj in searchResultsJSON[i].files) {
			//fileObjs.push(obj);
		//}
		//fileNames.push(Object.keys(searchResultsJSON[i].files)[0]);
		description = searchResultsJSON[i].description;
		fileName = Object.keys(searchResultsJSON[i].files)[0];
		gistUrl = searchResultsJSON[i].url;
		
		/*debug*/
		console.log(description);
		console.log(fileName);
		console.log(gistUrl);
		
		
		
	/*debug*/
	console.log(filters);

		
		//filtering here: .py, .json, .js, .sql
		//var fileType =
		//gist = {"gist": {"description":description,
		//					"fileName":fileName,
		//					"gistUrl":gistUrl}};
		//for (var k = 0; k < filters.length; k++) {
		//	if (filters[k]) {
		//		var pattern = "/" + filters[k] + "$/";
		//		var regEx = new RegExp(pattern);
		//		if (regEx.test(fileName))
		//			gistArray.push(gist);
		//	}
		//}
		
		//check if all checkboxes are unchecked
		if (allFiltersOff) {
			gist = {"gist": {"description":description,
							"fileName":fileName,
							"gistUrl":gistUrl}};
			gistArray.push(gist);
		}
		else if (filters[0] && /.py$/.test(fileName) ||
			filters[1] && /.json$/.test(fileName) ||
			filters[2] && /.js$/.test(fileName) ||
			filters[3] && /.sql$/.test(fileName)) {
			gist = {"gist": {"description":description,
							"fileName":fileName,
							"gistUrl":gistUrl}};
			gistArray.push(gist);	
		//} else { //we assume no filters were set (all boxes unchecked)
		//	gist = {"gist": {"description":description,
		//					"fileName":fileName,
		//					"gistUrl":gistUrl}};
		//	gistArray.push(gist);
		}
		
	}
	console.log(gistArray);
	
		
	//filter language
	/*
	for (i = 0; i < searchResultsJSON.length; i++) {
		description = fileObjs[i].filename;
		language = fileObjs[i].language;
		gistUrl = fileObjs[i].raw_url;
		
		
		//filtering here:
		if (language == filters[0] ||
			language == filters[1] ||
			language == filters[2] ||
			language == filters[3]) {
			gist = {"gist": {"description":description,
							"language":language,
							"gistUrl":gistUrl}};
			gistArray.push(gist);	
		} else { //we assume no filters were set (all boxes unchecked)
			gist = {"gist": {"description":description,
							"language":language,
							"gistUrl":gistUrl}};
			gistArray.push(gist);
		}
		
		
	}
	*/
}


//use for...in loop to filter results
function filter() {

}

/* Saves a gist object to local storage */
function saveGist() {
	//use JSON.stringify(object);
}
