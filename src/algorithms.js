function sleep(ms){ // Sleep function to allow awaiting during asynchronous tasks which resovles after inputted paramter.
	return new Promise(resolve => setTimeout(resolve, ms));
}

// Insertionsort algorithm.
async function insertionSort(arr){
	for(var i = 1; i < arr.size(); i++){ // Looping through the array starting at one
		var j = i-1; // Index variable to check previous node's value, if it is < or > to do a swap if necessary.
		var temp = arr[i].value; // Store the original value of index i in temp.
		while(j >= 0 && arr[j].value > temp){ // While j is not less than zero & index j is greater than temp (index i) check if we need to do a swap.
			await arr.barSwap(j+1, j); // Await barSwap function which sets the height & colors as well as swapping.
			j--; // Decrement variables
			if(reload) return; // If user selects reset, the function exits with return.
		}
		arr[j+1].value = temp; // Set index j+1 to temp
	}
}

// Bubblesort algorithm.
async function bubbleSort(arr){
	var i = 0;
	while(i < arr.size()){
		for(var j = 0; j < arr.size() - 1 - i; j++){ // Nested loop from start - size - 1 - i since the last index will always be sorted.
			if(arr[j].value > arr[j+1].value) await arr.barSwap(j, j+1); // If index j > index j+1 swap pushing the highest value to the back.
			if(reload) return; // If user selects reset, the function exits with return.
		}
		i++;
	}
}

// Quicksort algorithm.
async function quickSort(arr, start, end){
	if(start >= end) return; // Recursion end condition.
	var index = await partition(arr, start, end); // Index value returned from partition.
	if(reload) return; // If user selects reset, the function exits with return.
	arr[index].setBarColor("white"); // Setting white.
	// Awaiting both calls to quickSort simultaneously.
	await Promise.all([ 
		quickSort(arr, start, index-1),
		quickSort(arr, index+1, end)
	])
}

async function partition(arr, start, end){
	var pivotIndex = start; // Set pivot index to start.
	var pivotValue = arr[end].value; // Set pivot value of arr[end].
	while(paused) await sleep(1); // Awaiting until pause button is reset.
	for(var i = start; i < end; i++){ // Loop through array.
		if(arr[i].value < pivotValue){ // If arr[i] < pivotValue.
			await arr.setPivot(pivotIndex, "#AD3939");
			arr.barSwap(i, pivotIndex); // Swap i and pivotIndex indicies.
			pivotIndex++; // Increase pivot index.
			if(reload) return; // If user selects reset, the function exits with return.
		}
	}
	arr.barSwap(pivotIndex, end); // When done looping swap end and pivot.
	return pivotIndex // Return pivot index.
}

// Mergesort algorthim.
async function mergeSort(array, start, end){
	if(reload) return; // If user selects reset, the function exits with return.
	// Recursion end condition.
	if(start < end){
		while(paused) await sleep(1); // Awaiting until pause button is reset
		// Mid variable for the start and end's for each recursive split to keep track of where the global variable index is.
		let mid = Math.floor((start+end)/2);
		// Awaiting both recursive calls to mergeSort to simulate sorting the left & right halves simultaneously.
		await Promise.all([
			mergeSort(array, start, mid),
			mergeSort(array, mid+1, end),
		])
		// Awaiting merge to correctly merge both halves before moving on.
		await merge(array, start, mid, end);
	}
}

async function merge(array, start, mid, end){
	// Using a temp array to store the values of the nodes to retain the reference to the div they represent.
	var temp = [];
	// Index reference variables.
	var i = start;
	var j = mid+1;
	var k = 0;

	// Looping through the range adding the smaller value of the two indicies, and when they come to the end of one half
	// we concatenate the rest of the other half.
	while(i <= mid || j <= end){ // While both indexes are withing range start <= mid & mid+1 <= end.
		if(!(i <= mid)) temp[k++] = array[j++].value; // If i(start) reached the middle than we concatenate the rest of mid-end half.
		else if (!(j <= end)) temp[k++] = array[i++].value; // If j(mid+1) reached the end then we concatenate the rest of start-mid half.
		else{ // Otherwise we are still looping through both halves and inserting the lower of the two into the array.
			if(array[i].value < array[j].value) temp[k++] = array[i++].value;
			else temp[k++] = array[j++].value;
		} 
	}
	// for-loop to simulate a blue pivot looping through the half (start -> end).
	for(let x = 0; x < temp.length; x++){
		if(reload) return; // If user selects reset, the function exits with return.
		await arr.setPivot(x+start, "#313B78");
	}
	/*
	   for-loop to set the heights of the global array's values to match the values of the temp array since we arent swapping in mergeSort. This 
	   sorts the original array in the same way we do in swap by values rather than nodes. We mark the values being changed with a red color.
	*/
	for(let x = 0; x < temp.length; x++){
		if(reload) return; // If user selects reset, the function exits with return.
		if(arr[x+start].value != temp[x]){
			arr[x+start].value = temp[x] // Changing value to the temps array, using the start parameter to ensure the correct index in the global array.
			arr[x+start].setBarHeight(); // Setting the bar height.
			await arr.setPivot(x+start, "#AD3939");
		}
	}
}

