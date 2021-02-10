const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
  const firstName=req.body.fname;
  const lastName=req.body.lname;
  const email=req.body.email;
  const data={
    members: [
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }

      }
    ]
  };
  const jsonData=JSON.stringify(data);
  const url="https://us7.api.mailchimp.com/3.0/lists/c603dd4457";
  const options={
    method:"POST",
    auth:"aparnan:94f87d6267e43e8898a64278c3fe85cd-us7"
  }
  const request=https.request(url,options,function(response){
    if(response.statusCode===200){
      //res.send("<h1>Successfully registered!</h1>");
      res.sendFile(__dirname+ "/success.html");
    }
    else{
      //res.send("<h1>Try again later</h1>");
      res.sendFile(__dirname+ "/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
  //console.log(firstName,lastName,email);
});

//Failure post route

app.post("/failure", function(req, res) {
  res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000.");
});



//API Key
//94f87d6267e43e8898a64278c3fe85cd-us7
// List ID
// c603dd4457
