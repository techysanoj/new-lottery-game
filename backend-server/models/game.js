// backend-server/models/Game.js
import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  gameName: String,
  yesterday: Number,
  today: Number,
  createdAt: String,
});

export default mongoose.model("Game", GameSchema);
