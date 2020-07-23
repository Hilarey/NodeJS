const express = require("express");
const app = express();
const { Router } = require("express");
const userRouter = Router();
const port = process.env.PORT || 3000;
const { listContacts } = require("./contacts");

userRouter.get("/", async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts);
  console.log(contacts);
});

app.use("/", express.static("public"));
app.use("/contacts", userRouter);

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
