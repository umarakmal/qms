import React, { useState, useEffect } from 'react'
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const url = `${process.env.REACT_APP_BACKEND_URL}`

const MainPage = () => {
  const [graphData, setGraphData] = useState([]);
  useEffect(() => {
    (function () {
      if (window.localStorage) {
        if (!localStorage.getItem('firstLoad')) {
          localStorage['firstLoad'] = true;
          window.location.reload();
        }
        else
          localStorage.removeItem('firstLoad');
      }
    })();
  }, [])

  useEffect(() => {
    const postdata1 = async () => {
      const res = await fetch(`${url}/api/get-data-from-responce-for-graph`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        if (!data) {
          console.log("No Data!");
        } else {
          if (data.length > 0) {
            setGraphData(data);
          }
        }
      }
    };
    postdata1()
  }, []);

  return (
    <div className="content-wrapper">
      <div className="card-header">
        <h3 style={{ fontSize: '1rem' }} className="card-title">Welcome</h3>
      </div>
      <div style={{ overflow: 'auto' }} className="mt-5">
        <ComposedChart
          width={400}
          height={400}
          data={graphData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="TotalAuditSheets" barSize={20} fill="#17a2b8" />
        </ComposedChart>
      </div>
    </div>
  );
};

export default MainPage;
