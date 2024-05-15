const express = require("express");
const cors = require("cors");
const userRoutes = require("../backend/router/usersRouter");
const tasksRoutes = require("../backend/router/taskRouter");
const { verifyToken } = require("../backend/middlewares/auth");
const auth = require("../backend/router/authRouter");

const app = express();

app.use(express.json());
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT || 8081;

app.use(userRoutes, verifyToken);
app.use(tasksRoutes, verifyToken);
app.use(auth);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT} port.`);
});
