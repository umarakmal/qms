const activeEmpId = require('../models/activeEmpId')
const clientMaster = require('../models/clientMaster')
const newClientMaster = require('../models/newClientMaster')
const clientStatusMaster = require('../models/clientStatusMaster')
const employee_map = require('../models/employee_map')
const empid_name = require('../models/empid_name')
const whole_details_peremp = require('../models/whole_details_peremp')
//get all cmid via employee ID
exports.getAllCmidViaEmpID = async (req, res) => {
    try {
        const { EmployeeID, emp_type, client } = req.body;
        var flag = 0
        var emplist = ["CE061930045", "CE061930050", "CE071728286", "CE071728536", "CE071930074", "CE121622091", "CE101930165", "CE121829689", "CE121829697"];
        emplist.forEach(element => {
            if (EmployeeID === element) {
                flag = 1
            }
        });
        if (flag === 1) {
            const data = await whole_details_peremp.aggregate(
                [{
                    $match: {
                        cm_id: {
                            $nin: [
                                '47',
                                '36',
                                '34',
                                '5',
                                '6',
                                '59',
                                '37',
                                '35',
                                '186',
                                '29'
                            ]
                        }
                    }
                }, {
                    $addFields: {
                        cmid: {
                            $convert: {
                                input: '$cm_id',
                                to: 'int',
                                onError: 0
                            }
                        }
                    }
                }, {
                    $group: {
                        _id: {
                            cm_id: '$cmid',
                            client_name: '$client_name',
                            process: '$Process',
                            sub_process: '$sub_process'
                        }
                    }
                }, {
                    $project: {
                        _id: false,
                        cm_id: '$_id.cm_id',
                        client_name: '$_id.client_name',
                        process: '$_id.process',
                        sub_process: '$_id.sub_process'
                    }
                }]
            );
            return res.status(200).json(data)
        }
        else if (emp_type === 'Demo') {
            var data = await newClientMaster.aggregate([{
                $match: {
                    client_name: client
                }
            }, {
                $lookup: {
                    from: 'activeempids',
                    localField: 'cm_id',
                    foreignField: 'cm_id',
                    as: 'w'
                }
            }, {
                $unwind: {
                    path: '$w'
                }
            }, {
                $addFields: {
                    cm_id: {
                        $convert: {
                            input: '$cm_id',
                            to: 'int',
                            onError: 0
                        }
                    }
                }
            }, {
                $group: {
                    _id: {
                        cm_id: '$cm_id',
                        client_name: '$client_name',
                        process: '$process',
                        location: '$location'
                    }
                }
            }, {
                $project: {
                    _id: 0,
                    cm_id: '$_id.cm_id',
                    client_name: '$_id.client_name',
                    process: '$_id.process',
                    location: '$_id.location'
                }
            }])
            return res.status(200).json(data)
        }
        else {
            var data = await activeEmpId.aggregate(
                [{
                    $match: {
                        EmployeeID: EmployeeID
                    }
                }, {
                    $lookup: {
                        from: 'newclientmasters',
                        localField: 'cm_id',
                        foreignField: 'cm_id',
                        as: 'w'
                    }
                }, {
                    $unwind: {
                        path: '$w'
                    }
                }, {
                    $addFields: {
                        cm_id: {
                            $convert: {
                                input: '$cm_id',
                                to: 'int',
                                onError: 0
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        cm_id: 1,
                        client_name: '$w.client_name',
                        process: '$w.process',
                        location: '$w.location'
                    }
                }])
            return res.status(200).json(data)
        }

    } catch (error) {
        return res.status(500).json({ error: 'Error occured!' })
    }

}

exports.getWholeDetailsPerEmp = async (req, res) => {
    try {
        const cm_id = req.body.cm_id;
        var res1 = await whole_details_peremp.aggregate([
            {
                $addFields: {
                    cm_id: {
                        $convert: {
                            input: '$cm_id',
                            to: 'int',
                            onError: 0
                        }
                    }
                }
            },
            {
                $match: {
                    cm_id: {
                        $eq: cm_id
                    }
                }
            }, {
                $project: {
                    _id: 0,
                    EmpDetails: {
                        $concat: [
                            "$EmployeeName", "-", "$EmployeeID"]
                    }
                }
            }
        ]);

        var EmpDetails = new Array();
        for (var items in res1) {
            EmpDetails.push(res1[items]["EmpDetails"]);
        }
        return res.status(200).json(EmpDetails);
    }
    catch (error) {
        return res.status(500).json({ error: "Error occured!" });
    }
};

//get employee data such as qhname , ahname etc. 
exports.getEmployeeDataSOAP2 = async (req, res) => {
    try {
      
        const emp = req.body.emp
 
        const data = await whole_details_peremp.aggregate(
            [{
                $match: {
                    EmployeeID: emp
                }
            }, {
                $lookup: {
                    from: 'process_maps',
                    localField: 'Process',
                    foreignField: 'process',
                    as: 'w'
                }
            }, {
                $unwind: {
                    path: '$w'
                }
            }, {
                $addFields: {
                    doj: {
                        $convert: {
                            input: '$DOJ',
                            to: 'date',
                            onError: 0
                        }
                    }
                }
            }, {
                $addFields: {
                    ageInMilliseconds: {
                        $subtract: [
                            (new Date()),
                            '$doj'
                        ]
                    }
                }
            }, {
                $addFields: {
                    ageInYears: {
                        $floor: {
                            $divide: [
                                '$ageInMilliseconds',
                                31557600000
                            ]
                        }
                    }
                }
            }, {
                $addFields: {
                    ageInMonths: {
                        $floor: {
                            $mod: [
                                {
                                    $divide: [
                                        '$ageInMilliseconds',
                                        2628000000
                                    ]
                                },
                                12
                            ]
                        }
                    }
                }
            }, {
                $addFields: {
                    ageInDays: {
                        $floor: {
                            $mod: [
                                {
                                    $divide: [
                                        '$ageInMilliseconds',
                                        86400000
                                    ]
                                },
                                30
                            ]
                        }
                    }
                }
            }, {
                $addFields: {
                    cm_id: {
                        $convert: {
                            input: '$cm_id',
                            to: 'int',
                            onError: 0
                        }
                    }
                }
            }, {
                $addFields: {
                    Ageing: {
                        $concat: [
                            {
                                $toString: '$ageInYears'
                            },
                            ' Y ',
                            {
                                $toString: '$ageInMonths'
                            },
                            ' M ',
                            {
                                $toString: '$ageInDays'
                            },
                            ' D'
                        ]
                    }
                }
            }, {
                $lookup: {
                    from: 'empid_names',
                    localField: 'oh',
                    foreignField: 'EmpID',
                    as: 'nameOh'
                }
            }, {
                $lookup: {
                    from: 'empid_names',
                    localField: 'qh',
                    foreignField: 'EmpID',
                    as: 'nameQh'
                }
            }, {
                $lookup: {
                    from: 'empid_names',
                    localField: 'account_head',
                    foreignField: 'EmpID',
                    as: 'nameAh'
                }
            }, {
                $lookup: {
                    from: 'empid_names',
                    localField: 'th',
                    foreignField: 'EmpID',
                    as: 'nameTh'
                }
            }, {
                $lookup: {
                    from: 'empid_names',
                    localField: 'ReportTo',
                    foreignField: 'EmpID',
                    as: 'nameReportto'
                }
            }, {
                $unwind: {
                    path: '$nameReportto'
                }
            }, {
                $unwind: {
                    path: '$nameTh'
                }
            }, {
                $unwind: {
                    path: '$nameAh'
                }
            }, {
                $unwind: {
                    path: '$nameOh'
                }
            }, {
                $unwind: {
                    path: '$nameQh'
                }
            }, {
                $project: {
                    EmployeeID: 1,
                    clientname: 1,
                    Process: 1,
                    sub_process: 1,
                    DOJ: 1,
                    oh: 1,
                    OHName: '$nameOh.EmpName',
                    QH: '$qh',
                    QHName: '$nameQh.EmpName',
                    TH: '$th',
                    THName: '$nameTh.EmpName',
                    AH: '$account_head',
                    AHName: '$nameAh.EmpName',
                    ReportTo: 1,
                    rptToName: '$nameReportto.EmpName',
                    Ageing: 1,
                    client_id: '$client_name',
                    sub_process_id: '$cm_id',
                    process_id: '$w.process_id'
                }
            }])
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "Error occured!" });
    }
}

