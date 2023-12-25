const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const port = 3000; // Change as needed
const mongoUrl = "mongodb+srv://akkhilsharmaclass:<password>@project.67z58uk.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());

app.post("/submit", (req, res) => {
  const formData = req.body;

  MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.error("Error connecting to MongoDB:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const db = client.db("your_database_name"); // Change as needed
    const collection = db.collection("students");

    collection.insertOne(formData, (err, result) => {
      if (err) {
        console.error("Error inserting data into MongoDB:", err);
        res.status(500).send("Internal Server Error");
      } else {
        console.log(
          "Form data successfully saved to MongoDB:",
          result.insertedId
        );
        res.send("Form data successfully saved to MongoDB!");
      }

      client.close();
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
