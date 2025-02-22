const mongoose = require("mongoose");

const episodeSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "Episode name is required"],
      trim: true, // ✅ Removes extra spaces
      minlength: [3, "Episode name must be at least 3 characters long"]
    },
    transcript: { 
      type: String, 
      required: [true, "Transcript is required"], 
      trim: true 
    },
    uploadType: { 
      type: String, 
      enum: ["audio", "video", "text", "File Upload", "YouTube Video", "RSS Feed"], // ✅ Restricts allowed values
      required: [true, "Upload type is required"]
    },
    project: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Project", 
      required: [true, "Project ID is required"]
    }
  }, 
  { 
    timestamps: true // ✅ Automatically adds createdAt & updatedAt
  }
);

// ✅ Indexing for faster queries
episodeSchema.index({ project: 1 });

module.exports = mongoose.model("Episode", episodeSchema);
