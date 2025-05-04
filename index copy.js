const { addToCart, changeQty } = require("./cartModule");

console.log("Welcome to the 'JavaScript world!'");
console.log('Welcome to the "JavaScript world!"');
console.log(`it's a simple JavaScript program.`);
console.log(10 + 90); // This will output 30
console.log("The sum of 10 and 20 is: " + (10 + 20));
console.log("This is a string with a number: " + 42);

let l = [10, 20, 30, 40, 50];
l.forEach((value, index) => {
  console.log(`Index: ${index}, Value: ${value}`);
  // The forEach() method calls a function (a callback function) once for each array element.
  //  Template literals or Template Strings ot String Templates [back-ticks(``)]
  // string interpolation [${...}]
});

console.log(addToCart()); // This will output "Add to Cart"
console.log(changeQty()); // This will output 5
