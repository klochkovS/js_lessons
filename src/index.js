
function Machine(power) {
  this._power = power;
  this._enabled = false;

  this.enable = function () {
    this._enabled = true;
  };

  this.disable = function () {
    this._enabled = false;
  };
}

function Fridge(power) {
  Machine.call(this, power);

  const food = [];

  this.addFood = function (...args) {
    if (!this._enabled) {
      throw new Error('Error, the fridge is off');
    }

    if ((this._power / 100) < (food.length + args.length)) {
      throw new Error('Error, the fridge is full');
    }

    food.push(...args);
  };

  this.getFood = function () {
    return food.slice();
  };

  this.filterFood = function (cb) {
    return food.filter(cb);
  };

  this.removeFood = function (item) {
    const id = food.indexOf(item);
    if (id !== -1) food.splice(id, 1);
  }
}

function CoffeeMachine(power, capacity) {
  Machine.call(this, power);

  const WATER_HEAT_CAPACITY = 4200;

  const parentDisable = this.disable;
  let waterAmount = 0;
  let timerId;

  this.disable = function () {
    parentDisable.call(this);
    this.stop();
  };

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
    if (!this._enabled) {
      throw new Error('Error, coffee machine is off');
    }
    timerId = setTimeout(() => { timerId = null; onReady(); }, getBoilTime());
  };

  this.stop = function () {
    clearTimeout(timerId);
  };

  this.addWater = function (amount) {
    this.setWaterAmount(amount + waterAmount);
  };
}

// const coffeeMachine = new CoffeeMachine(1000, 500);

// coffeeMachine.setWaterAmount(100);
// coffeeMachine.enable();
// coffeeMachine.run();
// coffeeMachine.disable();

var fridge = new Fridge(500);
fridge.enable();
fridge.addFood({
  title: "котлета",
  calories: 100
});
fridge.addFood({
  title: "сок",
  calories: 30
});
fridge.addFood({
  title: "зелень",
  calories: 10
});
fridge.addFood({
  title: "варенье",
  calories: 150
});

fridge.removeFood("нет такой еды"); // без эффекта
alert(fridge.getFood().length); // 4

var dietItems = fridge.filterFood(function (item) {
  return item.calories < 50;
});

dietItems.forEach(function (item) {
  alert(item.title); // сок, зелень
  fridge.removeFood(item);
});

alert(fridge.getFood().length); // 2