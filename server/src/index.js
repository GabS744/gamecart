import express from "express";
import cors from "cors";
import "dotenv/config";

import gamesRoutes from './routes/games.routes.js'
import cheapsharkRoutes from './routes/cheapshark.routes.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/games', gamesRoutes)
app.use('/api/cheapshark', cheapsharkRoutes)

app.get("/", (req, res) => {
  res.send("GameCart API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
