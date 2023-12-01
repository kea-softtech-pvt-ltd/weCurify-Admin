import React, { useEffect, useState } from "react";
import ReportApi from "../../../services/ReportApi";
import Toaster from "../../Toaster";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
export default function Premedication(props) {
    const { insertPremedicationNote, getMedicineReport } = ReportApi();
    const [premedication_note, setPremedication_note] = useState('')
    const [premedication, setPremedication] = useState('')
    const { onChange, reportId } = props;

    useEffect(() => {
        premedicationData()
    }, [])

    const handleChange = (event) => {
        setPremedication_note(event.target.value);
    }

    const addNode = () => {
        const bodyData = {
            "premedication_note": premedication_note,
        }
        insertPremedicationNote({ reportId }, bodyData)
            .then(() => {
            })
        toast.success("Saved Successfully!")
    }

    const premedicationData = () => {
        getMedicineReport({ reportId })
            .then((res) => {
                setPremedication(res[0].premedication_note)
            })
    }
    return (
        <>
            <div className=" container mx-3" >
                <span className='left mb-2'>Doctor Premedication Note</span>
                <textarea
                    type="text"
                    value={premedication}
                    onChange={handleChange}
                    style={{ width: 950 }}
                    className="form-control"
                    name="investigation_note"
                    placeholder="Write Something"
                />
            </div>

            <div className="text-right medicinebtn mt-15 add_top_30">
                <input
                    type="submit"
                    onClick={addNode}
                    className="btn_1"
                    value="Add Note"
                />
                <input
                    type="submit"
                    onClick={onChange}
                    className="btn_1 medicinebtn"
                    value="Next"
                />

            </div>
            <div className="row float-right">
                <Toaster />
            </div>
        </>
    )
}