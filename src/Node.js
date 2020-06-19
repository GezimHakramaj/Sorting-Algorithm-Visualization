class Node{ // Node object will store a value, a reference to the div element, and a sorted value which will be used to change the bar's color.

	constructor(value, bar){ // Each node will have a value and a reference to the bar it will be representing.
		this.value = value;	 // While sorting we wont be swapping nodes rather than the values and updating the heights respectively.
		this.bar = bar;
	}

	/*
		When we randomize the array, we will be swapping values to simulate a randomization but not nodes as to retain our referencial div element so we may update the height as below.
		Since the size of the array will be changing we set the height of the bar to the value of this node divided by the size of the array * 0.01 and then add the percentage sign to 
		remain syntatically correct. 
		Ex: Size = 500
		this.value = 500
		500/500*0.01 will be 100% which will be the last bar in the visualization being 100% height since it is the largest element. This scales for every size.
	*/
	setBarHeight(){
		this.bar.style.height = ((this.value)/(arr.size()*0.01))+"%";
	}

	/* 
		This method changes nodes i and j's color to blue meaning they are being compared and then we will call setSorted to check if the 
		node is sorted. Changing it's color back to white for not sorted or orange for sorted.
    */
	setBarColor(color){
		this.bar.style.backgroundColor = color;
	}
}
