const express = require("express");
const app = express();
const cors = require("cors")
require("./dal/user_business");
const user = require("./routes/user");
const business = require("./routes/business");
const defaultCards = require("./routes/defaultCards");

app.use(express.json());
app.use(cors({ origin: '*' }))
app.use("/user", user);
app.use("/business", business);
app.use("/defaultCards", defaultCards);

app.listen(8000, () => {
  console.log("listening at http://localhost:8000");
});
