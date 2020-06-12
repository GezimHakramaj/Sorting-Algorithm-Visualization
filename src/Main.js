function onLoadArray(num){ // Method which gets called on window load to generate an array to populate the container div
	arr.generateArrayList(num);
	console.log(arr[-1]);
}

/*
	Method which handles the input by the slider on screen. Whenever the slider value gets changed we call the fucntion below which calls to generate a new array
	along with randomizing it which will dynamically change instantly based on where the user lets go of the slider.
*/
function getSliderValue(){ 
	var slider = document.getElementById("slider").value;
	var val = document.getElementById("sliderValue");
	val.innerHTML = slider;
	arr.generateArrayList(slider);
	arr.randomize();
}

function iSort(){
	insertionSort(arr);
}

function bSort(){
	bubbleSort(arr);
}

function qSort(){
	quickSort(arr, 0, arr.size()-1);
}




































































/*
function generateArray(sliderNum){
	var flex = document.getElementById("flexContainer");
	if(empty == false){
		removeBars(flex, size(arr), empty);
	}
	arr = [];
	for(var i = 0; i < sliderNum; i++){
		arr[i] = i+1;
		generateBars(flex, i, sliderNum);
	}
	empty = false;
	console.log(arr);
	return arr;
}

function randomizeArray(arr){
	for(var i = 0; i < size(arr); i++){
		var j = Math.floor(Math.random() * i);
		swap(arr, i, j);
	}
	console.log(arr);
	return arr;
}

function size(arr){
	return arr.length;
}	

*/
