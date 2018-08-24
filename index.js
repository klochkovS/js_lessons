
function CoffeeMachine(power) {
  this.waterAmount = 0;

  const WATER_HEAT_CAPACITY = 4200;
  let timerId;

  const getBoilTime = function () {
    return this.waterAmount + WATER_HEAT_CAPACITY * 80 / power;
  }.bind(this);

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

const coffeeMachine = new CoffeeMachine(100);
coffeeMachine.waterAmount = 200;

coffeeMachine.run();
coffeeMachine.stop();
