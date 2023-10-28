import { setDoctorId} from "../../recoil/atom/setDoctorId";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { setHelperData } from "../../recoil/atom/setHelperData";
function Logout(){
    const [doctorId , setDoctor] = useRecoilState(setDoctorId);
    const [helpersData, setHelpersData] = useRecoilState(setHelperData)

    useEffect(() =>{
        setDoctor("")
        setHelpersData('')
    }, [])

    return(
        <>
        <main>
            <div className="bg_color_2">
                <div className="container margin_60_35">
                    <div id="login-2">
                    {doctorId ===""?
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
export default Logout;