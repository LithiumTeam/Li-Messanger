const express = require("express");
const UserRoutes = require("./routes/UserRoutes.js");
const cors = require("cors");
const cookie_parser = require("cookie-parser");
require("dotenv").config();

let app = express();

app.use(cors({
	origin: 'http://127.0.0.1:8080',
	credentials: true
}))
app.use((req, res, next) => {
let origin = req.headers.origin;
if (origin) {
res.setHeader("Access-Control-Allow-Origin", origin);
res.setHeader("Access-Control-Allow-Credentials", "true");
}
res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");
if (req.method === "OPTIONS") {
return res.status(204).send();
}
next();
});

app.use(express.json());
app.use(cookie_parser());
app.use("/api/user/", UserRoutes);

let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
