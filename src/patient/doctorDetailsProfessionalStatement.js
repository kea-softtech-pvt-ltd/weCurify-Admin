function DoctorDetailsProfessionalStatement(props){
    const educationData =  props.educationData;

    return(
        <div className="modal-border">
            <div className="indent_title_in">
                <i className="pe-7s-user"></i>
                <h3>Professional statement</h3>
                <div>As a caregiver, you see selfless acts everyday.</div>
            </div>
            <div className="wrapper_indent">
                <h6>Specializations</h6>
                {educationData.map((item ,index)=>(
                    <div className="row"  key={index}>
                        <div className="col-lg-6">
                            <ul className="bullets">
                                <li>{item.specialization}</li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}
export {DoctorDetailsProfessionalStatement}