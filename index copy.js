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


// node js programming language program

let http = require("http");

let server = http.createServer((req, res) => {
  if (req.url === "/") {
    // http://localhost:8000
    res.end("Welcome, Hello World!");
  }

  if (req.url === "/about") {
    // http://localhost:8000/about
    res.end("About Us, Hello World!");
  }

  if (req.url === "/contact") {
    // http://localhost:8000/contact
    res.end("Contact Us, Hello World!");
  }

  if (req.url === "/news") {
    // http://localhost:8000/news
    let obj = {
      status: 1,
      data: [
        {
          newsTitle: "News Title 1",
          newsDescription: "News Description 1",
          newsDate: "2023-10-01",
        },
        {
          newsTitle: "News Title 2",
          newsDescription: "News Description 2",
          newsDate: "2023-10-02",
        },
        {
          newsTitle: "News Title 3",
          newsDescription: "News Description 3",
          newsDate: "2023-10-03",
        },
      ],
    };
    res.end(JSON.stringify(obj)); // Convert the object to a JSON string
  }
});

server.listen("8000"); // http://localhost:8000
