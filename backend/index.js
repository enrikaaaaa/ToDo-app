const express = require("express");
const cors = require("cors");

const userRoutes = require("../backend/router/usersRouter");
const tasksRoutes = require("../backend/router/taskRouter");
const priorityRoutes = require("../backend/router/priorityRouter");

const app = express();

app.use(express.json());
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT || 8081;

app.use(userRoutes);
app.use(tasksRoutes);
app.use(priorityRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT} port.`);
});
