var firstSort = false;
var intervalID = 0;
var speed = 1;
var offset;

async function main(id){
	toggleButtons(id)
	toggleText(true);
	toggleTime();
	updateTime();
	if(id == "iSort") await insertionSort(arr);
	else if(id == "bSort") await bubbleSort(arr);
	else if(id == "qSort") await quickSort(arr, 0, arr.size()-1);
	else if(id == "mSort") await mergeSort(arr);
	clearInterval(intervalID);
	toggleText(false);
	resetButtons(id);
	arr.setSorted();
}

/*
	Method which handles the input by the slider on screen. Whenever the slider value gets changed we call the fucntion below which calls to generate a new array
	along with randomizing it which will dynamically change instantly based on where the user lets go of the slider.
*/
function createArray(){ 
	slider = getSliderValue();
	arr.generateArrayList(slider);
	arr.randomize();
}

function getSliderValue(){
	return document.getElementById("slider").value;
}

function toggleText(bool){
	const sorting = document.getElementById("sorting");
	const sorted = document.getElementById("sorted");
	if(bool){ 
		sorting.style.display = "block";
		sorted.style.display = "none";
	}else{
		sorting.style.display = "none";
		sorted.style.display = "block";
	}
}

function toggleTime(){
	const current = document.getElementById("current");
	if(firstSort){
		const last = document.getElementById("last");
		last.style.display = "block";
		last.innerHTML = current.innerHTML;
		return;
	}
	current.style.display = "block"
	firstSort = true;
}

function updateTime(){
	var start = Date.now();
	const min = document.getElementById("min");
	const sec = document.getElementById("sec");
	const ms = document.getElementById("msec");
	const chour = document.getElementById("chr");
	const cmin = document.getElementById("cmin");
	const csec = document.getElementById("csec");

	const deg = 6;
	var seconds = 0;
	var minutes = 0;

	intervalID = setInterval(function(){
		var date = Date.now() - start
		var mseconds = Math.floor(date * 0.1);
		ms.innerHTML = mseconds;
		if(mseconds > 100){
			mseconds = 0; 
			start = Date.now();
			seconds++;
			if(seconds == 60) seconds = 0, minutes++;
		}
		if(seconds < 10) sec.innerHTML = 0+""+seconds;
		else sec.innerHTML = seconds;
		if(minutes < 10) min.innerHTML = 0+""+minutes;
		else min.innerHTML = minutes;

		var hours = 60 % minutes;

		chour.style.transform = `rotateZ(${hours}deg)`;
		cmin.style.transform = `rotateZ(${minutes * deg}deg)`;
		csec.style.transform = `rotateZ(${seconds * deg}deg)`;

	}, 10);
}

function toggleButtons(id){
	let buttons = document.getElementsByClassName("button");
	for(var i = buttons.length-1; i >= 0; i--){
		if(buttons[i].id == id) buttons[i].style.color = "orange";
		else{
			if(buttons[i].id == "stop") continue;
			buttons[i].disabled = true;
			buttons[i].style.color = "gray";
			buttons[i].className = "buttonDisabled";
		}
	}
}

function resetButtons(id){
	let buttons = document.getElementsByClassName("buttonDisabled");
	const current = document.getElementById(id);
	current.style.color = "white";
	for(var i = buttons.length-1; i >= 0; i--){
		buttons[i].disabled = false;
		buttons[i].style.color = "white";
		buttons[i].className = "button";
	}
}

// Helper to set flags to see which speed button the user has selected.
function toggleSpeed(className, id){
	let buttons = document.getElementsByClassName(className);
	for(var i = 0; i<buttons.length; i++){
		if(buttons[i].id == id) speed = buttons[i].value;
		else buttons[i].checked = false;
	}
}

// Function to set a "speed" that each sorting algorithm will await a set number multipled by the var speed.
function getSpeed(){
	return speed;
}

function setOffset(x){
	offset = (x*arr.size()*0.001);
}

function getOffset(){
	return offset;
}

async function m(){
	arr = await mergeSort(arr);
	console.log(arr);
}