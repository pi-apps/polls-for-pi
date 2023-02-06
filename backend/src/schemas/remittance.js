const mongoose = require('mongoose');
const _ = require('lodash');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const RemittanceSchema = new Schema({
  remitter: {
    type: ObjectId,
    ref: 'Member',
    required: [true],
  },
  remitterLocaleChurch: {
    type: ObjectId,
    ref: 'LocaleChurch',
  },
  remitAccount: {
    type: ObjectId,
    ref: 'RemitAccount',
  },
  recipient: {
    type: ObjectId,
    ref: 'Member',
  },
  remitMethod: {
    type: String,
  },
  remitterEmail: {
    type: String,
  },
  remitterContactNum: {
    type: String,
  },
  remitterAccountName: {
    type: String,
  },
  remitterAccountNumber: {
    type: String,
  },
  remittanceDate: {
    type: Date,
  },
  receiptDate: {
    type: Date,
  },
  transferDate: {
    type: Date,
  },
  receiptNumber: {
    type: String,
    index: true,
  },
  receiptNumberPrefix: {
    type: String,
  },
  bankAccount: {
    type: ObjectId,
    ref: 'BankAccount',
  },
  status: {
    type: String,
  },
  notes: {
    type: String,
  },
  remarks: {
    type: String,
  },
  remitImg: {
    data: Buffer,
    contentType: String,
  },
  receiptImg: {
    data: Buffer,
    contentType: String,
  },
  transferImg: {
    data: Buffer,
    contentType: String,
  },
  transferImgs: [{
    data: Buffer,
    contentType: String,
  }],
  createdBy: {
    type: ObjectId,
    ref: 'Member',
  },
  updatedBy: {
    type: ObjectId,
    ref: 'Member',
  },
},{
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});

var diffHistory = require("mongoose-diff-history/diffHistory").plugin;
RemittanceSchema.plugin(diffHistory, {
  omit: [
    'remitter', 'remitAccount', 'recipient',
    'remitImg', 'receiptImg', 'transferImg', 'transferImgs',
    'updatedBy', 'updatedBy', 'createdAt', 'updatedAt',
  ],
  uri: process.env.MONGODB_URI,
});

module.exports = { RemittanceSchema };