function DoctorDetailsEducationalStatement(props){
    const educationData =  props.educationData
    return(
        <div className="modal-border">
            <div className="indent_title_in">
                <i className="pe-7s-news-paper"></i>
                <h3>Education</h3>
                <div>As a caregiver, you see selfless acts everyday.</div>
            </div>
            <div className="wrapper_indent">
                <h6>Curriculum</h6>
                {educationData.map((item ,index)=>(
                    <ul className="list_edu" key={index}>
                        <li><strong>{item.collage}</strong> - {item.degree}</li>
                    </ul>
                ))}
            </div>
        </div>
    )
}
export {DoctorDetailsEducationalStatement}