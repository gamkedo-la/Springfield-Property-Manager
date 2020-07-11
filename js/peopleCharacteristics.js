// Main factor to decide the type of person = cash
const POOR = 1;
const MIDDLE_CLASS = 2;
const RICH = 3;

function peopleCharacteristics() {
	// List of variables 
	this.cash;
	this.home;
	this.isHungry;
	// restaurants - type of food
	this.preferences;

	// Randomly decide the type of person and return an object with the main characteristics of a person
	this.decideTypeOfPerson = function() {
		const type = randomIntFromInterval(1,3);

		this.amountOfCash(type);
		this.decidePreferences(type);
		this.decideIsHungry();
		this.decideHome();

		return {
			cash: this.cash,
			preferences: this.preferences,
			isHungry: this.isHungry,
			home: this.home,
		};
	}

	this.amountOfCash = function(typeOfPerson) {
		switch(typeOfPerson) {
			case 1:
				this.cash = 1000;
				break;
			case 2:
				this.cash = 5000;
				break;
			case 3:
				this.cash = 10000;
				break;
		}
	}

	this.decidePreferences = function(typeOfPerson) {
		switch(typeOfPerson) {
			case 1:
				this.preferences = 'italianFood';
				break;
			case 2:
				this.preferences = 'chineseFood';
				break;
			case 3:
				this.preferences = 'indianFood';
				break;
		}
	}

	this.decideIsHungry = function() {
		let random = randomIntFromInterval(1, 2);
		
		if(random % 2 === 0) {
			this.isHungry = true;
		} else {
			this.isHungry = false;
		}
	}

	this.decideHome = function() {
		// TODO: find a way to choose a home
	}
}