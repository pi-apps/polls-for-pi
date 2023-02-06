const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const BankAccountSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  bank: {
    type: String,
    trim: true,
  },
  branch: {
    type: String,
    trim: true,
  },
  accountNumber: {
    type: String,
    trim: true,
  },
  accountName: {
    type: String,
    trim: true,
  },
  contactEmail: {
    type: String,
    trim: true,
  },
  receiptPrefix: {
    type: String,
    trim: true,
  },
  isActive: {
    type: Boolean,
  },
  isLocaleChurchAccount: {
    type: Boolean,
    default: false,
  },
  localeChurch: {
    type: ObjectId,
    ref: 'LocaleChurch',
  },
});

var diffHistory = require("mongoose-diff-history/diffHistory").plugin;
BankAccountSchema.plugin(diffHistory, {
  uri: process.env.MONGODB_URI,
});

module.exports = { BankAccountSchema };