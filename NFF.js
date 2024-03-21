/* NOMNOML FOLDING FOLDERS*/


//thanks to this: https://gomakethings.com/how-to-get-all-sibling-elements-until-a-match-is-found-with-vanilla-javascript/
var NFF_nextUntil = function (elem, selector, filter) {

	// Setup siblings array
	var siblings = [];

	// Get the next sibling element
	elem = elem.nextElementSibling;

	// As long as a sibling exists
	while (elem) {

		// If we've reached our match, bail
		if (elem.matches(selector)) break;

		// If filtering by a selector, check if the sibling matches
		if (filter && !elem.matches(filter)) {
			elem = elem.nextElementSibling;
			continue;
		}

		// Otherwise, push it to the siblings array
		siblings.push(elem);

		// Get the next sibling element
		elem = elem.nextElementSibling;

	}

	return siblings;

};


var NFF_opendir = function (dir){
	console.log("NFF_opendir()");
	dir.setAttribute("openfolder",  "true");
	
	var siblings = NFF_nextUntil(dir, ":not(.indented)" ,".indented");
	
	for (var k = 0; k < siblings.length; k++) {
	
		console.log("sibling " + k + " and content: " + siblings[k].textContent); 
	
		siblings[k].style.display = 'block';
	
	}	
	
}
 
var NFF_closedir = function (dir){
	console.log("NFF_closedir()");
	dir.setAttribute("openfolder",  "false");
	
	var siblings = NFF_nextUntil(dir, ":not(.indented)" ,".indented");
	
	for (var k = 0; k < siblings.length; k++) {
	
		console.log("sibling " + k + " and content: " + siblings[k].textContent); 
	
		siblings[k].style.display = 'none';
	
	}	
	
}

var directories = document.getElementsByClassName("directory");
console.log (directories);

for (var i = 0; i < directories.length; i++) {
	
	cur_dir = directories[i];
	
	cur_dir.setAttribute("id", "NFFID_"+i);
	
	NFF_closedir(cur_dir);
 
	cur_dir.addEventListener("click",  function() {

		 if (this.getAttribute("openfolder")=="true"){console.log("NFF: closing the folder: " + this.textContent); NFF_closedir(this);}
		 else {console.log("NFF: opening the folder: " + this.textContent);NFF_opendir(this);}
 
	});
		
 
}




 