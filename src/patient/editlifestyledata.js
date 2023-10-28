import { useEffect, useState } from "react"
import { MainButtonInput } from "../mainComponent/mainButtonInput"
import { MainInput } from "../mainComponent/mainInput"
import { setPatientLifestyle } from "../recoil/atom/setPatientLifestyle";
import { useRecoilState } from 'recoil';
import PatientApi from '../services/PatientApi'
function EditLifeStyleData(props) {
    const { lifeStyleId } = props;
    const [editPatientData, setEditPatientData] = useState([])
    const [coilPatientMedical, setCoilPatientMedical] = useRecoilState(setPatientLifestyle)
    const { updatePatientLifestyle ,fetchUpdatePatientLifestyle} =PatientApi()
    const handleInputChange = event => {
        const { name, value } = event.target;
        setEditPatientData({ ...editPatientData, [name]: value })
    };

    useEffect(() => {
        fetchPatientData();
    }, [])

    const fetchPatientData = () => {
        fetchUpdatePatientLifestyle(lifeStyleId)
            .then(res => {
                if (res) {
                    return res.json()
                }
            }).then(jsonRes => {
                setEditPatientData(jsonRes)
            });
    }

    const UpdatePatientData = async (event) => {
        event.preventDefault();

        const updateMedical = {
            patientId: editPatientData.patientId,
            smokingHabits: editPatientData.smokingHabits,
            alcoholConsumption: editPatientData.alcoholConsumption,
            foodPreferences: editPatientData.foodPreferences,
            occupation: editPatientData.occupation,
            activityLevel: editPatientData.activityLevel
        }
        updatePatientLifestyle(lifeStyleId, updateMedical)
            .then((res) => {
                const editMedical = coilPatientMedical.map(function (e, index) {
                    if (lifeStyleId === e._id) {
                        return res.data
                    } else {
                        return e
                    }
                })
                setCoilPatientMedical(editMedical);
                props.onSubmit();
            })
    }
    return (
        <form onSubmit={UpdatePatientData} id={"updateData"}>
            <div className="row">
                <div className="col-md-6 ">
                    <label><b>smoking Habits</b></label>
                    <MainInput
                        type="text"
                        name="smokingHabits"
                        value={editPatientData.smokingHabits}
                        onChange={handleInputChange}
                        placeholder="smoking Habits">
                    </MainInput>
                </div>
                <div className="col-md-6 ">
                    <label><b>Alcohol Consumption</b></label>
                    <MainInput
                        type="text"
                        name="alcoholConsumption"
                        value={editPatientData.alcoholConsumption}
                        onChange={handleInputChange}
                        placeholder="alcoholConsumption">
                    </MainInput>
                </div>
                <div className="col-md-12 ">
                    <label><b>Food Preferences</b></label>
                    <MainInput
                        type="text"
                        name="foodPreferences"
                        value={editPatientData.foodPreferences}
                        onChange={handleInputChange}
                        placeholder="foodPreferences">
                    </MainInput>
                </div>
                <div className="col-lg-12">
                    <label><b>Occupation</b></label>
                    <MainInput
                        type="text"
                        name="occupation"
                        value={editPatientData.occupation}
                        onChange={handleInputChange}
                        placeholder="occupation">
                    </MainInput>
                </div>
                <div className="col-lg-12">
                    <label><b>Activity Level</b></label>
                    <MainInput
                        type="text"
                        name="activityLevel"
                        value={editPatientData.activityLevel}
                        onChange={handleInputChange}
                        placeholder="activityLevel">
                    </MainInput>
                </div>
            </div>
            <div className="text-center add_top_30">
                <MainButtonInput>Save</MainButtonInput>
            </div>
        </form>
    )
}
export { EditLifeStyleData }