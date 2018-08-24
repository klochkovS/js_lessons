
function CoffeeMachine(power, capacity) {
  let waterAmount = 0;

  const WATER_HEAT_CAPACITY = 4200;
  let timerId;

  function getBoilTime() {
    return waterAmount + WATER_HEAT_CAPACITY * 80 / power;
  }

  this.setWaterAmount = function (amount) {
    if (amount < 0) {
      throw new Error('Value must be positive');
    }

    if (amount > capacity) {
      throw new Error(`Forbidden pour the water, more than ${capacity}`);
    }

    waterAmount = amount;
  };

  this.getWaterAmount = function () {
    return waterAmount;
  };


  function onReady() {
    console.log('Coffee is ready');
  }

  this.run = function () {
    timerId = setTimeout(onReady, getBoilTime());
  };

  this.stop = function () {
    clearTimeout(timerId);
  };
}

const coffeeMachine = new CoffeeMachine(1000, 500);
coffeeMachine.setWaterAmount(450);
console.log(coffeeMachine.getWaterAmount());
