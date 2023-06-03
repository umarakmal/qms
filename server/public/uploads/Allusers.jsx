import { useState } from "react";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import $ from "jquery";
import validate from "jquery-validation";
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { useForm } from "react-hook-form";
// import { validations } from "../components/include/validator";
import * as Yup from "yup";

const Allusers = (id) => {
  // function App() {
  //   const schema = Yup.object({
  //     username: Yup.string().required("Required"),
  //     name: Yup.string().required("Required"),
  //   });

  //   const { ...p } = (useFormik = {
  //     // ...
  //     validationSchema: schema, // replace validate with this
  //   });
  // }
  // const addvalid = () => {
  //   // console.log("addvalid");
  //   $("form[name='addform']").validate({
  //     // Specify validation rules
  //     rules: {
  //       name: {
  //         required: true,
  //       },
  //       username: {
  //         required: true,
  //         minlength: 10,
  //         maxlength: 10,
  //       },
  //       email: {
  //         required: true,
  //       },
  //       phone: {
  //         required: true,
  //         minlength: 10,
  //         maxlength: 10,
  //       },
  //     },
  //     // Specify validation error messages
  //     messages: {
  //       username: "Please enter 10 digits",
  //       name: "Please enter Name",
  //       email: "Please enter email",
  //       phone: "Number should of 10 Characters",
  //     },

  //     submitHandler: function () {
  //       adduserdetails();
  //       // <- pass 'form' argument in
  //       // <- use 'form' argument here.
  //     },
  //   });
  // };
  const initialValues = { name: "", username: "", email: "", phone: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    const postdata2 = async () => {
      const { name, username, phone, email } = formValues;
      const res = await fetch("/api/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          phone,
          email,
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        toast.error("Error!Something went wrong!!!!");
      } else if (res.status === 200) {
        toast.success("Added Sucessfully!");
      } else {
        toast.error("Something Went Wrong!");
      }
    };
    postdata2();
    showdata();
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      $("#closemodal2").trigger("click");
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "name is required!";
      $("#name").addClass("is-invalid");
    } else if (values.name) {
      $("#name").removeClass("is-invalid");
    }

    if (!values.username) {
      errors.username = "Username is required!";
      $("#username").addClass("is-invalid");
    } else if (values.username) {
      $("#username").removeClass("is-invalid");
    }

    if (!values.email) {
      errors.email = "Email is required!";
      $("#email").addClass("is-invalid");
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
      $("#email").addClass("is-invalid");
    } else if (values.email && regex.test(values.email)) {
      $("#email").removeClass("is-invalid");
    }
    if (!values.phone) {
      errors.phone = "phone is required";
    } else if (values.phone.length < 4) {
      errors.phone = "phone must be more than 4 characters";
    } else if (values.phone.length > 10) {
      errors.phone = "phone cannot exceed more than 10 characters";
    } else {
      $("#phone").removeClass("is-invalid");
    }
    return errors;
  };

  const [users, setUsers] = useState("");
  const [editUser, setEditUsers] = useState("");
  const [updateData, setUpdateDatas] = useState("");
  // console.log(editUser._id);
  const showdata = () => {
    const postdata = async () => {
      //   console.log(user);
      const res = await fetch("/api/show", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        // var data1 = data.any[0].fieldname;
        // console.log(data1);
        setUsers(data);
      }
    };
    postdata();
  };
  useEffect(() => {
    showdata();
  }, []);

  const edituser = (id) => {
    // console.log(id);
    const editdata = async () => {
      //   console.log(user);
      const res = await fetch(`/api/get/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data1 = await res.json();
      console.log(data1);

      if (res.status === 422 || !data1) {
        console.log("error ");
      } else {
        setEditUsers(data1);
      }
    };
    editdata();
  };

  const updatedata = (e) => {
    const { name, value } = e.target;
    setUpdateDatas((updateData) => {
      return {
        ...updateData,
        [name]: value,
      };
    });
  };
  console.log(id);
  const update = (e) => {
    e.preventDefault();
    const uptdata = async () => {
      const { name, username, phone, email } = updateData;
      //   console.log(user);
      const res = await fetch(`/api/update/${editUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          phone,
          email,
        }),
      });
      const data1 = await res.json();
      console.log(data1);

      if (res.status === 422 || !data1) {
        // console.log("error ");
        toast.error("Error!Something went wrong!!!!");
      } else {
        // console.log(data1);
        toast.success("Updated Sucessfully!");
        // toast.error("Wow so easy!");
      }
    };
    uptdata();
    $("#closemodal").trigger("click");
    showdata();
    // console.log(updateData);
  };

  const deleteuser = async (id) => {
    const res = await fetch(`/api/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const del = await res.json();
    console.log(del);

    if (res.status === 422 || !del) {
      // console.log("error ");
      toast.error("Error!Something went wrong!!!!");
    } else {
      // console.log(del);
      toast.success("Deleted Sucessfully!");
    }
    showdata();
  };
  // const Adduser = () => {
  const [user, setUser] = useState("");
  // console.log(user);

  const setdata = (e) => {
    const { name, value } = e.target;
    setUser((user) => {
      return {
        ...user,
        [name]: value,
      };
    });
  };

  const adduserdetails = (e) => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    e.preventDefault();
    const postdata2 = async () => {
      const { name, username, phone, email } = user;
      //   console.log(user);
      const res = await fetch("/api/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          phone,
          email,
        }),
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        // console.log("error ");
        toast.error("Error!Something went wrong!!!!");
      } else {
        // var data1 = data.any[0].fieldname;
        // console.log(data1);
        // console.log(data);
        toast.success("Added Sucessfully!");
      }
    };
    postdata2();
    showdata();
    $("#closemodal2").trigger("click");
  };

  return (
    <>
      <ToastContainer />
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>USER MANAGEMENT</h1>
              </div>
            </div>
            <button
              className="btn btn-primary offset-md-10"
              data-toggle="modal"
              data-target="#modal-add"
            >
              ADD USER
            </button>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
          {/* Default box */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Title</h3>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    ? users.map((data) => {
                        return (
                          <tr key={data._id}>
                            <td key={data._id + "123"}>{data.name}</td>
                            <td key={data._id + "123a"}>{data.username}</td>
                            <td key={data._id + "123b"}>{data.email}</td>
                            <td key={data._id + "123n"}>{data.phone}</td>
                            <td>
                              {" "}
                              <button
                                type="button"
                                className="btn btn-primary "
                                data-toggle="modal"
                                data-target="#modal-default"
                                onClick={() => edituser(data._id)}
                              >
                                <i className="nav-icon fas fa-edit"></i>
                                {/* Edit */}
                              </button>
                              {"     "}
                              <button
                                type="button"
                                className="btn btn-danger "
                                onClick={() => deleteuser(data._id)}
                              >
                                <i className="nav-icon fas fa-trash"></i>
                                {/* Edit */}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>

              <div className="modal fade" id="modal-default">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">Default Modal</h4>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        id="closemodal"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>

                    <div className="modal-body">
                      <form>
                        <div className="card-body">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Name</label>
                            <input
                              defaultValue={editUser.name || ""}
                              type="text"
                              onChange={updatedata}
                              name="name"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Enter email"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Username
                            </label>
                            <input
                              onChange={updatedata}
                              name="username"
                              defaultValue={editUser.username || ""}
                              type="text"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Username"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Email</label>
                            <input
                              onChange={updatedata}
                              name="email"
                              defaultValue={editUser.email || ""}
                              type="text"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Username"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Phone</label>
                            <input
                              onChange={updatedata}
                              name="phone"
                              defaultValue={editUser.phone || ""}
                              type="text"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Username"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer justify-content-between">
                      <button
                        type="button"
                        className="btn btn-default"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={update}
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal fade" id="modal-add">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">ADD USER</h4>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        id="closemodal2"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>

                    <div className="modal-body">
                      <form>
                        <div className="card-body">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Name</label>
                            <input
                              onChange={handleChange}
                              name="name"
                              className="form-control"
                              id="name"
                              placeholder="Enter email"
                            />{" "}
                            <p className="text-danger">{formErrors.name}</p>
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Username
                            </label>
                            <input
                              // onChange={setdata}
                              // value={formValues.username}
                              onChange={handleChange}
                              name="username"
                              type="text"
                              className="form-control"
                              id="username"
                              placeholder="Username"
                            />
                            <p>{formErrors.username}</p>
                          </div>

                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Email</label>
                            <input
                              // onChange={setdata}
                              // value={formValues.username}
                              onChange={handleChange}
                              name="email"
                              type="text"
                              className="form-control"
                              id="email"
                              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                              placeholder="email"
                            />{" "}
                            <p>{formErrors.email}</p>
                          </div>

                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Phone</label>
                            <input
                              // onChange={setdata}
                              // value={formValues.username}
                              onChange={handleChange}
                              name="phone"
                              type="text"
                              className="form-control"
                              id="phone"
                              placeholder="phone"
                            />{" "}
                            <p>{formErrors.phone}</p>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer justify-content-between">
                      <button
                        type="button"
                        className="btn btn-default"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        // onClick={adduserdetails}
                        onClick={handleSubmit}
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /.card-footer*/}
          </div>
          {/* /.card */}
        </section>
        {/* /.content */}
      </div>
    </>
  );
};

export default Allusers;
