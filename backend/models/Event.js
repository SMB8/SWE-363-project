import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema({
    EventTitle: String,
    Description: String,
    Category: [String],
    Location: String,
    Date: String,
    StartTime: String,
    EndTime: String,
    MaxParticipants: Number,
    ImageURL: String,
    SpecialRequest: String,
    CreatorID: Number
});

export default mongoose.model("Event", eventsSchema);