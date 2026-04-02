import express from "express";
import admin from "./routes/admin.routes.js";
import applicant from "./routes/applicant.routes.js";
import user from "./routes/user.routes.js";
import cors from "cors";
import connectToMongo from "./db.js";

const app = express();
const port = process.env.PORT;

app.use(async (req, res, next) => {
  await connectToMongo();
  next();
});
app.use(express.json());
app.use(cors());
app.use("/api/admin", admin);
app.use("/api/applicant", applicant);
app.use("/api/user", user);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
