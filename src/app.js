//jshint esversion:6
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//set dir to use
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//set view engine and directory
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//set dir for static files
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
    byName: "Me"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    byName: "Me"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    byName: "Me"
  });
});

app.get("/weather", (req, res) => {
  const rend = {
    title: "Weather",
    byName: "Me",
    weather: {
      location: req.query.location || "",
      forecast: ""
    }
  };
  res.render("weather", rend);
});

app.get("/weatherapi", (req, res) => {
  const {
    location
  } = req.query;

  const rend = {
    title: "Weather",
    byName: "Me",
    weather: {
      location: location,
      forecast: ""
    }
  };

  geocode(location, (error, {
    latitude,
    longitude,
    location
  } = {}) => {
    if (error) {
      rend.weather.error = "geocode error: " + error;
      //return res.render("weather", rend)
      return res.send(rend);
    }

    forecast(latitude, longitude, (error, foredata) => {
      if (error) {
        rend.weather.error = "forecast error: " + error;
        //return res.render("weather", rend)
        return res.send(rend);
      }
      rend.weather.location = location;
      rend.weather.forecast = foredata;
      //return res.render("weather", rend)
      return res.send(rend);
    });
  });

});

app.get("/other", (req, res) => {
  res.render("other/other");
});

app.get("/weather/help", (req, res) => {
  res.send("use normal <a href='/help'>help page </a>");
});

app.get("/products", (req, res) => {
  const {
    search,
    rating
  } = req.query;
  if (!search) {
    return res.send("Search query needed");
  }
  res.send("searching for: " + search + " for " + (rating || "all") + " star rating");
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Missing Help Article",
    byName: "Me",
    errorCode: "Requested help article is not available",
    noPage: req.url
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Missing Page Error",
    byName: "Me",
    errorCode: "Error 404: Page Not Found",
    noPage: req.url
  });
});

app.listen("3000", () => {
  console.log("Server started on port 3000");
});