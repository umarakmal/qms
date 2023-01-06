const DynamicCollections = require("../models/dynamicCollections");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SheetDetailsListCollections = require("../models/sheetListDetails");
const multer = require("multer");
const csv = require("csvtojson");
var path = require("path");
const UploadDataDynamicCollections = require("../models/uploadDatadynamicCollections");
const RygAssignmentCollection = require("../models/rygAssignment");
const AssigningCriteriaMappedData = require("../models/assigningCriteriaMapped");
const EmployeeDetails = require("../models/employeeDetails")
const FilterDataSave = require("../models/filterDataStore")
const Qatlam = require("../models/qatlambyprocess")
const AllocationAssignment = require("../models/allocationAssignment")
const CalibrationAssignment = require("../models/calibrationAssignment")
const TestAssign = require("../models/test")
const SuperAssignment = require("../models/superAssignment")
const CalibrationStatus = require("../models/calibrationStatus");
const D_CollectionName = require("../models/D_CollectionName");
const ReportMaster = require("../models/reportMaster");
const rebuttalStatus = require("../models/rebuttalStatus");
//Data upload
// -> Multer Upload Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

exports.upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "text/csv") {
      cb(null, true);
    } else {
      cb(null, false);
      req.formaterror = "Only .csv format allowed";
      return cb(null, "Only .csv allowed");
    }
  },
});

exports.createSheet = async (req, res) => {
  try {
    var stuff = {
      any: req.body.any,
      param: req.body.param,
      subparam: req.body.subparam,
    }; // Define info.
    var Model = createModelForName(req.body.collectionname); // Create the model.
    var model = Model(stuff); // Create a model instance.

    model.save(function (err) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json("Successfully Saved!");
    });

    var saveddata = await new DynamicCollections({
      collectionname: req.body.collectionname,
      process: req.body.process,
      createdBy: req.body.createdBy,
    });
    await saveddata.save((error, success) => {
      if (success) {
        console.log("succesfully saved.");
      } else {
        console.log(error);
      }
    });
  } catch (err) {
    return res.json(err);
  }
};

var establishedModels = {};

function createModelForName(collectionname) {
  if (!(collectionname in establishedModels)) {
    var Any = new Schema({
      any: {},
      param: {},
      subparam: {},
    });
    establishedModels[collectionname] = mongoose.model(collectionname, Any);
  }
  return establishedModels[collectionname];
}

// Retrieve Total documents from dynamic collection
exports.getDynamicCollectionData = async (req, res) => {
  try {
    const document = await createModelForName(
      req.body.getdynamiccollection
    ).find();
    return res.status(200).json(document);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};

// GET Dynamically created collections
exports.getDynamicCollectionNames = async (req, res) => {
  try {
    const doc = await DynamicCollections.find({});
    return res.status(200).json(doc);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Some error occured while retrieving data.",
    });
  }
};

// GET Dynamically created collections with the name
exports.getDynamicCollectionNamesWithNameInput = async (req, res) => {
  try {
    const collectionname = req.body.collectionname;
    const doc = await DynamicCollections.find({
      collectionname
    });
    return res.status(200).json(doc);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Some error occured while retrieving data.",
    });
  }
};

//Sheet List submit form
exports.sheetListSubmit = async (req, res) => {
  try {
    // Create
    var newSheetDetails = await new SheetDetailsListCollections({
      employeeid: req.body.employeeid,
      sheet_name:req.body.sheet_name,
      wow_call_option: req.body.wow_call_option,
      ztp_option: req.body.ztp_option,
      ztp_remark: req.body.ztp_remark,
      callid: req.body.callid,
      extrafield1: req.body.extrafield1,
      extrafield2: req.body.extrafield2,
      auditor_remark: req.body.feedback,
      msisdn: req.body.msisdn,
      option_bonus_call: req.body.option_bonus_call,
      finalScore: req.body.percnt,
      obtainedMarks: req.body.obtainMarks,
      fatalCount: req.body.counts,
      maximumMarks: req.body.totalmarks,
      remark: req.body.remark,
      fieldData: req.body.fieldData,
      attributes1: req.body.attri1,
      attributes2: req.body.attri2,
      attributes3: req.body.attri3,
      marks: req.body.inputFields,
      parameter: req.body.parameter,
      subparameter: req.body.subparameter,
      marking_bonus_call: req.body.marking_bonus_call,
      bonus_call_remark: req.body.bonus_call_remark,
      wow_call_remark: req.body.wow_call_remark,
      subParaMarks: req.body.subParaMarks,
      subparameter2: req.body.subparameter2,
      subParaAttributes1: req.body.subParaAttributes1,
      subParaAttributes2: req.body.subParaAttributes2,
      subParaAttributes3: req.body.subParaAttributes3,
      subParaRemarks: req.body.subParaRemarks,
      processDetails: req.body.processDetails,
    });

    const result = newSheetDetails.save((err, success) => {
      if (success) {
        return res.status(200).json({
          message: "Submitted successfully",
        });
      } else if (err.code == 11000) {
        return res.status(422).json({
          error: "Shee is already taken",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error occured please try again",
    });
  }
};

// Retrieve Total documents from dynamic collection
exports.getDynamicCollectionDataParam = async (req, res) => {
  try {
    const getdynamiccollection = req.params.getdynamiccollection;
    const document = await createModelForName(getdynamiccollection).find();
    return res.status(200).json(document);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};

exports.updateSheetAttributes = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }

    const id = req.body.id;
    const getdynamiccollection = req.params.getdynamiccollection;
    const param = req.body.param;
    // console.log(typeof getdynamiccollection);
    const data = await createModelForName(
      getdynamiccollection
    ).findByIdAndUpdate(id, {
      param
    }, {
      useFindAndModify: false
    });
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: "Error updating Employee with id=" + id,
    });
  }
};

