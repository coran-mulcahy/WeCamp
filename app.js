const express = require("express"),
   app = express(),
   bodyParser = require("body-parser"),
   mongoose = require("mongoose");

// pasted from mongoose docs to prevent error warnings when starting server...
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb://localhost/WeCamp");

// Schema set-up for mongoose
const campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//    {
//       name: "Halls Gap",
//       image:
//          "https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e50744075267bd69e49c6_340.jpg",
//       description: "This is an amazing campground! Beautiful location.",
//    },
//    (err, campground) => {
//       if (err) {
//          console.log("Something went wrong...");
//          console.log(err);
//       } else {
//          console.log("Added campground to database!");
//          console.log(campground);
//       }
//    }
// );

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
   res.render("landing");
});

// INDEX route - show all campgrounds
app.get("/campgrounds", (req, res) => {
   // Get all campgrounds from database
   Campground.find({}, (err, allCampgrounds) => {
      if (err) {
         console.log("Something went wrong...");
         console.log(err);
      } else {
         res.render("index", { campgrounds: allCampgrounds });
      }
   });
   // res.render("campgrounds", { campgrounds: campgrounds });
});

// NEW route - show form to create new campground
app.get("/campgrounds/new", (req, res) => {
   res.render("new.ejs");
});

// CREATE route - add new campground to database
app.post("/campgrounds", (req, res) => {
   // get data from form and add to campgrounds page
   const name = req.body.name;
   const image = req.body.image;
   const desc = req.body.description;
   const newCampground = { name: name, image: image, description: desc };
   // Create a new campground and save to database
   Campground.create(newCampground, (err, newlyCreated) => {
      if (err) {
         console.log("Something went wrong...");
         console.log(err);
      } else {
         // redirect back to campgrounds page
         res.redirect("/campgrounds");
      }
   });
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", (req, res) => {
   // find campground with provided ID
   Campground.findById(req.params.id, (err, foundCampground) => {
      if (err) {
         console.log("Something went wrong...");
         console.log(err);
      } else {
         // render show template with that campground
         res.render("show", { campground: foundCampground });
      }
   });
});

app.listen(3000, (req, res) => {
   console.log("The blog server has started! (port 3000)");
});
