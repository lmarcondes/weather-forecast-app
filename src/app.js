const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const PORT = process.env.PORT || 3000

// defining path for views and templates
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setting up the paths for the application
app.use(express.static(publicDirectoryPath));
// setup view engine
app.set("view engine", "hbs");
// setup views directory for handlebars
app.set("views", viewsPath);
// setting up partials directory
hbs.registerPartials(partialsPath);

//setting up the web server routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Lucas Marcondes",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Lucas Marcondes",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Lucas Marcondes",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address for the query",
    });
  }
  geocode(
    req.query.address,
    (error, {longitude, latitude, location} = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(longitude, latitude, (error, forecasData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecasData.forecast,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    name: "Lucas Marcondes",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
