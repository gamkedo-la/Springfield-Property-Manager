function peopleCharacteristics() {

    // person stats
    this.cash = 0; // number
    this.preferences = ''; // string - favorite food
    this.isHungry = false; // boolean
    this.home = null; // unimplemented

    this.decideAmountOfCash = function () {
        let rand = randomIntFromInterval(1, 3);
        switch (rand) {
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
    };

    this.decidePreferences = function () {
        let rand = randomIntFromInterval(1, 3);
        switch (rand) {
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
    };

    this.decideIsHungry = function () {
        let random = randomIntFromInterval(1, 2);

        if (random % 2 === 0) {
            this.isHungry = true;
        } else {
            this.isHungry = false;
        }
    };

    this.decideHome = function () {
        // TODO: find a way to choose a home
    };

    // randomly assign values at init
    this.decideAmountOfCash();
    this.decidePreferences();
    this.decideIsHungry();
    this.decideHome();

}