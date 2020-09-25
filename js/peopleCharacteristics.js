
function peopleCharacteristics() {

    // person stats
    this.cash = 0; // number
    this.preferences = null; // objct - restaurantTypes - favorite food
    this.isHungry = false; // boolean
    this.isHomeless = false; // boolean
    this.homePreference = ''; //string - home preference

    this.propertyToGo = null; //property

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
        let rand = randomIntFromInterval(0, restaurantTypes.length-1);
        this.preferences = restaurantTypes[rand];
        // switch (rand) {
        //     case 1:
        //         this.preferences = 'italianFood';
        //         break;
        //     case 2:
        //         this.preferences = 'chineseFood';
        //         break;
        //     case 3:
        //         this.preferences = 'indianFood';
        //         break;
        // }
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
      let random = randomIntFromInterval(1, 2);

      if (random % 2 === 0) {
          this.isHomeless = true;
      } else {
          this.isHomeless = false;
      }
    };

    this.decideHomePreference = function(){
      // TODO: If new 'LuxuryResidential' are added, it should be included here too
      let rand = randomIntFromInterval(1, 2);
      switch (rand) {
          case 1:
              this.homePreference = 'apartment';
              break;
          case 2:
              this.homePreference = 'basicDuplex';
              break;
      }
    };

    this.decideNextThingToBuy = function(){
      this.propertyToGo = null;
      if (this.isHomeless) {//Priority over isHungry
        this.selectHomeToBuy();
      }
      if(this.isHungry && this.propertyToGo == null){
        this.selectRestaurantToEat();
      }
     // console.log(this.propertyToGo);
    };

    this.selectHomeToBuy = function(){
      let propertiesToChooseFrom = [];
      for (var i = 0; i < propertyList.length; i++) {
        if (propertyList[i].building === this.homePreference && this.cash >= propertyList[i].salePrice) {
          propertiesToChooseFrom.push(propertyList[i]);
        }
      }
      if (propertiesToChooseFrom.length > 0) {
        let rand = randomIntFromInterval(0, propertiesToChooseFrom.length-1);
        this.propertyToGo = propertiesToChooseFrom[rand];
      }
    };

    this.selectRestaurantToEat = function () {
      let propertiesToChooseFrom = [];
      for (var i = 0; i < propertyList.length; i++) {
        if (propertyList[i].building === 'restaurant' && propertyList[i].restaurantType === this.preferences && this.preferences.foodPrice <= this.cash) {
          propertiesToChooseFrom.push(propertyList[i]);
        }
      }
      if (propertiesToChooseFrom.length > 0) {
        let rand = randomIntFromInterval(0, propertiesToChooseFrom.length-1);
        this.propertyToGo = propertiesToChooseFrom[rand];
      }
    };

    // randomly assign values at init
    this.decideAmountOfCash();
    this.decidePreferences();
    this.decideIsHungry();
    this.decideHome();
    this.decideHomePreference();
    this.decideNextThingToBuy();

}