//getting process ems
exports.getProcess = async (req, res) => {
    try {
      const { qh } = req.body;
      var flag = 0;
  
      var emplist = [
        "CE01080195",
        "CE05070052",
        "CE0421937241",
        "CE032030295",
        "CE10091236",
      ];
  
      emplist.forEach((element) => {
        if (qh === element) {
          flag = 1;
        }
      });
  
      if (flag === 1) {
        var res2 = await clientStatusMaster.aggregate([
            {
                $addFields: {
                  cm_id: {
                    $convert: {
                      input: "$cm_id",
                      to: "int",
                      onError: 0,
                    },
                }
            }
        },
          {
            $project: {
              cm_id: 1,
              _id: 0,
            },
          },
        ]);
  
        var cm_id_res = new Array();

        for (var items in res2) {
          cm_id_res.push(res2[items]["cm_id"]);
        }
        var res1 = await newClientMaster.aggregate([
            {
                $addFields: {
                  cm_id: {
                    $convert: {
                      input: "$cm_id",
                      to: "int",
                      onError: 0,
                    },
                }
            }
        },
          {
            $match: {
              cm_id: { $nin: cm_id_res },
            },
          },
        
          {
            $lookup: {
              from: "clientmasters",
              localField: "client_name",
              foreignField: "client_id",
              as: "result",
            },
          },
          {
            $unwind: {
              path: "$result",
            },
          },
          {
            $sort: {
              "result.client_name": 1,
            },
          },
          {
            $project: {
              Process: {
                $concat: [
                  "$result.client_name",
                  "|",
                  "$process",
                  "|",
                  "$sub_process",
                ],
              },
              cm_id: 1,
              _id:0
            },
          },
        ]);
        return res.status(200).json(res1);
      } else {
        var res1 = await whole_details_peremp.aggregate([
          { $match: { qh: qh } },
    { $group: {
      _id: { clientname: "$clientname", Process: "$Process", sub_process: "$sub_process" },
      cm_id: { $first: "$cm_id" }
    } },
    {$addFields: {
        cm_id: {
         $convert: {
          input: '$cm_id',
          to: 'int',
          onError: 0
         }
        }
       }},
    { $project: {
      Process: { $concat: [ "$_id.clientname", "|", "$_id.Process", "|", "$_id.sub_process" ] },
      cm_id: 1,
      _id: 0
    } },
    { $sort: { Process: 1 } }
        ]);
        return res.status(200).json(res1);
      }
    } catch (error) {
      return res.status(500).json("res");
    }
  };

