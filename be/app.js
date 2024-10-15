if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require(`express`);
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require(`cors`);
const router = require("./routes");
const { errorHandlers } = require("./middlewares/errorHandlers");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(`/`, router);
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});
app.use(errorHandlers);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});