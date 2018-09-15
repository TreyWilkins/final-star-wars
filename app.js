var express = require('express');
var app = express();
var request = require('request');

app.use(express.static("public"));

app.get("/", function(req,res){
    res.render("home.ejs");
});

app.get("/results", function(req, res){
    var theNumber = req.query.theNumber;
    if(theNumber < 1 || theNumber > 10 || theNumber == "undefined"){theNumber = 1;};
    var link = "https://swapi.co/api/people/" + theNumber;

    request(link,function(error, response, body){
        console.log('Status:', response.statusCode);
        console.log('Headers:', JSON.stringify(response.headers));
        console.log('Response:', body);
        
        var thePerson = JSON.parse(body);
        res.render("results.ejs", {thePerson: thePerson});
    });
});

app.listen(3000, function(){
    console.log("Listening on port 3000");
});