//getting process for report 
exports.getProcessForReport = async (req, res) => {
    try {
      const { EmployeeID, emp_type, client,process } = req.body;
     
      var flag = 0
      var emplist = ["CE01080195"];
      emplist.forEach(element => {
        if (EmployeeID === element) {
          flag = 1
        }
      });
    
      if(emp_type === 'Demo'){
        const data = await whole_details_peremp.aggregate( [{$match: {
            client_name: client
           }}, {$group: {
            _id: {
             clientname: '$clientname',
             Process: '$Process',
             sub_process: '$sub_process',
             cm_id: '$cm_id'
            }
           }}, {$addFields: {
            cm_id: {
             $convert: {
              input: '$_id.cm_id',
              to: 'int',
              onError: 0
             }
            }
           }}, {$project: {
            _id: 0,
            Process: {
             $concat: [
              '$_id.clientname',
              '|',
              '$_id.Process',
              '|',
              '$_id.sub_process',
              '|',
              '$_id.cm_id'
             ]
            },
            cm_id: 1
           }}])
           return res.status(200).json(data);
      }else{
        if(EmployeeID === 'CE10091236'|| EmployeeID === 'CE03070003' || flag===1){
            var data = await whole_details_peremp.aggregate([{$group: {
                _id: {
                 clientname: '$clientname',
                 Process: '$Process',
                 sub_process: '$sub_process',
                 cm_id: '$cm_id'
                }
               }}, {$addFields: {
                cm_id: {
                 $convert: {
                  input: '$_id.cm_id',
                  to: 'int',
                  onError: 0
                 }
                }
               }}, {$project: {
                _id: 0,
                Process: {
                 $concat: [
                  '$_id.clientname',
                  '|',
                  '$_id.Process',
                  '|',
                  '$_id.sub_process',
                  '|',
                  '$_id.cm_id'
                 ]
                },
                cm_id: 1
               }}, {$sort: {
                Process: 1
               }}])
               return res.status(200).json(data);
        }
        else if(EmployeeID === 'OFF8438' || EmployeeID === 'OFF8418' || EmployeeID === 'OFF8408' || EmployeeID === 'OFF8409' || EmployeeID === '9266882209' || EmployeeID === '9627329523' || EmployeeID === '8800838362' || EmployeeID === '9625762391' || EmployeeID === '8178433132' || EmployeeID === "9891988449" || EmployeeID === '9205541837' || EmployeeID === '9958602820' || EmployeeID === '7073695246'){
            const data = await clientMaster.aggregate([{$match: {
                client_id: '74'
               }}, {$lookup: {
                from: 'newclientmasters',
                localField: 'client_id',
                foreignField: 'client_name',
                as: 't2'
               }}, {$unwind: {
                path: '$t2'
               }}, {$addFields: {
                cm_id: {
                 $convert: {
                  input: '$t2.cm_id',
                  to: 'int',
                  onError: 0
                 }
                }
               }}, {$project: {
                _id: 0,
                Process: {
                 $concat: [
                  '$client_name',
                  '|',
                  '$t2.process',
                  '|',
                  '$t2.sub_process',
                  '|',
                  '$t2.cm_id'
                 ]
                },
                cm_id: 1
               }}])
               return res.status(200).json(data);
        }
        else if(EmployeeID === 'APOLLO1'){
            const data = await clientMaster.aggregate([{$match: {
                client_id: '127'
               }}, {$lookup: {
                from: 'newclientmasters',
                localField: 'client_id',
                foreignField: 'client_name',
                as: 't2'
               }}, {$unwind: {
                path: '$t2'
               }}, {$addFields: {
                cm_id: {
                 $convert: {
                  input: '$t2.cm_id',
                  to: 'int',
                  onError: 0
                 }
                }
               }}, {$project: {
                _id: 0,
                Process: {
                 $concat: [
                  '$client_name',
                  '|',
                  '$t2.process',
                  '|',
                  '$t2.sub_process',
                  '|',
                  '$t2.cm_id'
                 ]
                },
                cm_id: 1
               }}])
               return res.status(200).json(data);
        }
        else if(EmployeeID === 'DEEPAK' || EmployeeID === 'DEEPAKM'){
            const data = await clientMaster.aggregate([{$match: {
                client_id: '14'
               }}, {$lookup: {
                from: 'newclientmasters',
                localField: 'client_id',
                foreignField: 'client_name',
                as: 't2'
               }}, {$unwind: {
                path: '$t2'
               }}, {$addFields: {
                cm_id: {
                 $convert: {
                  input: '$t2.cm_id',
                  to: 'int',
                  onError: 0
                 }
                }
               }}, {$project: {
                _id: 0,
                Process: {
                 $concat: [
                  '$client_name',
                  '|',
                  '$t2.process',
                  '|',
                  '$t2.sub_process',
                  '|',
                  '$t2.cm_id'
                 ]
                },
                cm_id: 1
               }}])
               return res.status(200).json(data);
        }
        else if(EmployeeID === 'MS@TATAAIG.COM' ){
            const data = await clientMaster.aggregate([{$match: {
                client_id: '147'
               }}, {$lookup: {
                from: 'newclientmasters',
                localField: 'client_id',
                foreignField: 'client_name',
                as: 't2'
               }}, {$unwind: {
                path: '$t2'
               }}, {$addFields: {
                cm_id: {
                 $convert: {
                  input: '$t2.cm_id',
                  to: 'int',
                  onError: 0
                 }
                }
               }}, {$project: {
                _id: 0,
                Process: {
                 $concat: [
                  '$client_name',
                  '|',
                  '$t2.process',
                  '|',
                  '$t2.sub_process',
                  '|',
                  '$t2.cm_id'
                 ]
                },
                cm_id: 1
               }}])
               return res.status(200).json(data);
        }
        else if(EmployeeID === 'ANUJBHATT' ){
            const data = await clientMaster.aggregate([{$match: {
                client_id: '129'
               }}, {$lookup: {
                from: 'newclientmasters',
                localField: 'client_id',
                foreignField: 'client_name',
                as: 't2'
               }}, {$unwind: {
                path: '$t2'
               }}, {$addFields: {
                cm_id: {
                 $convert: {
                  input: '$t2.cm_id',
                  to: 'int',
                  onError: 0
                 }
                }
               }}, {$project: {
                _id: 0,
                Process: {
                 $concat: [
                  '$client_name',
                  '|',
                  '$t2.process',
                  '|',
                  '$t2.sub_process',
                  '|',
                  '$t2.cm_id'
                 ]
                },
                cm_id: 1
               }}])
               return res.status(200).json(data);
        }
        else{
            const data = await whole_details_peremp.aggregate([{$match: {
                $or: [
                 {
                  Process: process
                 },
                 {
                  qh: EmployeeID
                 },
                 {
                  oh: EmployeeID
                 },
                 {
                  account_head: EmployeeID
                 }
                ]
               }}, {$group: {
                _id: {
                 clientname: '$clientname',
                 Process: '$Process',
                 sub_process: '$sub_process',
                 cm_id: '$cm_id'
                }
               }}, {$addFields: {
                cm_id: {
                 $convert: {
                  input: '$_id.cm_id',
                  to: 'int',
                  onError: 0
                 }
                }
               }}, {$project: {
                _id: 0,
                Process: {
                 $concat: [
                  '$_id.clientname',
                  '|',
                  '$_id.Process',
                  '|',
                  '$_id.sub_process',
                  '|',
                  '$_id.cm_id'
                 ]
                },
                cm_id: 1
               }}, {$sort: {
                Process: 1
               }}])
               return res.status(200).json(data);
        }
        
      }
        } catch (error) {
          return res.status(500).json({ error: 'Error occured!' })
        }
  };

