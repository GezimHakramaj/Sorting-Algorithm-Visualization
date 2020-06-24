var firstSort = true; // Global for checking if its our first sort.
var speed = .5; // Global variable for speed.
var paused = false; // Global variable to see if user has paused to webpage.
var arr = new ArrayList(false); // Global array used to perform sorting algorithms.

async function main(id){ // Main function which executes for each sorting algorithm using the buttons id to distinguish between which algo to execute.
	if(arr.sorted) createArray();
	toggleButtons(id)
	toggleText(true);
	toggleTime();
	updateTime();
	// Depending on which algo executes we await until its finished to proceed with the rest of the function calls.
	if(id == "iSort") await insertionSort(arr);
	else if(id == "bSort") await bubbleSort(arr);
	else if(id == "qSort") await quickSort(arr, 0, arr.size()-1);
	else if(id == "mSort") await mergeSort(arr, 0, arr.size()-1);
	toggleText(false);
	await arr.setSorted();
	resetButtons(id);
}

function createArray(){ // Function to create an array.
	slider = getSliderValue(); // Getter for the value of the slider.
	arr.generateArrayList(slider); // Generate array with size slider.
	arr.randomize(); // Randomize the array.
	arr.sorted = false; // Set array.sorted false.
}

function getSliderValue(){ // Getter for slider value.
	return document.getElementById("slider").value;
}

function toggleText(bool){ // Toggle between sorting and sorted text.
	const sorting = document.getElementById("sorting");
	const sorted = document.getElementById("sorted");
	if(bool){ // Display sorting (after algo sorted).
		sorting.style.display = "block";
		sorted.style.display = "none";
	}else{ // Display sorted (after algo sorted).
		sorting.style.display = "none";
		sorted.style.display = "block";
	}
}

function toggleTime(){ // Display the text for counting the time it takes to sort the array.
	const current = document.getElementById("current");
	if(!firstSort){ // Global variable to count if its the first sort of window load.
		const last = document.getElementById("last");
		last.style.display = "block"; // If its not our first time set last time text display to block.
		last.innerHTML = current.innerHTML;
		return; // If it is not our first time we set the last algos time to our last text and start counting again
	}
	current.style.display = "block" // If its our first sort we display our current time text and start counting.
	firstSort = false;
}

async function updateTime(){
	var now = Date.now();
	var min = document.getElementById("min");
	var sec = document.getElementById("sec");
	var ms = document.getElementById("msec");
	var chour = document.getElementById("chr");
	var cmin = document.getElementById("cmin");
	var csec = document.getElementById("csec");

	const deg = 6;
	var seconds = 0;
	var minutes = 0;

	while(!arr.sorted){ 
		var time = Date.now() - now
		var mseconds = Math.floor(time * 0.1);
		ms.innerHTML = mseconds;
		if(mseconds > 100){
			mseconds = 0; 
			now = Date.now();
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

		while(paused) await sleep(1);
		await sleep(10);
	}
}

function toggleButtons(id){ // Function to toggle off buttons while sorting.
	let buttons = document.getElementsByClassName("button");
	let slider = document.getElementById("slider");
	let text = document.getElementById("sliderText");
	for(var i = buttons.length-1; i >= 0; i--){
		if(buttons[i].id == id) buttons[i].style.color = "orange";
		else{
			if(buttons[i].id == "stop") continue;
			toggle(true, buttons[i]);
		}
	}
	// Toggle slider off
	slider.disabled = true;
	slider.className = "sliderDisabled"
	text.style.color = "gray";
}

function resetButtons(id){ // Function to toggle on all buttons after sort.
	let buttons = document.getElementsByClassName("buttonDisabled");
	let slider = document.getElementById("slider");
	let text = document.getElementById("sliderText");
	const current = document.getElementById(id);
	current.style.color = "white";
	for(var i = buttons.length-1; i >= 0; i--){
		toggle(false, buttons[i]);
	}
	// Toggle slider on
	slider.disabled = false;
	slider.className = "slider"
	text.style.color = "orange";
}

function toggle(bool, btn){ // Helper function to toggle on/off a button.
	if(bool){
		btn.disabled = true;
		btn.style.color = "gray";
		btn.className = "buttonDisabled"
	}else{
		btn.disabled = false;
		btn.style.color = "white";
		btn.className = "button"
	}
}

function toggleSpeed(className, id){ // Function to allow one checked button at a time and change the speed respectively
	if(!document.getElementById(id).checked) document.getElementById(id).checked = true;
	else{
		let buttons = document.getElementsByClassName(className);
		for(let i = 0; i < buttons.length; i++){
			if(buttons[i].id == id) speed = buttons[i].value;
			else buttons[i].checked = false;
		}
	}
}

function getSpeed(){ // Getter for gloabl var speed
	return speed;
}

function stop(id){ // Function to set paused global var true/false when clicked.
	let genButton = document.getElementById("genButton"); // When paused user will have a chance to opt-out the current sorting algo and reset with a new one.
	if(paused){
		// If paused is initially true then unpause the program and toggle the generate new array button to false.
		paused = false, 
		document.getElementById(id).innerHTML = "Stop",
		toggle(true, genButton);
	}else{
		// If paused is initially false then pause the program and toggle the generate new array button to true.
 		paused = true
 		document.getElementById(id).innerHTML = "Resume"
 		toggle(false, genButton);
 	}
}