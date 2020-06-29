var firstSort = true; // Global for checking if its our first sort.
var speed = .5; // Global variable for speed. (deafult .5 "normal speed").
var paused = false; // Global variable to see if user has paused the webpage.
var reload = false; // Global to opt out current sorting algo for another rather than reload page.
var arr = new ArrayList(false); // Global array used to perform sorting algorithms.

/*
	When user selects a sorting algorithm, we check if the array was already sorted (checking if user forgot to generate a new array while completing the previous sort)
	and regenerate a new one for them. Then we toggle buttons except for passed ID (selected sorting algorithm) off, toggle sorting/sorted text on, toggle the time text,
	begin counting time and then execute a sorting algorithm based on which id was passed (selected sorting algorithm) rather than having a "main" function for each button.
	After the sorting process, we toggle the sorting/sorted text to sorted, await the array setSorted func and then re toggle the buttons all on.
*/
async function main(id){ // Main function which executes for each sorting algorithm using the buttons id to distinguish between which algo to execute.
	if(arr.sorted) createArray();
	toggleButtons(true); // Toggle buttons
	toggleText(true); // Toggle text
	toggleTime(); // Start timer 
	updateTime(); // Update the timer
	// Depending on which algo executes we await until its finished to proceed with the rest of the function calls.
	if(id == "iSort") await insertionSort(arr); 
	else if(id == "bSort") await bubbleSort(arr); 
	else if(id == "qSort") await quickSort(arr, 0, arr.size()-1); 
	else if(id == "mSort") await mergeSort(arr, 0, arr.size()-1);
	else if(id == "csSort") await cocktailSort(arr); 
	else if(id == "sSort") await selectionSort(arr); 
	else if(id == "coSort") await countingSort(arr); 
	else if(id == "rSort") await radixSort(arr); 
	toggleText(false); // Retoggle text
	await arr.setSorted(); // Await displaying the array is sorted
	toggleButtons(false); // Retoggle buttons
	if(reload){ // If user selected reset 
		document.getElementById("sorted").style.display = "none"; // Hide text
		createArray(); // Regenerate an array
		resetReload(); // Reset reload bool.
	}
	//console.log(arr);
}

function createArray(){ // Function to create an array.
	slider = getSliderValue(); // Getter for the value of the slider.
	arr.generateArrayList(slider); // Generate array with size slider.
	arr.randomize(); // Randomize the array.
	arr.sorted = false; // Set array.sorted false.
	document.getElementById("gen").checked = false;
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
		return; // If it is not our first time we set the last algos time to our last text and start counting again.
	}
	current.style.display = "block" // If its our first sort we display our current time text and start counting.
	firstSort = false;
}

async function updateTime(){ // Function to show clock functionality.
	var min = document.getElementById("min"); // Text element which will count time elapsed.
	var sec = document.getElementById("sec"); // Text element which will count time elapsed.
	var ms = document.getElementById("msec"); // Text element which will count time elapsed.
	var chour = document.getElementById("chr"); // Actual clock hand (div element). 
	var cmin = document.getElementById("cmin"); // Actual clock hand (div element).
	var csec = document.getElementById("csec"); // Actual clock hand (div element). 

	const deg = 6;
	var seconds = 0; // Variable to store how many seconds have elapsed.
	var minutes = 0; // Variable to store how many minuts have elapsed.

	var now = Date.now(); // Variable to get the time of function call.
	while(!arr.sorted){ // Loop until array is sorted.
		var time = Date.now() - now // Get the time of loop initiation minus when we started the function call.
		var mseconds = Math.floor(time * 0.1); // Getting how many miliseconds have elapsed.
		ms.innerHTML = mseconds; // Changing text elements text to how many milliseconds have passed (just last two digits).
		if(mseconds > 100){ // Only counting the last 2 digits, if greater than 100 we reset back to zero to only show the last two digits.
			mseconds = 0; // Reset milliseconds to 0
			now = Date.now(); // Get new time elapsed.
			seconds++; // Increment seconds
			if(seconds == 60) seconds = 0, minutes++; // If a minute has elapsed reset seconds to 0 and increment minutes.
		}
		if(seconds < 10) sec.innerHTML = 0+""+seconds; // Adding a 0 placeholder to represent 05 milliseconds rather than just a 5. 
		else sec.innerHTML = seconds; // If its not less than 2 digits we just represent the actual number without adding a 0 placeholder.
		if(minutes < 10) min.innerHTML = 0+""+minutes; // Adding a 0 placeholder to represent 05 milliseconds rather than just a 5.
		else min.innerHTML = minutes; // If its not less than 2 digits we just represent the actual number without adding a 0 placeholder.

		var hours = 60 % minutes; // Possibly never reach an hour of sorting but included just for functionality.

		chour.style.transform = `rotateZ(${hours}deg)`; // Rotating actual div element to rotate the hand by deg * time elapsed respectively. 
		cmin.style.transform = `rotateZ(${minutes * deg}deg)`; // Rotating actual div element to rotate the hand by deg * time elapsed respectively.
		csec.style.transform = `rotateZ(${seconds * deg}deg)`; // Rotating actual div element to rotate the hand by deg * time elapsed respectively.

		while(paused) await sleep(1); // If paused await until unpaused.
		if(reload) return;
		await sleep(10);
	}
}

function toggleButtons(bool){ // Function to toggle off buttons while sorting.
	document.getElementById("stop").disabled = !bool;
	document.getElementById("slider").disabled = bool;
	let btns = document.getElementsByClassName("sortBtn");
	for(let i = 0; i < btns.length; i++){
		if(!bool && btns[i].checked == true) btns[i].checked = false;
		btns[i].disabled = bool;
	}
	 
}

function toggleSpeed(className, id){ // Function to allow one checked button at a time and change the speed respectively
	if(!document.getElementById(id).checked) document.getElementById(id).checked = true; // If selected same button "recheck" the same button.
	else{ // Or loop through and uncheck the other buttons and set speed to which button's id was clicked and passed.
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

function stop(){ // Function to set paused global var true/false when clicked.
	if(paused){
		// If paused is initially true then unpause the program and toggle the generate new array button to false.
		paused = false; 
		document.getElementById("stopLabel").innerHTML = "Stop";
		document.getElementById("reset").disabled = true;
	}else{
		// If paused is initially false then pause the program and toggle the generate new array button to true.
 		paused = true;
 		document.getElementById("stopLabel").innerHTML = "Resume";
 		document.getElementById("reset").disabled = false;

 	}
}

function resetArray(){ // Function to trigger exiting functions to get a new array.
	reload = true;
	paused = false; 
	document.getElementById("stopLabel").innerHTML = "Stop";
}

function resetReload(){ // Helper to reset "Reset" button to initally disabled.
	reload = false;
	document.getElementById("reset").disabled = true;
	document.getElementById("reset").checked = false;
	document.getElementById("stop").checked = false;

}