"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[195],{57195:function(e,l,t){t.r(l);var s=t(74165),a=t(15861),o=t(29439),r=t(72791),n=t(22654),i=t(54379),c=t(41470),d=t(57689),m=t(88890),p=t.n(m),x=t(75985),u=t(41473),f=t(55818),h=t(3721),y=t(21123),j=t(81131),b=t(80184),v="".concat("http://192.168.220.59:5000");l.default=function(){var e=(0,r.useState)(""),l=(0,o.Z)(e,2),t=l[0],m=l[1],N=(0,r.useState)([]),z=(0,o.Z)(N,2),S=z[0],g=z[1],k=(0,r.useState)([]),w=(0,o.Z)(k,2),F=w[0],Z=w[1],O=(0,r.useState)(""),T=(0,o.Z)(O,2),V=T[0],_=T[1],I=(0,r.useState)(""),A=(0,o.Z)(I,2),E=A[0],P=A[1],M=(0,r.useState)(""),Y=(0,o.Z)(M,2),H=Y[0],C=Y[1],q=(0,r.useState)(""),L=(0,o.Z)(q,2),D=L[0],R=L[1],J=(0,r.useState)(""),W=(0,o.Z)(J,2),X=W[0],K=W[1],U=(0,r.useState)(""),B=(0,o.Z)(U,2),G=B[0],Q=B[1],$=(0,r.useState)(""),ee=(0,o.Z)($,2),le=ee[0],te=ee[1],se=(0,r.useState)(""),ae=(0,o.Z)(se,2),oe=ae[0],re=ae[1],ne=(0,r.useState)(!1),ie=(0,o.Z)(ne,2),ce=ie[0],de=ie[1],me=(0,r.useState)(!1),pe=(0,o.Z)(me,2),xe=pe[0],ue=pe[1],fe=new URLSearchParams((0,d.TH)().search),he=fe.get("id")?fe.get("id"):"",ye=fe.get("sheetid")?fe.get("sheetid"):"",je=fe.get("calltype")?fe.get("calltype"):"",be=fe.get("mobile")?fe.get("mobile"):"",ve=fe.get("acht")?fe.get("acht"):"",Ne=fe.get("callid")?fe.get("callid"):"",ze=fe.get("extrafield1")?fe.get("extrafield1"):"",Se=fe.get("extrafield2")?fe.get("extrafield2"):"";(0,r.useEffect)((function(){var e=function(){var e=(0,a.Z)((0,s.Z)().mark((function e(){var l,t,o,r;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l=ye,e.next=3,fetch("".concat(v,"/api/get-dynamic-collection-data"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({getdynamiccollection:l})});case 3:return t=e.sent,e.next=6,t.json();case 6:o=e.sent,422!==t.status&&o?o?(p()("#textbox1").show(),p()("#textbox2").show(),p()("#textbox3").show(),p()("#textbox4").show(),p()("#textbox5").show(),p()("#textbox6").show(),p()("#sheethide").hide(),m(o),Q(o[0].param),r=function(){var e=(0,a.Z)((0,s.Z)().mark((function e(){var l,t;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(v,"/api/get-rebuttel-score-data"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:he})});case 2:return l=e.sent,e.next=5,l.json();case 5:t=e.sent,422!==l.status&&t?t?t.length>0&&(g(t),Z(t[0].employeeid),re(t[0].email),_(t[0].auditor_remark),P(t[0].obtainedMarks),C(t[0].finalScore),R(t[0].maximumMarks),K(t[0].fatalCount),te(t[0].fieldData),""===t[0].ztp_remark?de(!1):de(!0),""===t[0].wow_call_remark?ue(!1):ue(!0)):console.log("No Data!"):console.log("error");case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),r()):console.log("No Data!"):console.log("error ");case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),p()((function(){p()("#option1").on("change",(function(){"no"===p()(this).val()?p()("#inputoption").hide():"yes"===p()(this).val()&&p()("#inputoption").show()})),p()("#option2").on("change",(function(){"no"===p()(this).val()?p()("#inputoption1").hide():"yes"===p()(this).val()&&p()("#inputoption1").show()})),p()("#option3").on("change",(function(){"no"===p()(this).val()?p()("#inputoption2").hide():"yes"===p()(this).val()&&p()("#inputoption2").show()})),p()("#selectsheet").on("change",(function(){"Select"===p()(this).val()&&(p()("#textbox1").hide(),p()("#textbox2").hide(),p()("#textbox3").hide(),p()("#textbox4").hide(),p()("#textbox5").hide(),p()("#textbox6").hide())}))}));var ge=[],ke=[],we=[],Fe=[],Ze=(G&&G.map((function(e,l){var t="#mxmrk"+l,s="#subpara"+l,a="#rempara"+l,o="#marking"+l,r="#att1para"+l,n="#attpara2"+l,i="#attpara3"+l,c="#fatalOption"+l;"No"!==e.fatal?(p()(t).css("color","red"),p()(s).css("color","red"),p()(a).css("color","red"),p()(o).css("color","red"),p()(r).css("color","red"),p()(n).css("color","red"),p()(i).css("color","red"),p()(c).show()):(p()(t).css("color","#495057"),p()(s).css("color","#495057"),p()(a).css("color","#495057"),p()(o).css("color","#495057"),p()(r).css("color","#495057"),p()(n).css("color","#495057"),p()(i).css("color","#495057"),p()(c).hide());var d="#naOption"+l;"No"!==e.na?p()(d).show():p()(d).hide()})),ye.split("_").slice(1));return(0,b.jsxs)("div",{children:[(0,b.jsx)(n.Z,{}),(0,b.jsx)(c.Z,{}),(0,b.jsx)(x.Ix,{}),(0,b.jsx)("div",{className:"content-wrapper",children:(0,b.jsx)("section",{className:"content ",children:(0,b.jsx)("div",{className:"container-fluid ",children:(0,b.jsx)("form",{encType:"multipart/form-data",children:(0,b.jsx)("div",{className:"row mt-2",children:(0,b.jsx)("div",{style:{fontSize:"12.3px"},className:"col-md-12",children:(0,b.jsxs)("div",{className:"card card-info mt-3",children:[(0,b.jsx)("div",{className:"card-header",children:(0,b.jsx)("div",{className:"row",children:(0,b.jsx)("div",{className:"col",children:(0,b.jsxs)("h4",{className:"card-title mt-2",style:{fontSize:".9rem"},children:[" ","Evaluation Form-",(0,b.jsx)("span",{children:Ze.join("_")})]})})})}),(0,b.jsxs)("div",{className:"card-body",children:[(0,b.jsxs)("div",{className:"row mt-2",id:"textbox6",style:{border:"solid #dfe6e9 1px",display:"none"},children:[(0,b.jsxs)("div",{className:"form-group col-sm-3",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz",children:"Impact/Emp ID:"}),(0,b.jsx)("select",{name:"employeeid",id:"employeeid",className:"form-control form-control-sm",style:{fontSize:"12.4px"},readOnly:!0,children:(0,b.jsx)("option",{children:F||null})})]}),(0,b.jsx)("div",{className:"col-sm-3",children:(0,b.jsxs)("div",{className:"form-group",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz",children:"MSISDN:"}),(0,b.jsx)("span",{className:"text-danger",children:"*"}),(0,b.jsx)("input",{className:"form-control form-control-sm",type:"number",name:"msisdn",id:"msisdn",defaultValue:be||null,style:{fontSize:"12.4px"},readOnly:!0})]})}),(0,b.jsx)("div",{className:"col-sm-3",children:(0,b.jsxs)("div",{className:"form-group",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz",children:"CALL ID:"}),(0,b.jsx)("span",{className:"text-danger",children:"*"}),(0,b.jsx)("input",{className:"form-control form-control-sm",type:"text",defaultValue:Ne||null,name:"callid",id:"callid",style:{fontSize:"12.4px"},readOnly:!0})]})}),(0,b.jsx)("div",{className:"col-sm-3",children:(0,b.jsxs)("div",{className:"form-group",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz",children:"CALL TYPE:"}),(0,b.jsx)("input",{className:"form-control form-control-sm",type:"text",name:"calltype",defaultValue:je||null,id:"calltype",style:{fontSize:"12.4px"},readOnly:!0})]})}),(0,b.jsx)("div",{className:"col-sm-3",children:(0,b.jsxs)("div",{className:"form-group",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz",children:"ACHT:"}),(0,b.jsx)("input",{className:"form-control form-control-sm",type:"text",name:"acht",defaultValue:ve||null,id:"acht",style:{fontSize:"12.4px"},readOnly:!0})]})}),(0,b.jsx)("div",{className:"col-sm-3",children:(0,b.jsxs)("div",{className:"form-group",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz",children:"Email:"}),(0,b.jsx)("input",{className:"form-control form-control-sm",type:"email",defaultValue:oe||null,name:"email",style:{fontSize:"12.4px"}})]})}),(0,b.jsx)("div",{className:"col-sm-3",children:(0,b.jsxs)("div",{className:"form-group",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz",children:"EXTRA FIELD1:"}),(0,b.jsx)("input",{className:"form-control form-control-sm",type:"text",name:"acht",defaultValue:ze||null,id:"extrafield1",style:{fontSize:"12.4px"}})]})}),(0,b.jsx)("div",{className:"col-sm-3",children:(0,b.jsxs)("div",{className:"form-group",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz",children:"EXTRA FIELD2:"}),(0,b.jsx)("input",{className:"form-control form-control-sm",type:"text",name:"extrafield2",defaultValue:Se||null,id:"extrafield2",style:{fontSize:"12.4px"}})]})}),t?t.map((function(e){return e.any.map((function(e){var l={};for(var t in le)if(le.hasOwnProperty(t)){var s=le[t];e.fieldname===t&&(l[t]=s)}if("select"===e.controltype){var a=[];return a=e.list.split(","),(0,b.jsxs)("div",{id:"selectoption",className:"form-group col-sm-3 ",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},className:"form-label text-capitalize",children:e.fieldname}),(0,b.jsxs)("select",{value:l[e.fieldname],style:{fontSize:"12.4px"},name:e.fieldname,className:"form-control form-control-sm",children:[(0,b.jsx)("option",{value:"",children:"Select"}),a?a.map((function(e){return(0,b.jsx)("option",{children:e})})):""]})]})}return"Yes"===e.isnumeric&&"text"===e.controltype?(0,b.jsxs)("div",{className:"form-group col-sm-3",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},className:"form-label text-capitalize",children:e.fieldname},e._id+"46484"),(0,b.jsx)("input",{type:"number",style:{fontSize:"12.4px"},name:e.fieldname,className:"form-control form-control-sm",value:l[e.fieldname]},e._id+"98698")]},e._id):(0,b.jsxs)("div",{className:"form-group col-sm-3",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},className:"form-label text-capitalize",children:e.fieldname},e._id+"46484"),(0,b.jsx)("input",{type:e.controltype,style:{fontSize:"12.4px"},name:e.fieldname,className:"form-control form-control-sm",value:l[e.fieldname]},e._id+"98698")]},e._id)}))})):""]}),(0,b.jsx)("div",{className:"row mt-2",id:"textbox1",style:{border:"solid #dfe6e9 1px",display:"none"},children:t?t.map((function(e){for(var l=0,t=0;t<e.param.length;t++)l+=parseInt(e.param[t].maxmarks);return ge.push(l),e.param.map((function(e,l){var t=[];t=e.attributes.split("|"),ke.push(e.parameter),we.push(e.subparameter);t=[];t=e.attributes.split("|"),ke.push(e.parameter),we.push(e.subparameter);for(var s=0,a=0;a<Object.values(e.subFields).length;a++)s+=parseInt(e.subFields[a].maxmarkss);Fe.push(s);var o=0,r=[];return Fe.forEach((function(e){r=o+=e})),parseInt(r)+parseInt(ge),(0,b.jsx)("div",{id:"fatalColor"+l,className:"card-body mt-2",children:(0,b.jsxs)(u.Z,{children:[(0,b.jsx)(f.Z,{expandIcon:(0,b.jsx)(j.Z,{}),"aria-controls":"panel1a-content",id:"panel1a-header",className:"bg-info",children:(0,b.jsx)(y.Z,{style:{fontSize:".77rem"},children:l+1+". "+e.parameter})}),(0,b.jsx)(h.Z,{children:(0,b.jsx)(y.Z,{children:S?S.map((function(s){return(0,b.jsx)(b.Fragment,{children:(0,b.jsxs)("div",{className:"row ",children:[(0,b.jsxs)("div",{className:"row col-md-12",children:[(0,b.jsx)("div",{className:" col-md-12",style:{fontSize:".75rem"},children:(0,b.jsx)("label",{className:"text-gray-dark",title:"Legend : "+e.legend,id:"subpara"+l,children:"1. "+e.subparameter})}),(0,b.jsxs)("div",{className:"row col-md-12",children:[(0,b.jsxs)("div",{className:"form-group col-md-2 ",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"exampleInputEmail",children:"Max Marks:"}),(0,b.jsx)("input",{type:"text",value:e.maxmarks?e.maxmarks:"",id:"mxmrk"+l,style:{fontSize:"12.4px"},name:"maxmarks",className:"form-control form-control-sm col-md-8 ".concat("Yes"===e.fatal?"text-red":""),"aria-describedby":"emailHelp",readOnly:!0})]}),(0,b.jsxs)("div",{className:"form-group col-md-2",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz",children:"Marking:"}),(0,b.jsxs)("select",{name:"marking",id:"marking"+l,defaultValue:s?s.marks[l]:null,className:"form-control form-control-sm ".concat("Yes"===e.fatal?"text-red":""),style:{fontSize:"12.4px"},required:!0,children:[" ",(0,b.jsx)("option",{value:"",children:"select"}),(0,b.jsx)("option",{id:"fatalOption"+l,style:{display:"none"},value:"00",children:"Fatal"}),(0,b.jsx)("option",{id:"naOption"+l,style:{display:"none"},value:"-1",children:"NA"}),(0,b.jsx)("option",{value:e.opt1,children:e.opt1}),(0,b.jsx)("option",{value:e.opt2,children:e.opt2}),e.opt3?(0,b.jsx)("option",{value:e.opt3,children:e.opt3}):(0,b.jsx)("option",{style:{display:"none"},value:e.opt3,children:e.opt3}),e.opt4?(0,b.jsx)("option",{value:e.opt4,children:e.opt4}):(0,b.jsx)("option",{style:{display:"none"},value:e.opt4,children:e.opt4})]}),(0,b.jsx)("p",{id:"errmark",style:{display:"none"},className:"text-danger",children:"required!"})]}),(0,b.jsxs)("div",{className:"form-group col-md-2",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz",children:"Attribute 1:"}),(0,b.jsxs)("select",{name:"attributes1",id:"att1para"+l,defaultValue:s?s.attributes1[l]:null,className:"form-control form-control-sm ".concat("Yes"===e.fatal?"text-red":""),style:{fontSize:"12.4px"},required:!0,children:[(0,b.jsx)("option",{value:"",children:"Select"}),t.map((function(e){return(0,b.jsx)("option",{children:e})}))]})]}),(0,b.jsxs)("div",{className:"form-group col-md-2",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz",children:"Attribute 2:"}),(0,b.jsxs)("select",{name:"attribute2",defaultValue:s?s.attributes2[l]:null,id:"attpara2"+l,className:"form-control form-control-sm ".concat("Yes"===e.fatal?"text-red":""),style:{fontSize:"12.4px"},required:!0,children:[(0,b.jsx)("option",{value:"",children:"Select"}),t.map((function(e){return(0,b.jsx)("option",{children:e})}))]})]}),(0,b.jsxs)("div",{className:"form-group col-md-2",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz",children:"Attribute 3:"}),(0,b.jsxs)("select",{name:"attribute3",defaultValue:s?s.attributes3[l]:null,id:"attpara3"+l,className:"form-control form-control-sm ".concat("Yes"===e.fatal?"text-red":""),style:{fontSize:"12.4px"},required:!0,children:[(0,b.jsx)("option",{value:"",children:"Select"}),t.map((function(e){return(0,b.jsx)("option",{children:e})}))]})]}),(0,b.jsxs)("div",{className:"form-group col-md-2",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"exampleInputEmail",children:"Remark:"}),(0,b.jsx)("textarea",{rows:"1",type:"text",id:"rempara"+l,defaultValue:s?s.remark[l]:null,style:{fontSize:"12.4px"},name:"remark",className:"form-control form-control-sm ".concat("Yes"===e.fatal?"text-red":""),"aria-describedby":"emailHelp",required:!0})]})]})]}),(0,b.jsxs)("div",{className:"row col-md-12",children:[" ",e.subFields?e.subFields.map((function(e,t){var a=[];if("No"!==e.fatals){var o="#subp"+l+t;p()(o).css("color","red")}else p()(o).css("color","black");if(a.push(e.subparameterr),"No"!==e.fatals){var r="#totMarks"+l+t;p()(r).css("color","red")}else p()(r).css("color","black");if("No"!==e.fatals){var n="#marking1"+l+t,i="#fatalOption1"+l+t;p()(n).css("color","red"),p()(i).show()}else p()(n).css("color","black"),p()(i).hide();if("No"!==e.nas){var c="#naOption1"+l+t;p()(c).show()}else p()(c).hide();var d=[];d=e.attributess.split("|");var m="#att1"+l+t,x="#att2"+l+t,u="#att3"+l+t,f="#rmk"+l+t;return"No"!==e.fatals?(p()(m).css("color","red"),p()(x).css("color","red"),p()(u).css("color","red"),p()(f).css("color","red")):(p()(m).css("color","black"),p()(x).css("color","black"),p()(u).css("color","black"),p()(f).css("color","black")),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{className:" col-md-12",style:{fontSize:".75rem"},children:(0,b.jsx)("label",{className:"text-gray-dark",title:"Legend : "+e.legends,id:"subp"+l+t,children:t+2+". "+a})}),(0,b.jsxs)("div",{className:"row col-md-12",children:[(0,b.jsxs)("div",{style:{fontSize:"12.4px"},className:"form-group col-md-2",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"exampleInputEmail",children:"Max Marks:"}),(0,b.jsx)("input",{type:"text",value:e.maxmarkss?e.maxmarkss:"",id:"totMarks"+l+t,style:{fontSize:"12.4px"},name:"maxmarks",className:"form-control form-control-sm col-md-8 ".concat("Yes"===e.fatals?"text-red":""),"aria-describedby":"emailHelp",readOnly:!0})]}),(0,b.jsxs)("div",{className:" form-group col-md-2",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz",children:"Marking:"}),(0,b.jsxs)("select",{name:"markings",id:"marking1"+l+t,defaultValue:s.subParaMarks[l]?s.subParaMarks[l][t].markings:null,className:"form-control form-control-sm ".concat("Yes"===e.fatals?"text-red":""),style:{fontSize:"12.4px"},required:!0,children:[" ",(0,b.jsxs)("option",{value:"",children:[" ","select"," "]}),(0,b.jsx)("option",{id:"fatalOption1"+l+t,style:{display:"none"},value:"00",children:"Fatal"}),(0,b.jsx)("option",{id:"naOption1"+l+t,style:{display:"none"},value:"-1",children:"NA"}),(0,b.jsx)("option",{value:e.opt1s,children:e.opt1s}),(0,b.jsx)("option",{value:e.opt2s,children:e.opt2s}),e.opt3s?(0,b.jsxs)("option",{value:e.opt3s,children:[e.opt3s," "]}):(0,b.jsxs)("option",{style:{display:"none"},value:e.opt3s,children:[e.opt3s," "]}),e.opt4s?(0,b.jsx)("option",{value:e.opt4s,children:e.opt4s}):(0,b.jsx)("option",{style:{display:"none"},value:e.opt4s,children:e.opt4s})]}),(0,b.jsx)("p",{id:"errmark",style:{display:"none"},className:"text-danger",children:"required!"})]}),(0,b.jsxs)("div",{className:"form-group col-md-2",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz",children:"Attribute 1:"}),(0,b.jsxs)("select",{name:"attributes1",defaultValue:s.subParaAttributes1[l]?s.subParaAttributes1[l][t].attributes1:null,id:"att1"+l+t,className:"form-control form-control-sm ".concat("Yes"===e.fatals?"text-red":""),style:{fontSize:"12.4px"},required:!0,children:[(0,b.jsx)("option",{value:"",children:"Select"}),d.map((function(e){return(0,b.jsxs)("option",{children:[" ",e]})}))]})]}),(0,b.jsxs)("div",{className:" form-group col-md-2",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz",children:"Attribute 2:"}),(0,b.jsxs)("select",{name:"attribute2",id:"att2"+l+t,className:"form-control form-control-sm ".concat("Yes"===e.fatals?"text-red":""),defaultValue:s.subParaAttributes2[l]?s.subParaAttributes2[l][t].attribute2:null,style:{fontSize:"12.4px"},required:!0,children:[(0,b.jsx)("option",{value:"",children:"Select"}),d.map((function(e){return(0,b.jsxs)("option",{children:[" ",e]})}))]})]}),(0,b.jsxs)("div",{className:" form-group col-md-2",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz",children:"Attribute 3:"}),(0,b.jsxs)("select",{name:"attribute3",defaultValue:s.subParaAttributes3[l]?s.subParaAttributes3[l][t].attribute3:null,id:"att3"+l+t,className:"form-control form-control-sm ".concat("Yes"===e.fatals?"text-red":""),style:{fontSize:"12.4px"},required:!0,children:[(0,b.jsxs)("option",{value:"",children:[" ","Select"," "]}),d.map((function(e){return(0,b.jsxs)("option",{children:[" ",e]})}))]})]}),(0,b.jsxs)("div",{className:"form-group col-md-2",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"exampleInputEmail",children:"Remark:"}),(0,b.jsx)("textarea",{rows:"1",id:"rmk"+l+t,type:"text",defaultValue:s.subParaRemarks[l]?s.subParaRemarks[l][t].remark:null,style:{fontSize:"12.4px"},name:"remark",className:"form-control form-control-sm ".concat("Yes"===e.fatals?"text-red":""),"aria-describedby":"emailHelp",required:!0})]})]})]})})):null]})]})})})):null})})]})})}))})):""}),(0,b.jsxs)("div",{className:"row",children:[(0,b.jsx)("div",{className:"col-md-8",children:S?S.map((function(e){return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("div",{className:"row mt-1 col-md-12",id:"textbox2",style:{border:"solid #dfe6e9 1px"},children:[(0,b.jsxs)("div",{style:{fontSize:"12.4px",marginTop:"13px"},className:"form-group col-sm-2",children:[(0,b.jsx)("label",{style:{fontSize:"11px",display:"none"},htmlFor:"exampleInputEmail",children:"WOW Call:"}),(0,b.jsx)("p",{children:"Is it wow call"})]}),(0,b.jsxs)("div",{style:{marginTop:"8px"},className:" form-group col-sm-2",children:[(0,b.jsx)("label",{style:{fontSize:"11px",display:"none"},htmlFor:"xyz",children:"Option:"}),(0,b.jsxs)("select",{name:"wow_call_option",id:"option1",defaultValue:e?e.wow_call_option:null,className:"form-control form-control-sm",style:{fontSize:"12.4px"},children:[(0,b.jsx)("option",{defaultValue:"",children:"Select"}),(0,b.jsx)("option",{value:"no",children:"No"}),(0,b.jsx)("option",{value:"yes",children:"Yes"})]})]}),xe?(0,b.jsxs)("div",{style:{fontSize:"12.4px",marginTop:"-17px"},className:"form-group col-sm-5",id:"inputoption",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz"}),(0,b.jsx)("textarea",{rows:"1",id:"wowremark",type:"text",defaultValue:e?e.wow_call_remark:null,style:{fontSize:"12.4px",marginTop:"8px"},name:"wow_call_remark",className:"form-control form-control-sm","aria-describedby":"emailHelp"})]}):null]}),(0,b.jsxs)("div",{className:"row mt-1 col-md-12",id:"textbox3",style:{border:"solid #dfe6e9 1px"},children:[(0,b.jsxs)("div",{style:{fontSize:"12.4px",marginTop:"13px"},className:"form-group col-sm-2",children:[(0,b.jsx)("label",{style:{fontSize:"11px",display:"none"},htmlFor:"exampleInputEmail",children:"ZTP:"}),(0,b.jsx)("p",{children:"Is it ZTP"})]}),(0,b.jsxs)("div",{style:{marginTop:"8px"},className:" form-group col-sm-2",children:[(0,b.jsx)("label",{style:{fontSize:"11px",display:"none"},htmlFor:"xyz",children:"Option:"}),(0,b.jsxs)("select",{name:"ztp_option",defaultValue:e.ztp_option,className:"form-control form-control-sm",id:"option2",style:{fontSize:"12.4px"},children:[(0,b.jsx)("option",{defaultValue:"",children:"Select"}),(0,b.jsx)("option",{value:"no",children:"No"}),(0,b.jsx)("option",{value:"yes",children:"Yes"})]})]}),ce?(0,b.jsxs)("div",{style:{fontSize:"12px",marginTop:"-17px"},className:"form-group col-sm-5",id:"inputoption1",children:[(0,b.jsx)("label",{style:{fontSize:"12.4px"},htmlFor:"xyz"}),(0,b.jsx)("textarea",{rows:"1",type:"text",id:"ztpremark",defaultValue:e?e.ztp_remark:null,style:{fontSize:"12.4px",marginTop:"8px"},name:"ztp_remark",className:"form-control form-control-sm","aria-describedby":"emailHelp"})]}):null]}),(0,b.jsxs)("div",{className:"row mt-1 col-md-12",id:"textbox4",style:{border:"solid #dfe6e9 1px"},children:[(0,b.jsxs)("div",{style:{fontSize:"12.4px"},className:"form-group col-md-2",children:[(0,b.jsx)("label",{style:{fontSize:"11px",marginTop:"10px"},htmlFor:"exampleInputEmail",children:"Feedback:"}),(0,b.jsx)("span",{className:"text-danger",children:"*"})]}),(0,b.jsx)("div",{style:{marginTop:"10px"},className:"form-group col-sm-8",id:"inputoption2",children:(0,b.jsx)("textarea",{type:"text",style:{fontSize:"12.4px",height:"5rem"},defaultValue:V||null,name:"feedback",id:"feedback",className:"form-control form-control-sm","aria-describedby":"emailHelp"})})]})]})})):null}),(0,b.jsxs)("div",{className:"col-md-4 mt-1",id:"textbox5",style:{float:"right",border:"solid #dfe6e9 1px",display:"none"},children:[(0,b.jsxs)("div",{style:{marginTop:"10px"},className:"form-group row",children:[(0,b.jsxs)("div",{style:{fontSize:"12.4px"},className:"form-group col-md-6",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz",children:"Fatal Count:"}),(0,b.jsx)("input",{type:"text",defaultValue:X,style:{fontSize:"12.4px",marginTop:"8px"},name:"fatalcount",className:"form-control form-control-sm","aria-describedby":"emailHelp",readOnly:!0})]}),(0,b.jsxs)("div",{style:{fontSize:"12.4px"},className:"form-group col-md-6",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz",children:"Maximum Marks:"}),(0,b.jsx)("input",{type:"text",id:"maxmarks",defaultValue:D||null,style:{fontSize:"12.4px",marginTop:"8px"},name:"maximummarks",className:"form-control form-control-sm","aria-describedby":"emailHelp",readOnly:!0})]})]}),(0,b.jsxs)("div",{className:"row",children:[(0,b.jsxs)("div",{style:{fontSize:"12.4px"},className:"form-group col-md-6",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz",children:"Obtained Marks:"}),(0,b.jsx)("input",{type:"text",defaultValue:E||null,style:{fontSize:"12.4px",marginTop:"8px"},name:"obtainedmarks",className:"form-control form-control-sm","aria-describedby":"emailHelp",readOnly:!0})]}),(0,b.jsxs)("div",{style:{fontSize:"12.4px"},className:"form-group col-md-6",children:[(0,b.jsx)("label",{style:{fontSize:"11px"},htmlFor:"xyz",children:"Final Score:"}),(0,b.jsx)("input",{type:"text",defaultValue:H?H+"%":null,style:{fontSize:"12.4px",marginTop:"8px"},name:"finalscore",className:"form-control form-control-sm","aria-describedby":"emailHelp",readOnly:!0})]})]}),(0,b.jsx)("center",{className:"",children:(0,b.jsx)("button",{type:"click",id:"chk",style:{fontSize:"12px",marginTop:"1rem"},className:"btn btn-info form-group ",disabled:!0,children:"CHECK"})})]})]})]})]})})})})})})}),(0,b.jsx)(i.Z,{})]})}}}]);
//# sourceMappingURL=195.4d2192d0.chunk.js.map