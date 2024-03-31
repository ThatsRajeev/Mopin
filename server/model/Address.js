const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  houseNo: { type: String },
  houseName: { type: String },
  landmark: { type: String },
  addressType: { type: String }
});

addressSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
addressSchema.set('toJSON',{
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {delete ret._id}
})

exports.Address = mongoose.model('Address', addressSchema);
