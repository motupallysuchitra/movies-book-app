
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/navbar";
import "../Register/login.css"
function ForgetPassword() {
    const navigate=useNavigate()
    const initialvalues = {
        username: "",
        password: ""
    }
    const [responseData,setResponseData]=useState({
        responseText:"",
        responseClass:""
    })


    const validationschema = Yup.object({
        password: Yup.string().required("Password is required").min(6, "Password must contain 6 Minimum charecters").matches(

            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
        phone: Yup.number("Enter a valid Mobile Number!").required("Number is Required!!"),
        
        confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match')
    })


    function onSubmit(values,{resetForm}){
        axios.put("http://127.0.0.1:8000/api/users/resetpassword/?username=" + values.username.toString(), values)
        .then((response) => {
         
          setResponseData({
            responseText: "Successfully Changed",
            responseClass: "alert alert-success"
          });
      
          
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        })
        .catch((error) => {
         
          if (error.response && error.response.data && error.response.data.message) {
            
            setResponseData({
              responseText: error.response.data.message,
              responseClass: "alert alert-danger"
            });
          } else {
           
            setResponseData({
              responseText: "An error occurred. Please try again later.",
              responseClass: "alert alert-danger"
            });
          }
      
   
        });
        resetForm();

    }
    return (

        <>
        <Navbar></Navbar>
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="mainform">
                        <h1 className="logg">Reset Password</h1>
                        <div className={responseData.responseClass} role="alert">{responseData.responseText}</div>
                        <hr />
                        <Formik initialValues={initialvalues} validationSchema={validationschema} validateOnMount onSubmit={onSubmit}>
                            {(formik) => {
                                return (
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="username">Username</label>
                                            <Field type="username" name="username" className="form-control" />
                                           
                                        </div>
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <Field type="mobile" name="phone" className="form-control"/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password">New Password</label>
                                            <Field name="password" type="password" className="form-control" />
                                            <ErrorMessage name="password">{(errormessage) => (<small className="text-danger">{errormessage}</small>)}</ErrorMessage>
                                        </div>
                                        <div className="form-group">
                                                <label htmlFor="">Confirm Password</label>
                                                <Field type="password" name="confirmPassword" className={formik.errors.confirmPassword &&
                                                    formik.touched.confirmPassword ? "form-control is-invalid" : "form-control"} />
                                                <ErrorMessage name="confirmPassword">
                                                    {(errormessage) => (<small className="text-danger">{errormessage}</small>)}
                                                </ErrorMessage>
                                            </div>
                                            <button type="submit" class="btn btn-primary" value="resetpassword" disabled={!formik.isValid}>Submit</button>

                                        <a href="/login" class="btn btn-primary">Cancel</a>
                                    </Form>
                                )
                            }}

                        </Formik>


                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
        </>








    )

}


export default ForgetPassword;