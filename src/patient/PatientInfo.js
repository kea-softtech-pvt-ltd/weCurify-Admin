import React from 'react';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useState , useEffect} from "react";
import constants from "../common/constant";

export default function PatientInfo(){
    const [activePatient, setActivePatient] = useState(0);
    const [completed, setCompleted] = useState(new Set());
   
    const [patient ,getPatient] = useState([])
    useEffect(async()=>{
      const result = await axios(
        constants.PATIENTINFO_DATA
      );
      getPatient(result.data)
    },[])
  
    const totalPatient = () => patient.length;

    const completedPatient = () => completed.size;
  
    const allPatientCompleted = () => completedPatient() === totalPatient();
  
    const isLastPatient = () => 
    {
     return activePatient === totalPatient() - 1;
    }
  
    const handleNext = () => {
      const newActivePatient =
      isLastPatient() && !allPatientCompleted()
          ? // It's the last step, but not all steps have been completed
          // find the first step that has been completed
          patient.findIndex((patients, i) => !completed.has(i))
          : activePatient + 1;
          setActivePatient(newActivePatient);
    };
  
    const handlePatient = (patients) => () => 
    setActivePatient(patients);
  
    const handleComplete = () => {
      const newCompleted = new Set(completed);
      newCompleted.add(activePatient);
      setCompleted(newCompleted);
        handleNext();
    };
  
    function isPatientComplete(patients) {
      return completed.has(patients);
    }

    return(
      <main>
        <div className="container margin_120_95">
          <div className="col-lg-12 ml-auto">
            <nav id="secondary_nav">
              <div className="container">
                <span>Patient Information</span>
              </div>
            </nav>
            <div className="box_form">
              <Stepper alternativeLabel nonLinear activeStep={activePatient}>
                {patient.map((label, index) => {
                const patientProps = {};
                  
                  return (
                    <Step key={label} {...patientProps}>
                      <StepButton
                        onClick={handlePatient(index)}
                        completed={isPatientComplete(index)}>
                          <div className="animation">
                            <div className="round round-circle">
                            </div>
                          </div>
                        {label.Patient}
                      </StepButton>
                    </Step>
                  );
                })}
              </Stepper>
              <div> 
                <div> 
                  <Button 
                      variant="contained"
                      color="primary"
                      onClick={handleComplete}>
                      Complete Checkup
                  </Button>
                </div> 
              </div> 
            </div>
          </div>
        </div>
      </main>
    )
}