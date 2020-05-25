const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  var first = req.body.fname;
  var last = req.body.lname;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: first,
          LNAME: last,
        },
      },
    ],
  };

  var jsonobj = JSON.stringify(data);
  var options = {
    url: "https://us18.api.mailchimp.com/3.0/lists/e1be4502c0",
    method: "POST",
    headers: {
      Authorization: "Nikhil e3c7c6c811bcf8aacb9ce1c2b9ca15b1-us18",
    },
    body: jsonobj,
  };
  request.post(options, (error, response, body) => {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});
app.listen(process.env.PORT||3000, () => {
  console.log("Server is Started at Port 3000");
});

