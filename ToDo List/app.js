const express = require("express");
const bodyParser = require("body-parser");

let app = express();
let items = ["hello", "name"];
let works = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = new Date();
  let Day = day.toLocaleDateString("en-US", options);
  res.render("list", {
    Title: Day,
    newListItem: items,
  });
});
app.get("/work", (req, res) => {
  res.render("list", { Title: "Work List", newListItem: works });
});
app.post("/", (req, res) => {
  if (req.body.list === "Work List") {
    works.push(req.body.inp);
    res.redirect("/work");
  } else {
    items.push(req.body.inp);
    res.redirect("/");
  }
});

app.listen(3000, () => {
  console.log("The Server is Started at Port 3000");
});
