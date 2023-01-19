import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createUser, getUser, updateUser } from "./database.mjs";
import fetchPets from "./api.mjs";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3600;

app.post("/api/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await getUser(username, password);
  res.send(user);
});

app.post("/api/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const status = await createUser(username, password);
  res.send(status);
});

app.post("/api/update", async (req, res) => {
  const username = req.body.username;
  const attribute = req.body.attribute;
  const value = req.body.value;
  const status = await updateUser(username, attribute, value);
  res.send(status);
});

app.get("/api/pets", async (req, res) => {
  const type = req.query.type;
  const page = req.query.page
  const animals = await fetchPets(type, page);
  res.json(animals);
});

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
