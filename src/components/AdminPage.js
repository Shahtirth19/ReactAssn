import React, { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCardTitle,
  CHeader,
  CContainer,
  CHeaderBrand,
  CHeaderToggler,
} from "@coreui/react";
import firebase from "../config/fbconfig";
import Chart from "react-apexcharts";

const AdminPage = () => {
  const navigate = useNavigate();
  
  const socData = new Date().setHours(0,0,0,0) - (30*(24 * 60 * 60 * 1000));
  const curData = new Date().setHours(23,59,59,999);
  var[order, setOrder] = useState(socData);
  var[porder, setPorder] = useState(curData);

  const [teamName, setTeamName]= useState([]);
  const [cashValue, setCashValue]= useState([]);
  const [equityValue, setEquityValue]= useState([]);
  const [fixedIncomeValue, setfixedIncomeValue]= useState([]);
    
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () =>{
    await firebase.auth().onAuthStateChanged((authUser) => {
        if (authUser.uid === "s6WsqI1777M96zRXzs8DF68pfzE3") {
          getData();
        } else {
          navigate("/login")

        }
      });
  }
  const getData = async () => {
    try {
        const videos = await firebase.firestore().collection("teams").get();
        const resolvedName = videos.docs.map((video) => video.data().teamName);
        const resolvedCash = videos.docs.map((video) => video.data().cash);
        const resolvedEquity = videos.docs.map((video) => video.data().equity);
        const resolvedfixed = videos.docs.map((video) => video.data().fixedIncome);
        setTeamName(resolvedName);
        setCashValue(resolvedCash);
        setEquityValue(resolvedEquity);
        setfixedIncomeValue(resolvedfixed);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  };
  const handleLogout = async (e) =>{
    await firebase.auth().signOut().then(()=>{
        navigate("/login")
    })
  }
  return (
    
    <div>
    <CHeader>
      <CContainer fluid>
        <CHeaderBrand href="#">Admin Page</CHeaderBrand>
        <CHeaderToggler/>
        <CButton style={{color: "#fff",backgroundColor: "#26a0fc",borderColor: "#26a0fc"}} onClick={()=> {handleLogout()}} >Logout</CButton>
      </CContainer>
    </CHeader>
        <CRow>
            <CCol>
                <CCard>
                    <CCardTitle><div style={{textAlign:"center"}}>Cash Allocation in %</div></CCardTitle>
                    <CCardBody style={{marginTop:"5px"}}>
                    <Chart
                        type="bar"
                        width={300}
                        height={300}
                        series={[
                            {
                            name: "Cash Allocation",
                            data: cashValue,
                            },
                        ]}
                        options={{

                            xaxis: {
                            tickPlacement: "on",
                            categories: teamName,
                            title: {
                                text: "Teams",
                            },
                            },

                            yaxis: {
                                labels: {
                                formatter: (val) => {
                                return `${val}`;
                                },
                            },
                                title: {
                                text: "Allocation in %",
                            },
                            },

                            legend: {
                            show: true,
                            position: "right",
                            },

                            dataLabels: {
                            formatter: (val) => {
                                return `${val}`;
                            },
                            
                            },
                        }}
                    /> 
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol>
                <CCard>
                    <CCardTitle><div style={{textAlign:"center"}}>Equity Allocation in %</div></CCardTitle>
                    <CCardBody style={{marginTop:"5px"}}>
                    <Chart
                        type="bar"
                        width={300}
                        height={300}
                        series={[
                            {
                            name: "Equity Allocation",
                            data: equityValue,
                            },
                        ]}
                        options={{
                            xaxis: {
                            tickPlacement: "on",
                            categories: teamName,
                            title: {
                                text: "Teams",
                            },
                            },

                            yaxis: {
                                labels: {
                                formatter: (val) => {
                                return `${val}`;
                                },
                            },
                                title: {
                                text: "Allocation in %",
                            },
                            },

                            legend: {
                            show: true,
                            position: "right",
                            },

                            dataLabels: {
                            formatter: (val) => {
                                return `${val}`;
                            },
                            
                            },
                        }}
                    /> 
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol>
                <CCard>
                    <CCardTitle><div style={{textAlign:"center"}}>Fixed Income Allocation in %</div></CCardTitle>
                    <CCardBody style={{marginTop:"5px"}}>
                    <Chart
                        type="bar"
                        width={300}
                        height={300}
                        series={[
                            {
                            name: "Fixed Income Allocation",
                            data: fixedIncomeValue,
                            },
                        ]}
                        options={{
                            xaxis: {
                            tickPlacement: "on",
                            categories: teamName,
                            title: {
                                text: "Teams",
                            },
                            },

                            yaxis: {
                                labels: {
                                formatter: (val) => {
                                return `${val}`;
                                },
                            },
                                title: {
                                text: "Allocation in %",
                            },
                            },

                            legend: {
                            show: true,
                            position: "right",
                            },

                            dataLabels: {
                            formatter: (val) => {
                                return `${val}`;
                            },
                            
                            },
                        }}
                    /> 
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
  );
};

export default AdminPage;