const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const status_training = new Schema({
    EmployeeID:{
        type: String,
    }, Status:{
        type: String
    }, Trainer:{
        type: String,
    }, EmployeeID:{
        type: String,
    }, BatchID:{
        type: Number
    }, createdon:{
        type: Date,
    }, Remark:{
        type: String,
    }, Score:{
        type: String,
    }, FileName1:{
        type: String,
    }, createdby:{
        type: String,
    }, modifiedon:{
        type: Date,
    }, modifiedby:{
        type: String,
    }, cirtification_level:{
        type: Number,
    }, retrain_flag:{
        type: Number,
    }, Certification_1:{
        type: String,
    }, Certification_2:{
        type: String,
    }, Certification_3:{
        type: String,
    },Certification_4:{
        type: String,
    },
    Certification_5:{
        type: String,
    },
    Score2:{
        type: String,
    },
    Score3:{
        type: String,
    },
    Score4:{
        type: String,
    },
    Score5:{
        type: String,
    },
    FileName2:{
        type: String,
    },
    FileName3:{
        type: String,
    },
    FileName4:{
        type: String,
    },
    FileName5:{
        type: String,
    },
    c_status:{
        type: String,
    },
    no_of_Certification:{
        type: Number,
    },
    date_cer_5:{
        type: Date,
    },
    date_cer_2:{
        type: Date,
    },
    date_cer_3:{
        type: Date,
    },
    date_cer_4:{
        type: Date,
    },
    date_cer_1:{
        type: Date,
    },
    day_cer_1:{
        type: Number,
    },
    day_cer_2:{
        type: Number,
    },
    day_cer_3:{
        type: Number,
    },
    day_cer_4:{
        type: Number,
    },
    day_cer_5:{
        type: Number,
    },
},{
    timestamps:true 
});

module.exports = mongoose.model("status_training",status_training);