// getting getNameByID
exports.getNameByID = async(req,res) =>{
    try{
  
      const emp = req.body.emp;
      var res1 = await empid_name.aggregate([
        {
           $match:{
            EmpID:{$eq:emp}
           }
        },
        {
          $project:{
             EmpDet : {
      $concat:["$EmpName","-","$EmpID"]
    },_id:0
          }
        }
      ]);
  
      return res.status(200).json(res1);
    }
    catch(error)
    {
     return res.status(500).json({ error: "Error occured!" });
    }
  }; 
  
// getting getActiveEmpID
exports.getActiveEmpID = async (req, res) => {
  try {
    var res1 = await employee_map.aggregate(
      [
        {
          $match: {
            emp_status: "Active",
            df_id: {
              $nin: [74, 77],
            },
          },
        },
        {
          $group:
          {
            _id: null,
            fieldN: {
              $addToSet:"$EmployeeID"
            }
          }
        },
        {
          $lookup:{
            from: "personal_details",
            localField: "fieldN",
            foreignField: "EmployeeID",
            as: "result"
          }
        },{
          $unwind:
          {
            path: "$result",
          }

        },
        {
          $project:
          {
            EmployeeID:"$result.EmployeeID",
            EmployeeName:"$result.EmployeeName",
            _id:0
          }
        }

      ]
    );
    return res.status(200).json(res1);
  } catch (error) {
    return res.status(500).json({ error: "Error occures!" });
  }
};

