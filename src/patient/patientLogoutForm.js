import { setNewPatientId} from "../recoil/atom/setNewPatientId";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

function PatientLogoutForm(){
    const [patientData , setPatientData] = useRecoilState(setNewPatientId);
    useEffect(() =>{
        setPatientData("")
    }, [])

    return(
        <>
        <main>
            <div className="bg_color_2">
                <div className="container margin_60_35">
                    <div id="login-2">
                        {patientData ==""?
                            <h1> Succefully Logout...</h1>
                            :
                            null
                        }
                    </div>
                </div>
            </div>    
        </main>        
        </>
    )
}
export default PatientLogoutForm;