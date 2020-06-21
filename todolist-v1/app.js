const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["AD Project - Tuesday", "Research Project - Friday", "The Fucking TIkTok - Friday", "Math - Friday", "Changement de L'empire - Tomorrow", "Create a gif - Friday"];
let workItems = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/public", express.static("public"));

app.get("/", function(req, res) {
  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", function(req, res) {

  let item = req.body.newItem;

  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});
app.post("/work", function(req, res) {
  let item = res.body.newItem;
  workItems.push(newItem);
  res.redirect("/work");
});
app.get("/about", function(req,res) {
  res.render("about");
});
app.listen(3000, function() {
  console.log("Server running on port 3000");
});
