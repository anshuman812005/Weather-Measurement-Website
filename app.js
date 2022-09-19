const { Console } = require("console");
const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){

    const query=req.body.cityName;
    const appKey="f12b0928f02eb8afaa19f4bef4615815";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + appKey +"&units=" + unit;
    https.get(url,function(response){
       response.on("data",function(data){
           const weatherData=JSON.parse(data);
           const temp=weatherData.main.temp;
           const description=weatherData.weather[0].description;
           const icon=weatherData.weather[0].icon;
           const imageURL="http://openweathermap.org/img/wn/"+ icon +"@2x.png";
           res.write("<p>The weather is currently "+description+"</p>");
           res.write("<h1>The temperature in " + query + " is " +temp+ " degree celcius.</h1>");
           res.write("<img src=" +imageURL+ ">");
           res.send();
       });
    });

});



app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000.");
});