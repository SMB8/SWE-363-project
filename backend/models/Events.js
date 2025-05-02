import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  location: String,
  participants: Number,
  imageUrl: String,
  tags: [String],
  enrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("Event", eventSchema);