//getting getActiveClient
exports.getActiveClient = async (req, res) => {
  try {
    var res2 = await clientStatusMaster.aggregate([
      {
        $project: {
          cm_id: 1,
          _id: 0,
        },
      },
    ]);
    var cm_id_res = new Array();
    for (var items in res2) {
      cm_id_res.push(res2[items]["cm_id"]);
    }

    var res1 = await newClientMaster.aggregate([
      {
        $match: {
          cm_id: {
            $nin:  cm_id_res,
          },
        },
      },
     
      {
        $lookup: {
          from: "clientmasters",
          localField: "client_name",
          foreignField: "client_id",
          as: "result",
        },
      },
      {
        $unwind: {
          path: "$result",
        },
      },
      {
        $lookup: {
          from: "location_masters",
          localField: "location",
          foreignField: "id",
          as: "result1",
        },
      },
      {
        $unwind: {
          path: "$result1",
        },
      },
      {
        $addFields: {
            cm_id: {
                $convert: {
                    input: '$cm_id',
                    to: 'int',
                    onError: 0
                }
            }
        }
    },
      {
        $project: {
          _id: 0,
          cm_id: 1,
          Process: {
            $concat: [
              "$result.client_name",
              "|",
              "$process",
              "|",
              "$sub_process",
              " (",
              "$result1.location",
              ")",
            ],
          },
        },
      },
      {
        $sort: { Process: 1 },
      },
    ]);
    return res.status(200).json(res1);
  } catch (error) {
    return res.status(500).json({ error: "Error occures!" });
  }
};

