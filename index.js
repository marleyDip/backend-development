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
