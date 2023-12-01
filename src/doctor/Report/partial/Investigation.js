import React, { useEffect, useState } from 'react'
import ReportApi from '../../../services/ReportApi';
import Toaster from '../../Toaster';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
export default function Investigation(props) {

    const [investigation_note, setInvestigation_note] = useState("")
    const [investigation, setInvestigation] = useState('')
    const { onChange, reportId } = props;
    const { insertInvestigationNote, getMedicineReport } = ReportApi();


    useEffect(() => {
        investigationData()
    }, [])
    const handleChange = (event) => {
        setInvestigation_note(event.target.value);
    }
    const addNode = () => {
        const bodyData = {
            "investigation_note": investigation_note,
        }
        insertInvestigationNote({ reportId }, bodyData)
            .then(() => {
            })
        toast.success("Saved Successfully!")
    }
    const investigationData = () => {
        getMedicineReport({ reportId })
            .then((res) => {
                setInvestigation(res[0].investigation_note)
            })
    }
    return (
        <div >
            <div className=" container mx-3" >
                <span className='left mb-2'>Doctor Investigation Note</span>
                <textarea
                    type="text"
                    value={investigation}
                    onChange={handleChange}
                    style={{ width: 950 }}
                    className="form-control"
                    name="investigation_note"
                    placeholder="write something"
                />
            </div>

            <div className="text-right mt-15 medicinebtn add_top_30">
                <input
                    type="button"
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
        </div>
    )
}