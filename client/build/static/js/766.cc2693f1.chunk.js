"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[766],{16766:function(e,a,t){t.r(a);var n=t(74165),l=t(15861),s=t(29439),r=t(72791),o=t(75985),c=t(11087),i=t(22654),d=t(41470),m=t(54379),u=t(59513),h=t.n(u),f=(t(68639),t(30910)),p=t(34265),x=t(91330),N=t(15005),v=t(80184),b="".concat("http://192.168.220.59:5000");function g(){return(0,v.jsx)(p.D,{children:(0,v.jsx)(x.Zh,{})})}a.default=function(){var e=(0,r.useState)(""),a=(0,s.Z)(e,2),t=a[0],u=a[1],p=(0,r.useState)(""),x=(0,s.Z)(p,2),j=(x[0],x[1]),y=(0,r.useState)(""),w=(0,s.Z)(y,2),S=w[0],C=w[1],Z=(0,r.useState)(""),k=(0,s.Z)(Z,2),_=k[0],D=k[1],T=(0,r.useState)(""),M=(0,s.Z)(T,2),F=M[0],O=M[1],z=(0,r.useState)(""),P=(0,s.Z)(z,2),E=P[0],I=P[1],A=(0,r.useState)(""),J=(0,s.Z)(A,2),q=J[0],L=J[1],R=(0,r.useState)([]),V=(0,s.Z)(R,2),Y=V[0],$=V[1],G=(0,r.useState)(!1),H=(0,s.Z)(G,2),W=H[0],B=H[1];(0,r.useEffect)((function(){!function(){var e=document.querySelectorAll(".needs-validation");Array.from(e).forEach((function(e){e.addEventListener("submit",(function(a){e.checkValidity()||(a.preventDefault(),a.stopPropagation()),e.classList.add("was-validated")}),!1)}))}()}),[]);var K=[{field:"id",headerName:"S.No.",headerClassName:" small",cellClassName:"small font-weight-bold",width:120},{field:"agentname",headerClassName:" small",cellClassName:"small font-weight-bold",headerName:"Agent Name",width:130,renderCell:function(e){return(0,v.jsx)("td",{children:(0,v.jsx)(c.OL,{target:"_blank",to:"/d-agent-sheetview?id=".concat(e.row._id,"&calltype=").concat(e.row.calltype,"&callid=").concat(e.row.callid,"&mobile=").concat(e.row.mobile,"&acht=").concat(e.row.acht,"&auditeeid=").concat(e.row.auditeeid,"&sheetid=").concat(e.row.sheetid,"&extrafield1=").concat(e.row.extrafield1,"&extrafield2=").concat(e.row.extrafield2),children:e.row.agentname})})}},{field:"obtainedMarks",headerClassName:" small",cellClassName:"small font-weight-bold",headerName:"Obtained Marks",width:150},{field:"fatalcount",headerClassName:" small",cellClassName:"small font-weight-bold",headerName:"Fatal Count",width:150},{field:"maximummarks",headerClassName:" small",cellClassName:"small font-weight-bold",headerName:"Maximum Marks",width:140},{field:"feedback",headerClassName:" small",cellClassName:"small font-weight-bold",headerName:"Feedback",width:150},{field:"finalScore",headerClassName:" small",cellClassName:"small font-weight-bold",headerName:"Final Score",width:140},{field:"auditor_name",headerClassName:" small",cellClassName:"small font-weight-bold",headerName:"Auditor Name",width:140},{field:"rebuttalstatus",headerClassName:" small",cellClassName:"small font-weight-bold",headerName:"Is Rebuttal?",width:150},{field:"calibrationstatus",headerName:"Is Calibrated?",headerClassName:" small",cellClassName:"small font-weight-bold",width:150}],Q=function(){var e=(0,l.Z)((0,n.Z)().mark((function e(a){var t,s,r,o;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),_&&F){e.next=5;break}return e.abrupt("return",!1);case 5:t=_.toLocaleDateString(),s=F.toLocaleDateString(),r=(0,f.$D)().EmployeeID,o=function(){var e=(0,l.Z)((0,n.Z)().mark((function e(){var a,l,o;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=E,e.next=3,fetch("".concat(b,"/api/d-report-get"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({date1:t,date2:s,process:S,sheet_name:a,employeeId:r})});case 3:return l=e.sent,e.next=6,l.json();case 6:o=e.sent,422!==l.status&&o?o?$(o):console.log("No Data!"):console.log("error ");case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),o(),B(!0);case 11:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),U="",X="",ee=Y.map((function(e,a){return{abc:U=e.rebuttalJoin.length>0?"Yes":"No",ccf:X=e.caliJoin.length>0?"Yes":"No",id:a+1,_id:e._id,auditor_name:e.auditor_name,maximummarks:e.maximumMarks,obtainedMarks:e.obtainedMarks,finalScore:e.finalScore,fatalcount:e.fatalCount,agentname:e.auditee_name,feedback:e.auditor_remark,rebuttalstatus:U,calibrationstatus:X,calltype:e.calltype,extrafield1:e.extrafield1,extrafield2:e.extrafield2,callid:e.callid,mobile:e.msisdn,acht:e.acht,auditeeid:e.auditee_id,sheetid:e.sheet_name}}));return(0,r.useEffect)((function(){var e=function(){var e=(0,l.Z)((0,n.Z)().mark((function e(){var a,t,l;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=(0,f.$D)().EmployeeID,e.next=3,fetch("".concat(b,"/api/d-master-report-process"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({employeeId:a})});case 3:return t=e.sent,e.next=6,t.json();case 6:l=e.sent,422!==t.status&&l?l?l.length>0&&L(l):console.log("No Data!"):console.log("error ");case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(i.Z,{}),(0,v.jsx)(d.Z,{}),(0,v.jsx)(o.Ix,{}),(0,v.jsx)("div",{className:"content-wrapper",children:(0,v.jsx)("section",{className:"content",children:(0,v.jsx)("div",{className:"container-fluid",children:(0,v.jsx)("form",{id:"form1",noValidate:!0,className:"needs-validation",onSubmit:Q,children:(0,v.jsx)("div",{className:"row mt-2",children:(0,v.jsx)("div",{style:{fontSize:"12px"},className:"col-md-12",children:(0,v.jsxs)("div",{className:"card card-info mt-3",children:[(0,v.jsx)("div",{className:"card-header",children:(0,v.jsx)("h3",{style:{fontSize:"12px"},className:"card-title",children:"Report"})}),(0,v.jsxs)("div",{className:"card-body",children:[(0,v.jsxs)("div",{className:"row",children:[(0,v.jsxs)("div",{id:"process",className:" form-group col-md-3",children:[(0,v.jsx)("label",{htmlFor:"xyz",children:"Process:"}),(0,v.jsx)("span",{style:{color:"red"},children:"*"}),(0,v.jsxs)("select",{id:"Auditor",name:"process",onChange:function(e){e.preventDefault();var a=function(){var a=(0,l.Z)((0,n.Z)().mark((function a(){var t,l,s,r,o;return(0,n.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.target.value,l=t.split("|"),s=l[3],C(e.target.value),a.next=6,fetch("".concat(b,"/api/find-data-with-process-name"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({cm_id:s})});case 6:return r=a.sent,a.next=9,r.json();case 9:o=a.sent,422!==r.status&&o?u(o):console.log("error ");case 11:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}}();a()},className:"form-control form-control-sm",style:{fontSize:"12.4px"},required:!0,children:[(0,v.jsx)("option",{value:"",children:"--Select--"}),Object.values(q).length>=1&&q?q.map((function(e){return(0,v.jsx)("option",{value:e.Process,children:e},e.cm_id)})):null]}),(0,v.jsx)("div",{className:"invalid-feedback",children:"Please choose a process."})]}),(0,v.jsxs)("div",{className:" form-group col-md-3",children:[(0,v.jsx)("label",{htmlFor:"xyz",children:"Sheet:"}),(0,v.jsx)("span",{style:{color:"red"},children:"*"}),(0,v.jsxs)("select",{name:"collectionname",onChange:function(e){e.preventDefault();var a=function(){var a=(0,l.Z)((0,n.Z)().mark((function a(){var t,l,s;return(0,n.Z)().wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.target.value,I(t),a.next=4,fetch("".concat(b,"/api/get-dynamic-collection-data"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({getdynamiccollection:t})});case 4:return l=a.sent,a.next=7,l.json();case 7:s=a.sent,422!==l.status&&s?s?j(s):console.log("No Data!"):console.log("error ");case 9:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}}();a()},className:"form-control form-control-sm",style:{fontSize:"12.4px"},required:!0,children:[(0,v.jsx)("option",{value:"",children:"--Select--"}),t?t.map((function(e){var a=e.collectionname.split("_").slice(1);return(0,v.jsx)("option",{value:e.collectionname,children:a.join("_")},e._id)})):""]}),(0,v.jsx)("div",{className:"invalid-feedback",children:"Please choose a sheet."})]}),(0,v.jsxs)("div",{className:"form-group col-md-2",children:[(0,v.jsx)("label",{style:{fontSize:"12px"},htmlFor:"date1",className:"form-label",children:"From:"}),(0,v.jsx)(h(),{selected:_,selectsStart:!0,className:"form-control form-control-sm",placeholderText:"Select Date",value:_,onChange:function(e){return D(e)},dateFormat:"yyyy-MM-dd",id:"date1",autoComplete:"off",required:!0})]}),(0,v.jsxs)("div",{className:"form-group col-md-2",children:[(0,v.jsx)("label",{style:{fontSize:"12px"},htmlFor:"date2",className:"form-label",children:"To:"}),(0,v.jsx)(h(),{selected:F,dateFormat:"yyyy-MM-dd",className:"form-control form-control-sm",selectsEnd:!0,placeholderText:"Select Date",minDate:_,value:F,onChange:function(e){return O(e)},id:"date2",autoComplete:"off",required:!0})]}),(0,v.jsx)("div",{className:"mt-4 col-md-2",children:(0,v.jsx)("button",{type:"submit",style:{fontSize:"11.7px"},className:"btn btn-info btn-sm",children:"GET DATA"})})]}),(0,v.jsx)("div",{className:"card mt-5",children:W?(0,v.jsx)(N._,{style:{fontWeight:"400"},components:{Toolbar:g},density:"compact",autoHeight:!0,getRowId:function(e){return e._id},rows:ee,columns:K,initialState:{pagination:{paginationModel:{pageSize:20}}}}):null})]})]})})})})})})}),(0,v.jsx)(m.Z,{})]})}}}]);
//# sourceMappingURL=766.cc2693f1.chunk.js.map