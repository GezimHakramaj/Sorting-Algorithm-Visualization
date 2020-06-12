// Insertionsort algorithm
async function insertionSort(arr){
	for(var i = 1; i < arr.size(); i++){
		var j = i-1;
		var temp = arr[i].value;
		while(j >= 0 && arr[j].value > temp){
			arr[j+1].setBarColor("blue");
			arr[j].setBarColor("blue");
			await sleep(15);
			arr.swap(j+1, j);
			arr[j+1].setBarColor("white");
			arr[j].setBarColor("white");
			j--;
		}
		arr[j+1].value = temp;
	}

	for(var i = arr.size()-1; i >= 0; i--){
		await sleep(25);
		arr[i].setBarColor("orange");
	}
}

// Bubblesort algorithm.
async function bubbleSort(arr){
	for(var i = 0; i < arr.size(); i++){
		for(var j = 0; j < arr.size() - 1 - i; j++){
			if(arr[j].value > arr[j+1].value){
				arr[j+1].setBarColor("blue");
				arr[j].setBarColor("blue");
				await sleep(5);
				arr.swap(j, j+1);
				arr[j+1].setBarColor("white");
				arr[j].setBarColor("white");
			}
		}
		await sleep(20);
		arr[arr.size()-i-1].setBarColor("orange"); // Since bubbleSort, pushes the highest value towards the end, it is always sorted.
	}
}

async function quickSort(arr, start, end){

	if(start >= end) return;

	var index = partition(arr, start, end);

	await sleep(75);
	quickSort(arr, start, index-1);
	await sleep(75);
	quickSort(arr, index+1, end);

}

function partition(arr, start, end){

	var pivotIndex = start;
	var pivotValue = arr[end].value;
	for(var i = start; i < end; i++){
		if(arr[i].value < pivotValue){
			arr[i].setBarColor("blue");
			arr[pivotIndex].setBarColor("blue");
			arr.swap(i, pivotIndex);
			arr[i].setBarColor("white");
			arr[pivotIndex].setBarColor("white");
			pivotIndex++;
		}
	}
	arr[pivotIndex].setBarColor("blue");
	arr[end].setBarColor("blue");
	arr.swap(pivotIndex, end);
	arr[pivotIndex].setBarColor("white");
	arr[end].setBarColor("white");
	return pivotIndex;
}

async function mergeSort(){

}

function merge(){

}

// Helper method to "sleep" for however many miliseconds to allow visualization of sorting rather than
// an instanteous sort.
function sleep(milsec){
	return new Promise(resolve => setTimeout(resolve, milsec));
}