const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  address: { type: String },
  role: {type: String, enum: ['user', 'admin'], default: 'user'}
});

userSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
userSchema.set('toJSON',{
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {delete ret._id}
})

exports.User = mongoose.model('User', userSchema);
