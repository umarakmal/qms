import React, { useState,useEffect } from "react";
import { useNavigate,Navigate  } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";
import { authenticate, isAuth } from "./helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const url = `${process.env.REACT_APP_BACKEND_URL}`
const Signin = ({ history }) => {
  const [values, setValues] = useState({
    EmployeeID: "",
    password: "",
    buttonText: "Submit",
  });
  let navigate = useNavigate();
  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = isAuth()/* code to check if user is logged in */;

    if (isLoggedIn) {
      // Navigate to the admin page
      navigate('/app');
    }
  }, [navigate]);

  const { EmployeeID, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const headers = {
    "Content-Type": "application/json"
  };
  const clickSubmit = (event) => {
    event.preventDefault();
   
    if(!values.EmployeeID || !values.password){
      return false
    }else{
      setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      headers: headers,
      url: `${url}/api/login`,
      data: { EmployeeID, password },
    })
      .then((response) => {
        // save the response (user, token) localstorage/cookie
        authenticate(response, () => {
          setValues({
            ...values,
            name: "",
            EmployeeID: "",
            password: "",
            buttonText: "Submitted",
          });
          // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
          // isAuth() && isAuth().role === "admin"
          //   ? history.push("/admin")
          //   : history.push("/private-user");
          isAuth()? navigate("/app"):navigate("/")
        });
      })
      .catch((error) => {
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
        toast.error(error.response.data.msg)
      });
    }
  };

  useEffect(() => {
    (() => {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll(".needs-validation");
      // Loop over them and prevent submission
      Array.from(forms).forEach((form) => {
        form.addEventListener(
          "submit",
          (event) => {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    })();
  },[]);

  const signinForm = () => (
    <center className='mt-5 mr-lg-5'><div className="login-box ">
    <div className="card card-outline card-info">
      <div className="card-header text-center">
      <h4 className="h4 text-muted">LOGIN QMS</h4>
      </div>
      <div className="card-body">
    <form noValidate
    className="needs-validation" onSubmit={clickSubmit}>
      <div className="form-group col-sm-10">
        <label style={{fontSize:"11.6px"}} className="text-muted">Employee ID</label>
        <input
          onChange={handleChange("EmployeeID")}
          value={EmployeeID}
          type="text"
          className="form-control form-control-sm"
          required
        />
        <div className="invalid-feedback">
         Please input EmployeeID.
        </div>
      </div>
      <div className="form-group col-sm-10">
        <label style={{fontSize:"11.6px"}} className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          value={password}
          type="password"
          className="form-control form-control-sm"
          required
        />
        <div className="invalid-feedback">
         Please input a password.
        </div>
      </div>
        <button style={{fontSize:'11.6px'}} className="btn btn-sm btn-info" >
          {buttonText}
        </button>
    </form>
  </div>
    </div>
    </div>
    </center>
  );

  return (
    <Layout>
    <div className="mt-5 mr-5 ml-lg-n5">
      <ToastContainer />
      {isAuth() ? <Navigate to="/" /> : null}
      {/* <h4 className="text-muted offset-md-5">Login</h4> */}
      {signinForm()}
      <br />
    </div>
    </Layout>
  );
};

export default Signin;
