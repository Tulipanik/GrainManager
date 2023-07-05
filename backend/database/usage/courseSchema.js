const { Schema, default: mongoose } = require("mongoose");

const courseSchema = new mongoose.Schema({
  contractNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  car: {
    type: String,
  },
  description: {
    type: String,
  },
  soldPrice: {
    type: Number,
    default: function () {
      contract.find(
        { contractNumber: { $eq: this.contractNumber } },
        (err, contract) => {
          if (err) {
            console.log("Cannot find this contract");
            return "";
          } else {
            return contract.get(basicPrice);
          }
        }
      );
    },
  },
  weight: {
    type: Number,
    required: true,
  },
});

const course = mongoose.model("Course", courseSchema);

module.exports = course;
