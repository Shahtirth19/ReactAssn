import React, { useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CRow,
} from "@coreui/react";
import firebase from "../config/fbconfig";

const login = ({ ...props }) => {
    const navigate = useNavigate();


  const [state, setState] = useState({
    username: "",
    password: "",
    message: "",
    loading: false,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
      message: "",
    }));
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      if (state.username.length && state.password.length) {
        setState({ ...state, loading: true });

        await firebase
          .auth()
          .signInWithEmailAndPassword(state.username, state.password)
          .then(()=>{
            if (state.username == "admin@gmail.com") {
                navigate("/adminPage")
            } else {
                navigate("/")
            }  
          })
          .catch(function (error) {
            if (error.code === "auth/wrong-password") {
              setState((prevState) => ({
                ...prevState,
                loading: false,
                message: "Wrong Password",
                }));
            } else {
              alert(error.message);
              setState((prevState) => ({
                ...prevState,
                loading: false,
                message: "Login failed",
                }));
        
            }
            console.log(error);
          });
      } else {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          message: "Both fields are mandatory",
        }));
      }
    } catch (error) {
      alert(error.message);
      setState((prevState) => ({
        ...prevState,
        loading: false,
        message: "Login failed",
      }));
      console.error(error);
    }
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center justify-content-center">
      {state.loading ? (
        <span style={{ fontSize: "16px" }}>Please Wait...</span>
      ) : (
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CFormInput
                          type="text"
                          value={state.username}
                          id="username"
                          onChange={handleChange}
                          placeholder="username"
                          autoComplete="username"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CFormInput
                          type="password"
                          value={state.password}
                          id="password"
                          onChange={handleChange}
                          placeholder="password"
                          autoComplete="current-password"
                        />
                      </CInputGroup>
                      <p className="text-danger">{state.message}</p>
                      <CRow>
                        <CCol xs="6">
                          <CButton
                            color="primary"
                            className="px-4"
                            onClick={handleLoginClick}
                          >
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <Link to="#">
                        <CButton
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
    )}
    </div>
  );
};

export default login;
