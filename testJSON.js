var favorites = [];

window.onload = function() {

	/*
	var gist = {"gist": {"description":"description",
							"fileName":"fileName",
							"gistUrl":"gistUrl"}};
			gistArray.push(gist);
	*/

	/* localStorage code adapted from lecture javascript-applied-local-storage.mp4 */
	favorites = localStorage.getItem("favorites");
		if( favorites === null) {
			favorites = [];
			//{"gistArr": [{"key1":"value1"},{"key2":"value2"}]}
			//localStorage.setItem('favorites', JSON.stringify(favorites));
		}
		else {
			favorites = JSON.parse(favorites);
		}

	saveButton = document.createElement("button");
	saveButton.addEventListener("click", function(){
		saveGist(this);
	});
	
	buttonText = document.createTextNode("Save Gist To Favorites: 0");
	saveButton.appendChild(buttonText);
	document.body.appendChild(saveButton);
}

var gistArray = [{"description":"description",
							"fileName":"fileName",
							"gistUrl":"gistUrl"}];

/* Saves a gist object to local storage */
function saveGist(buttonObj) {

	var index = buttonObj.textContent.match(/\d+$/)[0];
	alert(index);
	index = parseInt(index);
	favorites.push(gistArray[index]);
	localStorage.setItem('favorites', JSON.stringify(favorites));
	
}