// Retrieve Total documents from dynamic collection
exports.getDynamicCollectionDataParamid = async (req, res) => {
  try {
    const getdynamiccollection = req.params.getdynamiccollection;
    const id = req.body.id;
    const document = await createModelForName(getdynamiccollection).findById(
      id
    );
    return res.status(200).json(document);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};

// Retrieve Total documents from dynamic collection
exports.updateDynamicCollectionWithSelectOptions = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.body.id;
    const getdynamiccollection = req.params.getdynamiccollection;
    const any = req.body.any;
    // console.log(typeof getdynamiccollection);
    const data = await createModelForName(
      getdynamiccollection
    ).findByIdAndUpdate(id, {
      any
    }, {
      useFindAndModify: false
    });
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: "Error updating Employee with id=" + id,
    });
  }
};

exports.updateDynamicCollectionWithSelectOptionsTest = async (req, res) => {
  try {
    const id = req.body.id;
    const getdynamiccollection = req.params.getdynamiccollection;
    const updateOption = req.body.updateOption;
    const field = req.body.field;
    const data = await createModelForName(getdynamiccollection).updateOne({
      id,
      any: {
        $elemMatch: {
          fieldname: field,
        },
      },
    }, {
      $set: {
        "any.$[outer].sel": updateOption,
      },
    }, {
      arrayFilters: [{
        "outer.fieldname": field
      }],
    }, {
      multi:true
    });

    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: "Error updating Employee with id=" + id,
    });
  }
};

exports.updateDynamicCollectionWithSelectOptionsTestAttribute = async (
  req,
  res
) => {
  try {
    const id = req.body.id;
    const getdynamiccollection = req.params.getdynamiccollection;
    const attribute = req.body.attribute;
    const para = req.body.para;
    const data = await createModelForName(getdynamiccollection).updateOne({
      id,
      param: {
        $elemMatch: {
          parameter: para,
        },
      },
    }, {
      $set: {
        "param.$[outer].attributes": attribute,
      },
    }, {
      arrayFilters: [{
        "outer.parameter": para
      }],
    });
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: "Error updating Employee with id=" + id,
    });
  }
};

exports.updateDynamicCollectionWithListImport = async (req, res) => {
  try {
    const id = req.body.id;
    // const getdynamiccollection = req.params.getdynamiccollection;
    const sel = req.body.sel;
    const selected = req.body.selected;
    const dynamicCollection2 = req.body.dynamicCollection2;
      const data = await createModelForName(dynamicCollection2).updateOne({
        id,
        any: {
          $elemMatch: {
            fieldname: selected,
          },
        },
      }, {
        $set: {
          "any.$[outer].sel": sel,
        },
      }, {
        arrayFilters: [{
          "outer.fieldname": selected
        }],
      });

      return res.status(200).json(data);
    
  } catch (err) {
    res.status(500).send({
      message: "Error updating",
    });
  }
};

//Check Process name
exports.findDataWithProcessName = async (req, res) => {
  try {
    var process = req.body.process;
    const data = await DynamicCollections.find({
      process
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json("error");
  }
};

//Update sheet status
exports.updateStatusSheets = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.params.id;
    const status = req.body.status;
    const data = await DynamicCollections.findByIdAndUpdate(
      id, {
        status
      }, {
        useFindAndModify: false
      }
    );
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: "Error updating Employee with id=" + id,
    });
  }
};

//Upload file
exports.uploaddataCdr = async (req, res) => {
  const dynamicCollection = req.body.dynamicCollection;
  if (req.formaterror) {
    return res.status(500).send({
      success: false,
      message: `Only CSV files are allowed`,
      chk: "2",
    });
  }
  var i = 1;
  await createModelForName1(dynamicCollection).deleteMany({});
  csv({
      noheader: true,
      output: "csv",
    })
    .fromFile(req.file.path)

    .then((jsonObj) => {
      var arrayToInsert = [];
      jsonObj.map(async (element) => {
        var temp = {
          A: element[0],
          B: element[1],
          C: element[2],
          D: element[3],
          E: element[4],
          F: element[5],
          G: element[6],
          H: element[7],
          I: element[8],
          J: element[9],
          cmid: element[10],
        };
        arrayToInsert.push(temp);
        i++;
      });
      var totalCountCdr = i - 1;
      createModelForName1(dynamicCollection).insertMany(
        arrayToInsert,
        (err, result) => {
          if (result) {
            return res.status(200).json({
              SUCCESS: "data uploaded",
              chk: "0",
              totalCountCdr,
            });
          } else {
            return res.status(400).json({
              error: "error",
              chk: "1",
            });
          }
        }
      );
    });
};

//Upload file
exports.uploaddataTagging = async (req, res) => {
  const dynamicCollection = req.body.dynamicCollection;
  if (req.formaterror) {
    return res.status(500).send({
      success: false,
      message: `Only CSV files are allowed`,
      chk: "2",
    });
  }
  var i = 1;
  await createModelForName1(dynamicCollection).deleteMany({});
  csv({
      noheader: true,
      output: "csv",
    })
    .fromFile(req.file.path)

    .then((jsonObj) => {
      var arrayToInsert = [];
      jsonObj.map(async (element) => {
        var temp = {
          A: element[0],
          B: element[1],
          C: element[2],
          D: element[3],
          E: element[4],
          F: element[5],
          G: element[6],
          H: element[7],
          I: element[8],
          J: element[9],
          cmid: element[10],
        };
        arrayToInsert.push(temp);
        i++;
      });
      var totalCount = i - 1;
      // console.log("dff", arrayToInsert);
      createModelForName1(dynamicCollection).insertMany(
        arrayToInsert,
        (err, result) => {
          if (result) {
            return res.status(200).json({
              SUCCESS: "data uploaded",
              chk: "0",
              totalCount,
            });
          } else {
            return res.status(400).json({
              error: "error",
              chk: "1",
            });
          }
        }
      );
    });
};

