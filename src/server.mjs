import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createUser, getUser } from "./database.mjs";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3600;

app.post("/api/login", async (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  const status = await getUser(username, password);
  res.send(status);
});

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
