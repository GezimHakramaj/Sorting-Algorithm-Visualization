function createBars(parent, num, size){ // Method to create a Bar div inside the flexbox container which we dynamically produce and populate in ArrayList's method generateArrayList().
	var bar = document.createElement("div");
	bar.className = "bar";
	bar.id = num+1;
	bar.style.height = ((num+1)/(size*0.01))+"%";
	parent.appendChild(bar);
	return bar;
}

/*
	Method to create a new flex div which will act as the container to store all other bars in the DOM. This method is invoked whenever we delete the original ArrayList
	rather than looping through and finding, if size==500, 500 bar divs and deleting those we delete the container dropping all bars.
*/
function createArrayContainer(){
	// Drop old flexbox.
	var oldFlex = document.getElementById("arrayContainer");
	oldFlex.remove();
	// Create new flexbox.
	var flex = document.createElement("div");
	flex.id = "arrayContainer"
	flex.className = "arrayContainer"
	document.body.appendChild(flex);
	return flex;
}