var establishedModels1 = {};

function createModelForName1(collectionname) {
  if (!(collectionname in establishedModels1)) {
    var Any = new Schema({
      A: {
        type: String
      },
      B: {
        type: String
      },
      C: {
        type: String
      },
      D: {
        type: String
      },
      E: {
        type: String
      },
      F: {
        type: String
      },
      G: {
        type: String
      },
      H: {
        type: String
      },
      I: {
        type: String
      },
      J: {
        type: String
      },
      cmid: {
        type: String
      },
    });
    establishedModels1[collectionname] = mongoose.model(collectionname, Any);
  }
  return establishedModels1[collectionname];
}

//RYG Assignment data submit
exports.RygAssignmentSubmit = async (req, res) => {
  try {
    var newSheetDetails = await new RygAssignmentCollection({
      process: req.body.process,
      redfrom: req.body.redfrom,
      redto: req.body.redto,
      amberfrom: req.body.amberfrom,
      amberto: req.body.amberto,
      greenfrom: req.body.greenfrom,
      greento: req.body.greento,
    });
    const result = newSheetDetails.save((err, success) => {
      if (success) {
        return res.status(200).json({
          message: "Submitted successfully",
        });
      } else if (err.code == 11000) {
        return res.status(422).json({
          error: "Shee is already taken",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error occured please try again",
    });
  }
};

exports.findRygAssignment = async (req, res) => {
  try {
    var process = req.body.process;
    var data = await RygAssignmentCollection.findOne({
      process
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//Update Ryg Assignment
exports.updateRygAssignment = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.params.id;
    const redfrom = req.body.redfrom;
    const redto = req.body.redto;
    const greenfrom = req.body.greenfrom;
    const greento = req.body.greento;
    const amberfrom = req.body.amberfrom;
    const amberto = req.body.amberto;

    const data = await RygAssignmentCollection.findByIdAndUpdate(
      id, {
        redfrom,
        redto,
        greenfrom,
        greento,
        amberfrom,
        amberto
      }, {
        useFindAndModify: false
      }
    );
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: "Error updating Employee with id=" + id,
    });
  }
};

//MIS Report
exports.getMisReport = async (req, res) => {
  try {
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    var data = await SheetDetailsListCollections.find({
      createdAt: {
        $gte: date1,
        $lte: date2
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//Get Total data in dynamic collections
exports.getDynamicCollectionDataWithName = async (req, res) => {
  try {
    const getdynamiccollection = req.body.getdynamiccollection;
    const document = await createModelForName(getdynamiccollection).find();
    return res.status(200).json(document);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};

//Mapping CDR and Tagging Data Not being used
exports.MappingCdrAndTaggingData = async (req, res) => {
  try {

    var stuff = {
      A: req.body.A,
      B: req.body.B,
      C: req.body.C,
      D: req.body.D,
      E: req.body.E,
      F: req.body.F,
      G: req.body.G,
      H: req.body.H,
      I: req.body.I,
      J: req.body.J,
      K: req.body.K,
      L: req.body.L,
      M: req.body.M,
      N: req.body.N,
      O: req.body.O,
      P: req.body.P,
      Q: req.body.Q,
      R: req.body.R,
      S: req.body.S,
      T: req.body.T,
      cmid: req.body.cmid,
    }; // Define info.
    console.log(stuff);
    var Model = createModelForNameMapping(req.body.collectionname); // Create the model.
    var model = Model(stuff); // Create a model instance.

    await createModelForNameMapping(req.body.collectionname).deleteMany({});
    model.save(function (err) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json("Successfully Saved!");
    })
  } catch (err) {
    return res.json(err);
  }
};

var establishedModelsMapping = {};

function createModelForNameMapping(collectionname) {
  if (!(collectionname in establishedModelsMapping)) {
    var Any = new Schema({
      A: {},
      B: {
        type: String
      },
      C: {
        type: String
      },
      D: {
        type: String
      },
      E: {
        type: String
      },
      F: {
        type: String
      },
      G: {
        type: String
      },
      H: {
        type: String
      },
      I: {
        type: String
      },
      J: {
        type: String
      },
      K: {
        type: String
      },
      L: {
        type: String
      },
      M: {
        type: String
      },
      N: {
        type: String
      },
      O: {
        type: String
      },
      P: {
        type: String
      },
      Q: {
        type: String
      },
      R: {
        type: String
      },
      S: {
        type: String
      },
      T: {
        type: String
      },
      cmid: {
        type: String
      },
    }, {
      timestamps: true
    });
    establishedModelsMapping[collectionname] = mongoose.model(
      collectionname,
      Any
    );
  }
  return establishedModelsMapping[collectionname];
}

//Get Total data in dynamic collections
exports.getDynamicCollectionDataOfMapping = async (req, res) => {
  try {
    const getdynamiccollection = req.body.getdynamiccollection;
    const document = await createModelForNameMapping(
      getdynamiccollection
    ).find();
    return res.status(200).json(document);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};

//To find data in A array
//Get Total data in dynamic collections
exports.getDynamicCollectionDataInA = async (req, res) => {
  try {
    const getdynamiccollection = req.body.getdynamiccollection;
    // const A = req.body.A;
    const document = await createModelForNameMapping(getdynamiccollection).find({}, {
      A: {
        $slice: 5
      },
      B: {
        $slice: 5
      },
      C: {
        $slice: 5
      },
      D: {
        $slice: 5
      },
      E: {
        $slice: 5
      },
      F: {
        $slice: 5
      },
      G: {
        $slice: 5
      },
      H: {
        $slice: 5
      },
      I: {
        $slice: 5
      },
      J: {
        $slice: 5
      },
      K: {
        $slice: 5
      },
      L: {
        $slice: 5
      },
      M: {
        $slice: 5
      },
      N: {
        $slice: 5
      },
      O: {
        $slice: 5
      },
      P: {
        $slice: 5
      },
      Q: {
        $slice: 5
      },
      R: {
        $slice: 5
      },
      S: {
        $slice: 5
      },
      T: {
        $slice: 5
      },
      cmid: {
        $slice: 5
      },
    });
    return res.status(200).json(document);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};

exports.getDynamicCollectionDataInCount = async (req, res) => {
  try {
    const getdynamiccollection = req.body.getdynamiccollection;
    // const A = req.body.A;
    const document = await createModelForNameMapping(
      getdynamiccollection
    ).aggregate([{
      $project: {
        A: {
          $size: "$A"
        },
        B: {
          $size: "$B"
        }
      }
    }]);

    return res.status(200).json(document);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving data.",
    });
  }
};

//Save mapped data Assigning Criteria
exports.createMappedAssigningData = async (req, res) => {
  try {
    // Create
    var newAssigningDetails = await new AssigningCriteriaMappedData({
      acht: req.body.acht,
      collectionname: req.body.collectionname,
      callid: req.body.callid,
      agentid: req.body.agentid,
      mobileno: req.body.mobileno,
      calltype: req.body.calltype,
    });
    const result = newAssigningDetails.save((err, success) => {
      if (success) {
        return res.status(200).json({
          message: "Submitted successfully",
        });
      } else if (err.code == 11000) {
        return res.status(422).json({
          error: "collection is already saved",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error occured please try again",
    });
  }
};


//Join cdr and tag dump data.
exports.MappingCdrAndTaggingDataJoin = async (req, res) => {
  try {
    const document = await createModelForNameMapping(
      req.body.to
    ).aggregate(
      [{
        '$lookup': {
          'from': req.body.from,
          'localField': req.body.local,
          'foreignField': req.body.foreign,
          'as': 'new'
        }
      }])
    await createModelForNameMappingTest(req.body.collectionname).deleteMany({});
    await createModelForNameMappingTest(req.body.collectionname).insertMany(document, (err, result) => {
      if (result) {
        return res.status(200).json({
          SUCCESS: "added",
          chk: "0",
        });
      } else {
        return res.status(400).json({
          error: "error",
          chk: "0",
        });
      }
    });
  } catch (error) {
    return res.status(500).json(error)
  }
}
var establishedModelsMappingTest = {};

function createModelForNameMappingTest(collectionname) {
  if (!(collectionname in establishedModelsMappingTest)) {
    var Any = new Schema({
      A: {
        type: String
      },
      B: {
        type: String
      },
      C: {
        type: String
      },
      D: {
        type: String
      },
      E: {
        type: String
      },
      F: {
        type: String
      },
      G: {
        type: String
      },
      H: {
        type: String
      },
      I: {
        type: String
      },
      J: {
        type: String
      },
      K: {
        type: String
      },
      L: {
        type: String
      },
      M: {
        type: String
      },
      new: {},
      cmid: {
        type: String
      },
    }, {
      timestamps: true
    });
    establishedModelsMappingTest[collectionname] = mongoose.model(
      collectionname,
      Any
    );
  }
  return establishedModelsMappingTest[collectionname];
}

exports.findDataJoin = async (req, res) => {
  try {
    var doc = await createModelForNameMappingTest(req.body.collectionname).find().limit(6)
    return res.status(200).json(doc)
  } catch (error) {
    return res.status(500).json(error)
  }
}

//Count of data after join
exports.findDataJoinCount = async (req, res) => {
  try {
    var doc = await createModelForNameMappingTest(req.body.collectionname).find().count()
    return res.status(200).json(doc)
  } catch (error) {
    return res.status(500).json(error)
  }
}


//Acht Check 
exports.filterDataAcht = async (req, res) => {
  try {
    const dynamicCollectionName = req.body.dynamicCollectionName;
    const collectionname = req.body.collectionname
    var acht1 = req.body.acht1;
    var acht11 = req.body.acht11;
    var acht2 = req.body.acht2;
    var acht22 = req.body.acht22;
    var acht3 = req.body.acht3;
    var acht33 = req.body.acht33;
    var acht4 = req.body.acht4;
    var acht44 = req.body.acht44;

    const document = await AssigningCriteriaMappedData.find({
      collectionname: {
        $regex: collectionname
      }
    })
    var x = (document[0].acht);
    var y = (document[0].collectionname)

    if (dynamicCollectionName === y) {
      const doc = await createModelForNameMappingTest(dynamicCollectionName).find({
        $or: [{
          [x]: {
            $gte: acht1,
            $lte: acht11
          }
        }, {
          [x]: {
            $gte: acht2,
            $lte: acht22
          }
        }, {
          [x]: {
            $gte: acht3,
            $lte: acht33
          }
        }, {
          [x]: {
            $gte: acht4,
            $lte: acht44
          }
        }]
      })
      await FilterDataSave.deleteMany({})
      for (let i = 0; i < doc.length; i++) {
        var filterCopy = await new FilterDataSave({
          A: doc[i]["A"],
          B: doc[i]["B"],
          C: doc[i]["C"],
          D: doc[i]["D"],
          E: doc[i]["E"],
          F: doc[i]["F"],
          G: doc[i]["G"],
          H: doc[i]["H"],
          I: doc[i]["I"],
          J: doc[i]["J"],
          new:doc[i]['new']
        });
        await filterCopy.save(filterCopy);
      }
      return res.status(200).json(doc)
    }
    return res.status(200).json("Collection name doesn't exist.")
  } catch (error) {
    return res.status(500).json(error)
  }
}

exports.findDistinctAgent = async (req, res) => {
  try {
    const collectionname = req.body.collectionname;
    const document = await AssigningCriteriaMappedData.find({
      collectionname: {
        $regex: collectionname
      }
    })
    var y = (document[0].collectionname)
    const abc = (document[0].agentid);
    if (collectionname === y) {
      const doc = await createModelForNameMappingTest(collectionname).distinct(abc)
      return res.status(200).json(doc)
    }

    return res.status(200).json("No data")
  } catch (error) {
    return res.status(500).json(error)
  }
}


exports.findDistinctCalltypes = async (req, res) => {
  try {
    const collectionname = req.body.collectionname;
    const document = await AssigningCriteriaMappedData.find({
      collectionname: {
        $regex: collectionname
      }
    })
    var y = (document[0].collectionname)
    const abc = (document[0].calltype);
    if (collectionname === y) {
      const doc = await createModelForNameMappingTest(collectionname).distinct(abc)
      return res.status(200).json(doc)
    }
    return res.status(200).json("No data")
  } catch (error) {
    return res.status(500).json(error)
  }
}

exports.calltypesFilter = async (req, res) => {
  try {
    var collectionname = req.body.collectionname;
    var calltypefield2 = req.body.calltypefield2
    var calltypefield3 = req.body.calltypefield3
    var calltypefield4 = req.body.calltypefield4
    var calltypefield5 = req.body.calltypefield5
    const document = await AssigningCriteriaMappedData.find({
      collectionname: {
        $regex: collectionname
      }
    })
    var y = (document[0].collectionname)
    const fieldname = (document[0].calltype);
    if (collectionname === y) {
      const doc = await createModelForNameMappingTest(collectionname).find({
        $or: [{
          [fieldname]: {
            $in: calltypefield2
          }
        }, {
          [fieldname]: {
            $in: calltypefield3
          }
        }, {
          [fieldname]: {
            $in: calltypefield4
          }
        }, {
          [fieldname]: {
            $in: calltypefield5
          }
        }]
      })
      await FilterDataSave.deleteMany({})
      for (let i = 0; i < doc.length; i++) {
        var filterCopy = await new FilterDataSave({
          A: doc[i]["A"],
          B: doc[i]["B"],
          C: doc[i]["C"],
          D: doc[i]["D"],
          E: doc[i]["E"],
          F: doc[i]["F"],
          G: doc[i]["G"],
          H: doc[i]["H"],
          I: doc[i]["I"],
          J: doc[i]["J"],
          new:doc[i]['new']
        });
        await filterCopy.save(filterCopy);
      }
      return res.status(200).json(doc)
    }
    return res.status(200).json("No records!")
  } catch (error) {
    return res.status(500).json(error)
  }
}


exports.createEmployeeIDandDOJ = async (req, res) => {
  try {
    // Create
    var empDetails = await new EmployeeDetails({
      employeeId: req.body.employeeId,
      process: req.body.process,
      doj: req.body.doj

    });

    const result = empDetails.save((err, success) => {
      if (success) {
        return res.status(200).json({
          message: "Submitted successfully",
        });
      } else if (err.code == 11000) {
        return res.status(422).json({
          error: "duplicacy",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error occured please try again",
    });
  }
};

exports.newHireApi = async (req, res) => {
  try {
    var process = req.body.process
    var doc = await EmployeeDetails.find({
      process: {
        $regex: process
      }
    })
    var collectionname = req.body.collectionname
    const document1 = await AssigningCriteriaMappedData.find({
      collectionname: {
        $regex: collectionname
      }
    })
    var y = (document1[0].collectionname)
    const fieldname = (document1[0].agentid);
    if (collectionname === y) {
      const document = await createModelForNameMappingTest(collectionname).find()
      var result = [];
      document.forEach(element => {
        doc.forEach(el => {
          if (element[fieldname] === el.employeeId) {
            result.push(element)
          } else {

          }
        })
      });
      await FilterDataSave.deleteMany({})
      for (let i = 0; i < result.length; i++) {
        var filterCopy = await new FilterDataSave({
          A: result[i]["A"],
          B: result[i]["B"],
          C: result[i]["C"],
          D: result[i]["D"],
          E: result[i]["E"],
          F: result[i]["F"],
          G: result[i]["G"],
          H: result[i]["H"],
          I: result[i]["I"],
          J: result[i]["J"],
          new:result[i]['new']
        });
        await filterCopy.save(filterCopy);
      }
      return res.status(200).json(result)
    }
    return res.status(404).json("Not Exists!")
  } catch (error) {
    return res.status(500).json({
      error: "Error occured please try again",
    });
  }
}

//ACHT and Calltype Filter
exports.achtAndCalltypeDataFilter = async(req,res)=>{
  try {
    const dynamicCollectionName = req.body.dynamicCollectionName;
    const collectionname = req.body.collectionname
    var acht1 = req.body.acht1;
    var acht11 = req.body.acht11;
    var acht2 = req.body.acht2;
    var acht22 = req.body.acht22;
    var acht3 = req.body.acht3;
    var acht33 = req.body.acht33;
    var acht4 = req.body.acht4;
    var acht44 = req.body.acht44;
    //for calltype filter
    var calltypefield2 = req.body.calltypefield2
    var calltypefield3 = req.body.calltypefield3
    var calltypefield4 = req.body.calltypefield4
    var calltypefield5 = req.body.calltypefield5

    await FilterDataSave.deleteMany({});
    const document = await AssigningCriteriaMappedData.find({
      collectionname: {
        $regex: collectionname
      }
    })
    var x = (document[0].acht);
    var y = (document[0].collectionname)
    const fieldname = (document[0].calltype);
    if (dynamicCollectionName === y) {
      const doc = await createModelForNameMappingTest(dynamicCollectionName).find({
        $or: [{
          [x]: {
            $gte: acht1,
            $lte: acht11
          }
        }, {
          [x]: {
            $gte: acht2,
            $lte: acht22
          }
        }, {
          [x]: {
            $gte: acht3,
            $lte: acht33
          }
        }, {
          [x]: {
            $gte: acht4,
            $lte: acht44
          }
        }]
      })
    
      for (let i = 0; i < doc.length; i++) {
        var filterCopy = await new FilterDataSave({
          A: doc[i]["A"],
          B: doc[i]["B"],
          C: doc[i]["C"],
          D: doc[i]["D"],
          E: doc[i]["E"],
          F: doc[i]["F"],
          G: doc[i]["G"],
          H: doc[i]["H"],
          I: doc[i]["I"],
          J: doc[i]["J"],
          new:doc[i]['new']
        });
        await filterCopy.save(filterCopy);
      }
      const docCalltype = await FilterDataSave.find({
        $or: [{
          [fieldname]: {
            $in: calltypefield2
          }
        }, {
          [fieldname]: {
            $in: calltypefield3
          }
        }, {
          [fieldname]: {
            $in: calltypefield4
          }
        }, {
          [fieldname]: {
            $in: calltypefield5
          }
        }]
      })
      await FilterDataSave.deleteMany({})
      for (let i = 0; i < docCalltype.length; i++) {
        var filterCopy = await new FilterDataSave({
          A: docCalltype[i]["A"],
          B: docCalltype[i]["B"],
          C: docCalltype[i]["C"],
          D: docCalltype[i]["D"],
          E: docCalltype[i]["E"],
          F: docCalltype[i]["F"],
          G: docCalltype[i]["G"],
          H: docCalltype[i]["H"],
          I: docCalltype[i]["I"],
          J: docCalltype[i]["J"],
          new:docCalltype[i]['new']
        });
        await filterCopy.save(filterCopy);
      }
     return res.status(200).json(docCalltype)
    }
    
    return res.status(200).json("Collection name doesn't exist.")
  } catch (error) {
    return res.status(500).json({
      error: "Error occured please try again",
    });
  }
}

//QA TL Trainer Create
exports.qaTlTrainerCreate = async (req, res) => {
  try {
    // Create
    var empDetails = await new Qatlam({
      employeeId: req.body.employeeId,
      process: req.body.process,
      qa: req.body.qa,
      trainer: req.body.trainer,
      tl: req.body.tl,
    });

    const result = empDetails.save((err, success) => {
      if (success) {
        return res.status(200).json({
          message: "Submitted successfully",
        });
      } else if (err.code == 11000) {
        return res.status(422).json({
          error: "duplicacy",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error occured please try again",
    });
  }
};

exports.getQaTlTrainer = async(req,res)=>{
  try {
    var process = req.body.process
    var doc = await Qatlam.find( {process: {$in: process}})
    return res.status(200).json(doc)
  } catch (error) {
    return res.status(500).json({
      error: "Error occured please try again",
    });
  }
}

exports.checkRyg = async(req,res)=>{
  try {
    var process = req.body.process
    const data = await RygAssignmentCollection.find( {process: {$in: process}})
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({
      error: "Error occured please try again",
    });
  }
}

//Data Allocation 
//Assigning data to users Manually
exports.allocationDataManual = async (req, res) => {
  try {
   
    var callid = await FilterDataSave.find()
    var process = req.body.process
    var sheetid = req.body.sheetid
    var audit_status = req.body.audit_status
    var auditeeid = req.body.auditeeid
    var empid = req.body.empid
    var assigningData = req.body.assignDataUsers;
    var finalData = {};
    k = 0;

    Object.keys(assigningData).forEach(function (key) {
      var user = empid.filter((it) =>it == key);
      user = user[0];
      finalData[user] = [];
    
      for (var j = k; j < k + parseInt(assigningData[key]); j++) {
        finalData[user].push(callid[j]);
      }
      k = k + parseInt(assigningData[key]);
    });
   await AllocationAssignment.deleteMany({})
    var x = finalData;
    
    var joindata = [];
    Object.keys(x).forEach(function (key) {
      var data = x[key]
      
      for (var i = 0; i < data.length; i++) {
        joindata.push({ auditor_id: key, assigningData: data[i] , process,sheetid,audit_status,auditeeid});
      }
    });
    AllocationAssignment.insertMany(joindata, (err, result) => {
      if (result) {
        return res.status(200).json({
          SUCCESS: "added",
          chk: "0",
        });
      } else {
        return res.status(400).json({
          error: "error",
          chk: "0",
        });
      }
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getAssign = async (req,res)=>{
  try {
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    var process = req.body.process
    var sheetid = req.body.sheetid
    var data = await AllocationAssignment.find({process: {$in: process},sheetid: {$in: sheetid},
      createdAt: {
        $gte: date1,
        $lte: date2
      }, audit_status:'0'
    })
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}

//Get call id name from assigning mapped data
exports.getCallid = async(req,res)=>{
  try {
    var collectionname = req.body.collectionname 
   var data = await AssigningCriteriaMappedData.find({collectionname: {$in: collectionname}})   
    return res.status(200).json(data[0].callid)
  } catch (error) {
    return res.status(500).json(error);
  }
}


exports.reAllocation = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    
    const id1 = req.body.id1;
    const auditor_id = req.body.auditor_id
    const data = await AllocationAssignment.updateMany(
      { _id: { $in: id1 } },
      { $set: { auditor_id : auditor_id } },
      {multi: true}
   )
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: "Error updating Employee with id=" + id,
    });
  }
};

//Calibration data get
exports.getCalibrationData = async (req,res)=>{
  try {
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    var process = req.body.process
    var sheet_name = req.body.sheet_name
    var data = await SheetDetailsListCollections.find({processDetails: {$in: process},sheet_name: {$in: sheet_name},
      createdAt: {
        $gte: date1,
        $lte: date2
      }, 
    })
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}

//Calibration Assignment
exports.calibrationAssignmentt = async(req,res)=>{
try {
  
 var d = await AllocationAssignment.find({},{_id:0})
 var data = await CalibrationAssignment.insertMany(d)
 return res.status(200).json("Successful");
} catch (error) {
  return res.status(500).json(error);
}
}

exports.calibrationStatusUpdate = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    
    const id = req.body.id;
    const calibration_status = req.body.calibration_status
    const data = await SheetDetailsListCollections.updateMany(
      { _id: { $in: id } },
      { $set: { calibration_status : calibration_status } },
      {multi: true}
   )
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: "Error updating Employee with id=" + id,
    });
  }
};


//Super Audit get data 
exports.getSuperAuditData = async (req,res)=>{
  try {
    var process = req.body.process
    var sheetid = req.body.sheetid
    var data = await AllocationAssignment.find({process: {$in: process},sheetid: {$in: sheetid}, audit_status:'1', is_superaudit:'0'
    })
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}

//SuperAudit save 
exports.superAuditSave = async(req,res)=>{
  try {
    var d = await AllocationAssignment.find({})
    var id = req.body.id
    var callidd=req.body.callidd
    var is_superaudit="1"
    var callid1 = []
    var callid = []
    var calltype1 = []
    var calltype = []
    var acht1 = []
    var acht = []
    var mobile1 = []
    var mobile=[]
    var process =[]
    var sheetid=[]
    var auditeeid=[]
    d.forEach((el)=>{
     var z =  el.assigningData.split(',')
      callid1.push(z[1].substring(7,25)) 
      calltype1.push(z[3].substring(7,45)) 
      acht1.push(z[5].substring(7,10))
      mobile1.push(z[6].substring(7,17))
      if(el._id==id){
        process.push(el.process);
        sheetid.push(el.sheetid);
        auditeeid.push(el.auditeeid);
      }
    })
    for(i = 0 ; i< callid1.length; i++){
     if(callid1[i] == callidd){
      callid.push(callid1[i])
      calltype.push(calltype1[i])
      acht.push(acht1[i])
      mobile.push(mobile1[i])
     }
    }
    var superAuditDetails = await new SuperAssignment({
      callid: callid[0],
      acht: acht[0],
      calltype: calltype[0],
      mobileno: mobile[0],
      auditor_id:req.body.auditor_id,
      auditeeid:auditeeid[0],
      auditor_post:req.body.auditor_post,
      audit_status:"0",
      sheetid:sheetid[0],
      process:process[0]
    });

    const result = superAuditDetails.save((err, success) => {
      if (success) {
        return res.status(200).json({
          message: "Submitted successfully",
        });
      } else if (err.code == 11000) {
        return res.status(422).json({
          error: "duplicacy",
        });
      }
    });
    //Updating Allocation assignment table at the same time
    const data = await AllocationAssignment.updateMany(
      { _id: { $in: id } },
      { $set: { is_superaudit : is_superaudit } },
      {multi: true}
   )
  } catch (error) {
    return res.status(500).json(error);
  }
}

//Get Calibration view data 
exports.getCalibrationViewData = async(req,res)=>{
  try {
    auditorid=req.body.auditorid
    var data = await CalibrationAssignment.find({ audit_status:'0', auditor_id:auditorid
  })
  return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}

//get sheetlistdetails for calibration
exports.getSheetListDetailsForCalibration = async (req, res) => {
  try {
    
    var sheet_name = req.body.sheet_name;
    var employeeid = req.body.employeeid;
    var data = await SheetDetailsListCollections.find({ sheet_name:sheet_name, employeeid:employeeid
    });
    
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.insertCalibrationStatus = async(req,res)=>{
  try {
    
    var data = await new CalibrationStatus({
      sheetid: req.body.sheetid,
      process: req.body.process,
      auditeeid: req.body.auditeeid,
      auditor_id: req.body.auditor_id,
    });

    const result = data.save((err, success) => {
      if (success) {
        return res.status(200).json({
          message: "Submitted successfully",
        });
      } else {
        return res.status(422).json({
          error: "Error",
        });
      }
    });
  } catch (error) {
    return res.status(500).json(error);  
  }
}

//Update calibration status in calibration assignment
exports.updateCalibrationAssignment = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.body.id;
    const audit_status = "1";
    const data = await CalibrationAssignment.findByIdAndUpdate(
      id, {
         audit_status }, {
        useFindAndModify: false
      }
    );
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: "Error updating Employee with id=" + id,
    });
  }
};


//Create sheet Dynamic
exports.createSheetDynamic = async (req, res) => {
  try {
    var stuff = {
      any: req.body.any,
      param: req.body.param,
      subparam: req.body.subparam,
    }; // Define info.
    var Model = createModelForNameDynamic(req.body.collectionnames); // Create the model.
    var model = Model(stuff); // Create a model instance.

    model.save(function (err) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json("Successfully Saved!");
    });

    var saveddata = await new D_CollectionName({
      collectionnames: req.body.collectionnames,
      process: req.body.process,
      createdBy: req.body.createdBy,
    });
    await saveddata.save((error, success) => {
      if (success) {
        console.log("succesfully saved.");
      } else {
        console.log(error);
      }
    });
  } catch (err) {
    return res.json(err);
  }
};

var establishedModelsDynamic = {};

function createModelForNameDynamic(collectionnames) {
  if (!(collectionnames in establishedModelsDynamic)) {
    var Any = new Schema({
      any: {},
      param: {},
      subparam: {},
    });
    establishedModelsDynamic[collectionnames] = mongoose.model(collectionnames, Any);
  }
  return establishedModelsDynamic[collectionnames];
}

 
// GET Dynamically created collections with the name for dynamic option
exports.getDynamicCollectionNamesForDynamicOption = async (req, res) => {
  try {
    const collectionnames = req.body.collectionnames;
    const doc = await D_CollectionName.find({
     collectionnames
    });
    return res.status(200).json(doc);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Some error occured while retrieving data.",
    });
  }
};

//Master Report
exports.masterReport = async(req,res)=>{
  try {
   
    var data = await new ReportMaster({
      employeeId: req.body.employeeId,
      process: req.body.process,
      report_name: req.body.report_name,
      createdBy: req.body.createdBy,
      employeeName:req.body.employeeName
    });

    const result = data.save((err, success) => {
      if (success) {
        return res.status(200).json({
          message: "Submitted successfully",
        });
      } else {
        return res.status(422).json({
          error: "Error",
        });
      }
    });
  } catch (error) {
    return res.status(500).json(error);  
  }
}

//Get Master report
exports.getMasterReport = async (req, res) => {
  try {
    const doc = await ReportMaster.find();
    return res.status(200).json(doc);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Some error occured while retrieving data.",
    });
  }
};

//Get audit view data
exports.getAuditViewData = async(req,res)=>{
  try {
    auditorid=req.body.auditorid
    var data = await AllocationAssignment.find({ audit_status:'0', auditor_id:auditorid
  })
  return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}

//update allocation assignment 
exports.updateAllocationAssignment = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.body.id;
    const audit_status = "2";
    const skip_reason = req.body.skip_reason
    const data = await AllocationAssignment.findByIdAndUpdate(
      id, {
         audit_status,skip_reason }, {
        useFindAndModify: false
      }
    );
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: "Error ",
    });
  }
};

//Update sheetdetailslist collection audit view
exports.updateSheetDetailsList = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.body.ids;
   const obtainedMarks = req.body.obtainMarks
   const feedback= req.body.feedback
   const finalScore= req.body.finalScore
    const data = await SheetDetailsListCollections.findByIdAndUpdate(
      id, {
        obtainedMarks,feedback,finalScore }, {
        useFindAndModify: false
      }
    );
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: "Error ",
    });
  }
};

//Update calibration status in calibration assignment
exports.updateAuditStatus = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.body.id;
    const audit_status = "1";
    const data = await AllocationAssignment.findByIdAndUpdate(
      id, {
         audit_status }, {
        useFindAndModify: false
      }
    );
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: "Error updating Employee with id=" + id,
    });
  }
};

