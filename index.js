const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) => {


    res.sendFile(__dirname + "/index.html");
    
});


app.post("/", (req,res)=> {

    const city_name = req.body.cityName;
    console.log(city_name);

    const query = city_name;
    const URL = "https://api.openweathermap.org/data/2.5/weather?q= " + query + "&units=metric&appid=6d0e7b3fbc242aec497e07b50bf6bceb";


    https.get(URL,(response) => {

       //console.log(response);
       
       response.on("data", (data) => {

        const weather_data = JSON.parse(data);
        
        const w_type = weather_data.weather[0].description;
        
        res.write("<h1> The temperature " + "" + city_name + " " + "is" + " " + weather_data.main.temp + " Celsius </h1>");
        res.write("<p> feels like " + w_type + "</p>");

        res.send()
        
       })
    });
    
})



app.listen(3000, () => console.log("Running on port 3000"));



