class ArrayList extends Array{ // Creating an ArrayList object to contain Array's methods and also add other methods purposeful to the app.
	
	constructor(sorted){ // Super constructor
		super(); 
		this.sorted = sorted;
	}

	deleteList(size){ // Method which drops the original array using Array class's splic method.
		this.splice(0, this.size())
	}

	size(){ // Method to return the length of the ArrayList.
		return this.length;
	}	 

	isEmpty(){ // Method to return if the ArrayList is empty.
		return this.size() == 0; 
	}

	/*
		Method called at onload to generate an array with a deafult of 300 nodes as well as 300 bars with the createBars function. We also use this function whenever the slider is changed as to generate an array
		dynamically whenever the user decrements/increments the slider bar. Since the array is already created along with the divs (bars) representing the array we check if the ArrayList is not empty and then we delete
		the list and create a new container div to store the bar divs when we create new bars and populate the ArrayList once again.	
	*/	
	generateArrayList(size){
		var flex = document.getElementById("arrayContainer");
		if(!this.isEmpty()){
			this.deleteList(this.size());
			flex = createArrayContainer();
		}
		for(var i = 0; i < size; i++){
			var bar = createBars(flex, i, size);	
			arr[i] = new Node(i+1, bar);
		}
	}

	randomize(bool){ // Method which randomizes the array, using the swap function below.
		for(var i = 0; i < this.size(); i++){
			var j = Math.floor(Math.random() * i);
				this.swap(i, j);
		}
	}
	/*
		Helper method to swap values of nodes rather than actual nodes to keep referrencial integrity to the corresponding div.box so we can update the div.box's respecitve to the value simultaenously,
		without the need to loop through div ids and setting the height like that or possibly creating a second array for divs entirely.
	*/
	swap(i, j){
		[this[i].value, this[j].value] = [this[j].value, this[i].value]; // Swap method swapping node's values.
		this[i].setBarHeight(); // Changing div's height.
		this[j].setBarHeight();
	}

	async barSwap(i, j, offset){ // Method to simulate checking between two values by updating their colors and then reverting back to white after swapping them.
		this[i].setBarColor("#314799"); // Changing bar color to blue.
		this[j].setBarColor("#314799");
		this.swap(i, j); // Actual swap
		while(paused) await sleep(1); // Awaiting sleep until user unpauses
		await sleep(getSpeed()); // Awaiting sleep
		this[i].setBarColor("white"); // Changing bar color to white
		this[j].setBarColor("white");
	}

	async setSorted(){ // Method to change the colors of the bars to represent sorted
		this.sorted = true;
		for(var i = 0; i < this.size(); i++){
			await sleep(1)
			this[i].setBarColor("orange");
			while(paused) await sleep(1);
			if(reload) return; // If user selects reset during coloring the sorted array return prematurely.
		}
	}

	async setPivot(index, color){ // Helper method to set a pivot of desired color, await and then reset to white.
		this[index].setBarColor(color);
		await sleep(getSpeed());
		while(paused) await sleep(getSpeed());
		this[index].setBarColor("white");
	}
}