import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const featureSchema = new Schema({
  _id: String,
  _changedDate: Date,
  feature: {
    type: Object,
    required: true,
  },
});

const Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;
