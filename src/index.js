
function CoffeeMachine(power, capacity) {
  let waterAmount = 0;

  const WATER_HEAT_CAPACITY = 4200;
  let timerId;


  this.isRunning = function () {
    return !!timerId;
  };

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

  let onReady = function () {
    console.log('Coffee is ready');
  };

  this.setOnReady = function (cb) {
    onReady = cb;
  };

  this.getWaterAmount = function () {
    return waterAmount;
  };

  this.getPower = function () {
    return power;
  };


  this.run = function () {
    timerId = setTimeout(() => { timerId = null; onReady(); }, getBoilTime());
  };

  this.stop = function () {
    clearTimeout(timerId);
  };

  this.addWater = function (amount) {
    this.setWaterAmount(amount + waterAmount);
  };
}

const coffeeMachine = new CoffeeMachine(1000, 500);

coffeeMachine.addWater(200);

console.log(`Before: ${coffeeMachine.isRunning()}`);
coffeeMachine.run();
console.log(`In the process: ${coffeeMachine.isRunning()}`);

coffeeMachine.setOnReady(() => {
  console.log(`After: ${coffeeMachine.isRunning()}`);
});
