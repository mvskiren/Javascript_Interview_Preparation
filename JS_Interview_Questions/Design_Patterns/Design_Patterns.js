// Pattern 1: Singleton Design Pattern

// In a singleton design pattern, only one object is created for each interface (class or function) and the same object is returned every time when called.

class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    this.data = "hello";
    Singleton.instance = this;
  }
  printName() {
    console.log("hello");
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();

console.log(instance1 === instance2); // true, both variables reference the same instance// "I am the instance"
console.log(Singleton.instance);

// Pattern 2: Observer-subscriber Design Pattern

class Observer {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }
  unSubscribe(observer) {
    this.observers = this.observers.filter((item) => item !== observer);
  }
  fire(data, thisObj) {
    let context = thisObj || window;
    this.observers.forEach((observer) => {
      observer.call(context, data);
    });
  }
}
