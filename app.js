const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

var campgrounds = [
   {
      name: "Nagambie",
      image:
         "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e50744075277cd5914ac7_340.jpg",
   },
   {
      name: "Halls Gap",
      image:
         "https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e50744075267bd69e49c6_340.jpg",
   },
   {
      name: "Lakes Entrance",
      image:
         "https://pixabay.com/get/54e5dd424856ae14f1dc84609620367d1c3ed9e04e50744075267bd69e49c6_340.jpg",
   },
   {
      name: "Nagambie",
      image:
         "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e50744075277cd5914ac7_340.jpg",
   },
   {
      name: "Halls Gap",
      image:
         "https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e50744075267bd69e49c6_340.jpg",
   },
   {
      name: "Lakes Entrance",
      image:
         "https://pixabay.com/get/54e5dd424856ae14f1dc84609620367d1c3ed9e04e50744075267bd69e49c6_340.jpg",
   },
   {
      name: "Nagambie",
      image:
         "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e50744075277cd5914ac7_340.jpg",
   },
   {
      name: "Halls Gap",
      image:
         "https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e50744075267bd69e49c6_340.jpg",
   },
   {
      name: "Lakes Entrance",
      image:
         "https://pixabay.com/get/54e5dd424856ae14f1dc84609620367d1c3ed9e04e50744075267bd69e49c6_340.jpg",
   },
];

app.get("/", (req, res) => {
   res.render("landing");
});

app.get("/campgrounds", (req, res) => {
   res.render("campgrounds", { campgrounds: campgrounds });
});

app.get("/campgrounds/new", (req, res) => {
   res.render("new.ejs");
});

app.post("/campgrounds", (req, res) => {
   // get data from form and add to campgrounds page
   const name = req.body.name;
   const image = req.body.image;
   const newCampground = { name: name, image: image };
   campgrounds.push(newCampground);
   // redirect back to campgrounds page
   res.redirect("/campgrounds");
});

app.listen(3000, (req, res) => {
   console.log("The YelpCamp server has started! (port 3000)");
});
