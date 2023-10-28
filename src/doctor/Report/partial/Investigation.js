import React, { useState } from 'react'
import AuthApi from '../../../services/AuthApi';
import ReportApi from '../../../services/ReportApi';
// import { CKEditor } from 'ckeditor4-react'
export default function Investigation(props) {

    const [investigation_note, setInvestigation_note] = useState("")
    const { onChange, reportId } = props;
    const { insertInvestigationNote } = ReportApi();

    const handleChange = (event) => {
        // const { name, value } = event.target;
        setInvestigation_note(event.target.value);
    }
    const addNode = () => {
        const bodyData = {
            "investigation_note": investigation_note,
        }
        insertInvestigationNote({ reportId }, bodyData)
            .then(() => {

                onChange()
            })
    }

    return (
        <div >
            <div className=" container mx-3" >
                <span className='left mb-2'>Doctor Investigation Note</span>
                <textarea
                    type="text"
                    value={investigation_note}
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
            </div>
        </div>
    )
}