// Cocktail-Shaker Sort
async function cocktailSort(arr){
	let swap = true; // Bool flag.

	while(swap){ // While swap
		for(let i = 0; i < arr.size()-1; i++){ // Loop through array like bubble sort.
			if(arr[i].value > arr[i+1].value){ // If index i > index i+1 swap pushing the highest value to the back.
				await arr.barSwap(i, i+1); // Await swap.
				if(reload) return; // If user selects reset, the function exits with return.
				swap = true; // If a swap occur swap = true.
			}
		}
	
		if(!swap) break; // If no swaps occur then our array is swap and we break.
		swap = false; // Otherwise swap = false in case the next loop doesnt need to swap we then will break here next iteration

		for(let j = arr.size()-1; j > 0; j--){ // Second loop to go backwards pushing the smallest value to the front.
			if(arr[j-1].value > arr[j].value){  // If j-1 > j swap.
				await arr.barSwap(j-1, j); // If index j > index j+1 swap pushing the highest value to the back.
				if(reload) return; // If user selects reset, the function exits with return.
				swap = true; // swap = true to show we made a swap.
			}
		}
	}
}

// Selection Sort
async function selectionSort(arr){
	for(var i = 0; i < arr.size()-1; i++){ // Initial loop.
		if(reload) return; // If user selects reset during coloring the sorted array return prematurely.
		var min = i; // Setting min value to i.
		for(var j = 1 + i; j < arr.size(); j++){ // Looping through array for min value.
				if(arr[j].value < arr[min].value) min = j; // Swapping min value.
				arr.setPivot(min, "#00ba32"); // Highlighting min value.
				if(reload) return; // If user selects reset during coloring the sorted array return prematurely.
			}
		await arr.setPivot(i, "#AD3939"); // Highlighting where we are in the array at the moment.
		await arr.barSwap(i, min); // Awaiting the swapping of bars.
	}
}

// Counting Sort
async function countingSort(arr){
	var temp = []; // Initalize temp array.
	var j = 0; // Counter variable.

	for(let i = 1; i <= arr.size(); i++) temp[i] = 0; // Initializing temp array to store 0 for arr.size().

	for(let i = 0; i < arr.size(); i++) temp[arr[i].value] +=1; // Counting how many times we see a specific value and incrementing temp index of that value by 1. (essentially counting how many times ex: 4 appears in the original array).

	/*
		This third forloop goes over the temp array which stores how many times weve counted i in the original array, if temp[i] > 0 then arr[j]=i. We then increment j and decrement the count
		of temp[i]. If temp[i] is still > 0 that means we have multiple values of i in our original array and then put them next to eachother in the sorted array.
	*/
	for(let i = 0; i <= arr.size(); i++){
		while(temp[i] > 0){
			if(reload) return; // If user selects reset during coloring the sorted array return prematurely.
			await arr.setPivot(j, "#AD3939"); // Awaiting setting a pivot to "count" the array
			arr[j++].value = i; // Changing values to sorted order.
			temp[i]--; // Decrementing the counter
		}
	}

	for(let i = 0; i < arr.size(); i++){
		if(reload) return; // If user selects reset during coloring the sorted array return prematurely.
		await sleep(getSpeed()); // Await sleep.
		await arr.setPivot(i, "#00ba32"); // Highlighting min value.
		arr[i].setBarHeight(); // Final for loop which will update the bars heights respectively.
	} 
}

// Radix Sort
async function radixSort(arr){
	var max = getDigits(arr.size()); // Variable for the num of digits our max number has.
	var place = 1; // Variable for which digit we are at.

	while(place <= max){
		let index = 0; // Variable to keep track of where we are in our original array despite how many bucket arrays we loop through
		let buckets = Array.from({length:10}, ()=> []); // Create a variable buckets with 10 arrays to store values we will compare by their digits.
		for(let i = 0; i < arr.size(); i++){ 
			buckets[arr[i].getNumAtDigit(place)].push(arr[i].value) // Calling a helper function in node.js that gets the digit represented by place and returns it.
			await arr.setPivot(i, "#AD3939"); // Setting each bar to red to display iterating through the array.
			if(reload) return; // If user selects reset during coloring the sorted array return prematurely.
		}
		for(let j = 0; j < buckets.length; j++){ // Loop for each bucket array.
			let counter = 0; // Counter variable to keep place in each bucket array.
			while(counter < buckets[j].length) arr[index++].value = buckets[j][counter++]; // Looping through the buckets setting the values in our original array with index variable declared above in while loop.
			if(reload) return; // If user selects reset during coloring the sorted array return prematurely.
		}
		for(let k = 0; k < arr.size(); k++){ // Loop to show where we are in the array and change the bar's heights.
			await arr.setPivot(k, "#00ba32"); // Awaiting setting pivot value.
			arr[k].setBarHeight(); // Setting the bars heights.
			if(reload) return; // If user selects reset during coloring the sorted array return prematurely.
		}
		place++; // Incrementing place.
	}
}

function getDigits(num){ // Helper for radixSort to find the digits of the max in array.
	let i = 0;
	while(num >= 1){
		num *= 0.1;
		i++;
	}
	return i;
}

