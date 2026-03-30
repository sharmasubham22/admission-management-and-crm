import express from "express";
import admin from "./routes/admin.routes.js";
import cors from "cors";
import connectToMongo from "./db.js";

connectToMongo();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/admin", admin);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});