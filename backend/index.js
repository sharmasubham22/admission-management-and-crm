import express from "express";
import admin from "./routes/admin.routes.js";
import applicant from "./routes/applicant.routes.js";
import user from "./routes/user.routes.js";
import cors from "cors";
import connectToMongo from "./db.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "*", // for testing
  }),
);
app.use("/api/admin", admin);
app.use("/api/applicant", applicant);
app.use("/api/user", user);

connectToMongo()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to start server due to DB connection error:", err.message);
    process.exit(1);
  });

