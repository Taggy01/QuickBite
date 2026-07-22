import mongoose from 'mongoose';

const basketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Foods',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }]
});
export default mongoose.model('Basket', basketSchema);