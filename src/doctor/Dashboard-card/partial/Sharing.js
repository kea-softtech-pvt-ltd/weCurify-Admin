import { WhatsappIcon, WhatsappShareButton } from 'react-share';
import { useEffect, useState } from 'react';
import AppointmentApi from '../../../services/AppointmentApi';


export default function Sharing(props) {
    const { reportId } = props
    const [shareUrl, setShareUrl] = useState([])
    const { downloadPrescription } = AppointmentApi()
    useEffect(() => {
        SharePdf()
    }, [])
    const SharePdf = () => {
        downloadPrescription(reportId)
            .then((result) => {
                setShareUrl(result)
            })
    }

    return (
        <div className='whatsApp '>
            <WhatsappShareButton
                quote='Prescription'
                url={shareUrl}>
                <WhatsappIcon size={35} round={true} />
            </WhatsappShareButton >
        </div>
    )
}
