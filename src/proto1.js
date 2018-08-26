// констркуктор
function Animal(name) {
  this.name = name;
  this.speed = 0;
}

// методы в прототипе
Animal.prototype.run = function (speed) {
  this.speed += speed;
  console.log(`${this.name} бежит, скорость ${this.speed}`);
};

Animal.prototype.stop = function () {
  this.speed = 0;
  console.log(`${this.name} стоит`);
};

const animal = new Animal('Зверь');

console.log(animal.speed);
animal.run(5);
animal.run(5);
animal.stop();
