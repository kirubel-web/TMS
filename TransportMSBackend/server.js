const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const driverRoute = require("./routes/driverRoute");
const customerRoute = require("./routes/customerRoute");
const loadRoute = require("./routes/loadRoute");
const userRoute = require("./routes/userRoute");
const vehicleRoute = require("./routes/vehicleRoute");
const dispatcherRoute = require("./routes/dispatcherRoute");
// const authRouter = require("./routes/auth");

dotenv.config();

const app = express();
connectDB();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log({
  driverRoute,
  customerRoute,
  loadRoute,
  userRoute,
  vehicleRoute,
  dispatcherRoute,
});

app.use("/api/drivers", driverRoute);
app.use("/api/customers", customerRoute);
app.use("/api/loads", loadRoute);
app.use("/api/users", userRoute);
app.use("/api/vehicles", vehicleRoute);
app.use("/api/dispatchers", dispatcherRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
