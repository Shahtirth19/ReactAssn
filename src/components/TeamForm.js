import React, { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import {
    CSpinner,
    CFormInput,
    CButton,
    CForm,
    CFormLabel,
    CCol,
    CRow,
    CHeader,
    CContainer,
    CHeaderBrand,
    CHeaderToggler,
} from "@coreui/react";
import firebase from "../config/fbconfig";

const TeamForm = ()  => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [cash, setCash] = useState("Enter Cash Allocation (%)");
  const [equity, setEquity] = useState("Enter Equity Allocation (%)");
  const [fixedIncome, setFixedIncome] = useState("Enter Fixed Income Allocation (%)");
  const [team, setTeam] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () =>{
    await firebase.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
            setUser(authUser.uid);
        } else {
            setUser(null);
            navigate("/login")
        }
      });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const total = cash + equity + fixedIncome;
    if (total === 100) {
        try {
          await firebase.firestore().collection("teams").add({
               cash:parseFloat(cash),
               equity:parseFloat(equity),
               fixedIncome:parseFloat(fixedIncome),
               teamName:team,
               date: Date.now()
          }).then(()=>{
            setLoading(false)
            alert("Data Submitted");
          });
          
        }catch (error) {
            console.log(error);
            setLoading(false)
        }
    } else {
      alert("Total allocation must be 100%");
    }
  };
  const handleLogout = async (e) =>{
    await firebase.auth().signOut().then(()=>{
        navigate("/login")
    })
  }

  return (
    <div>
        <div>
            <CHeader>
            <CContainer fluid>
                <CHeaderBrand href="#">Team</CHeaderBrand>
                <CHeaderToggler/>
                <CButton style={{color: "#fff",backgroundColor: "#26a0fc",borderColor: "#26a0fc"}}  onClick={()=> {handleLogout()}} >Logout</CButton>
            </CContainer>
            </CHeader>
        </div>

        <div className="form-container">
            <CForm onSubmit={handleSubmit}  className="form"> 
                <CRow className="g-3 align-items-center">
                    <CCol md="3">
                        <CFormLabel>Team Name </CFormLabel>
                    </CCol>
                    <CCol>
                        <CFormInput
                            required 
                            type="text"
                            placeholder="Enter Team Name"
                            value={team}
                            onChange={(e) => setTeam(e.target.value)}
                        />
                    </CCol>
                </CRow>
                <CRow className="g-3 align-items-center">
                    <CCol md="3">
                        <CFormLabel>Cash </CFormLabel>
                    </CCol>
                    <CCol>
                        <CFormInput
                            required 
                            type="number"
                            placeholder="Enter Cash Allocation (%)"
                            value={cash}
                            onChange={(e) => setCash(parseInt(e.target.value))}
                        />
                    </CCol>
                </CRow>
                <CRow className="g-3 align-items-center">
                    <CCol md="3">
                        <CFormLabel>Equity</CFormLabel>
                    </CCol>
                    <CCol>
                        <CFormInput
                            required 
                            type="number"
                            placeholder="Enter Equity Allocation (%)"
                            value={equity}
                            onChange={(e) => setEquity(parseInt(e.target.value))}
                        />
                    </CCol>
                </CRow>
                <CRow className="g-3 align-items-center">
                    <CCol md="3">
                        <CFormLabel>Fixed Income </CFormLabel>
                    </CCol>
                    <CCol>
                        <CFormInput
                            required 
                            type="number"
                            placeholder="Enter Fixed Income Allocation (%)"
                            value={fixedIncome}
                            onChange={(e) => setFixedIncome(parseInt(e.target.value))}
                        />
                    </CCol>
                </CRow>
                <CCol md={12}style={{ display: "flex" }}>
                {loading ? (
                    <CSpinner size="small" color="info" />
                ) : (
                    <CButton type="submit" style={{color: "#fff",backgroundColor: "#26a0fc",borderColor: "#26a0fc",marginLeft: "auto",marginRight:"auto",marginTop:"10px"}} >
                            Submit
                        </CButton>
                  )}
                </CCol>
            </CForm>
        </div>
    </div>
  );
}

export default TeamForm;
