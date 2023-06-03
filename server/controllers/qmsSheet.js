
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Sheets = require("../models/sheet");
const Responce = require("../models/responce");
const multer = require("multer");
const csv = require("csvtojson");
var path = require("path");
const Ryg_master = require("../models/ryg_master");
const Column_assignment = require("../models/column_assignment");
const AllocationAssignment = require("../models/allocationAssignment")
const CalibrationAssignment = require("../models/calibrationAssignment")
const SuperAssignment = require("../models/superAssignment")
const CalibrationStatus = require("../models/calibrationStatus");
const ReportMaster = require("../models/reportMaster");
const rebuttalStatus = require("../models/rebuttalStatus");
const { v4: uuidv4 } = require("uuid");
const { forEach } = require("lodash");
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

// -> Multer Upload Storage for recording
const storage1 = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/public/uploads/files");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      uuidv4() + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

exports.upload1 = multer({ storage: storage1 });

exports.createSheet = async (req, res) => {
  try {
    var tempany = req.body.any;
    for (let any in tempany) {
      tempany[any]['list'] = "na";
      if (tempany[any]['controltype'] === "select") {
        tempany[any]['isnumeric'] = "No";
      }
    }
    var stuff = {
      any: tempany,
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
    //Query for Sheet table as Sheet
    var saveddata = await new Sheets({
      collectionname: req.body.collectionname,
      sheet_name :req.body.collectionname,
      sheetid:model._id,
      cm_id: req.body.cm_id,
      process: req.body.processname,
      createdBy: req.body.createdBy,
      sheettype: req.body.sheettype
    });
    await saveddata.save((error, success) => {
      if (success) {
    
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
    const cm_id = req.body.cm_id
    const status = "active"
    const doc = await Sheets.find({ cm_id, status });
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
    const doc = await Sheets.find({
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
    const sheet = req.body.sheet_name
    var getSheet = await Responce.find({$in:{sheet_name:sheet}})
    var sheetCount=0
    for(var i = 0; i<getSheet.length ; i++){
     getSheet[i]['sheet_name']
     if(getSheet[i]['sheet_name'] === sheet){
       sheetCount++
     }
    }
    const dataid = sheet+'-'+(sheetCount+1)

    var newSheetDetails = await new Responce({
      employeeid: req.body.employeeid,
      sheet_name: sheet,
      dataId:dataid,
      sheetid:req.body.sheetStructureid,
      responce:req.body.responce,
      email:req.body.email,
      wow_call_option: req.body.wow_call_option,
      ztp_option: req.body.ztp_option,
      ztp_remark: req.body.ztp_remark,
      callid: req.body.callid,
      calltype: req.body.calltype,
      acht: req.body.acht,
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
      center: req.body.center,
      cm_id: req.body.cm_id,
      auditorid: req.body.auditorid,
      auditor_name: req.body.auditor_name,
      auditee_id: req.body.auditee_id,
      auditee_name: req.body.auditee_name,
      QH: req.body.QH,
      AH: req.body.AH,
      TH: req.body.TH,
      OH: req.body.OH,
      OH_Name: req.body.OH_Name,
      QH_Name: req.body.QH_Name,
      TH_Name: req.body.TH_Name,
      AH_Name: req.body.AH_Name,
      Report_to_Name: req.body.Report_to_Name,
      Report_to: req.body.Report_to,
      Auditee_Remark: "",
      Acknowledgement: "",
      DOJ: req.body.DOJ,
      calibration_status: req.body.calibration_status,
      audit_type: req.body.audit_type,
      location: req.body.location,
      process:req.body.process,
      sub_process:req.body.sub_process,
      clientname:req.body.clientname
    });

    const result = newSheetDetails.save((err, success) => {
      if (success) {
        return res.status(200).json(newSheetDetails);
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

//Sheet List submit form
exports.sheetListSubmitForAudioRecording = async (req, res) => {
  try {
    // Create
    const remarkparse = JSON.parse(req.body.remark)
    const atri1parse = JSON.parse(req.body.attri1)
    const atri2parse = JSON.parse(req.body.attri2)
    const atri3parse = JSON.parse(req.body.attri3)
    const fieldparse = JSON.parse(req.body.fieldData)
    const markssparse = JSON.parse(req.body.inputFields)

    const attris1parse = JSON.parse(req.body.subParaAttributes1)
    const attris2parse = JSON.parse(req.body.subParaAttributes2)
    const attris3parse = JSON.parse(req.body.subParaAttributes3)
    const paraaparse = JSON.parse(req.body.parameter)
    const subpparse = JSON.parse(req.body.subparameter)
    const rmk2parse = JSON.parse(req.body.subParaRemarks)
    const subparamarkparse = JSON.parse(req.body.subParaMarks)

    const sheet = req.body.sheet_name
    var getSheet = await Responce.find({$in:{sheet_name:sheet}})
    var sheetCount=0
    for(var i = 0; i<getSheet.length ; i++){
     getSheet[i]['sheet_name']
     if(getSheet[i]['sheet_name'] === sheet){
       sheetCount++
     }
    }
    const dataid = sheet+'-'+(sheetCount+1)

    var newSheetDetails = await new Responce({
      employeeid: req.body.employeeid,
      sheet_name: sheet,
      dataId:dataid,
      responce:req.body.responce,
      wow_call_option: req.body.wow_call_option,
      ztp_option: req.body.ztp_option,
      ztp_remark: req.body.ztp_remark,
      callid: req.body.callid,
      calltype: req.body.calltype,
      acht: req.body.acht,
      extrafield1: req.body.extrafield1,
      extrafield2: req.body.extrafield2,
      auditor_remark: req.body.feedback,
      msisdn: req.body.msisdn,
      option_bonus_call: req.body.option_bonus_call,
      finalScore: req.body.percnt,
      obtainedMarks: req.body.obtainMarks,
      fatalCount: req.body.counts,
      maximumMarks: req.body.totalmarks,
      remark: remarkparse,
      fieldData: fieldparse,
      attributes1: atri1parse,
      attributes2: atri2parse,
      attributes3: atri3parse,
      marks: markssparse,
      parameter: paraaparse,
      subparameter: subpparse,
      marking_bonus_call: req.body.marking_bonus_call,
      bonus_call_remark: req.body.bonus_call_remark,
      wow_call_remark: req.body.wow_call_remark,
      subParaMarks: subparamarkparse,
      subparameter2: req.body.subparameter2,
      subParaAttributes1: attris1parse,
      subParaAttributes2: attris2parse,
      subParaAttributes3: attris3parse,
      subParaRemarks: rmk2parse,
      processDetails: req.body.processDetails,
      center: req.body.center,
      cm_id: req.body.cm_id,
      auditorid: req.body.auditorid,
      auditor_name: req.body.auditor_name,
      auditee_id: req.body.auditee_id,
      auditee_name: req.body.auditee_name,
      QH: req.body.QH,
      AH: req.body.AH,
      TH: req.body.TH,
      OH: req.body.OH,
      OH_Name: req.body.OH_Name,
      QH_Name: req.body.QH_Name,
      TH_Name: req.body.TH_Name,
      AH_Name: req.body.AH_Name,
      Report_to_Name: req.body.Report_to_Name,
      Report_to: req.body.Report_to,
      Auditee_Remark: "",
      Acknowledgement: "",
      DOJ: req.body.DOJ,
      calibration_status: req.body.calibration_status,
      audit_type: req.body.audit_type,
      audioURL: req.file.filename,
      location: req.body.location,
      process:req.body.process,
      sub_process:req.body.sub_process,
      clientname:req.body.clientname,
      sheetid:req.body.sheetStructureid,
      email:req.body.email,
    });

    const result = newSheetDetails.save((err, success) => {
      if (success) {
        return res.status(200).json({
          message: "Submitted successfully",
        });
      } else if (err.code == 11000) {
        return res.status(422).json({
          error: "Sheet is already taken",
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
      message: "Error updating",
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
      message: "Error updating",
    });
  }
};

//Manage List items submit api
exports.updateDynamicCollectionWithSelectOptionsTest = async (req, res) => {
  try {
    const id = req.body.id;
    const getdynamiccollection = req.params.getdynamiccollection;
    const list = req.body.list;
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
        "any.$[outer].list": list,
      },
    }, {
      arrayFilters: [{
        "outer.fieldname": field
      }],
    });

    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: "Error updating",
    });
  }
};

//Manage Attributes submit api
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
      message: "Error updating",
    });
  }
};


//Manage Attributes get attribute value api
exports.updateDynamicCollectionWithSelectOptionsTestAttributeGetdata = async (req, res) => {
  try {
    const getdynamiccollection = req.body.getdynamiccollection;
    const para = req.body.para;
    const subparameter = req.body.subparameter;
    const data = await createModelForName(getdynamiccollection).find({
      param: {
        $elemMatch: {
          subparameter: subparameter, parameter: para
        },
      },
    });
    var attVal = []
    const attributeValues = data[0].param.map(doc => {
      if (para == doc.parameter && subparameter == doc.subparameter) {
        attVal.push(doc.attributes)
      }
    });
    return res.status(200).json(attVal[0]);
  } catch (err) {
    res.status(500).send({
      message: "Error",
    });
  }
};

//Manage Attributes get attribute value api subfield
exports.updateDynamicCollectionWithSelectOptionsTestAttributeGetdataSubfield = async (req, res) => {
  try {
    const getdynamiccollection = req.body.getdynamiccollection;
    const para = req.body.para;
    const subparameter = req.body.subparameter;
    const data = await createModelForName(getdynamiccollection).find({
      param: { $elemMatch: { parameter: para } },
    });
    var attVal = []
    const attributeValues = data[0].param.map(doc => {
      doc.subFields.map((elem) => {
        if (para == doc.parameter && subparameter == elem.subparameterr) {
          attVal.push(elem.attributess);
        }
      }
      );

      if (para == doc.parameter && subparameter == doc.subparameter) {
        attVal.push(doc.attributes)
      }

    })
    return res.status(200).json(attVal);
  } catch (err) {
    res.status(500).send({
      message: "Error",
    });
  }
};

//Manage Attributes get subpara  value on the basis of para api subfield and field combined
exports.getAttributeParasubpara = async (req, res) => {
  try {
    const getdynamiccollection = req.body.getdynamiccollection;
    const para = req.body.para;
    const data = await createModelForName(getdynamiccollection).find({
      param: { $elemMatch: { parameter: para } },
    });
    var attVal = []
    const attributeValues = data[0].param.map(doc => {
      if (doc.subFields.length > 0) {
        doc.subFields.map((elem) => {
          if (para == doc.parameter) {
            attVal.push(elem.subparameterr, doc.subparameter);
          }
        }
        );
      }
      else {
        if (para == doc.parameter) {
          attVal.push(doc.subparameter)
        }
      }
    })
    var d = attVal.map(item => item).filter((value, index, self) => self.indexOf(value) === index)

    return res.status(200).json(d);
  } catch (err) {
    res.status(500).send({
      message: "Error",
    });
  }
};

exports.updateDynamicCollectionWithSelectOptionsTestAttribute11 = async (req, res) => {
  try {
    const id = req.body.id;
    const getdynamiccollection = req.params.getdynamiccollection;
    const attributess = req.body.attributess;
    const subparameter = req.body.subparameter;
    const para = req.body.para;
    const document = await createModelForName(getdynamiccollection).findOne({
      id,
    });
    const subField = document.param.map(async (el) => {
      if (el.subFields.length > 0) {
        el.subFields.map(async (elem) => {
          if (el.parameter === para && elem.subparameterr === subparameter) {
            const data = await createModelForName(getdynamiccollection).updateOne({
              id,
              'param.subFields': {
                $elemMatch: {
                  subparameterr: subparameter,
                },
              },
            }, {
              $set: {
                "param.$[outer].subFields.$[inner].attributess": attributess,
              },
            }, {
              arrayFilters: [
                { "outer.parameter": para },
                { "inner.subparameterr": subparameter }
              ],
            });
          } else if (el.parameter === para && el.subparameter === subparameter) {
            const data = await createModelForName(getdynamiccollection).updateOne({
              id,
              param: {
                $elemMatch: {
                  subparameter: subparameter,
                },
              },
            }, {
              $set: {
                "param.$[outer].attributes": attributess,
              },
            }, {
              arrayFilters: [{
                "outer.subparameter": subparameter
              }],
            });
          }
        }
        )
      } else {

        const data = await createModelForName(getdynamiccollection).updateOne({
          id,
          param: {
            $elemMatch: {
              subparameter: subparameter,
            },
          },
        }, {
          $set: {
            "param.$[outer].attributes": attributess,
          },
        }, {
          arrayFilters: [{
            "outer.subparameter": subparameter
          }],
        });
      }

    })

    return res.status(200).json("data");
  } catch (err) {
    res.status(500).send({
      message: "Error updating",
    });
  }
};


//find particular field data
exports.findDataManageListParticularField = async (req, res) => {
  try {
    const getdynamiccollection = req.body.getdynamiccollection;
    const field = req.body.field;
    var data = await createModelForName(getdynamiccollection).find({
      any: {
        $elemMatch: {
          fieldname: field,
        },
      },
    },
    )
    var data1 = []
    data.forEach(function (doc) {
      // Get the matching field data from the array
      const matchingFieldData = doc.any.find(function (field1) {

        if (field1.fieldname === field) {
          data1.push(field1.list);
        } else {
        }
      })

    });
    return res.status(200).json(data1[0]);
  } catch (err) {
    res.status(500).send({
      message: "Error",
    });
  }
};


exports.updateDynamicCollectionWithListImport = async (req, res) => {
  try {
    const id = req.body.id;
    let sel1 = req.body.list;
    sel1 = sel1.slice(1, sel1.length);
    sel1 = sel1.slice(0, sel1.length - 1);
    const selarr = sel1.split("','");
    const selected1 = req.body.selected;
    const selectedarr = selected1.split(",");
    // return res.status(200).json(selarr);
    const dynamicCollection2 = req.body.dynamicCollection2;

    for (
      let currentselected = 0;
      currentselected < selectedarr.length;
      currentselected++
    ) {
      const list = selarr[currentselected];
      const selected = selectedarr[currentselected];
      const data1 = await createModelForName(dynamicCollection2).aggregate([
        {
          $match: {
            any: {
              $elemMatch: {
                $and: [{ fieldname: selected }, { list: "na" }],
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            any: {
              $filter: {
                input: "$any",
                as: "any",
                cond: {
                  $and: [
                    { $eq: ["$$any.fieldname", "email"] },
                    { $eq: ["$$any.list", "na"] },
                  ],
                },
              },
            },
          },
        },
      ]);

      if (data1.length > 0) {
        const data = await createModelForName(dynamicCollection2).updateOne(
          {
            id,
            any: {
              $elemMatch: {
                fieldname: selected,
              },
            },
          },
          {
            $set: {
              "any.$[outer].list": list,
            },
          },
          {
            arrayFilters: [
              {
                "outer.fieldname": selected,
              },
            ],
          }
        );
      }
    }
    return res.status(200).json(["data imported"]);
  } catch (err) {
    res.status(500).send({
      message: "Error updating",
    });
  }
};

//Check Process name
exports.findDataWithProcessName = async (req, res) => {
  try {
    var cm_id = req.body.cm_id;
    var status = "active"
    const data = await Sheets.find({
      cm_id, status
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json("error");
  }
};

exports.findDataWithProcessNameForManageSheet = async (req, res) => {
  try {
    var cm_id = req.body.cm_id;
    const data = await Sheets.find({
      cm_id
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
    const data = await Sheets.findByIdAndUpdate(
      id, {
      status
    }, {
      useFindAndModify: false
    }
    );
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: "Error updating",
    });
  }
};

//Upload file
exports.uploaddataCdr = async (req, res) => {
  const dynamicCollection = req.body.dynamicCollection;
  const collectionname = req.body.dynamicCollection
  var cm_id = req.body.cm_id
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
      jsonObj.slice(1).map(async (element) => {
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
          cmid: cm_id,
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
  const collectionname = req.body.dynamicCollection
  var cm_id = req.body.cm_id
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
      jsonObj.slice(1).map(async (element) => {

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
          cmid: cm_id,
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
    var newSheetDetails = await new Ryg_master({
      process: req.body.process,
      cm_id: req.body.cm_id,
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
    var cm_id = req.body.cm_id;
    var data = await Ryg_master.findOne({
      cm_id
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

    const data = await Ryg_master.findByIdAndUpdate(
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
      message: "Error updating",
    });
  }
};

//MIS Report
exports.getMisReport = async (req, res) => {
  try {
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    var data = await Responce.find({
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

//Join cdr and tag dump data.
exports.MappingCdrAndTaggingDataJoin = async (req, res) => {
  try {
   
    const mapping = req.body.to
    const collectionname = req.body.collectionname
    const document = await createModelForName1(
      mapping
    ).aggregate(
      [
        {
          '$lookup': {
            'from': req.body.from, 
            'localField': req.body.local, 
            'foreignField': req.body.foreign, 
            'as': 'new'
          }
        }, {
          '$unwind': {
            'path': '$new'
          }
        }, {
          '$project': {
            'A': '$A', 
            'B': '$B', 
            'C': '$C', 
            'D': '$D', 
            'E': '$E', 
            'F': '$F', 
            'G': '$G', 
            'H': '$H', 
            'I': '$I', 
            'J': '$J', 
            'K': '$new.A', 
            'L': '$new.B', 
            'M': '$new.C', 
            'N': '$new.D', 
            'O': '$new.E', 
            'P': '$new.F', 
            'Q': '$new.G', 
            'R': '$new.H', 
            'S': '$new.I', 
            'T': '$new.J', 
            'cmid': 1
          }
        }
      ])

    await createModelForNameMapping(collectionname).deleteMany({});
    await createModelForNameMapping(collectionname).insertMany(document, (err, result) => {
      if (result) {
        return res.status(200).json(result);
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

var establishedModelsMappingMain = {};

function createModelForNameMapping(collectionname) {
  if (!(collectionname in establishedModelsMappingMain)) {
    var Any = new Schema({
      A: {type: String},
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
      delId: {
        type: String
      },
    }, {
      timestamps: true
    });
    establishedModelsMappingMain[collectionname] = mongoose.model(
      collectionname,
      Any
    );
  }
  return establishedModelsMappingMain[collectionname];
}

//Save mapped data Assigning Criteria
exports.createMappedAssigningData = async (req, res) => {
  try {
    // Create
    var newAssigningDetails = await new Column_assignment({
      cm_id: req.body.cmid,
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
      N:{
        type:String
      },
      O:{
        type:String
      },
      P:{
        type:String
      },
      Q:{
        type:String
      },
      R:{
        type:String
      },
      S:{
        type:String
      },
      T:{
        type:String
      },
      delId:{
        type:String
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
    var doc = await createModelForNameMapping(req.body.collectionname).find().limit(10)
    return res.status(200).json(doc)
  } catch (error) {
    return res.status(500).json(error)
  }
}

//Count of data after join
exports.findDataJoinCount = async (req, res) => {
  try {
    var doc = await createModelForNameMapping(req.body.collectionname).find().count()
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
    const cm_id = req.body.cm_id
    var acht1 = req.body.acht1;
    var acht11 = req.body.acht11;
    var acht2 = req.body.acht2;
    var acht22 = req.body.acht22;
    var acht3 = req.body.acht3;
    var acht33 = req.body.acht33;
    var acht4 = req.body.acht4;
    var acht44 = req.body.acht44;
    const document = await Column_assignment.find({cm_id:{$in:cm_id}}).sort({ _id: -1 })
    var x = (document[0].acht);
    var y = (document[0].collectionname)

    var ff = "$" + x
    if (dynamicCollectionName === y) {
      const doc = await createModelForNameMapping(dynamicCollectionName).aggregate([
        {$addFields: {
          inMilliseconds: {
           $subtract: [
              (new Date()),
            '$createdAt'
           ]
          }
         }}, {$addFields: {
          inDays: {
           $floor: {
            $divide: [
             '$inMilliseconds',
             86400000
            ]
           }
          }
         }},{
          $addFields: {
            "ageNumber": {
              $convert: {
                input: ff,
                to: "int",
                onError: 0
              }
            }
          }
        },
        {
          $match: {
            inDays: {
              $lte: 1
             },
             cmid: cm_id,
            $or: [
              {
                "ageNumber": {
                  "$gte": parseInt(acht1),
                  "$lte": parseInt(acht11)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht2),
                  "$lte": parseInt(acht22)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht3),
                  "$lte": parseInt(acht33)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht4),
                  "$lte": parseInt(acht44)
                }
              }
            ]
          }
        }
      ])

      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < doc.length; i++) {
      var filterData =  await new createModelForNameMapping(filterCollectionname)({
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
            K: doc[i]["K"],
            L: doc[i]["L"],
            M: doc[i]["M"],
            N: doc[i]["N"],
            O: doc[i]["O"],
            P: doc[i]["P"],
            Q: doc[i]["Q"],
            R: doc[i]["R"],
            S: doc[i]["S"],
            T: doc[i]["T"],
            cmid: doc[i]["cmid"],
            delId: doc[i]['_id'],
            new: doc[i]['new'],
      })
      await filterData.save(filterData);
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
    const cm_id = req.body.cm_id
    const document = await Column_assignment.find({cm_id:{$in:cm_id}}).sort({ _id: -1 })
    var y = (document[0].collectionname)
    const abc = (document[0].agentid);
    var zx = '$'+abc
    if (collectionname === y) {
      // const doc = await createModelForNameMapping(collectionname).distinct(abc)
      const doc = await createModelForNameMapping(collectionname).aggregate([{$addFields: {
        inMilliseconds: {
         $subtract: [
            (new Date()),
          '$createdAt'
         ]
        }
       }}, {$addFields: {
        inDays: {
         $floor: {
          $divide: [
           '$inMilliseconds',
           86400000
          ]
         }
        }
       }}, {$match: {
        inDays: {
         $lte: 1
        },
        cmid: cm_id
       }}, {$group: {
        _id: zx
       }}, {$project: {
        _id: 0,
        empId: '$_id'
       }}])
      
      var array = []
      for(var i = 0; i<doc.length ; i++){
        array.push(doc[i]['empId'])
      }
      return res.status(200).json(array)
    }

    return res.status(200).json("No data")
  } catch (error) {
    return res.status(500).json(error)
  }
}


exports.findDistinctCalltypes = async (req, res) => {
  try {
    const cm_id = req.body.cm_id
    const collectionname = req.body.collectionname;
    const document = await Column_assignment.find({cm_id:{$in:cm_id}}).sort({ _id: -1 })
    var y = (document[0].collectionname)
    const abc = (document[0].calltype);
    if (collectionname === y) {
      const z = "$" + abc
      var data = await createModelForNameMapping(collectionname).aggregate([{$addFields: {
        inMilliseconds: {
         $subtract: [
            (new Date()),
          '$createdAt'
         ]
        }
       }}, {$addFields: {
        inDays: {
         $floor: {
          $divide: [
           '$inMilliseconds',
           86400000
          ]
         }
        }
       }}, {$match: {
        inDays: {
         $lte: 1
        },
        cmid: cm_id
       }},
        { $group: { _id: z, count: { $sum: 1 } } }
      ], function (err, result) {
        if (err) throw err;
        res.status(201).json(result);
      });
    }

  } catch (error) {
    return res.status(500).json(error)
  }
}

exports.calltypesFilter = async (req, res) => {
  try {
    var collectionname = req.body.collectionname;
    var calltypeField = req.body.calltypeField
    var cm_id = req.body.cm_id
    const document = await Column_assignment.find({cm_id:{$in:cm_id}}).sort({ _id: -1 })
    var y = (document[0].collectionname)
    const fieldname = (document[0].calltype);
    if (collectionname === y) {
      const doc = await createModelForNameMapping(collectionname).find({
        [fieldname]: {
          $in: calltypeField
        }
      })
      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < doc.length; i++) {
      var filterData =  await new createModelForNameMapping(filterCollectionname)({
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
            K: doc[i]["K"],
            L: doc[i]["L"],
            M: doc[i]["M"],
            N: doc[i]["N"],
            O: doc[i]["O"],
            P: doc[i]["P"],
            Q: doc[i]["Q"],
            R: doc[i]["R"],
            S: doc[i]["S"],
            T: doc[i]["T"],
            cmid: doc[i]["cmid"],
            delId: doc[i]['_id'],
            new: doc[i]['new'],
      })
      await filterData.save(filterData);
    }

      return res.status(200).json(doc)
    }
    return res.status(200).json("No records!")
  } catch (error) {
    return res.status(500).json(error)
  }
}

exports.newHireApiNew = async (req, res) => {
  try {
    var collectionname = req.body.collectionname
    var cm_id = req.body.cm_id
    var agentId = req.body.agentId
    var target = req.body.target
    const document1 = await Column_assignment.find({cm_id:{$in:cm_id}}).sort({ _id: -1 })
    var y = (document1[0].collectionname)
    const fieldname = (document1[0].agentid);
    if (collectionname === y) {
      var field = "$" + fieldname

      const document = await createModelForNameMapping(collectionname).aggregate([
        {$addFields: {
          inMilliseconds: {
           $subtract: [
              (new Date()),
            '$createdAt'
           ]
          }
         }}, {$addFields: {
          inDays: {
           $floor: {
            $divide: [
             '$inMilliseconds',
             86400000
            ]
           }
          }
         }},
        {
          $match: {
            [fieldname]: { $in: agentId },
            inDays: {
              $lte: 1
             },
          }
        },
        {
          $group: {
            _id: field,
            data: {
              $push: "$$ROOT"
            }
          }
        },
        {
          $project: {
            data: {
              $slice: ["$data", parseInt(target)] // Limit the number of documents 
            }
          }
        },
        {
          $unwind: "$data"
        },
        {
          $replaceRoot: {
            newRoot: "$data"
          }
        }
      ]);
      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < document.length; i++) {
      var filterData =  await new createModelForNameMapping(filterCollectionname)({
            A: document[i]["A"],
            B: document[i]["B"],
            C: document[i]["C"],
            D: document[i]["D"],
            E: document[i]["E"],
            F: document[i]["F"],
            G: document[i]["G"],
            H: document[i]["H"],
            I: document[i]["I"],
            J: document[i]["J"],
            K: document[i]["K"],
            L: document[i]["L"],
            M: document[i]["M"],
            N: document[i]["N"],
            O: document[i]["O"],
            P: document[i]["P"],
            Q: document[i]["Q"],
            R: document[i]["R"],
            S: document[i]["S"],
            T: document[i]["T"],
            cmid: document[i]["cmid"],
            delId: document[i]['_id'],
            new: document[i]['new'],
      })
      await filterData.save(filterData);
    }
      return res.status(200).json(document)
    }
  }
  catch (error) {
    return res.status(500).json({
      error: "Error occured please try again",
    });
  }
}

//RYG Filtering 
exports.filterDataRyg = async (req, res) => {
  try {
    var score_consid = req.body.score_consid
    var collectionname = req.body.collectionname
    var cm_id = req.body.cm_id
    var dateNow = new Date(Date.now())
    var date1 = dateNow.toLocaleDateString("en-US");
    var dataScoreConsideration = []
    var redBucketAuditee = []
    var greenBucketAuditee = []
    var amberBucketAuditee = []
    var redBucketScore = []
    var amberBucketScore = []
    var greenBucketScore = []
    if (score_consid === 'month') {
      var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 30))
      var date2 = dateOld.toLocaleDateString("en-US");
      var avgFinalScore = await Responce.aggregate([{
        $match: {
          cm_id: cm_id,
          createdAt: {
            $gte: new Date(date2),
            $lte: new Date(date1)
          }
        }
      },
      {
        $addFields: {
          intFinalScore: {
            $convert: {
              input: '$finalScore',
              to: 'int',
              onError: 0
            }
          }
        }
      },
      {
        $group: {
          _id: '$auditee_id',
          Score: {
            $avg: '$intFinalScore'
          }
        }
      },
      {
        $project: {
          auditee_id: '$_id',
          Score: 1,
          _id: 0
        }
      }])
      dataScoreConsideration.push(avgFinalScore)
    }

    if (score_consid === 'week') {
      var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 7))
      var date2 = dateOld.toLocaleDateString("en-US");
      var avgFinalScore = await Responce.aggregate([{
        $match: {
          cm_id: cm_id,
          createdAt: {
            $gte: new Date(date2),
            $lte: new Date(date1)
          }
        }
      },
      {
        $addFields: {
          intFinalScore: {
            $convert: {
              input: '$finalScore',
              to: 'int',
              onError: 0
            }
          }
        }
      },
      {
        $group: {
          _id: '$auditee_id',
          Score: {
            $avg: '$intFinalScore'
          }
        }
      },
      {
        $project: {
          auditee_id: '$_id',
          Score: 1,
          _id: 0
        }
      }])
      dataScoreConsideration.push(avgFinalScore)
    }

    if (score_consid === 'fortnight') {
      var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 15))
      var date2 = dateOld.toLocaleDateString("en-US");
      var avgFinalScore = await Responce.aggregate([{
        $match: {
          cm_id: cm_id,
          createdAt: {
            $gte: new Date(date2),
            $lte: new Date(date1)
          }
        }
      },
      {
        $addFields: {
          intFinalScore: {
            $convert: {
              input: '$finalScore',
              to: 'int',
              onError: 0
            }
          }
        }
      },
      {
        $group: {
          _id: '$auditee_id',
          Score: {
            $avg: '$intFinalScore'
          }
        }
      },
      {
        $project: {
          auditee_id: '$_id',
          Score: 1,
          _id: 0
        }
      }])
      dataScoreConsideration.push(avgFinalScore)
    }
    var rygCmid = await Ryg_master.find({ cm_id: { $in: cm_id } }).sort({ _id: -1 })
    if (rygCmid.length > 0) {
      var redfrom = rygCmid[0].redfrom
      var redto = rygCmid[0].redto
      var greenfrom = rygCmid[0].greenfrom
      var greento = rygCmid[0].greento
      var amberfrom = rygCmid[0].amberfrom
      var amberto = rygCmid[0].amberto
    }

    if (dataScoreConsideration.length > 0) {
      dataScoreConsideration[0].map((el) => {
        if (el.Score >= redfrom && el.Score <= redto) {
          redBucketAuditee.push(el.auditee_id)
          redBucketScore.push(el.Score)
        } else if (el.Score >= greenfrom && el.Score <= greento) {
          greenBucketAuditee.push(el.auditee_id)
          greenBucketScore.push(el.Score)
        } else if (el.Score >= amberfrom && el.Score <= amberto) {
          amberBucketAuditee.push(el.auditee_id)
          amberBucketScore.push(el.Score)
        }
      })
    }

    var dataFromAmber = []
    var dataFromGreen = []
    var dataFromRed = []
    var flagred = req.body.flagred
    var flagamber = req.body.flagamber
    var flaggreen = req.body.flaggreen
    var countRed = req.body.buckfield2
    var countGreen = req.body.buckfield4
    var countAmber = req.body.buckfield3

    const document1 = await Column_assignment.find({cm_id:{$in:cm_id}}).sort({ _id: -1 })
    var y = (document1[0].collectionname)
    const fieldname = (document1[0].agentid);
    if (collectionname === y) {
      var field = "$" + fieldname

      if (flagred === "1") {
        const documentred = await createModelForNameMapping(collectionname).aggregate([
          {$addFields: {
            inMilliseconds: {
             $subtract: [
                (new Date()),
              '$createdAt'
             ]
            }
           }}, {$addFields: {
            inDays: {
             $floor: {
              $divide: [
               '$inMilliseconds',
               86400000
              ]
             }
            }
           }},
          {
            $match: {
              [fieldname]: { $in: redBucketAuditee },
              inDays: {
                $lte: 1
               },
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countRed)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromRed.push(documentred)

      }

      if (flagamber === "1") {
        const documentamber = await createModelForNameMapping(collectionname).aggregate([
          {$addFields: {
            inMilliseconds: {
             $subtract: [
                (new Date()),
              '$createdAt'
             ]
            }
           }}, {$addFields: {
            inDays: {
             $floor: {
              $divide: [
               '$inMilliseconds',
               86400000
              ]
             }
            }
           }},
          {
            $match: {
              [fieldname]: { $in: amberBucketAuditee }
            },
            inDays: {
              $lte: 1
             },
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countAmber)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromAmber.push(documentamber)

      }
      if (flaggreen === "1") {
        const documentgreen = await createModelForNameMapping(collectionname).aggregate([
          {$addFields: {
            inMilliseconds: {
             $subtract: [
                (new Date()),
              '$createdAt'
             ]
            }
           }}, {$addFields: {
            inDays: {
             $floor: {
              $divide: [
               '$inMilliseconds',
               86400000
              ]
             }
            }
           }},
          {
            $match: {
              [fieldname]: { $in: greenBucketAuditee },
              inDays: {
                $lte: 1
               },
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countGreen)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromGreen.push(documentgreen)

      }
    }
    if (dataFromAmber.length > 0 && dataFromRed.length > 0 && dataFromGreen.length > 0) {

      var bucketFilteredArray = [...dataFromRed[0], ...dataFromAmber[0], ...dataFromGreen[0]];
      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterData =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['_id'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterData.save(filterData);
    }
      return res.status(200).json(bucketFilteredArray), false

    }
    if (dataFromAmber.length > 0 && dataFromRed.length > 0) {
      var bucketFilteredArray = [...dataFromRed[0], ...dataFromAmber[0]];
      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterData =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['_id'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterData.save(filterData);
    }
      return res.status(200).json(bucketFilteredArray), false
    }
    if (dataFromRed.length > 0 && dataFromGreen.length > 0) {
      var bucketFilteredArray = [...dataFromRed[0], ...dataFromGreen[0]];
      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterData =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['_id'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterData.save(filterData);
    }
      return res.status(200).json(bucketFilteredArray), false
    }
    if (dataFromAmber.length > 0 && dataFromGreen.length > 0) {

      var bucketFilteredArray = [...dataFromAmber[0], ...dataFromGreen[0]];
      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterData =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['_id'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterData.save(filterData);
    }
      return res.status(200).json(bucketFilteredArray), false

    }
    if (dataFromAmber.length > 0) {
      var bucketFilteredArray = [...dataFromAmber[0]];
      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterData =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['_id'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterData.save(filterData);
    }
      return res.status(200).json(bucketFilteredArray), false
    }
    if (dataFromGreen.length > 0) {
      var bucketFilteredArray = [...dataFromGreen[0]];
      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterData =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['_id'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterData.save(filterData);
    }
      return res.status(200).json(bucketFilteredArray), false
    }
    if (dataFromRed.length > 0) {
      var bucketFilteredArray = [...dataFromRed[0]];
      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterData =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['_id'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterData.save(filterData);
    }
      return res.status(200).json(bucketFilteredArray), false
    }
    bucketFilteredArray = [];
    return res.status(200).json(bucketFilteredArray);
  }
  catch (error) {
    return res.status(500).json(error);
  }
}

//ACHT and Calltype Filter
exports.achtAndCalltypeDataFilter = async (req, res) => {
  try {
    const dynamicCollectionName = req.body.dynamicCollectionName;
    const collectionname = req.body.collectionname
    const cm_id = req.body.cm_id
    var acht1 = req.body.acht1;
    var acht11 = req.body.acht11;
    var acht2 = req.body.acht2;
    var acht22 = req.body.acht22;
    var acht3 = req.body.acht3;
    var acht33 = req.body.acht33;
    var acht4 = req.body.acht4;
    var acht44 = req.body.acht44;
    //for calltype filter
    var calltypeField = req.body.calltypeField

    const document = await Column_assignment.find({cm_id:{$in:cm_id}}).sort({ _id: -1 })
    var x = (document[0].acht);
    var y = (document[0].collectionname)
    const fieldname = (document[0].calltype);
    var ff = "$" + x
    if (dynamicCollectionName === y) {
      const doc = await createModelForNameMapping(dynamicCollectionName).aggregate([
        {
          $addFields: {
            "ageNumber": {
              $convert: {
                input: ff,
                to: "int",
                onError: 0
              }
            }
          }
        },
        {
          $match: {
            $or: [
              {
                "ageNumber": {
                  "$gte": parseInt(acht1),
                  "$lte": parseInt(acht11)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht2),
                  "$lte": parseInt(acht22)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht3),
                  "$lte": parseInt(acht33)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht4),
                  "$lte": parseInt(acht44)
                }
              }
            ]
          }
        }
      ])
      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < doc.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
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
            K: doc[i]["K"],
            L: doc[i]["L"],
            M: doc[i]["M"],
            N: doc[i]["N"],
            O: doc[i]["O"],
            P: doc[i]["P"],
            Q: doc[i]["Q"],
            R: doc[i]["R"],
            S: doc[i]["S"],
            T: doc[i]["T"],
            cmid: doc[i]["cmid"],
            delId: doc[i]['_id'],
            new: doc[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }
      const docCalltype = await createModelForNameMapping(filterCollectionname).find({
        [fieldname]: {
          $in: calltypeField
        }
      })
    
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < docCalltype.length; i++) {
      var filterCopy1 =  await new createModelForNameMapping(filterCollectionname)({
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
            K: docCalltype[i]["K"],
            L: docCalltype[i]["L"],
            M: docCalltype[i]["M"],
            N: docCalltype[i]["N"],
            O: docCalltype[i]["O"],
            P: docCalltype[i]["P"],
            Q: docCalltype[i]["Q"],
            R: docCalltype[i]["R"],
            S: docCalltype[i]["S"],
            T: docCalltype[i]["T"],
            cmid: docCalltype[i]["cmid"],
            delId: docCalltype[i]['delId'],
            new: docCalltype[i]['new'],
      })
      await filterCopy1.save(filterCopy1);
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
//ACHT and new hire Filter
exports.achtAndNewHireDataFilter = async (req, res) => {
  try {
    const dynamicCollectionName = req.body.dynamicCollectionName;
    const collectionname = req.body.collectionname
    const cm_id = req.body.cm_id
    var acht1 = req.body.acht1;
    var acht11 = req.body.acht11;
    var acht2 = req.body.acht2;
    var acht22 = req.body.acht22;
    var acht3 = req.body.acht3;
    var acht33 = req.body.acht33;
    var acht4 = req.body.acht4;
    var acht44 = req.body.acht44;

    const document = await Column_assignment.find({cm_id:{$in:cm_id}}).sort({ _id: -1 })
    var x = (document[0].acht);
    var y = (document[0].collectionname)
    const agentfieldname = (document[0].agentid);
    var ff = "$" + x
    if (dynamicCollectionName === y) {
      const doc = await createModelForNameMapping(dynamicCollectionName).aggregate([
        {$addFields: {
          inMilliseconds: {
           $subtract: [
              (new Date()),
            '$createdAt'
           ]
          }
         }}, {$addFields: {
          inDays: {
           $floor: {
            $divide: [
             '$inMilliseconds',
             86400000
            ]
           }
          }
         }},{
          $addFields: {
            "ageNumber": {
              $convert: {
                input: ff,
                to: "int",
                onError: 0
              }
            }
          }
        },
        {
          $match: {
            inDays: {
              $lte: 1
             },
            $or: [
              {
                "ageNumber": {
                  "$gte": parseInt(acht1),
                  "$lte": parseInt(acht11)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht2),
                  "$lte": parseInt(acht22)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht3),
                  "$lte": parseInt(acht33)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht4),
                  "$lte": parseInt(acht44)
                }
              }
            ]
          }
        }
      ])
      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < doc.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
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
            K: doc[i]["K"],
            L: doc[i]["L"],
            M: doc[i]["M"],
            N: doc[i]["N"],
            O: doc[i]["O"],
            P: doc[i]["P"],
            Q: doc[i]["Q"],
            R: doc[i]["R"],
            S: doc[i]["S"],
            T: doc[i]["T"],
            cmid: doc[i]["cmid"],
            delId: doc[i]['_id'],
            new: doc[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }
      //for New hire 
      var field = "$" + agentfieldname
      var agentId = req.body.agentId
      var target = req.body.target
      const documentNewhire = await createModelForNameMapping(filterCollectionname).aggregate([
        {
          $match: {
            [agentfieldname]: { $in: agentId }
          }
        },
        {
          $group: {
            _id: field,
            data: {
              $push: "$$ROOT"
            }
          }
        },
        {
          $project: {
            data: {
              $slice: ["$data", parseInt(target)] // Limit the number of documents 
            }
          }
        },
        {
          $unwind: "$data"
        },
        {
          $replaceRoot: {
            newRoot: "$data"
          }
        }
      ]);
    
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < documentNewhire.length; i++) {
      var filterCopy1 =  await new createModelForNameMapping(filterCollectionname)({
            A: documentNewhire[i]["A"],
            B: documentNewhire[i]["B"],
            C: documentNewhire[i]["C"],
            D: documentNewhire[i]["D"],
            E: documentNewhire[i]["E"],
            F: documentNewhire[i]["F"],
            G: documentNewhire[i]["G"],
            H: documentNewhire[i]["H"],
            I: documentNewhire[i]["I"],
            J: documentNewhire[i]["J"],
            K: documentNewhire[i]["K"],
            L: documentNewhire[i]["L"],
            M: documentNewhire[i]["M"],
            N: documentNewhire[i]["N"],
            O: documentNewhire[i]["O"],
            P: documentNewhire[i]["P"],
            Q: documentNewhire[i]["Q"],
            R: documentNewhire[i]["R"],
            S: documentNewhire[i]["S"],
            T: documentNewhire[i]["T"],
            cmid: documentNewhire[i]["cmid"],
            delId: documentNewhire[i]['delId'],
            new: documentNewhire[i]['new'],
      })
      await filterCopy1.save(filterCopy1);
    }
      return res.status(200).json(documentNewhire)
    }

    return res.status(200).json("Collection name doesn't exist.")
  } catch (error) {
    return res.status(500).json({
      error: "Error occured please try again",
    });
  }
}
//ACHT and bucket Filter
exports.achtAndBucketDataFilter = async (req, res) => {
  try {
    const dynamicCollectionName = req.body.dynamicCollectionName;
    const collectionname = req.body.collectionname
    const cm_id = req.body.cm_id
    var acht1 = req.body.acht1;
    var acht11 = req.body.acht11;
    var acht2 = req.body.acht2;
    var acht22 = req.body.acht22;
    var acht3 = req.body.acht3;
    var acht33 = req.body.acht33;
    var acht4 = req.body.acht4;
    var acht44 = req.body.acht44;

    const document = await Column_assignment.find({cm_id:{$in:cm_id}}).sort({ _id: -1 })
    var x = (document[0].acht);
    var y = (document[0].collectionname)
    const agentfieldname = (document[0].agentid);
    var ff = "$" + x
    if (dynamicCollectionName === y) {
      const doc = await createModelForNameMapping(dynamicCollectionName).aggregate([
        {$addFields: {
          inMilliseconds: {
           $subtract: [
              (new Date()),
            '$createdAt'
           ]
          }
         }}, {$addFields: {
          inDays: {
           $floor: {
            $divide: [
             '$inMilliseconds',
             86400000
            ]
           }
          }
         }}, {
          $addFields: {
            "ageNumber": {
              $convert: {
                input: ff,
                to: "int",
                onError: 0
              }
            }
          }
        },
        {
          $match: {
            inDays: {
              $lte: 1
             },
            $or: [
              {
                "ageNumber": {
                  "$gte": parseInt(acht1),
                  "$lte": parseInt(acht11)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht2),
                  "$lte": parseInt(acht22)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht3),
                  "$lte": parseInt(acht33)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht4),
                  "$lte": parseInt(acht44)
                }
              }
            ]
          }
        }
      ])
      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < doc.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
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
            K: doc[i]["K"],
            L: doc[i]["L"],
            M: doc[i]["M"],
            N: doc[i]["N"],
            O: doc[i]["O"],
            P: doc[i]["P"],
            Q: doc[i]["Q"],
            R: doc[i]["R"],
            S: doc[i]["S"],
            T: doc[i]["T"],
            cmid: doc[i]["cmid"],
            delId: doc[i]['_id'],
            new: doc[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }

      //for RYG bucket
      var score_consid = req.body.score_consid
      var dateNow = new Date(Date.now())
      var date1 = dateNow.toLocaleDateString("en-US");
      var dataScoreConsideration = []
      var redBucketAuditee = []
      var greenBucketAuditee = []
      var amberBucketAuditee = []
      var redBucketScore = []
      var amberBucketScore = []
      var greenBucketScore = []

      if (score_consid === 'month') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 30))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }

      if (score_consid === 'week') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 7))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }

      if (score_consid === 'fortnight') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 15))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }
      var rygCmid = await Ryg_master.find({ cm_id: { $in: cm_id } }).sort({ _id: -1 })
      if (rygCmid.length > 0) {
        var redfrom = rygCmid[0].redfrom
        var redto = rygCmid[0].redto
        var greenfrom = rygCmid[0].greenfrom
        var greento = rygCmid[0].greento
        var amberfrom = rygCmid[0].amberfrom
        var amberto = rygCmid[0].amberto
      }

      if (dataScoreConsideration.length > 0) {
        dataScoreConsideration[0].map((el) => {
          if (el.Score >= redfrom && el.Score <= redto) {
            redBucketAuditee.push(el.auditee_id)
            redBucketScore.push(el.Score)
          } else if (el.Score >= greenfrom && el.Score <= greento) {
            greenBucketAuditee.push(el.auditee_id)
            greenBucketScore.push(el.Score)
          } else if (el.Score >= amberfrom && el.Score <= amberto) {
            amberBucketAuditee.push(el.auditee_id)
            amberBucketScore.push(el.Score)
          }
        })
      }

      var dataFromAmber = []
      var dataFromGreen = []
      var dataFromRed = []
      var flagred = req.body.flagred
      var flagamber = req.body.flagamber
      var flaggreen = req.body.flaggreen
      var countRed = req.body.buckfield2
      var countGreen = req.body.buckfield4
      var countAmber = req.body.buckfield3

      var field = "$" + agentfieldname

      if (flagred === "1") {
        const documentred = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: redBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countRed)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromRed.push(documentred)

      }

      if (flagamber === "1") {
        const documentamber = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: amberBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countAmber)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromAmber.push(documentamber)

      }
      if (flaggreen === "1") {
        const documentgreen = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: greenBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countGreen)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromGreen.push(documentgreen)

      }

      if (dataFromAmber.length > 0 && dataFromRed.length > 0 && dataFromGreen.length > 0) {

        var bucketFilteredArray = [...dataFromRed[0], ...dataFromAmber[0], ...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }


        return res.status(200).json(bucketFilteredArray), false

      }
      if (dataFromAmber.length > 0 && dataFromRed.length > 0) {
        var bucketFilteredArray = [...dataFromRed[0], ...dataFromAmber[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromRed.length > 0 && dataFromGreen.length > 0) {
        var bucketFilteredArray = [...dataFromRed[0], ...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromAmber.length > 0 && dataFromGreen.length > 0) {

        var bucketFilteredArray = [...dataFromAmber[0], ...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false

      }
      if (dataFromAmber.length > 0) {
        var bucketFilteredArray = [...dataFromAmber[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromGreen.length > 0) {
        var bucketFilteredArray = [...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromRed.length > 0) {
        var bucketFilteredArray = [...dataFromRed[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      bucketFilteredArray = [];
      return res.status(200).json(bucketFilteredArray);
    }

    return res.status(200).json("Collection name doesn't exist.")
  } catch (error) {
    return res.status(500).json({
      error: "Error occured please try again",
    });
  }
}
//new hire and bucket Filter
exports.newHireAndBucketDataFilter = async (req, res) => {
  try {
    var collectionname = req.body.collectionname
    var cm_id = req.body.cm_id
    var agentId = req.body.agentId
    var target = req.body.target

    const document = await Column_assignment.find({cm_id:{$in:cm_id}}).sort({ _id: -1 })
    var x = (document[0].acht);
    var y = (document[0].collectionname)
    const agentfieldname = (document[0].agentid);

    var ff = "$" + x
    if (collectionname === y) {
      var field = "$" + agentfieldname

      const document = await createModelForNameMapping(collectionname).aggregate([
        {$addFields: {
          inMilliseconds: {
           $subtract: [
              (new Date()),
            '$createdAt'
           ]
          }
         }}, {$addFields: {
          inDays: {
           $floor: {
            $divide: [
             '$inMilliseconds',
             86400000
            ]
           }
          }
         }},{
          $match: {
            [agentfieldname]: { $in: agentId },
            inDays: {
              $lte: 1
             },
          }
        },
        {
          $group: {
            _id: field,
            data: {
              $push: "$$ROOT"
            }
          }
        },
        {
          $project: {
            data: {
              $slice: ["$data", parseInt(target)] // Limit the number of documents 
            }
          }
        },
        {
          $unwind: "$data"
        },
        {
          $replaceRoot: {
            newRoot: "$data"
          }
        }
      ]);
      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < document.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: document[i]["A"],
            B: document[i]["B"],
            C: document[i]["C"],
            D: document[i]["D"],
            E: document[i]["E"],
            F: document[i]["F"],
            G: document[i]["G"],
            H: document[i]["H"],
            I: document[i]["I"],
            J: document[i]["J"],
            K: document[i]["K"],
            L: document[i]["L"],
            M: document[i]["M"],
            N: document[i]["N"],
            O: document[i]["O"],
            P: document[i]["P"],
            Q: document[i]["Q"],
            R: document[i]["R"],
            S: document[i]["S"],
            T: document[i]["T"],
            cmid: document[i]["cmid"],
            delId: document[i]['_id'],
            new: document[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }

      //for RYG bucket
      var score_consid = req.body.score_consid
      var cm_id = req.body.cm_id
      var dateNow = new Date(Date.now())
      var date1 = dateNow.toLocaleDateString("en-US");
      var dataScoreConsideration = []
      var redBucketAuditee = []
      var greenBucketAuditee = []
      var amberBucketAuditee = []
      var redBucketScore = []
      var amberBucketScore = []
      var greenBucketScore = []

      if (score_consid === 'month') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 30))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }

      if (score_consid === 'week') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 7))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }

      if (score_consid === 'fortnight') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 15))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }
      var rygCmid = await Ryg_master.find({ cm_id: { $in: cm_id } }).sort({ _id: -1 })
      if (rygCmid.length > 0) {
        var redfrom = rygCmid[0].redfrom
        var redto = rygCmid[0].redto
        var greenfrom = rygCmid[0].greenfrom
        var greento = rygCmid[0].greento
        var amberfrom = rygCmid[0].amberfrom
        var amberto = rygCmid[0].amberto
      }

      if (dataScoreConsideration.length > 0) {
        dataScoreConsideration[0].map((el) => {
          if (el.Score >= redfrom && el.Score <= redto) {
            redBucketAuditee.push(el.auditee_id)
            redBucketScore.push(el.Score)
          } else if (el.Score >= greenfrom && el.Score <= greento) {
            greenBucketAuditee.push(el.auditee_id)
            greenBucketScore.push(el.Score)
          } else if (el.Score >= amberfrom && el.Score <= amberto) {
            amberBucketAuditee.push(el.auditee_id)
            amberBucketScore.push(el.Score)
          }
        })
      }

      var dataFromAmber = []
      var dataFromGreen = []
      var dataFromRed = []
      var flagred = req.body.flagred
      var flagamber = req.body.flagamber
      var flaggreen = req.body.flaggreen
      var countRed = req.body.buckfield2
      var countGreen = req.body.buckfield4
      var countAmber = req.body.buckfield3

      var field = "$" + agentfieldname

      if (flagred === "1") {
        const documentred = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: redBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countRed)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromRed.push(documentred)

      }

      if (flagamber === "1") {
        const documentamber = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: amberBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countAmber)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromAmber.push(documentamber)

      }
      if (flaggreen === "1") {
        const documentgreen = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: greenBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countGreen)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromGreen.push(documentgreen)

      }

      if (dataFromAmber.length > 0 && dataFromRed.length > 0 && dataFromGreen.length > 0) {

        var bucketFilteredArray = [...dataFromRed[0], ...dataFromAmber[0], ...dataFromGreen[0]];

        const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['delId'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }
        return res.status(200).json(bucketFilteredArray), false

      }
      if (dataFromAmber.length > 0 && dataFromRed.length > 0) {
        var bucketFilteredArray = [...dataFromRed[0], ...dataFromAmber[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromRed.length > 0 && dataFromGreen.length > 0) {
        var bucketFilteredArray = [...dataFromRed[0], ...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromAmber.length > 0 && dataFromGreen.length > 0) {

        var bucketFilteredArray = [...dataFromAmber[0], ...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false

      }
      if (dataFromAmber.length > 0) {
        var bucketFilteredArray = [...dataFromAmber[0]];
        const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['delId'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromGreen.length > 0) {
        var bucketFilteredArray = [...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromRed.length > 0) {
        var bucketFilteredArray = [...dataFromRed[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      bucketFilteredArray = [];
      return res.status(200).json(bucketFilteredArray);
    }

    return res.status(200).json("Collection name doesn't exist.")
  } catch (error) {
    return res.status(500).json({
      error: "Error occured please try again",
    });
  }
}
//new hire and calltype Filter
exports.newHireAndCalltypeDataFilter = async (req, res) => {
  try {
    var collectionname = req.body.collectionname
    var cm_id = req.body.cm_id
    var agentId = req.body.agentId
    var target = req.body.target
    const document1 = await Column_assignment.find({cm_id:{$in:cm_id}}).sort({ _id: -1 })
    var y = (document1[0].collectionname)
    const agentfieldname = (document1[0].agentid);
    const calltypefieldname = (document1[0].calltype);

    if (collectionname === y) {
      var field = "$" + agentfieldname

      const document = await createModelForNameMapping(collectionname).aggregate([
        {
          $match: {
            [agentfieldname]: { $in: agentId }
          }
        },
        {
          $group: {
            _id: field,
            data: {
              $push: "$$ROOT"
            }
          }
        },
        {
          $project: {
            data: {
              $slice: ["$data", parseInt(target)] // Limit the number of documents 
            }
          }
        },
        {
          $unwind: "$data"
        },
        {
          $replaceRoot: {
            newRoot: "$data"
          }
        }
      ]);
      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < document.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: document[i]["A"],
            B: document[i]["B"],
            C: document[i]["C"],
            D: document[i]["D"],
            E: document[i]["E"],
            F: document[i]["F"],
            G: document[i]["G"],
            H: document[i]["H"],
            I: document[i]["I"],
            J: document[i]["J"],
            K: document[i]["K"],
            L: document[i]["L"],
            M: document[i]["M"],
            N: document[i]["N"],
            O: document[i]["O"],
            P: document[i]["P"],
            Q: document[i]["Q"],
            R: document[i]["R"],
            S: document[i]["S"],
            T: document[i]["T"],
            cmid: document[i]["cmid"],
            delId: document[i]['_id'],
            new: document[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }
      //for Calltype
      var calltypeField = req.body.calltypeField

      const docCalltype = await createModelForNameMapping(filterCollectionname).find({
        [calltypefieldname]: {
          $in: calltypeField
        }
      })
    
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < docCalltype.length; i++) {
      var filterCopy1 =  await new createModelForNameMapping(filterCollectionname)({
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
            K: docCalltype[i]["K"],
            L: docCalltype[i]["L"],
            M: docCalltype[i]["M"],
            N: docCalltype[i]["N"],
            O: docCalltype[i]["O"],
            P: docCalltype[i]["P"],
            Q: docCalltype[i]["Q"],
            R: docCalltype[i]["R"],
            S: docCalltype[i]["S"],
            T: docCalltype[i]["T"],
            cmid: docCalltype[i]["cmid"],
            delId: docCalltype[i]['delId'],
            new: docCalltype[i]['new'],
      })
      await filterCopy1.save(filterCopy1);
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
//calltype and bucket Filter
exports.calltypeAndBucketDataFilter = async (req, res) => {
  try {
    var collectionname = req.body.collectionname;
    var cm_id = req.body.cm_id;
    var calltypeField = req.body.calltypeField

    const document = await Column_assignment.find({cm_id:{$in:cm_id}}).sort({ _id: -1 })
    var x = (document[0].acht);
    var y = (document[0].collectionname)
    const agentfieldname = (document[0].agentid);
    const fieldname = document[0].calltype
    var ff = "$" + x
    if (collectionname === y) {
      const doc = await createModelForNameMapping(collectionname).find({
        [fieldname]: {
          $in: calltypeField
        }
      })

      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < doc.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
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
            K: doc[i]["K"],
            L: doc[i]["L"],
            M: doc[i]["M"],
            N: doc[i]["N"],
            O: doc[i]["O"],
            P: doc[i]["P"],
            Q: doc[i]["Q"],
            R: doc[i]["R"],
            S: doc[i]["S"],
            T: doc[i]["T"],
            cmid: doc[i]["cmid"],
            delId: doc[i]['_id'],
            new: doc[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }

      //for RYG bucket
      var score_consid = req.body.score_consid
      var cm_id = req.body.cm_id
      var dateNow = new Date(Date.now())
      var date1 = dateNow.toLocaleDateString("en-US");
      var dataScoreConsideration = []
      var redBucketAuditee = []
      var greenBucketAuditee = []
      var amberBucketAuditee = []
      var redBucketScore = []
      var amberBucketScore = []
      var greenBucketScore = []

      if (score_consid === 'month') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 30))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }

      if (score_consid === 'week') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 7))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }

      if (score_consid === 'fortnight') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 15))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }
      var rygCmid = await Ryg_master.find({ cm_id: { $in: cm_id } }).sort({ _id: -1 })
      if (rygCmid.length > 0) {
        var redfrom = rygCmid[0].redfrom
        var redto = rygCmid[0].redto
        var greenfrom = rygCmid[0].greenfrom
        var greento = rygCmid[0].greento
        var amberfrom = rygCmid[0].amberfrom
        var amberto = rygCmid[0].amberto
      }

      if (dataScoreConsideration.length > 0) {
        dataScoreConsideration[0].map((el) => {
          if (el.Score >= redfrom && el.Score <= redto) {
            redBucketAuditee.push(el.auditee_id)
            redBucketScore.push(el.Score)
          } else if (el.Score >= greenfrom && el.Score <= greento) {
            greenBucketAuditee.push(el.auditee_id)
            greenBucketScore.push(el.Score)
          } else if (el.Score >= amberfrom && el.Score <= amberto) {
            amberBucketAuditee.push(el.auditee_id)
            amberBucketScore.push(el.Score)
          }
        })
      }

      var dataFromAmber = []
      var dataFromGreen = []
      var dataFromRed = []
      var flagred = req.body.flagred
      var flagamber = req.body.flagamber
      var flaggreen = req.body.flaggreen
      var countRed = req.body.buckfield2
      var countGreen = req.body.buckfield4
      var countAmber = req.body.buckfield3

      var field = "$" + agentfieldname

      if (flagred === "1") {
        const documentred = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: redBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countRed)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromRed.push(documentred)

      }

      if (flagamber === "1") {
        const documentamber = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: amberBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countAmber)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromAmber.push(documentamber)

      }
      if (flaggreen === "1") {
        const documentgreen = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: greenBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countGreen)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromGreen.push(documentgreen)

      }

      if (dataFromAmber.length > 0 && dataFromRed.length > 0 && dataFromGreen.length > 0) {

        var bucketFilteredArray = [...dataFromRed[0], ...dataFromAmber[0], ...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['delId'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }

        return res.status(200).json(bucketFilteredArray), false

      }
      if (dataFromAmber.length > 0 && dataFromRed.length > 0) {
        var bucketFilteredArray = [...dataFromRed[0], ...dataFromAmber[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromRed.length > 0 && dataFromGreen.length > 0) {
        var bucketFilteredArray = [...dataFromRed[0], ...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['delId'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromAmber.length > 0 && dataFromGreen.length > 0) {

        var bucketFilteredArray = [...dataFromAmber[0], ...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false

      }
      if (dataFromAmber.length > 0) {
        var bucketFilteredArray = [...dataFromAmber[0]];
        const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['delId'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromGreen.length > 0) {
        var bucketFilteredArray = [...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromRed.length > 0) {
        var bucketFilteredArray = [...dataFromRed[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      bucketFilteredArray = [];
      return res.status(200).json(bucketFilteredArray);
    }

    return res.status(200).json("Collection name doesn't exist.")
  } catch (error) {
    return res.status(500).json({
      error: "Error occured please try again",
    });
  }

}

//calltype and bucket Filter and acht and new hire
exports.calltypeAndBucketAndAchtAndNewHireDataFilter = async (req, res) => {
  try {
    var collectionname = req.body.collectionname;
    var cm_id = req.body.cm_id;
    var calltypeField = req.body.calltypeField

    const document = await Column_assignment.find({cm_id:{$in:cm_id}}).sort({ _id: -1 })
    var x = (document[0].acht);
    var y = (document[0].collectionname)
    const agentfieldname = (document[0].agentid);
    const fieldname = document[0].calltype
    var ff = "$" + x
    if (collectionname === y) {
      const doc = await createModelForNameMapping(collectionname).find({
        [fieldname]: {
          $in: calltypeField
        }
      })

      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < doc.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
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
            K: doc[i]["K"],
            L: doc[i]["L"],
            M: doc[i]["M"],
            N: doc[i]["N"],
            O: doc[i]["O"],
            P: doc[i]["P"],
            Q: doc[i]["Q"],
            R: doc[i]["R"],
            S: doc[i]["S"],
            T: doc[i]["T"],
            cmid: doc[i]["cmid"],
            delId: doc[i]['_id'],
            new: doc[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }

      //For Acht
      var acht1 = req.body.acht1;
      var acht11 = req.body.acht11;
      var acht2 = req.body.acht2;
      var acht22 = req.body.acht22;
      var acht3 = req.body.acht3;
      var acht33 = req.body.acht33;
      var acht4 = req.body.acht4;
      var acht44 = req.body.acht44;
      const docAcht = await createModelForNameMapping(filterCollectionname).aggregate([
        {
          $addFields: {
            "ageNumber": {
              $convert: {
                input: ff,
                to: "int",
                onError: 0
              }
            }
          }
        },
        {
          $match: {
            $or: [
              {
                "ageNumber": {
                  "$gte": parseInt(acht1),
                  "$lte": parseInt(acht11)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht2),
                  "$lte": parseInt(acht22)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht3),
                  "$lte": parseInt(acht33)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht4),
                  "$lte": parseInt(acht44)
                }
              }
            ]
          }
        }
      ])
   
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < docAcht.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: docAcht[i]["A"],
            B: docAcht[i]["B"],
            C: docAcht[i]["C"],
            D: docAcht[i]["D"],
            E: docAcht[i]["E"],
            F: docAcht[i]["F"],
            G: docAcht[i]["G"],
            H: docAcht[i]["H"],
            I: docAcht[i]["I"],
            J: docAcht[i]["J"],
            K: docAcht[i]["K"],
            L: docAcht[i]["L"],
            M: docAcht[i]["M"],
            N: docAcht[i]["N"],
            O: docAcht[i]["O"],
            P: docAcht[i]["P"],
            Q: docAcht[i]["Q"],
            R: docAcht[i]["R"],
            S: docAcht[i]["S"],
            T: docAcht[i]["T"],
            cmid: docAcht[i]["cmid"],
            delId: docAcht[i]['delId'],
            new: docAcht[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }


   //for New hire 
   var field = "$" + agentfieldname
   var agentId = req.body.agentId
   var target = req.body.target
   const documentNewhire = await createModelForNameMapping(filterCollectionname).aggregate([
     {
       $match: {
         [agentfieldname]: { $in: agentId }
       }
     },
     {
       $group: {
         _id: field,
         data: {
           $push: "$$ROOT"
         }
       }
     },
     {
       $project: {
         data: {
           $slice: ["$data", parseInt(target)] // Limit the number of documents 
         }
       }
     },
     {
       $unwind: "$data"
     },
     {
       $replaceRoot: {
         newRoot: "$data"
       }
     }
   ]);

   await createModelForNameMapping(filterCollectionname).deleteMany({});
   for (let i = 0; i < documentNewhire.length; i++) {
   var filterCopy1 =  await new createModelForNameMapping(filterCollectionname)({
         A: documentNewhire[i]["A"],
         B: documentNewhire[i]["B"],
         C: documentNewhire[i]["C"],
         D: documentNewhire[i]["D"],
         E: documentNewhire[i]["E"],
         F: documentNewhire[i]["F"],
         G: documentNewhire[i]["G"],
         H: documentNewhire[i]["H"],
         I: documentNewhire[i]["I"],
         J: documentNewhire[i]["J"],
         K: documentNewhire[i]["K"],
         L: documentNewhire[i]["L"],
         M: documentNewhire[i]["M"],
         N: documentNewhire[i]["N"],
         O: documentNewhire[i]["O"],
         P: documentNewhire[i]["P"],
         Q: documentNewhire[i]["Q"],
         R: documentNewhire[i]["R"],
         S: documentNewhire[i]["S"],
         T: documentNewhire[i]["T"],
         cmid: documentNewhire[i]["cmid"],
         delId: documentNewhire[i]['delId'],
         new: documentNewhire[i]['new'],
   })
   await filterCopy1.save(filterCopy1);
 }

      //for RYG bucket
      var score_consid = req.body.score_consid
      var cm_id = req.body.cm_id
      var dateNow = new Date(Date.now())
      var date1 = dateNow.toLocaleDateString("en-US");
      var dataScoreConsideration = []
      var redBucketAuditee = []
      var greenBucketAuditee = []
      var amberBucketAuditee = []
      var redBucketScore = []
      var amberBucketScore = []
      var greenBucketScore = []
   
      if (score_consid === 'month') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 30))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }

      if (score_consid === 'week') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 7))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }

      if (score_consid === 'fortnight') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 15))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }
      var rygCmid = await Ryg_master.find({ cm_id: { $in: cm_id } }).sort({ _id: -1 })
      if (rygCmid.length > 0) {
        var redfrom = rygCmid[0].redfrom
        var redto = rygCmid[0].redto
        var greenfrom = rygCmid[0].greenfrom
        var greento = rygCmid[0].greento
        var amberfrom = rygCmid[0].amberfrom
        var amberto = rygCmid[0].amberto
      }

      if (dataScoreConsideration.length > 0) {
        dataScoreConsideration[0].map((el) => {
          if (el.Score >= redfrom && el.Score <= redto) {
            redBucketAuditee.push(el.auditee_id)
            redBucketScore.push(el.Score)
          } else if (el.Score >= greenfrom && el.Score <= greento) {
            greenBucketAuditee.push(el.auditee_id)
            greenBucketScore.push(el.Score)
          } else if (el.Score >= amberfrom && el.Score <= amberto) {
            amberBucketAuditee.push(el.auditee_id)
            amberBucketScore.push(el.Score)
          }
        })
      }
    
      var dataFromAmber = []
      var dataFromGreen = []
      var dataFromRed = []
      var flagred = req.body.flagred
      var flagamber = req.body.flagamber
      var flaggreen = req.body.flaggreen
      var countRed = req.body.buckfield2
      var countGreen = req.body.buckfield4
      var countAmber = req.body.buckfield3

      var field = "$" + agentfieldname

      if (flagred === "1") {
        const documentred = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: redBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countRed)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromRed.push(documentred)
     
      }

      if (flagamber === "1") {
        const documentamber = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: amberBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countAmber)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromAmber.push(documentamber)

      }
      if (flaggreen === "1") {
        const documentgreen = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: greenBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countGreen)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromGreen.push(documentgreen)

      }
   
      if (dataFromAmber.length > 0 && dataFromRed.length > 0 && dataFromGreen.length > 0) {
      
        var bucketFilteredArray = [...dataFromRed[0], ...dataFromAmber[0], ...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['delId'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }
        return res.status(200).json(bucketFilteredArray)

      }
      if (dataFromAmber.length > 0 && dataFromRed.length > 0) {
   
        var bucketFilteredArray = [...dataFromRed[0], ...dataFromAmber[0]];
        const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['delId'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromRed.length > 0 && dataFromGreen.length > 0) {
        var bucketFilteredArray = [...dataFromRed[0], ...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromAmber.length > 0 && dataFromGreen.length > 0) {

        var bucketFilteredArray = [...dataFromAmber[0], ...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['delId'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }
        return res.status(200).json(bucketFilteredArray), false

      }
      if (dataFromAmber.length > 0) {
        var bucketFilteredArray = [...dataFromAmber[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromGreen.length > 0) {
        var bucketFilteredArray = [...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromRed.length > 0) {
        var bucketFilteredArray = [...dataFromRed[0]];
        const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['delId'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }

        return res.status(200).json(bucketFilteredArray), false
      }

return res.status(200).json(bucketFilteredArray);
    }
    return res.status(200).json("Collection name doesn't exist.")
  } catch (error) {
    return res.status(500).json({
      error: "Error occured please try again",
    });
  }
}

//calltype and bucket Filter and new hire
exports.calltypeAndBucketAndNewHireDataFilter = async (req, res) => {
  try {
    var collectionname = req.body.collectionname;
    var cm_id = req.body.cm_id;
    var calltypeField = req.body.calltypeField

    const document = await Column_assignment.find({cm_id:{$in:cm_id}}).sort({ _id: -1 })
    var x = (document[0].acht);
    var y = (document[0].collectionname)
    const agentfieldname = (document[0].agentid);
    const fieldname = document[0].calltype
    var ff = "$" + x
    if (collectionname === y) {
      const doc = await createModelForNameMapping(collectionname).find({
        [fieldname]: {
          $in: calltypeField
        }
      })

      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < doc.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
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
            K: doc[i]["K"],
            L: doc[i]["L"],
            M: doc[i]["M"],
            N: doc[i]["N"],
            O: doc[i]["O"],
            P: doc[i]["P"],
            Q: doc[i]["Q"],
            R: doc[i]["R"],
            S: doc[i]["S"],
            T: doc[i]["T"],
            cmid: doc[i]["cmid"],
            delId: doc[i]['_id'],
            new: doc[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }

      //for RYG bucket
      var score_consid = req.body.score_consid
      var cm_id = req.body.cm_id
      var dateNow = new Date(Date.now())
      var date1 = dateNow.toLocaleDateString("en-US");
      var dataScoreConsideration = []
      var redBucketAuditee = []
      var greenBucketAuditee = []
      var amberBucketAuditee = []
      var redBucketScore = []
      var amberBucketScore = []
      var greenBucketScore = []

      if (score_consid === 'month') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 30))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }

      if (score_consid === 'week') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 7))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }

      if (score_consid === 'fortnight') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 15))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }
      var rygCmid = await Ryg_master.find({ cm_id: { $in: cm_id } }).sort({ _id: -1 })
      if (rygCmid.length > 0) {
        var redfrom = rygCmid[0].redfrom
        var redto = rygCmid[0].redto
        var greenfrom = rygCmid[0].greenfrom
        var greento = rygCmid[0].greento
        var amberfrom = rygCmid[0].amberfrom
        var amberto = rygCmid[0].amberto
      }

      if (dataScoreConsideration.length > 0) {
        dataScoreConsideration[0].map((el) => {
          if (el.Score >= redfrom && el.Score <= redto) {
            redBucketAuditee.push(el.auditee_id)
            redBucketScore.push(el.Score)
          } else if (el.Score >= greenfrom && el.Score <= greento) {
            greenBucketAuditee.push(el.auditee_id)
            greenBucketScore.push(el.Score)
          } else if (el.Score >= amberfrom && el.Score <= amberto) {
            amberBucketAuditee.push(el.auditee_id)
            amberBucketScore.push(el.Score)
          }
        })
      }

      var dataFromAmber = []
      var dataFromGreen = []
      var dataFromRed = []
      var flagred = req.body.flagred
      var flagamber = req.body.flagamber
      var flaggreen = req.body.flaggreen
      var countRed = req.body.buckfield2
      var countGreen = req.body.buckfield4
      var countAmber = req.body.buckfield3

      var field = "$" + agentfieldname

      if (flagred === "1") {
        const documentred = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: redBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countRed)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromRed.push(documentred)

      }

      if (flagamber === "1") {
        const documentamber = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: amberBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countAmber)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromAmber.push(documentamber)

      }
      if (flaggreen === "1") {
        const documentgreen = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: greenBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countGreen)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromGreen.push(documentgreen)

      }

      if (dataFromAmber.length > 0 && dataFromRed.length > 0 && dataFromGreen.length > 0) {

        var bucketFilteredArray = [...dataFromRed[0], ...dataFromAmber[0], ...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }


        return res.status(200).json(bucketFilteredArray), false

      }
      if (dataFromAmber.length > 0 && dataFromRed.length > 0) {
        var bucketFilteredArray = [...dataFromRed[0], ...dataFromAmber[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromRed.length > 0 && dataFromGreen.length > 0) {
        var bucketFilteredArray = [...dataFromRed[0], ...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['delId'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromAmber.length > 0 && dataFromGreen.length > 0) {

        var bucketFilteredArray = [...dataFromAmber[0], ...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false

      }
      if (dataFromAmber.length > 0) {
        var bucketFilteredArray = [...dataFromAmber[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromGreen.length > 0) {
        var bucketFilteredArray = [...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['delId'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromRed.length > 0) {
        var bucketFilteredArray = [...dataFromRed[0]];
        const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['delId'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }
        return res.status(200).json(bucketFilteredArray), false
      }

      //for New hire 
      var field = "$" + agentfieldname
      var agentId = req.body.agentId
      var target = req.body.target
      const documentNewhire = await createModelForNameMapping(filterCollectionname).aggregate([
        {
          $match: {
            [agentfieldname]: { $in: agentId }
          }
        },
        {
          $group: {
            _id: field,
            data: {
              $push: "$$ROOT"
            }
          }
        },
        {
          $project: {
            data: {
              $slice: ["$data", parseInt(target)] // Limit the number of documents 
            }
          }
        },
        {
          $unwind: "$data"
        },
        {
          $replaceRoot: {
            newRoot: "$data"
          }
        }
      ]);
  
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < documentNewhire.length; i++) {
      var filterCopy1 =  await new createModelForNameMapping(filterCollectionname)({
            A: documentNewhire[i]["A"],
            B: documentNewhire[i]["B"],
            C: documentNewhire[i]["C"],
            D: documentNewhire[i]["D"],
            E: documentNewhire[i]["E"],
            F: documentNewhire[i]["F"],
            G: documentNewhire[i]["G"],
            H: documentNewhire[i]["H"],
            I: documentNewhire[i]["I"],
            J: documentNewhire[i]["J"],
            K: documentNewhire[i]["K"],
            L: documentNewhire[i]["L"],
            M: documentNewhire[i]["M"],
            N: documentNewhire[i]["N"],
            O: documentNewhire[i]["O"],
            P: documentNewhire[i]["P"],
            Q: documentNewhire[i]["Q"],
            R: documentNewhire[i]["R"],
            S: documentNewhire[i]["S"],
            T: documentNewhire[i]["T"],
            cmid: documentNewhire[i]["cmid"],
            delId: documentNewhire[i]['delId'],
            new: documentNewhire[i]['new'],
      })
      await filterCopy1.save(filterCopy1);
    }

      bucketFilteredArray = [];
      return res.status(200).json(documentNewhire);
    }

    return res.status(200).json("Collection name doesn't exist.")
  } catch (error) {
    return res.status(500).json({
      error: "Error occured please try again",
    });
  }

}
//new hire and bucket  and acht 
exports.achtAndBucketAndNewHireDataFilter = async (req, res) => {
  try {
    const dynamicCollectionName = req.body.dynamicCollectionName;
    const collectionname = req.body.collectionname
    const cm_id = req.body.cm_id
    var acht1 = req.body.acht1;
    var acht11 = req.body.acht11;
    var acht2 = req.body.acht2;
    var acht22 = req.body.acht22;
    var acht3 = req.body.acht3;
    var acht33 = req.body.acht33;
    var acht4 = req.body.acht4;
    var acht44 = req.body.acht44;

    const document = await Column_assignment.find({cm_id:{$in:cm_id}}).sort({ _id: -1 })
    var x = (document[0].acht);
    var y = (document[0].collectionname)
    const agentfieldname = (document[0].agentid);
    var ff = "$" + x
    if (collectionname === y) {

      const doc = await createModelForNameMapping(collectionname).aggregate([
        {$addFields: {
          inMilliseconds: {
           $subtract: [
              (new Date()),
            '$createdAt'
           ]
          }
         }}, {$addFields: {
          inDays: {
           $floor: {
            $divide: [
             '$inMilliseconds',
             86400000
            ]
           }
          }
         }},{
          $addFields: {
            "ageNumber": {
              $convert: {
                input: ff,
                to: "int",
                onError: 0
              }
            }
          }
        },
        {
          $match: {
            inDays: {
              $lte: 1
             },
            $or: [
              {
                "ageNumber": {
                  "$gte": parseInt(acht1),
                  "$lte": parseInt(acht11)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht2),
                  "$lte": parseInt(acht22)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht3),
                  "$lte": parseInt(acht33)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht4),
                  "$lte": parseInt(acht44)
                }
              }
            ]
          }
        }
      ])
      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < doc.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
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
            K: doc[i]["K"],
            L: doc[i]["L"],
            M: doc[i]["M"],
            N: doc[i]["N"],
            O: doc[i]["O"],
            P: doc[i]["P"],
            Q: doc[i]["Q"],
            R: doc[i]["R"],
            S: doc[i]["S"],
            T: doc[i]["T"],
            cmid: doc[i]["cmid"],
            delId: doc[i]['_id'],
            new: doc[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }

      //for RYG bucket
      var score_consid = req.body.score_consid
      var dateNow = new Date(Date.now())
      var date1 = dateNow.toLocaleDateString("en-US");
      var dataScoreConsideration = []
      var redBucketAuditee = []
      var greenBucketAuditee = []
      var amberBucketAuditee = []
      var redBucketScore = []
      var amberBucketScore = []
      var greenBucketScore = []

      if (score_consid === 'month') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 30))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }

      if (score_consid === 'week') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 7))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }

      if (score_consid === 'fortnight') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 15))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }
      var rygCmid = await Ryg_master.find({ cm_id: { $in: cm_id } }).sort({ _id: -1 })
      if (rygCmid.length > 0) {
        var redfrom = rygCmid[0].redfrom
        var redto = rygCmid[0].redto
        var greenfrom = rygCmid[0].greenfrom
        var greento = rygCmid[0].greento
        var amberfrom = rygCmid[0].amberfrom
        var amberto = rygCmid[0].amberto
      }

      if (dataScoreConsideration.length > 0) {
        dataScoreConsideration[0].map((el) => {
          if (el.Score >= redfrom && el.Score <= redto) {
            redBucketAuditee.push(el.auditee_id)
            redBucketScore.push(el.Score)
          } else if (el.Score >= greenfrom && el.Score <= greento) {
            greenBucketAuditee.push(el.auditee_id)
            greenBucketScore.push(el.Score)
          } else if (el.Score >= amberfrom && el.Score <= amberto) {
            amberBucketAuditee.push(el.auditee_id)
            amberBucketScore.push(el.Score)
          }
        })
      }

      var dataFromAmber = []
      var dataFromGreen = []
      var dataFromRed = []
      var flagred = req.body.flagred
      var flagamber = req.body.flagamber
      var flaggreen = req.body.flaggreen
      var countRed = req.body.buckfield2
      var countGreen = req.body.buckfield4
      var countAmber = req.body.buckfield3

      var field = "$" + agentfieldname

      if (flagred === "1") {
        const documentred = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: redBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countRed)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromRed.push(documentred)

      }

      if (flagamber === "1") {
        const documentamber = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: amberBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countAmber)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromAmber.push(documentamber)

      }
      if (flaggreen === "1") {
        const documentgreen = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: greenBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countGreen)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromGreen.push(documentgreen)

      }

      if (dataFromAmber.length > 0 && dataFromRed.length > 0 && dataFromGreen.length > 0) {

        var bucketFilteredArray = [...dataFromRed[0], ...dataFromAmber[0], ...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }


        return res.status(200).json(bucketFilteredArray), false

      }
      if (dataFromAmber.length > 0 && dataFromRed.length > 0) {
        var bucketFilteredArray = [...dataFromRed[0], ...dataFromAmber[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromRed.length > 0 && dataFromGreen.length > 0) {
        var bucketFilteredArray = [...dataFromRed[0], ...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromAmber.length > 0 && dataFromGreen.length > 0) {

        var bucketFilteredArray = [...dataFromAmber[0], ...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false

      }
      if (dataFromAmber.length > 0) {
        var bucketFilteredArray = [...dataFromAmber[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromGreen.length > 0) {
        var bucketFilteredArray = [...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromRed.length > 0) {
        var bucketFilteredArray = [...dataFromRed[0]];
        const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['delId'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }
        return res.status(200).json(bucketFilteredArray), false
      }
      //for New hire 
      var field = "$" + agentfieldname
      var agentId = req.body.agentId
      var target = req.body.target
      const documentNewhire = await createModelForNameMapping(filterCollectionname).aggregate([
        {
          $match: {
            [agentfieldname]: { $in: agentId }
          }
        },
        {
          $group: {
            _id: field,
            data: {
              $push: "$$ROOT"
            }
          }
        },
        {
          $project: {
            data: {
              $slice: ["$data", parseInt(target)] // Limit the number of documents 
            }
          }
        },
        {
          $unwind: "$data"
        },
        {
          $replaceRoot: {
            newRoot: "$data"
          }
        }
      ]);
  
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < documentNewhire.length; i++) {
      var filterCopy1 =  await new createModelForNameMapping(filterCollectionname)({
            A: documentNewhire[i]["A"],
            B: documentNewhire[i]["B"],
            C: documentNewhire[i]["C"],
            D: documentNewhire[i]["D"],
            E: documentNewhire[i]["E"],
            F: documentNewhire[i]["F"],
            G: documentNewhire[i]["G"],
            H: documentNewhire[i]["H"],
            I: documentNewhire[i]["I"],
            J: documentNewhire[i]["J"],
            K: documentNewhire[i]["K"],
            L: documentNewhire[i]["L"],
            M: documentNewhire[i]["M"],
            N: documentNewhire[i]["N"],
            O: documentNewhire[i]["O"],
            P: documentNewhire[i]["P"],
            Q: documentNewhire[i]["Q"],
            R: documentNewhire[i]["R"],
            S: documentNewhire[i]["S"],
            T: documentNewhire[i]["T"],
            cmid: documentNewhire[i]["cmid"],
            delId: documentNewhire[i]['delId'],
            new: documentNewhire[i]['new'],
      })
      await filterCopy1.save(filterCopy1);
    }
      bucketFilteredArray = [];
      return res.status(200).json(documentNewhire);
    }

    return res.status(200).json("Collection name doesn't exist.")
  } catch (error) {
    return res.status(500).json({
      error: "Error occured please try again",
    });
  }
}
//calltype and bucket  and acht 
exports.achtAndBucketAndCalltypeDataFilter = async (req, res) => {
  try {
    var collectionname = req.body.collectionname;
    var cm_id = req.body.cm_id;
    var calltypeField = req.body.calltypeField
 
    const document = await Column_assignment.find({cm_id:{$in:cm_id}}).sort({ _id: -1 })
    var x = (document[0].acht);
    var y = (document[0].collectionname)
    const agentfieldname = (document[0].agentid);
    const fieldname = document[0].calltype
    var ff = "$" + x
    if (collectionname === y) {
      const doc = await createModelForNameMapping(collectionname).find({
        [fieldname]: {
          $in: calltypeField
        }
      })

      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < doc.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
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
            K: doc[i]["K"],
            L: doc[i]["L"],
            M: doc[i]["M"],
            N: doc[i]["N"],
            O: doc[i]["O"],
            P: doc[i]["P"],
            Q: doc[i]["Q"],
            R: doc[i]["R"],
            S: doc[i]["S"],
            T: doc[i]["T"],
            cmid: doc[i]["cmid"],
            delId: doc[i]['_id'],
            new: doc[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }

      //For Acht
      var acht1 = req.body.acht1;
      var acht11 = req.body.acht11;
      var acht2 = req.body.acht2;
      var acht22 = req.body.acht22;
      var acht3 = req.body.acht3;
      var acht33 = req.body.acht33;
      var acht4 = req.body.acht4;
      var acht44 = req.body.acht44;
      const docAcht = await createModelForNameMapping(filterCollectionname).aggregate([
        {
          $addFields: {
            "ageNumber": {
              $convert: {
                input: ff,
                to: "int",
                onError: 0
              }
            }
          }
        },
        {
          $match: {
            $or: [
              {
                "ageNumber": {
                  "$gte": parseInt(acht1),
                  "$lte": parseInt(acht11)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht2),
                  "$lte": parseInt(acht22)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht3),
                  "$lte": parseInt(acht33)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht4),
                  "$lte": parseInt(acht44)
                }
              }
            ]
          }
        }
      ])
     
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < docAcht.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: docAcht[i]["A"],
            B: docAcht[i]["B"],
            C: docAcht[i]["C"],
            D: docAcht[i]["D"],
            E: docAcht[i]["E"],
            F: docAcht[i]["F"],
            G: docAcht[i]["G"],
            H: docAcht[i]["H"],
            I: docAcht[i]["I"],
            J: docAcht[i]["J"],
            K: docAcht[i]["K"],
            L: docAcht[i]["L"],
            M: docAcht[i]["M"],
            N: docAcht[i]["N"],
            O: docAcht[i]["O"],
            P: docAcht[i]["P"],
            Q: docAcht[i]["Q"],
            R: docAcht[i]["R"],
            S: docAcht[i]["S"],
            T: docAcht[i]["T"],
            cmid: docAcht[i]["cmid"],
            delId: docAcht[i]['delId'],
            new: docAcht[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }
      //for RYG bucket
      var score_consid = req.body.score_consid
      var cm_id = req.body.cm_id
      var dateNow = new Date(Date.now())
      var date1 = dateNow.toLocaleDateString("en-US");
      var dataScoreConsideration = []
      var redBucketAuditee = []
      var greenBucketAuditee = []
      var amberBucketAuditee = []
      var redBucketScore = []
      var amberBucketScore = []
      var greenBucketScore = []

      if (score_consid === 'month') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 30))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }

      if (score_consid === 'week') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 7))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }

      if (score_consid === 'fortnight') {
        var dateOld = new Date(dateNow.setDate(dateNow.getDate() - 15))
        var date2 = dateOld.toLocaleDateString("en-US");
        var avgFinalScore = await Responce.aggregate([{
          $match: {
            cm_id: cm_id,
            createdAt: {
              $gte: new Date(date2),
              $lte: new Date(date1)
            }
          }
        },
        {
          $addFields: {
            intFinalScore: {
              $convert: {
                input: '$finalScore',
                to: 'int',
                onError: 0
              }
            }
          }
        },
        {
          $group: {
            _id: '$auditee_id',
            Score: {
              $avg: '$intFinalScore'
            }
          }
        },
        {
          $project: {
            auditee_id: '$_id',
            Score: 1,
            _id: 0
          }
        }])
        dataScoreConsideration.push(avgFinalScore)
      }
      var rygCmid = await Ryg_master.find({ cm_id: { $in: cm_id } }).sort({ _id: -1 })
      if (rygCmid.length > 0) {
        var redfrom = rygCmid[0].redfrom
        var redto = rygCmid[0].redto
        var greenfrom = rygCmid[0].greenfrom
        var greento = rygCmid[0].greento
        var amberfrom = rygCmid[0].amberfrom
        var amberto = rygCmid[0].amberto
      }

      if (dataScoreConsideration.length > 0) {
        dataScoreConsideration[0].map((el) => {
          if (el.Score >= redfrom && el.Score <= redto) {
            redBucketAuditee.push(el.auditee_id)
            redBucketScore.push(el.Score)
          } else if (el.Score >= greenfrom && el.Score <= greento) {
            greenBucketAuditee.push(el.auditee_id)
            greenBucketScore.push(el.Score)
          } else if (el.Score >= amberfrom && el.Score <= amberto) {
            amberBucketAuditee.push(el.auditee_id)
            amberBucketScore.push(el.Score)
          }
        })
      }

      var dataFromAmber = []
      var dataFromGreen = []
      var dataFromRed = []
      var flagred = req.body.flagred
      var flagamber = req.body.flagamber
      var flaggreen = req.body.flaggreen
      var countRed = req.body.buckfield2
      var countGreen = req.body.buckfield4
      var countAmber = req.body.buckfield3

      var field = "$" + agentfieldname

      if (flagred === "1") {
        const documentred = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: redBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countRed)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromRed.push(documentred)

      }

      if (flagamber === "1") {
        const documentamber = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: amberBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countAmber)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromAmber.push(documentamber)

      }
      if (flaggreen === "1") {
        const documentgreen = await createModelForNameMapping(filterCollectionname).aggregate([
          {
            $match: {
              [agentfieldname]: { $in: greenBucketAuditee }
            }
          },
          {
            $group: {
              _id: field,
              data: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              data: {
                $slice: ["$data", parseInt(countGreen)] // Limit the number of documents 
              }
            }
          },
          {
            $unwind: "$data"
          },
          {
            $replaceRoot: {
              newRoot: "$data"
            }
          }
        ]);
        dataFromGreen.push(documentgreen)

      }

      if (dataFromAmber.length > 0 && dataFromRed.length > 0 && dataFromGreen.length > 0) {

        var bucketFilteredArray = [...dataFromRed[0], ...dataFromAmber[0], ...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['delId'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }


        return res.status(200).json(bucketFilteredArray), false

      }
      if (dataFromAmber.length > 0 && dataFromRed.length > 0) {
        var bucketFilteredArray = [...dataFromRed[0], ...dataFromAmber[0]];
        const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['delId'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromRed.length > 0 && dataFromGreen.length > 0) {
        var bucketFilteredArray = [...dataFromRed[0], ...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromAmber.length > 0 && dataFromGreen.length > 0) {

        var bucketFilteredArray = [...dataFromAmber[0], ...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false

      }
      if (dataFromAmber.length > 0) {
        var bucketFilteredArray = [...dataFromAmber[0]];
        const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['delId'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromGreen.length > 0) {
        var bucketFilteredArray = [...dataFromGreen[0]];
        const filterCollectionname= "sample_dump_"+cm_id
        await createModelForNameMapping(filterCollectionname).deleteMany({});
        for (let i = 0; i < bucketFilteredArray.length; i++) {
        var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
              A: bucketFilteredArray[i]["A"],
              B: bucketFilteredArray[i]["B"],
              C: bucketFilteredArray[i]["C"],
              D: bucketFilteredArray[i]["D"],
              E: bucketFilteredArray[i]["E"],
              F: bucketFilteredArray[i]["F"],
              G: bucketFilteredArray[i]["G"],
              H: bucketFilteredArray[i]["H"],
              I: bucketFilteredArray[i]["I"],
              J: bucketFilteredArray[i]["J"],
              K: bucketFilteredArray[i]["K"],
              L: bucketFilteredArray[i]["L"],
              M: bucketFilteredArray[i]["M"],
              N: bucketFilteredArray[i]["N"],
              O: bucketFilteredArray[i]["O"],
              P: bucketFilteredArray[i]["P"],
              Q: bucketFilteredArray[i]["Q"],
              R: bucketFilteredArray[i]["R"],
              S: bucketFilteredArray[i]["S"],
              T: bucketFilteredArray[i]["T"],
              cmid: bucketFilteredArray[i]["cmid"],
              delId: bucketFilteredArray[i]['delId'],
              new: bucketFilteredArray[i]['new'],
        })
        await filterCopy.save(filterCopy);
      }
        return res.status(200).json(bucketFilteredArray), false
      }
      if (dataFromRed.length > 0) {
        var bucketFilteredArray = [...dataFromRed[0]];
        const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < bucketFilteredArray.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: bucketFilteredArray[i]["A"],
            B: bucketFilteredArray[i]["B"],
            C: bucketFilteredArray[i]["C"],
            D: bucketFilteredArray[i]["D"],
            E: bucketFilteredArray[i]["E"],
            F: bucketFilteredArray[i]["F"],
            G: bucketFilteredArray[i]["G"],
            H: bucketFilteredArray[i]["H"],
            I: bucketFilteredArray[i]["I"],
            J: bucketFilteredArray[i]["J"],
            K: bucketFilteredArray[i]["K"],
            L: bucketFilteredArray[i]["L"],
            M: bucketFilteredArray[i]["M"],
            N: bucketFilteredArray[i]["N"],
            O: bucketFilteredArray[i]["O"],
            P: bucketFilteredArray[i]["P"],
            Q: bucketFilteredArray[i]["Q"],
            R: bucketFilteredArray[i]["R"],
            S: bucketFilteredArray[i]["S"],
            T: bucketFilteredArray[i]["T"],
            cmid: bucketFilteredArray[i]["cmid"],
            delId: bucketFilteredArray[i]['delId'],
            new: bucketFilteredArray[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }
        return res.status(200).json(bucketFilteredArray), false
      }
      bucketFilteredArray = [];
      return res.status(200).json(bucketFilteredArray);
    }

    return res.status(200).json("Collection name doesn't exist.")
  } catch (error) {
    return res.status(500).json({
      error: "Error occured please try again",
    });
  }

}
//calltype and new hire  and acht 
exports.achtAndNewHireAndCalltypeDataFilter = async (req, res) => {
  try {
    var collectionname = req.body.collectionname;
    var cm_id = req.body.cm_id;
    var calltypeField = req.body.calltypeField

    const document = await Column_assignment.find({cm_id:{$in:cm_id}}).sort({ _id: -1 })
    var x = (document[0].acht);
    var y = (document[0].collectionname)
    const agentfieldname = (document[0].agentid);
    const fieldname = document[0].calltype

    if (collectionname === y) {
      const doc = await createModelForNameMapping(collectionname).find({
        [fieldname]: {
          $in: calltypeField
        }
      })

      const filterCollectionname= "sample_dump_"+cm_id
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < doc.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
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
            K: doc[i]["K"],
            L: doc[i]["L"],
            M: doc[i]["M"],
            N: doc[i]["N"],
            O: doc[i]["O"],
            P: doc[i]["P"],
            Q: doc[i]["Q"],
            R: doc[i]["R"],
            S: doc[i]["S"],
            T: doc[i]["T"],
            cmid: doc[i]["cmid"],
            delId: doc[i]['_id'],
            new: doc[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }

      //For Acht
      var acht1 = req.body.acht1;
      var acht11 = req.body.acht11;
      var acht2 = req.body.acht2;
      var acht22 = req.body.acht22;
      var acht3 = req.body.acht3;
      var acht33 = req.body.acht33;
      var acht4 = req.body.acht4;
      var acht44 = req.body.acht44;
      var ff = "$" + x

      const docAcht = await createModelForNameMapping(filterCollectionname).aggregate([
        {
          $addFields: {
            "ageNumber": {
              $convert: {
                input: ff,
                to: "int",
                onError: 0
              }
            }
          }
        },
        {
          $match: {
            $or: [
              {
                "ageNumber": {
                  "$gte": parseInt(acht1),
                  "$lte": parseInt(acht11)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht2),
                  "$lte": parseInt(acht22)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht3),
                  "$lte": parseInt(acht33)
                }
              },
              {
                "ageNumber": {
                  "$gte": parseInt(acht4),
                  "$lte": parseInt(acht44)
                }
              }
            ]
          }
        }
      ])

      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < docAcht.length; i++) {
      var filterCopy =  await new createModelForNameMapping(filterCollectionname)({
            A: docAcht[i]["A"],
            B: docAcht[i]["B"],
            C: docAcht[i]["C"],
            D: docAcht[i]["D"],
            E: docAcht[i]["E"],
            F: docAcht[i]["F"],
            G: docAcht[i]["G"],
            H: docAcht[i]["H"],
            I: docAcht[i]["I"],
            J: docAcht[i]["J"],
            K: docAcht[i]["K"],
            L: docAcht[i]["L"],
            M: docAcht[i]["M"],
            N: docAcht[i]["N"],
            O: docAcht[i]["O"],
            P: docAcht[i]["P"],
            Q: docAcht[i]["Q"],
            R: docAcht[i]["R"],
            S: docAcht[i]["S"],
            T: docAcht[i]["T"],
            cmid: docAcht[i]["cmid"],
            delId: docAcht[i]['delId'],
            new: docAcht[i]['new'],
      })
      await filterCopy.save(filterCopy);
    }
      //for New hire 
      var field = "$" + agentfieldname
      var agentId = req.body.agentId
      var target = req.body.target
      const documentNewhire = await createModelForNameMapping(filterCollectionname).aggregate([
        {
          $match: {
            [agentfieldname]: { $in: agentId }
          }
        },
        {
          $group: {
            _id: field,
            data: {
              $push: "$$ROOT"
            }
          }
        },
        {
          $project: {
            data: {
              $slice: ["$data", parseInt(target)] // Limit the number of documents 
            }
          }
        },
        {
          $unwind: "$data"
        },
        {
          $replaceRoot: {
            newRoot: "$data"
          }
        }
      ]);
     
      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < documentNewhire.length; i++) {
      var filterCopy1 =  await new createModelForNameMapping(filterCollectionname)({
            A: documentNewhire[i]["A"],
            B: documentNewhire[i]["B"],
            C: documentNewhire[i]["C"],
            D: documentNewhire[i]["D"],
            E: documentNewhire[i]["E"],
            F: documentNewhire[i]["F"],
            G: documentNewhire[i]["G"],
            H: documentNewhire[i]["H"],
            I: documentNewhire[i]["I"],
            J: documentNewhire[i]["J"],
            K: documentNewhire[i]["K"],
            L: documentNewhire[i]["L"],
            M: documentNewhire[i]["M"],
            N: documentNewhire[i]["N"],
            O: documentNewhire[i]["O"],
            P: documentNewhire[i]["P"],
            Q: documentNewhire[i]["Q"],
            R: documentNewhire[i]["R"],
            S: documentNewhire[i]["S"],
            T: documentNewhire[i]["T"],
            cmid: documentNewhire[i]["cmid"],
            delId: documentNewhire[i]['delId'],
            new: documentNewhire[i]['new'],
      })
      await filterCopy1.save(filterCopy1);
    }
      return res.status(200).json(documentNewhire);
    }

    return res.status(200).json("Collection name doesn't exist.")
  } catch (error) {
    return res.status(500).json({
      error: "Error occured please try again",
    });
  }
}


