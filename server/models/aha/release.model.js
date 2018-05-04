import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const releaseSchema = new Schema({
  _id: String,
  _changedDate: Date,
  release: {
    type: Object,
    required: true,
  },
  features: {
    type: Object,
    required: false,
  },
});

const Release = mongoose.model('Release', releaseSchema);

module.exports = Release;
