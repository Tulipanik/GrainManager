const { Schema, default: mongoose } = require("mongoose");
const Course = require("./courseSchema");

const contractSchema = new mongoose.Schema({
  contractNumber: {
    type: String,
    required: true,
    unique: true,
  },
  company: {
    type: String,
  },
  grain: {
    type: String,
    default: "wheat",
  },
  description: {
    type: String,
    default: "",
  },
  amount: {
    type: Number,
    required: true,
  },
  basicPrice: {
    type: Number,
    required: true,
  },
  activity: {
    type: Boolean,
    default: true,
  },
  sold: {
    type: Number,
    default: 0,
  },
  endDate: {
    type: Date,
  },
  date: {
    type: String,
  },
});

contractSchema.statics.getActiveData = async function () {
  try {
    const toSend = await this.find({ activity: true }).exec();
    return toSend;
  } catch (error) {
    throw error;
  }
};

contractSchema.statics.getArchiveData = async function () {
  try {
    const toSend = await this.find({ activity: false }).exec();
    return toSend;
  } catch (error) {
    throw error;
  }
};

contractSchema.statics.getDataForCrossTable = async function () {
  let toSend = {};
  try {
    toSend = await this.find(
      { activity: true },
      { company: 1, grain: 1, amount: 1, sold: 1 }
    ).exec();
  } catch (error) {
    throw error;
  }
  if (toSend.length == 0) {
    return toSend;
  }
  const sums = toSend.reduce((acc, obj) => {
    const existing = acc.find(
      (elem) => (elem.company === obj.company) & (elem.grain === obj.grain)
    );
    if (existing) {
      existing.amount += obj.amount;
      existing.sold += obj.sold;
    } else {
      acc.push({
        company: obj.company,
        grain: obj.grain,
        amount: obj.amount,
        sold: obj.sold,
      });
    }
    return acc;
  }, []);
  return sums;
};

const contract = mongoose.model("Contract", contractSchema);

module.exports = contract;
