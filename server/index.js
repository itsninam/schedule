const express = require("express");
const { mongoose } = require("mongoose");

const app = express();

//database connection
mongoose
  .connect(
    "mongodb+srv://itsninam:pass123@cluster0.0cskbe2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

//middleware
app.use(express.json());

app.use("/", require("./routes/festivalRoute"));

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
