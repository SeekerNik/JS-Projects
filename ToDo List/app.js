const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
let app = express();

mongoose.connect("mongodb://localhost:27017/TodoDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const itemSchema = {
  name: String,
};
const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "Welcome to ToDo List",
});
const item2 = new Item({
  name: "To Add new Item press '+' button below",
});

const item3 = new Item({
  name: "<-- Press this to Delete Item",
});

const defaultItem = [item1, item2, item3];
const customlist = {
  name: String,
  item: [itemSchema],
};
let List = mongoose.model("list", customlist);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  Item.find((err, founditem) => {
    res.render("list", {
      Title: "Today",
      newListItem: founditem,
    });
  });
});

app.post("/", (req, res) => {
  const itemName = req.body.inp;
  const listname = req.body.list;
  let newItemdoc = new Item({
    name: itemName,
  });
  if (listname === "Today") {
    newItemdoc.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listname }, (err, foundlist) => {
      foundlist.item.push(newItemdoc);
      foundlist.save();
      res.redirect("/" + listname);
    });
  }
});

app.get("/:listName", (req, res) => {
  const Newlist = _.capitalize(req.params.listName);
  List.findOne({ name: Newlist }, (err, foundlist) => {
    if (!err) {
      if (!foundlist) {
        const list = new List({
          name: Newlist,
          item: defaultItem,
        });
        list.save();
        res.redirect("/" + Newlist);
      } else {
        res.render("list", {
          Title: foundlist.name,
          newListItem: foundlist.item,
        });
      }
    }
  });
});
app.post("/delete", (req, res) => {
  const delItem = req.body.checkbox;
  const Listname = req.body.listname;

  if (Listname === "Today") {
    Item.findByIdAndRemove(delItem, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: Listname },
      { $pull: { item: { _id: delItem } } },
      function (err, foundlist) {
        if (!err) {
          res.redirect("/" + Listname);
        }
      }
    );
  }
});

app.listen(3000, () => {
  console.log("The Server is Started at Port 3000");
});
