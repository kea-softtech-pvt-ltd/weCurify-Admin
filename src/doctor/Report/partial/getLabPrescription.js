import React, { useEffect, useState } from 'react';
import ReportApi from '../../../services/ReportApi';

export default function GetLabPrescription(props) {
    const { reportId } = props;
    const { getLabTestPrescriptionData } = ReportApi();
    const [getLabData, setGetLabData] = useState([]);
    
    useEffect(() => {
        getLabPrescriptionData()
    }, [getLabData])

    const getLabPrescriptionData = () => {
        getLabTestPrescriptionData({ reportId })
            .then((result) => {
                setGetLabData(result)
            })
    }
    return (
        <>
            {
                getLabData.length > 0 ?
                    <div className='viewMreport' align='left'>
                        <h6> <b>List of Test</b></h6>
                        {getLabData && getLabData.map((item, i) => {
                            return (
                                <span key={i}>
                                    {item.test_name}<br />
                                </span>
                            )

                        })}
                    </div>
                    : null
            }
        </>
    )
}