import { API } from "../config";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doctorIdState } from "../recoil/selector/doctorIdState";
import { useRecoilValue } from "recoil";
import axios from "axios";

function MostViewedDoctorsInHome(){
    const doctorId = useRecoilValue(doctorIdState);
    //for doctordata  
	const [fetchDetails , setFetchdetails]= useState([])
    useEffect(()=>{
		getallDoctors();
	},[])

    const getallDoctors = async ()=>{
        const result = await axios.get(`${API}/doctor`); 
        setFetchdetails(result.data);   
    }
    return(
    <div className="row">
        {fetchDetails.map((item ,index)=>(
            <div className="col-lg-4 col-md-6" key={index}>
                <div className="box_list home">
                    <Link to={`/doctordetail/${item._id}`} data-toggle="tooltip" data-placement="top" title="Add to wishlist" className="wish_bt"></Link>
                    <figure>
                        <Link to={`/doctordetail/${item._id}`}><img src={`../images/${item.photo}`} className="img-fluid" alt=""/></Link>
                        <div className="preview"><span>Read more</span></div>
                    </figure>
                        
                    <div className="wrapper">
                        <h3>{item.name}</h3>
                        {item.educationList.map((data , id) =>(
                            <small key={id}>{data.specialization}</small>
                        ))}
                        <div>{item.description}</div>
                            <ReactStars
                                count		=	{5}
                                size		=	{24}
                                isHalf		=	{true}
                                edit		=	{false}
                                emptyIcon	=	{<i className="far fa-star"></i>}
                                halfIcon	=	{<i className="fa fa-star-half-alt"></i>}
                                fullIcon	=	{<i className="fa fa-star"></i>}
                                activeColor	=	"#ffd700"
                            />
                        <Link to="#0" data-toggle="tooltip" data-placement="top" data-original-title="Badge Level" className="badge_list_1"><img src="img/badges/badge_6.svg" width="15" height="15" alt=""/></Link>
                    </div>
                    <ul>
                        <li><Link  to={`/doctordetail/${item._id}`}>Book now</Link></li>
                    </ul>
                </div>
            </div>
        ))} 
    </div>
    )
}
export {MostViewedDoctorsInHome}