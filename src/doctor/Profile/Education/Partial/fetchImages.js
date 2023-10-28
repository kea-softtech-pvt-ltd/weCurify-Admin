import React from 'react';
import { useState ,useEffect} from "react";
import pdfImage from "../../../../img/pdfimg.png";

function FetchImages(props){
    const [ drDocument, setDrDocument] = useState([]);
    useEffect(()=>{
        setDrDocument(props.imageData)
    },[props])


    return(
        <div className="fetchedudata">
            <div><b>Qualification Document Photo</b></div>
            {drDocument.map((eduImage ,index) => {
                return (
                    <div  key={index}>
                        {(/\.(gif|jpe?g|png)$/i).test(eduImage)? (
                            <img
                                src={"/uploads/" + eduImage}
                                className="documentStyle"
                                name="document"
                                accept="image/*"
                                alt="doctorDocument"
                            />
                        ) : (
                            <img
                                src={pdfImage}
                                className="documentStyle"
                                name="document"
                                accept="image/*"
                                alt="doctorDocument"
                            />
                        ) }
                    </div> 
                )
            })}
        </div>
    )
}
export {FetchImages}
