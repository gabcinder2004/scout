import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: String,
  _changedDate: Date,
  product: {
    type: Object,
    required: true,
  },
  releases: {
    type: Object,
    required: false,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