//Rebuttel view 
exports.getRebuttelViewData = async(req,res)=>{
  try {
 const   auditorid = req.body.auditorid
 const   rbtlstatus ="1"
 const fclose = "0"
 const reject_by = "0"
 var data = await SheetDetailsListCollections.find({ rbtlstatus:rbtlstatus,auditorid:auditorid,reject_by:reject_by,fclose:fclose
 })
  return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}

//Rebuttel view 
exports.getRebuttelScoreData = async(req,res)=>{
  try {
 const _id = req.body.id
 var data = await SheetDetailsListCollections.find({_id})
  return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}

//Rebuttal 
exports.createRebuttalStatus = async(req,res) =>{
  try {
    var data = await new rebuttalStatus({
      sheetid: req.body.sheetid,
      auditeeid: req.body.auditeeid,
      auditorid: req.body.auditorid,
      qa_rebuttal_date: req.body.qa_rebuttal_date,
      qh_rebuttal_date:req.body.qh_rebuttal_date,
      qa_remark:req.body.qa_remark,
      qh_remark:req.body.qh_remark,
      pre_score:req.body.pre_score,
      new_score:req.body.new_score
    });

    const result = data.save((err, success) => {
      if (success) {
        return res.status(200).json({
          message: "Submitted successfully",
        });
      } else {
        return res.status(422).json({
          error: "Error",
        });
      }
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}

//Update sheetdetailslist rebuttal view 
exports.updateSheetDetailsListRebuttal = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.body.ids;
   const reject_by = req.body.reject_by
   const rbtlstatus= "0"
   const fclose= "0"
   const updatedAt = Date.now()
    const data = await SheetDetailsListCollections.findByIdAndUpdate(
      id, {
        reject_by,rbtlstatus,fclose,updatedAt }, {
        useFindAndModify: false
      }
    );
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: "Error ",
    });
  }
};

//Report 
exports.getReprt = async(req,res)=>{
  try {
    const from = "rebuttalstatuses"
    const foreignField ="sheetid"
    const localField = "sheet_name"
 
 var data = await SheetDetailsListCollections.aggregate([{
  '$lookup': {
    'from': from,
    'localField': localField,
    'foreignField': foreignField,
    'as': 'new'
  },
  }])
  return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}

//get SuperAudit
exports.getSuperAssign = async(req,res)=>{
  try {
 const audit_status = "0"
 const auditor_id = req.body.auditor_id
 var data = await SuperAssignment.find({audit_status:audit_status,auditor_id:auditor_id})
  return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}

//Update superaudit view 
exports.updateSuperAssignmentAudit = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.body.id;
   const audit_status= "1"
   const updatedAt = Date.now()
    const data = await SuperAssignment.findByIdAndUpdate(
      id, {
        audit_status,updatedAt }, {
        useFindAndModify: false
      }
    );
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: "Error ",
    });
  }
};


//get sheet list for super assignment  
exports.getSheetListDataForSuperAssignment = async(req,res)=>{
  try {
const sheet_name = req.body.sheetid
 const employeeid = req.body.employeeid
 var data = await SheetDetailsListCollections.find({sheet_name:sheet_name,employeeid:employeeid, })
  return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}