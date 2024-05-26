const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ameniweslati889:KIPrEyIcFL9HL3oR@clusterm.tgvzaw8.mongodb.net/nodetest?retryWrites=true&w=majority&appName=ClusterM"
  )
  .then(() => {
    console.log("connected to mongodb hh");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
