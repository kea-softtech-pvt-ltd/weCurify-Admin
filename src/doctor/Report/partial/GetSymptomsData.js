import React, { useEffect, useState } from 'react';
import ReportApi from '../../../services/ReportApi';
export default function GetSymptomsData(props) {
    const { reportId } = props
    const { getMedicineReport } = ReportApi();
    const [symptomDataInfo, setSymptomDataInfo] = useState([])
    
    useEffect(() => {
        symptomsData()
    }, [symptomDataInfo])

    const symptomsData =  () => {
         getMedicineReport({ reportId })
            .then((res) => {
                setSymptomDataInfo(res[0].symptoms)
            })
    }

    return (
        <div align='left'> 
            {symptomDataInfo.length > 0 ?
                <div className='  viewMreport' align='left'>
                    <h6><b>List of Symptoms</b></h6>
                    {symptomDataInfo && symptomDataInfo.map((item, i) => {
                        return (
                            <span key={i}>
                                {item}<br />
                            </span>
                        )
                    })}
                </div>
                : null}
        </div>
    )
}