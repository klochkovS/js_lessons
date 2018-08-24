function User() {
  let firstName;
  let surname;

  this.setFirstName = function (name) {
    firstName = name;
  };

  this.setSurname = function (lastName) {
    surname = lastName;
  };

  this.getFullName = function () {
    return `${firstName} ${surname}`;
  };
}

const user = new User();

user.setFirstName('John');
user.setSurname('Doe');

console.log(user.getFullName());
