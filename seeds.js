const mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
   {
      name: "Lakes Entrance",
      image:
         "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      description: "blah blah blah",
   },
   {
      name: "Mansfield",
      image:
         "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      description: "blah blah blah",
   },
   {
      name: "Halls Gap",
      image:
         "https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
      description: "blah blah blah",
   },
];

function seedDB() {
   // Remove all campgrounds
   Campground.remove({}, (err) => {
      if (err) {
         console.log(err);
      } else {
         console.log("Removed campgrounds!");
      }
      // Add a few campgrounds
      data.forEach((seed) => {
         Campground.create(seed, (err, campground) => {
            if (err) {
               console.log("Oops, something went wrong!");
               console.log(err);
            } else {
               console.log("added a campground!");
               // create a comment
               Comment.create(
                  {
                     text:
                        "This place is great, but I wish there was internet!",
                     author: "Homer",
                  },
                  (err, comment) => {
                     if (err) {
                        console.log("Oops, something went wrong!");
                        console.log(err);
                     } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created new comment!");
                     }
                  }
               );
            }
         });
      });
   });
}

module.exports = seedDB;
