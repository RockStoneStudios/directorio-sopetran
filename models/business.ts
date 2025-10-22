import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema({
      userEmail: { type: String, required: true },
      name: { type: String, required: true },
      category: { type: String, required: true },
      description: String,
      address: String,
      phone: String,
      email: String,
      website: String,
      hours: String,
      logo: String,
      facebook: { type: String, required: false },
      instagram: { type: String, required: false },
      nequi: { type: String, required: false }, // ✅ Nuevo campo
      bancolombia: { type: String, required: false }, // ✅ Nuevo campo
      slug: { type: String, required: true, lowercase: true, index: true },
      published: { type: Boolean, default: true }
}, {
    timestamps: true
});

// Create a text index on category, name and address fields
BusinessSchema.index({ category: "text", name: "text", address: "text" });

const Business = mongoose.models.Business || mongoose.model("Business", BusinessSchema);

export default Business;