exports.checkRyg = async (req, res) => {
  try {
    var cm_id = req.body.cm_id
    const data = await Ryg_master.find({ cm_id: { $in: cm_id } })
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
    var cmid = req.body.cmid
    const filterCollectionname= "sample_dump_"+cmid
    var callid = await createModelForNameMapping(filterCollectionname).find()
  
    var process = req.body.process
    var collectionname = req.body.collectionname
    var sheetid = req.body.sheetid
    
    var audit_status = req.body.audit_status
    var empid = req.body.empid
    var assigningData = req.body.assignDataUsers;
    var finalData = {};
    k = 0;
    Object.keys(assigningData).forEach(function (key) {
      var user = empid.filter((it) => it == key);
      user = user[0];
      finalData[user] = [];

      for (var j = k; j < k + parseInt(assigningData[key]); j++) {
        finalData[user].push(callid[j]);
      }
      k = k + parseInt(assigningData[key]);
    });

    var x = finalData;
    var joindata = [];
    //Find the name of assigned field which entered during mapping of data
    const document = await Column_assignment.find({ cm_id: { $in: cmid } }).sort({ _id: -1 })
    var yy = (document[0].cm_id)
    var abc = (document[0].calltype);
    var zz = document[0].acht
    var dd = document[0].mobileno
    var ff = document[0].agentid
    var gg = document[0].callid

    var calid = []
    var caltype = []
    var ach = []
    var mob = []
    var agent = []
    var del = []
    var delAfterFilter = []
    if (cmid === yy) {
      caltype.push(abc)
      calid.push(gg)
      ach.push(zz)
      mob.push(dd)
      agent.push(ff)

      Object.keys(x).forEach(function (key) {
        var data = x[key]
        for (var i = 0; i < data.length; i++) {
          var agentt = data[i][agent[0]]
          var calidd = data[i][calid[0]]
          var calltypp = data[i][caltype[0]]
          var mobil = data[i][mob[0]]
          var achh = data[i][ach[0]]
          del.push(data[i]._id);
          delAfterFilter.push(data[i].delId);

          //splitting key which is auditor id to get auditor id and auditor post
          var daaata = key.split("-")
          joindata.push({ auditor_id: daaata[0], callid: calidd, agentid: agentt, calltype: calltypp, acht: achh, mobileno: mobil, cmid, process, sheetid, audit_status, auditor_post: daaata[1], assigningData: "null" });
        }
      });
    }
    //Delete from filtered data with the id
    var deleteAllocated = del
 
    await createModelForNameMapping(filterCollectionname).deleteMany({ _id: { $in: deleteAllocated } });
    await createModelForNameMapping(collectionname).deleteMany({ _id: { $in: delAfterFilter } })
    AllocationAssignment.insertMany(joindata, (err, result) => {
      if (result) {
        return res.status(200).json({
          SUCCESS: "added",
          chk: "0",
        });
      } else {
        return res.status(400).json({
          error: "error",
          chk: "1",
        });
      }
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getAssign = async (req, res) => {
  try {
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    var process = req.body.process
    var sheetid = req.body.sheetid
    var data = await AllocationAssignment.find({
      process: { $in: process }, sheetid: { $in: sheetid },
      createdAt: {
        $gte: date1,
        $lte: date2
      }, audit_status: '0'
    })
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}

//Get call id name from assigning mapped data
exports.getCallid = async (req, res) => {
  try {
    var collectionname = req.body.collectionname
    var cm_id = req.body.cm_id
    var data = await Column_assignment.find({cm_id:{$in:cm_id}})
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
    const auditor_post = req.body.auditor_post
    const data = await AllocationAssignment.updateMany(
      { _id: { $in: id1 } },
      { $set: { auditor_id: auditor_id, auditor_post: auditor_post } },
      { multi: true }
    )
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: "Error updating",
    });
  }
};

//Calibration data get
exports.getCalibrationData = async (req, res) => {
  try {
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    var cm_id = req.body.cm_id
    var sheet_name = req.body.sheet_name
    var data = await Responce.find({
      cm_id: { $in: cm_id }, sheet_name: { $in: sheet_name },
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
exports.calibrationAssignmentt = async (req, res) => {
  try {
    var callidd = req.body.callidd
    var auditor_id1 = req.body.auditor_id
    var zx = auditor_id1.split("-")
    var auditor_post = zx[1]
    var auditor_id = zx[0]
    var d = await AllocationAssignment.find({ callid: { $in: callidd } }).sort({ _id: -1 })
    var callid = []
    var calltype = []
    var acht = []
    var mobile = []
    var process = []
    var sheetid = []
    var auditeeid = []
    var cmid = []
    if (d.length > 0) {
      for (var i = 0; i < d.length; i++) {
        callid.push(d[i].callid)
        mobile.push(d[i].mobileno)
        calltype.push(d[i].calltype)
        process.push(d[i].process);
        sheetid.push(d[i].sheetid);
        auditeeid.push(d[i].agentid);
        acht.push(d[i].acht)
        cmid.push(d[i].cmid)
      }
      var calibrationDetails = await new CalibrationAssignment({
        callid: callid[0],
        acht: acht[0],
        calltype: calltype[0],
        mobileno: mobile[0],
        auditor_id: auditor_id,
        auditeeid: auditeeid[0],
        auditor_post: auditor_post,
        sheetid: sheetid[0],
        audit_status: '0',
        process: process[0]
      });
    }
    const result = calibrationDetails.save((err, success) => {
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
    return res.status(500).json("Callid is different!");
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
    const data = await Responce.updateMany(
      { _id: { $in: id } },
      { $set: { calibration_status: calibration_status } },
      { multi: true }
    )
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: "Error updating Employee with id=" + id,
    });
  }
};


//Super Audit get data 
exports.getSuperAuditData = async (req, res) => {
  try {
    var process = req.body.process
    var sheetid = req.body.sheetid
    var data = await AllocationAssignment.find({
      process: { $in: process }, sheetid: { $in: sheetid }, audit_status: '1', is_superaudit: '0'
    })
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}

//SuperAudit save 
exports.superAuditSave = async (req, res) => {
  try {
    var id = req.body.id
    var callidd = req.body.callidd
    var auditorid1 = req.body.auditor_id
    var abc = auditorid1.split('-')
    var auditor_id = abc[0]
    var auditor_post = abc[1]
    var is_superaudit = "1"
    var audit_status = "1"
    var callid = []
    var calltype = []
    var acht = []
    var mobile = []
    var process = []
    var sheetid = []
    var auditeeid = []
    var cmid = []
    var d = await AllocationAssignment.find({ callid: { $in: callidd }, audit_status: { $in: audit_status } })
    if (d.length > 0) {
      for (var i = 0; i < d.length; i++) {
        callid.push(d[i].callid)
        calltype.push(d[i].calltype)
        acht.push(d[i].acht)
        mobile.push(d[i].mobileno)
        auditeeid.push(d[i].agentid)
        sheetid.push(d[i].sheetid)
        process.push(d[i].process)
        cmid.push(d[i].cmid)
      }
    }

    var superAuditDetails = await new SuperAssignment({
      callid: callid[0],
      acht: acht[0],
      calltype: calltype[0],
      mobileno: mobile[0],
      auditor_id: auditor_id,
      auditeeid: auditeeid[0],
      auditor_post: auditor_post,
      sheetid: sheetid[0],
      audit_status: '0',
      process: process[0],
      cmid: cmid[0]
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
      { $set: { is_superaudit: is_superaudit } },
      { multi: true }
    )
  } catch (error) {
    return res.status(500).json(error);
  }
}

//Get Calibration view data 
exports.getCalibrationViewData = async (req, res) => {
  try {
    auditorid = req.body.auditorid
    var data = await CalibrationAssignment.find({
      audit_status: '0', auditor_id: auditorid
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
    var auditee_id = req.body.auditee_id;
    var data = await Responce.find({
      sheet_name: sheet_name, auditee_id: auditee_id
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.insertCalibrationStatus = async (req, res) => {
  try {

    var data = await new CalibrationStatus({
      sheetid: req.body.sheetid,
      auditeeid: req.body.auditeeid,
      auditor_id: req.body.auditor_id,
      dataid:req.body.dataid
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
      audit_status
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

//Master Report
exports.masterReport = async (req, res) => {
  try {

    var data = await new ReportMaster({
      employeeId: req.body.employeeId,
      process: req.body.process,
      cm_id: req.body.cm_id,
      report_name: req.body.report_name,
      createdBy: req.body.createdBy,
      employeeName: req.body.employeeName
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
exports.getAuditViewData = async (req, res) => {
  try {
    auditorid = req.body.auditorid
    var data = await AllocationAssignment.find({
      audit_status: '0', auditor_id: auditorid
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
      audit_status, skip_reason
    }, {
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
    const feedback = req.body.feedback
    const finalScore = req.body.finalScore
    const audioURL = req.file.filename
    const auditorid = req.body.auditorid
    const data = await Responce.findByIdAndUpdate(
      id, {
      obtainedMarks, feedback, finalScore, audioURL, auditorid
    }, {
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
      audit_status
    }, {
      useFindAndModify: false
    }
    );
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: "Error updating",
    });
  }
};

//Rebuttel view 
exports.getRebuttelViewData = async (req, res) => {
  try {
    const auditorid = req.body.auditorid
    const flag = req.body.flag
    if (flag === 1) {
      const rbtlstatus = "1"
      var data = await Responce.find({
        rbtlstatus: rbtlstatus, auditorid: auditorid, reject_by: { $not: { $regex: "QH" } }, fclose: { $not: { $regex: "closed" } }
      })
    }
    else if (flag === 0) {
      const rbtlstatus = "1"
      const fclose = "0"
      var data = await Responce.find({
        rbtlstatus: rbtlstatus, auditorid: auditorid, reject_by: { $not: { $regex: "QH" } }, fclose: fclose
      })
    }
    else {
      var data = await Responce.find({
        rbtlstatus: { $not: { $regex: "0" } }, auditorid: auditorid, reject_by: { $not: { $regex: "QH" } }, fclose: { $not: { $regex: "closed" } }
      })
    }

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}

//Rebuttel view 
exports.getRebuttelScoreData = async (req, res) => {
  try {
    const _id = req.body.id
    var data = await Responce.find({ _id })
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}

//Rebuttal 
exports.createRebuttalStatus = async (req, res) => {
  try {
    const flag = req.body.flag
    if (flag === 1) {
      const qh_rebuttal_date = (new Date().toLocaleDateString())
      const qh_remark = req.body.remark
      var data = await new rebuttalStatus({
        sheetid: req.body.sheetid,
        dataid: req.body.dataid,
        auditeeid: req.body.auditeeId,
        auditorid: req.body.auditorid,
        qh_rebuttal_date: qh_rebuttal_date,
        qh_remark: qh_remark,
        pre_score: req.body.pre_score,
        new_score: req.body.new_score
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
    }
    else if (flag === 0) {
      const qa_rebuttal_date = (new Date().toLocaleDateString())
      const qa_remark = req.body.remark
      var data = await new rebuttalStatus({
        sheetid: req.body.sheetid,
        dataid: req.body.dataid,
        auditeeid: req.body.auditeeId,
        auditorid: req.body.auditorid,
        qa_rebuttal_date: qa_rebuttal_date,
        qa_remark: qa_remark,
        pre_score: req.body.pre_score,
        new_score: req.body.new_score
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
    }

    else if (flag === 2) {
      const qa_rebuttal_date = "null"
      const qa_remark = "null"
      const qh_rebuttal_date = "null"
      const qh_remark = "null"
      var data = await new rebuttalStatus({
        sheetid: req.body.sheetid,
        dataid: req.body.dataid,
        auditeeid: req.body.auditeeid,
        auditorid: req.body.auditorid,
        qa_rebuttal_date: qa_rebuttal_date,
        qa_remark: qa_remark,
        qh_rebuttal_date: qh_rebuttal_date,
        qh_remark: qh_remark,
        pre_score: req.body.pre_score,
        new_score: req.body.new_score
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
    }
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
    const rbtlstatus = "0"
    const updatedAt = Date.now()
    const id = req.body.ids;
    const flag = req.body.flag

    if (flag === 1) {
      const reject_by = "QH"
      const fclose = "QH"
      const data = await Responce.findByIdAndUpdate(
        id, {
        reject_by, rbtlstatus, fclose, updatedAt
      }, {
        useFindAndModify: false
      }
      );
      return res.status(200).json(data);
    }
    else {
      const reject_by = "QA"
      const fclose = "QA"
      const data = await Responce.findByIdAndUpdate(
        id, {
        reject_by, rbtlstatus, fclose, updatedAt
      }, {
        useFindAndModify: false
      }
      );
      return res.status(200).json(data);
    }


  } catch (err) {
    res.status(500).send({
      message: "Error ",
    });
  }
};

//Update sheetlistdetails on submission of rebuttel score sheet
exports.updateSheetDetailsListForRebuttelScore = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.body.ids;
    var flag = req.body.flag
    const obtainedMarks = req.body.obtainMarks
    const auditor_remark = req.body.auditor_remark
    const finalScore = req.body.finalScore
    const auditorid = req.body.auditor_id
    var callid = req.body.callid
    var calltype = req.body.calltype
    var acht = req.body.acht
    var msisdn = req.body.msisdn
    var maximumMarks = req.body.maximumMarks
    var fatalCount = req.body.fatalCount
    var bonus_call_remark = req.body.bonus_call_remark
    var option_bonus_call = req.body.option_bonus_call
    var marking_bonus_call = req.body.marking_bonus_call
    var ztp_remark = req.body.ztp_remark
    var ztp_option = req.body.ztp_option
    var wow_call_remark = req.body.wow_call_remark
    var wow_call_option = req.body.wow_call_option
    var remark = req.body.remark
    var subParaRemarks = req.body.subParaRemarks
    var auditee_id = req.body.auditee_id
    var auditee_name = req.body.auditee_name
    var auditor_name = req.body.auditor_name
    var extrafield1 = req.body.extrafield1
    var extrafield2 = req.body.extrafield2
    var sheet_name = req.body.sheet_name
    const marks = req.body.inputFields
    const subParaMarks = req.body.subParaMarks
    if (flag === 1) {
      var fclose = "closed"
      var rbtlstatus = "1"
    } else if (flag === 0) {
      var fclose = "QA"
      var rbtlstatus = "0"
    } else if (flag === 2) {
      var fclose = "0"
      var rbtlstatus = "0"
    }
    const data = await Responce.findByIdAndUpdate(
      id, {
      obtainedMarks, auditor_remark, finalScore, auditorid, callid, msisdn, maximumMarks, fatalCount, bonus_call_remark, option_bonus_call, marking_bonus_call, ztp_remark, ztp_option, wow_call_option, wow_call_remark, remark, subParaRemarks, auditee_id, auditee_name, auditor_name, extrafield1, extrafield2, sheet_name, fclose, rbtlstatus, marks, subParaMarks,calltype,acht
    }, {
      useFindAndModify: false
    });
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
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    var cm_id = req.body.cm_id;
    var auditorid = req.body.auditorid
    var sheet_name = req.body.sheet_name
    var flag = req.body.flag

    if(auditorid === "CE10091236" || auditorid === "CE03070003" || auditorid === "CE01080195" || flag === 1){

      var data = await Responce.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(date1) ,
              $lte: new Date(date2)
            }, cm_id:cm_id
           , sheet_name:sheet_name
          }
        },
        {
        $lookup: {
          from: from,
          localField: localField,
          foreignField: foreignField,
          as: 'new'
        },
        }])
    }
        else{
      
    var data = await Responce.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(date1) ,
            $lte: new Date(date2)
          }, cm_id:cm_id
        , sheet_name:sheet_name,auditorid:auditorid
        }
      },
      {
      $lookup: {
        from: from,
        localField: localField,
        foreignField: foreignField,
        as: 'new'
      },
      }])
    }
  return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}

//get SuperAudit
exports.getSuperAssign = async (req, res) => {
  try {
    const audit_status = "0"
    const auditor_id = req.body.auditor_id
    var data = await SuperAssignment.find({ audit_status: audit_status, auditor_id: auditor_id })
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
    const audit_status = "1"
    const updatedAt = Date.now()
    const data = await SuperAssignment.findByIdAndUpdate(
      id, {
      audit_status, updatedAt
    }, {
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
exports.getSheetListDataForSuperAssignment = async (req, res) => {
  try {
    const sheet_name = req.body.sheet_name
    const auditee_id = req.body.auditee_id
    var data = await Responce.find({ sheet_name: sheet_name, auditee_id: auditee_id, })
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}

//Feedback data get
exports.getSheetListDataForFeedback = async (req, res) => {
  try {
    const auditee_id = req.body.auditee_id
    var data = await Responce.find({ auditee_id: auditee_id, fclose: { $not: { $regex: "closed" } } })
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}

//sheetdetails list for feedback
exports.getSheetDetailsForFeedbackss = async (req, res) => {
  try {
    const id = req.body.id
    var data = await Responce.findById(id)
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}

exports.agentFeedackUpdate = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    let rbtlstatus = ""
    let finalstatus = ""
    const ackchk = req.body.ackchk
    if (ackchk === "agree") {
      rbtlstatus = "1"
      finalstatus = "closed"
    } else if (ackchk === "disagree") {
      rbtlstatus = "1"
      finalstatus = "0"
    }
    const Acknowledgement = ackchk
    const Auditee_Remark = req.body.Auditee_Remark
    const feedbackdate = (new Date().toLocaleDateString())
    const audioURL = req.file.filename
    const fb = 'web'
    const id = req.body.id;
    const data = await Responce.updateMany(
      { _id: { $in: id } },
      { $set: { Acknowledgement: Acknowledgement, Auditee_Remark: Auditee_Remark, FeedbackDate: feedbackdate, auditee_feedurl: audioURL, rbtlstatus, fclose: finalstatus, fb_source: fb } },
      { multi: true }
    )
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).send({
      message: "Error updating",
    });
  }
};

//Agent get sheet
exports.getSheetForFeedbackAuditee = async (req, res) => {
  try {
    const auditee_id = req.body.auditee_id
    var data = await Responce.distinct("sheet_name", { auditee_id: auditee_id })
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}

//Feedback
exports.feedbackGet = async (req, res) => {
  try {
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    var auditee_id = req.body.auditee_id
    var sheet_name = req.body.sheet_name
    var data = await Responce.find({
      updatedAt: {
        $gte: date1,
        $lte: date2
      }, auditee_id: auditee_id, sheet_name: sheet_name
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//Feedback update 
exports.updateSheetDetailsListFeedback = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    const id = req.body.id;
    const Acknowledgement = req.body.Acknowledgement
    const Auditee_Remark = req.body.Auditee_Remark
    const FeedbackDate = (new Date().toLocaleDateString())
    const data = await Responce.findByIdAndUpdate(
      id, {
      Acknowledgement, Auditee_Remark, FeedbackDate
    }, {
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


//Dynamic Master Report
exports.D_MasterReoprtGet = async (req, res) => {
  try {
    var employeeId = req.body.employeeId
    var data = await ReportMaster.find({
      employeeId: employeeId
    });
    var delData = []
    data.map((el) => {
      delData.push(String(el._id));
    })
    await ReportMaster.deleteMany({ _id: { $in: delData } })
    return res.status(200).json("Success");
  } catch (error) {
    return res.status(500).json(error);
  }
};


exports.getMasterIdReport = async (req, res) => {
  try {
    var employeeId = req.body.empid;
    const process = await ReportMaster.distinct("process", {
      employeeId: employeeId,
    });
    const report_name = await ReportMaster.distinct("report_name", {
      employeeId: employeeId,
    });
    const finalres = [];
    finalres.push(process);
    finalres.push(report_name);
    return res.status(200).json(finalres);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Some error occured while retrieving data.",
    });
  }
};

//Find Process with employee id 
exports.D_MasterProcess = async (req, res) => {
  try {
    var employeeId = req.body.employeeId
    var data = await ReportMaster.distinct(
      "process", { "employeeId": { $in: employeeId }, "report_name": { $in: "cs" } }
    )
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//Dynamic MIS Report
exports.getMisReportDynamic = async (req, res) => {
  try {
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    var employeeId = req.body.employeeId
    var data = await ReportMaster.distinct(
      "cm_id", { "employeeId": { $in: employeeId }, "report_name": { $in: "mr" } }
    )
    var data1 = await Responce.find({
      createdAt: {
        $gte: date1,
        $lte: date2
      }, cm_id: data
    });
    return res.status(200).json(data1);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//Report Dynamic
exports.getReprtDynamic = async (req, res) => {
  try {
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    var employeeId = req.body.employeeId
    var sheet_name = req.body.sheet_name
    var data = await ReportMaster.distinct(
      "cm_id", { "employeeId": { $in: employeeId }, "report_name": { $in: "dr" } }
    )
    var data1 = await Responce.aggregate(
      [
        {
          $match: {
            createdAt: {
              $gte: new Date(date1),
              $lte: new Date(date2)
            }, cm_id: {
              $in: data
            }, sheet_name: sheet_name
          }
        },
        {$lookup: {
          from: 'rebuttalstatuses',
          localField: 'dataId',
          foreignField: 'dataid',
          as: 'rebuttalJoin'
         }}, {$lookup: {
          from: 'calibrationstatuses',
          localField: 'dataId',
          foreignField: 'dataid',
          as: 'caliJoin'
         }}, {$project: {
          _id: 1,
          employeeid: 1,
          auditee_name: 1,
          auditor_name: 1,
          obtainedMarks: 1,
          maximumMarks: 1,
          fatalCount: 1,
          finalScoreRebuttal: {
           $arrayElemAt: [
            '$rebuttalJoin',
            0
           ]
          },
          rebuttalJoin: '$rebuttalJoin.dataid',
          caliJoin: '$caliJoin.dataid',
          createdAt:1,
          updatedAt:1,
          cm_id:1,
          sheet_name:1,
          finalScore:1,
          calltype:1,
          callid:1,
          msisdn:1,
          acht:1,
          auditee_id:1,
          auditorid:1,
          extrafield1:1,
          extrafield2:1,
          auditor_remark:1
         }}
      ]
    )
    return res.status(200).json(data1)
  } catch (error) {
    return res.status(500).json(error);
  }
}

//Dashboard Report
exports.getDashboardReport = async (req, res) => {
  try {
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    var data = await Responce.aggregate(
    [{$match: {
      createdAt: {
       $gte: new Date(date1),
       $lt: new Date(date2)
      }
     }}, {$group: {
      _id: {
       Center: '$center',
       clientname: '$clientname',
       process: '$process',
       sub_process: '$sub_process'
      },
      Call_Audit: {
       $sum: 1
      },
      Fatal_Count: {
       $sum: '$fatalCount'
      },
      Agree_Count: {
       $sum: {
        $cond: [
         {
          $eq: [
           '$Acknowledgement',
           'agree'
          ]
         },
         1,
         0
        ]
       }
      },
      Disagree_Count: {
       $sum: {
        $cond: [
         {
          $eq: [
           '$Acknowledgement',
           'disagree'
          ]
         },
         1,
         0
        ]
       }
      },
      No_Feedback_Count: {
       $sum: {
        $cond: [
         {
          $eq: [
           '$Acknowledgement',
           ''
          ]
         },
         1,
         0
        ]
       }
      }
     }}, {$project: {
      Center: 1,
      clientname: 1,
      Process: 1,
      sub_process: 1,
      Call_Audit: 1,
      Fatal_Count: 1,
      Agree_Count: 1,
      Disagree_Count: 1,
      No_Feedback_Count: 1,
      Not_Fatal_Count: {
       $subtract: [
        '$Call_Audit',
        '$Fatal_Count'
       ]
      },
      Fatal_Percentage: {
       $round: [
        {
         $multiply: [
          {
           $divide: [
            '$Fatal_Count',
            '$Call_Audit'
           ]
          },
          100
         ]
        },
        2
       ]
      },
      Agree_Percentage: {
       $round: [
        {
         $multiply: [
          {
           $divide: [
            '$Agree_Count',
            '$Call_Audit'
           ]
          },
          100
         ]
        },
        2
       ]
      },
      Disagree_Percentage: {
       $round: [
        {
         $multiply: [
          {
           $divide: [
            '$Disagree_Count',
            '$Call_Audit'
           ]
          },
          100
         ]
        },
        2
       ]
      },
      No_Feedback_Percentage: {
       $round: [
        {
         $multiply: [
          {
           $divide: [
            '$No_Feedback_Count',
            '$Call_Audit'
           ]
          },
          100
         ]
        },
        2
       ]
      }
     }}])
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//Report data
exports.getReportData = async (req, res) => {
  try {
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    var cm_id = req.body.cm_id;
    var auditorid = req.body.auditorid
    var sheet_name = req.body.sheet_name
    var flag = req.body.flag
    if(auditorid === "CE10091236" || auditorid === "CE03070003" || auditorid === "CE01080195" || flag === 1){
    var data = await Responce.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(date1),
            $lte: new Date(date2)
          },sheet_name:sheet_name,cm_id:cm_id
        }
      },
      {$lookup: {
      from: 'rebuttalstatuses',
      localField: 'dataId',
      foreignField: 'dataid',
      as: 'rebuttalJoin'
     }}, {$lookup: {
      from: 'calibrationstatuses',
      localField: 'dataId',
      foreignField: 'dataid',
      as: 'caliJoin'
     }}, {$project: {
      _id: 1,
      employeeid: 1,
      auditee_name: 1,
      auditor_name: 1,
      obtainedMarks: 1,
      maximumMarks: 1,
      fatalCount: 1,
      finalScoreRebuttal: {
       $arrayElemAt: [
        '$rebuttalJoin',
        0
       ]
      },
      rebuttalJoin: '$rebuttalJoin.dataid',
      caliJoin: '$caliJoin.dataid',
      createdAt:1,
      updatedAt:1,
      cm_id:1,
      sheet_name:1,
      finalScore:1,
      calltype:1,
      callid:1,
      msisdn:1,
      acht:1,
      auditee_id:1,
      auditorid:1,
      extrafield1:1,
      extrafield2:1,
      auditor_remark:1
     }}
    ])
    }else{
      var data = await Responce.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(date1),
              $lte: new Date(date2)
            }, cm_id: cm_id, sheet_name: sheet_name,auditorid:auditorid
          }
        },
        {$lookup: {
        from: 'rebuttalstatuses',
        localField: 'dataId',
        foreignField: 'dataid',
        as: 'rebuttalJoin'
       }}, {$lookup: {
        from: 'calibrationstatuses',
        localField: 'dataId',
        foreignField: 'dataid',
        as: 'caliJoin'
       }}, {$project: {
        _id: 1,
        employeeid: 1,
        auditee_name: 1,
        auditor_name: 1,
        obtainedMarks: 1,
        maximumMarks: 1,
        fatalCount: 1,
        finalScoreRebuttal: {
         $arrayElemAt: [
          '$rebuttalJoin',
          0
         ]
        },
        rebuttalJoin: '$rebuttalJoin.dataid',
        caliJoin: '$caliJoin.dataid',
        createdAt:1,
        updatedAt:1,
        cm_id:1,
        sheet_name:1,
        finalScore:1,
        calltype:1,
        callid:1,
        msisdn:1,
        acht:1,
        auditee_id:1,
        auditorid:1,
        extrafield1:1,
        extrafield2:1,
        auditor_remark:1
       }}])
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
};


//getting manual empid
exports.getmanualempid = async (req, res) => {
  try {
    const cm_id = req.body.cm_id;
    var data = await Column_assignment.find({ cm_id: cm_id }).sort({ _id: -1 });
    var agentField = data[0].agentid;
    if (agentField) {
      const dynamicollection = "cdr_tagging_dump_" + cm_id;
      var data1 = await createModelForNameMapping(dynamicollection).distinct(
        agentField
      );
      return res.status(200).json(data1);
    }
    return res.status(200).json("error");
  } catch (error) {
    return res.status(500).json(error);
  }
};

//getting manual data
exports.manualdata = async (req, res) => {
  try {
    const selectempid = req.body.selected;
    const cm_id = req.body.cm_id;
    const filterCollectionname = "sample_dump_" + cm_id;
    var data = await Column_assignment.find({ cm_id: cm_id });
    if (data[0]["agentid"]) {
      const dynamicollection = "cdr_tagging_dump_" + cm_id;
      const agentcol = data[0]["agentid"];
      data = await createModelForNameMapping(dynamicollection).find({
        [agentcol]: selectempid,
      });

      await createModelForNameMapping(filterCollectionname).deleteMany({});
      for (let i = 0; i < data.length; i++) {
        var filterData = await new createModelForNameMapping(
          filterCollectionname
        )({
          A: data[i]["A"],
          B: data[i]["B"],
          C: data[i]["C"],
          D: data[i]["D"],
          E: data[i]["E"],
          F: data[i]["F"],
          G: data[i]["G"],
          H: data[i]["H"],
          I: data[i]["I"],
          J: data[i]["J"],
          K: data[i]["K"],
          L: data[i]["L"],
          M: data[i]["M"],
          N: data[i]["N"],
          O: data[i]["O"],
          P: data[i]["P"],
          Q: data[i]["Q"],
          R: data[i]["R"],
          S: data[i]["S"],
          T: data[i]["T"],
          cmid: data[i]["cmid"],
          delId: data[i]["_id"],
          new: data[i]["new"],
        });
        await filterData.save(filterData);
      }
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};


// For skipped allocation data
exports.getSkippedAllcatedData = async (req, res) => {
  try {
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    var sheetid = req.body.sheetid
    var data = await AllocationAssignment.aggregate(
      [{$match: {
        sheetid: sheetid,
        audit_status: '2',
        createdAt: {
         $gte: new Date(date1),
         $lte: new Date(date2)
        }
       }}]
    )
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}

exports.getSuperAuditedData = async (req, res) => {
  try {
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    var sheetid = req.body.sheetid
    var data = await SuperAssignment.aggregate(
      [{$lookup: {
        from: 'sheets',
        localField: 'sheetid',
        foreignField: 'sheet_name',
        as: 'c'
       }}, {$match: {
        audit_status: '1',
        sheetid: sheetid,
        createdAt: {
          $gte: new Date(date1),
         $lte: new Date(date2)
        }
       }}, {$unwind: {
        path: '$c'
       }}, {$project: {
        _id: 1,
        sheetid: '$c.sheet_name',
        cm_id: '$c.cm_id',
        auditor_id: 1,
        auditor_post: 1,
        audit_status: 1,
        acht: 1,
        auditeeid: 1,
        mobileno: 1,
        callid: 1,
        calltype: 1,
        process: 1,
        superauditedAt: '$createdAt'
       }}]
    )
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}

//Get calibrated data
exports.getCalibratedData = async (req, res) => {
  try {
    var date1 = req.body.date1;
    var date2 = req.body.date2;
    var sheetid = req.body.sheetid
    var data = await CalibrationAssignment.aggregate(
      [{$lookup: {
        from: 'sheets',
        localField: 'sheetid',
        foreignField: 'sheet_name',
        as: 'c'
       }}, {$match: {
        audit_status: '1',
        sheetid: sheetid,
        createdAt: {
          $gte: new Date(date1),
         $lte: new Date(date2)
        }
       }}, {$unwind: {
        path: '$c'
       }}, {$project: {
        _id: 1,
        sheetid: '$c.sheet_name',
        cm_id: '$c.cm_id',
        auditor_id: 1,
        auditor_post: 1,
        audit_status: 1,
        acht: 1,
        auditeeid: 1,
        mobileno: 1,
        callid: 1,
        calltype: 1,
        process: 1,
        calibratedAt: '$createdAt'
       }}]
    )
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error);
  }
}
