
// Helper method to "sleep" for however many miliseconds to allow visualization of sorting rather than
// an instanteous sort.
function sleep(ms){
	console.log(getSpeed()*10);
	return new Promise(resolve => setTimeout(resolve, ms*getSpeed()*5));
}

// Insertionsort algorithm
async function insertionSort(arr){
	for(var i = 1; i < arr.size(); i++){
		var j = i-1;
		var temp = arr[i].value;
		while(j >= 0 && arr[j].value > temp){
			await arr.barSwap(j+1, j);
			j--;
		}
		arr[j+1].value = temp;
	}
}

// Bubblesort algorithm.
async function bubbleSort(arr){
	for(var i = 0; i < arr.size(); i++){
		for(var j = 0; j < arr.size() - 1 - i; j++){
			if(arr[j].value > arr[j+1].value) await arr.barSwap(j, j+1, offset);
		}
		await sleep();
		arr[arr.size()-i-1].setBarColor("orange"); // Since bubbleSort, pushes the highest value towards the end, it is always sorted.
	}
}

async function quickSort(arr, start, end){
	if(start >= end) return;
	var index = await partition(arr, start, end);
	arr[index].setBarColor("white");

	await Promise.all([
		quickSort(arr, start, index-1, ),
		quickSort(arr, index+1, end, )
	])
}

async function partition(arr, start, end){
	var pivotIndex = start;
	var pivotValue = arr[end].value;
	arr[pivotIndex].setBarColor("red");
	for(var i = start; i < end; i++){
		if(arr[i].value < pivotValue){
			await sleep(1);
			arr[pivotIndex].setBarColor("white");
			await arr.barSwap(i, pivotIndex);
			pivotIndex++;
			arr[pivotIndex].setBarColor("red");
		}
	}
	await arr.barSwap(pivotIndex, end);
	return pivotIndex
}


async function mergeSort(arr){
	if(arr.size() < 2) return arr;

	let mid = Math.floor(arr.size()/2);
	let left = await mergeSort(arr.slice(0, mid));
	let right = await mergeSort(arr.slice(mid));

	return merge(left, right);
}

async function merge(left, right){

	let temp = new ArrayList();
	while(left.size() && right.size()){
		if(left[0].value < right[0].value){
			temp.push(left.shift());
		}else{
			temp.push(right.shift());
		}
	}
	temp.concat(left.size()? left : right)



	return temp;
}