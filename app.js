const express = require("express");
const body = require("body-parser");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
    const firstName = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;

    var data = {
        members:  [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastname,
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    
        const url = "https://us22.api.mailchimp.com/3.0/lists/9e48fa0f88"

        const options ={
            method: "POST",
            auth: "dariel:0ddfb12610be1b22c43201c2934f812-us22"
        }
        const request = https.request(url,options,function(response){
            response.on("data",function(data){
                console.log(JSON.parse(data));
                if(response.statusCode === 200 ){
        
                    res.sendFile(__dirname + "/success.html");
              
            }
            else{
                
                    res.sendFile(__dirname + "/failure.html");
            
            }
            })
           
    })
    request.write(jsonData);
    request.end();
    

});
    app.post("/failure", function(req,res){
        res.redirect("/")
    })


app.listen(3000,function(){
    console.log("server is running on port 3000")
})

// 10ddfb12610be1b22c43201c2934f812-us22
// 9e48fa0f88