// getting getAggingByCmid
exports.getAggingByCmid = async (req, res) => {
  try {
    var cm_id = req.body.cm_idd;
    var res1 = await employee_map.aggregate([{$match: {
      cm_id: cm_id,
      emp_status: 'Active'
     }}, {$group: {
      _id: null,
      fieldN: {
       $addToSet: '$EmployeeID'
      }
     }}, {$lookup: {
      from: 'status_tables',
      localField: 'fieldN',
      foreignField: 'EmployeeID',
      as: 'result'
     }}, {$unwind: {
      path: '$result'
     }}, {$addFields: {
      onFloor: {
       $convert: {
        input: '$result.OnFloor',
        to: 'date',
        onError: 0
       }
      }
     }}, {$addFields: {
      inMilliseconds: {
       $subtract: [
        (new Date()),
        '$onFloor'
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
      'result.Status': 6,
      inDays: {
       $lte: 30
      }
     }}, {$project: {
      _id: 0,
      EmployeeID: '$result.EmployeeID'
     }}])
    var array=[]
    for(var i= 0; i<res1.length ; i++){
              array.push(res1[i]["EmployeeID"])
            }
    return res.status(200).json(array);
  } catch (error) {
    return res.status(500).json({ error: "Error occured!" });
  }
};

exports.getQaTlTrDecByCmid = async (req, res) => {
    try {
        const cm_id = req.body.cm_id
        const data = await activeEmpId.aggregate([{$match: {
          cm_id: cm_id,
          emp_level: 'EXECUTIVE'
         }}, {$group: {
          _id: null,
          fieldN: {
           $addToSet: '$EmployeeID'
          }
         }}, {$facet: {
          tl: [
           {
            $lookup: {
             from: 'status_tables',
             localField: 'fieldN',
             foreignField: 'EmployeeID',
             as: 'tl'
            }
           },
           {
            $unwind: '$tl'
           },
           {
            $addFields: {
             EmployeeID: '$tl.ReportTo',
             Designation: 'TL'
            }
           }
          ],
          trainer: [
           {
            $lookup: {
             from: 'status_trainings',
             localField: 'fieldN',
             foreignField: 'EmployeeID',
             as: 'tr'
            }
           },
           {
            $unwind: '$tr'
           },
           {
            $addFields: {
             EmployeeID: '$tr.Trainer',
             Designation: 'Trainer'
            }
           }
          ],
          qa: [
           {
            $lookup: {
             from: 'status_tables',
             localField: 'fieldN',
             foreignField: 'EmployeeID',
             as: 'qa'
            }
           },
           {
            $unwind: '$qa'
           },
           {
            $addFields: {
             EmployeeID: '$qa.Qa_ops',
             Designation: 'QA'
            }
           }
          ]
         }}, {$project: {
          _id: 0,
          result: {
           $concatArrays: [
            '$tl',
            '$qa',
            '$trainer'
           ]
          }
         }}, {$unwind: {
          path: '$result'
         }}, {$replaceRoot: {
          newRoot: '$result'
         }}, {$group: {
          _id: {
           EmployeeID: '$EmployeeID',
           Designation: '$Designation'
          }
         }}, {$lookup: {
          from: 'empid_names',
          localField: '_id.EmployeeID',
          foreignField: 'EmpID',
          as: 'name'
         }}, {$unwind: {
          path: '$name'
         }}, {$addFields: {
          EmployeeID: '$_id.EmployeeID',
          Name: '$name.EmpName'
         }}, {$project: {
          _id: 0,
          EmployeeID: 1,
          Name: 1,
          Designation: '$_id.Designation'
         }}]);
          
          return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Error occured!' })
    }
  };

  