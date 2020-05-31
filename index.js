/*
 * DEPS
 */
const express                       = require("express");
const port                          = 5566;
const app                           = express();

/*
 *   CONFIG
 */
require("./config/server.js")(app);

/*
 *   ROUTES
 */

const scapeRoutes                   = require("./routes/scrape/index.js");

app.use("/", scapeRoutes);

// make screenshots public
app.use("/screenshots", express.static("screenshots"))


/*
 *   START SERVER
 */

app.listen(port, () => {
  console.log(`working on ${port}`);
});
