import express from "express";
import cors from "cors";
import { createUser, getUser } from "./database.mjs";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3600;

app.get("/", async (req, res) => {
  const status = await getUser("admin");
  res.send(status)
});

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
