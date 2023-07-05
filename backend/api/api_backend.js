const { database } = require("../database/db");
const Contract = require("../database/usage/contractSchema.js");
const Course = require("../database/usage/courseSchema.js");
const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const appExpress = express();
const router = express.Router();

const server = appExpress.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});

appExpress.use(bodyParser.json());
appExpress.use(bodyParser.text());
appExpress.use(bodyParser.urlencoded({ extended: true }));

appExpress.get("/active", (req, res) => {
  database()
    .then(() => {
      Contract.getActiveData()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

appExpress.get("/archive", (req, res) => {
  database()
    .then(() => {
      Contract.getArchiveData()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/active/add", (req, res) => {
  database()
    .then(() => {
      const obj = req.body;
      var contract;
      if (obj.hasOwnProperty("_id")) {
        Contract.find({ _id: obj._id }).then((data) => {
          data[0].contractNumber = obj.contractNumber;
          data[0].company = obj.company;
          data[0].grain = obj.grain;
          data[0].description = obj.description;
          data[0].basicPrice = obj.basicPrice;
          data[0].amount = obj.amount;
          data[0].date = obj.date;
          contract = data[0];
          contract.save().then(() => {
            res.status(200).send("correct");
          });
        });
      } else {
        contract = new Contract(obj);
        contract.save().then(() => {
          res.status(200).send("correct");
        });
      }
    })
    .catch((err) => {
      console.log(err);
      console.log("nie dodano obiektu do bazy");
    });
});

router.post("/active/current", (req, res) => {
  database()
    .then(() => {
      Contract.find({ contractNumber: String(req.body) })
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

appExpress.get("/current", (req, res) => {
  database()
    .then(() => {
      Contract.getDataForCrossTable()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/active/current/courses", (req, res) => {
  database()
    .then(() => {
      Course.find({ contractNumber: String(req.body) })
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/active/current/sendCourse", (req, res) => {
  database()
    .then(() => {
      const obj = req.body;
      if (obj.hasOwnProperty("_id")) {
        Course.find({ _id: req.body._id }).then((data) => {
          data[0].contractNumber = obj.contractNumber;
          data[0].date = obj.date;
          data[0].car = obj.car;
          data[0].description = obj.description;
          data[0].soldPrice = obj.soldPrice;
          data[0].weight = obj.weight;
          data[0].save().catch((err) => {
            console.log(err);
          });
        });
      } else {
        const course = new Course(req.body);
        course.save();
        Contract.find({ contractNumber: String(req.body.contractNumber) }).then(
          (data) => {
            data[0].sold = data[0].sold + course.weight;
            data[0].save().catch((err) => {
              console.log(err);
            });
          }
        );
      }
    })

    .catch((err) => {
      console.log(err);
    });
});

router.post("/active/addToArchive", (req, res) => {
  database().then(() => {
    Contract.find({ contractNumber: String(req.body) })
      .then((found) => {
        found[0].activity = false;
        found[0].endDate = new Date();
        found[0].save().catch((err) => {
          console.log(err);
        });
        res.status(200).send("correct");
      })
      .catch(() => {
        res.status(404).send("wrong");
      });
  });
});

router.post("/unique/grain", (req, res) => {
  database().then(() => {
    Contract.distinct("grain").then((data) => {
      res.json(data);
    });
  });
});

router.post("/unique/company", (req, res) => {
  database().then(() => {
    Contract.distinct("company").then((data) => {
      res.json(data);
    });
  });
});

router.post("/unique/cars", (req, res) => {
  database().then(() => {
    Course.distinct("car").then((data) => {
      res.json(data);
    });
  });
});

appExpress.use(router);
module.exports = server;
