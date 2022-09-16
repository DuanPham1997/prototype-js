const Car = function(make,speed){
  this.make = make;
  this.speed = speed;
}

Car.prototype.accelerate = function(){
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
};
Car.prototype.brake = function(){
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function(make,speed,charge){
  Car.call(this,make,speed);
  this.charge = charge;
}

//link to prototype

EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function(chargeTo){
  this.charge = chargeTo;
}
EV.prototype.accelerate = function(){
     this.speed += 20;
     this.charge--;
     console.log(`${this.make} is going at ${this.speed} km/h .with a charge of ${this.charge   }`);
}
const tesla = new EV('Tesla',120,23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
tesla.accelerate();

//class extends 

class Person {
    constructor(fullName,birthYear){
       this.fullName = fullName;
       this.birthYear = birthYear;
    }

    caclAge(){
        console.log(2022 - this.birthYear);
    }

    greet(){
        console.log(`Hello ${this.fullName}`);
    }
    get age(){
        return 2022 - this.birthYear;
    }

    set fullname(name){
        if(this.fullname.includes(' ')) return this._fullname = name;
        else alert(`${name} is not fullname`);
    }

    get fullname(){
        return this._fullname;
    }
}

class StudentCl extends Person {
    constructor(fullName,birthYear,course){
        //always need to happen first
      super(fullName,birthYear);
      this.course = course;
    }
    introduce(){
        console.log(`I am ${this.fullName} and I study ${this.course}`);
    }
}

const student1 = new StudentCl('Duan',1997,'JS');

student1.introduce();
//inheritane beeween class : Object.create
const PersonProto =  {
    caclAge(){
        console.log(2022 - this.birthYear)
    },
    init(firstName,birthYear){
      this.firstName = firstName;
      this.birthYear = birthYear;
    }
}
const steven = Object.create(PersonProto);
const StudentProto = Object.create(PersonProto);

StudentProto.init  = function(firstName,birthYear,course){
  PersonProto.init.call(this,firstName,birthYear);
  this.course = course;
}

const jay = Object.create(StudentProto);
jay.init('jay',2000,'Computer Science');
console.log(jay);
jay.caclAge();
//**************** */
class Account {
    //public fields
    locale = navigator.language;
    //private fields
    #movement = [];
    #pin;
    constructor(owner,curency,pin){
    this.owner = owner;
    this.curency = curency;
    this.#pin = pin;
  
   
   
    console.log(`Thank for opening ${owner}`);
    }
    getMovement(){
        return this.#movement;  
    }
    deposit(val){
  this.#movement.push(val);
  return this;
    }

    withDraw(val){
        this.deposit(-val);
    }
    //protected method
    _approveLoan(val){
        return true;
    }

    requestLoan(val){
        if(this._approveLoan(val)){
         this.deposit(val);
         console.log('Loan approved!');
        }
        return this;
    }
    //static method 
    static helper(){
        console.log('This is static method');
    }
}

const acc1 = new Account('Duan','USD',1111);

acc1.deposit(1000);
acc1.withDraw(500);
console.log(acc1)
Account.helper();

//chain 

acc1.deposit(300).deposit(1000).requestLoan(2000).withDraw(1500);
console.log(acc1.getMovement());