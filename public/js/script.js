//jshint esversion:6
console.log("Loaded and run the script");

const weatherform = document.querySelector("#weatherform");
const search = document.querySelector("#locationsearch");

weatherform.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  console.log("submitting ", location);

  const errorspan = document.querySelector("#errorspan");
  errorspan.textContent = "Searching";
  errorspan.style.display = "block";

  fetch("/weatherapi?location=" + location).then((resp) => {
    resp.json().then((data) => {
      console.log(":"+location + ":", data.weather);
      if (data.weather.error) {
        errorspan.innerHTML = data.weather.error;
        console.log("error", data.weather.error);
      } else {
        errorspan.style.display = "none";
        document.querySelector("#locationspan").innerHTML = data.weather.location;
        console.log(data.weather.location);
        document.querySelector("#forecastspan").innerHTML = data.weather.forecast;
        console.log(data.weather.forecast);
      }
    });
  });

});

const defaultSearch = (location) => {
  document.querySelector("#locationsearch").value = location;
  weatherform.submit();
};

