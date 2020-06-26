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
		while(paused) await sleep(1); // Awaiting until pause button is reset
		
	}
}

// Bubblesort algorithm.
async function bubbleSort(arr){
	for(var i = 0; i < arr.size(); i++){ // First loop.
		for(var j = 0; j < arr.size() - 1 - i; j++){ // Nested loop from start - size - 1 - i since the last index will always be sorted.
			if(arr[j].value > arr[j+1].value) await arr.barSwap(j, j+1); // If index j > index j+1 swap pushing the highest value to the back.
			if(reload) return; // If user selects reset, the function exits with return.
		}
		await sleep(getSpeed()); // Await sleep.
		arr[arr.size()-i-1].setBarColor("orange"); // Since bubbleSort, pushes the highest value towards the end, the last node is always sorted.
		while(paused) await sleep(1); // Awaiting until pause button is reset
	}
}

// Quicksort algorithm.
async function quickSort(arr, start, end){
	if(start >= end) return; // Recursion end condition.
	while(paused) await sleep(1); // Awaiting until pause button is reset
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
	arr[pivotIndex].setBarColor("#AD3939");
	while(paused) await sleep(1); // Awaiting until pause button is reset.
	for(var i = start; i < end; i++){ // Loop through array.
		if(arr[i].value < pivotValue){ // If arr[i] < pivotValue. 
			arr[pivotIndex].setBarColor("white"); // Set pivot index to white.
			await arr.barSwap(i, pivotIndex); // Swap i and pivotIndex indicies.
			pivotIndex++; // Increase pivot index.
			arr[pivotIndex].setBarColor("#AD3939"); // Set pivot red.
			if(reload) return; // If user selects reset, the function exits with return.
		}
	}
	await arr.barSwap(pivotIndex, end); // When done looping swap end and pivot.
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
		arr[x+start].setBarColor("#313B78"); // Setting blue.
		while(paused) await sleep(1); // Awaiting until pause button is reset
		await sleep(getSpeed()); // Awaiting sleep 2ms.
		arr[x+start].setBarColor("white"); // Setting white.
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
			arr[x+start].setBarColor("#AD3939"); // Setting red.
			while(paused) await sleep(1); // Awaiting until pause button is reset
			await sleep(getSpeed()); // Sleeping for 5ms.
			arr[x+start].setBarColor("white"); // Setting white.
		}
	}
}