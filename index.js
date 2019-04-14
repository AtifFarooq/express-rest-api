const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const exphbs = require("express-handlebars");
const members = require("./Members");

const app = express();

// Init middleware if you want to
// app.use(logger);

// Handlebars middleware (as defined in the documentation)
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage route: render the 'index' view using handlebars
// res.render takes in a second param, which is data that we can send 'in'
app.get("/", (req, res) => {
  res.render("home", { title: "Member's App", members });
});

/** This is the 'traditional' way of routing without setting a static folder
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, "public", "index.html"));
 });
 */

// Set a root static folder. Uses built-in middleware function
app.use(express.static(path.join(__dirname, "public")));

// Members API routes
app.use("/api/members", require("./routes/api/members"));

// Check if the port number is saved in a local environment variable
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
