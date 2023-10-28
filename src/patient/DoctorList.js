import React from "react";
import { API } from "../config";
import { useEffect, useRef ,useState } from "react";
import { Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import {MainInput} from "../mainComponent/mainInput";
import {MainButtonInput} from "../mainComponent/mainButtonInput"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function DoctorList(){
	const timer = useRef();
	useEffect(() => {
        clearTimeout(timer.current);
    }, []);
      //for doctordata  
	const [doctorImage ,setDoctorImage] = useState([])
	useEffect(()=>{
		fetch(`${API}/doctor`).then(res =>{
			if(res.ok){
				return res.json()
            }
        }).then(jsonRes => {
            setDoctorImage(jsonRes)
        });
	},[])

    return(
        <main class="theia-exception">
            <div id="results">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <h4><strong>Showing 10</strong> of 140 results</h4>
                        </div>
                        
                        <div class="col-md-6">
                            <div class="search_bar_list">
                                <MainInput 
                                    type="text" 
                                    placeholder="Ex. Specialist, Name, Doctor...">
                                </MainInput>
                                <MainButtonInput>Search</MainButtonInput>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="filters_listing">
                <div class="container">
                    <ul class="clearfix">
                        <li>
                            <h6>Type</h6>
                            <div class="switch-field">
                                <input type="radio" id="all" name="type_patient" value="all" checked/>
                                <label for="all">All</label>
                                <input type="radio" id="doctors" name="type_patient" value="doctors"/>
                                <label for="doctors">Doctors</label>
                                <input type="radio" id="clinics" name="type_patient" value="clinics"/>
                                <label for="clinics">Clinics</label>
                            </div>
                        </li>
                        <li>
                            <h6>Layout</h6>
                            <div class="layout_view">
                                <Link to="grid-list.html"><i class="icon-th"></i></Link>
                                <Link to="" class="active"><i class="icon-th-list"></i></Link>
                                <Link to="list-map.html"><i class="icon-map-1"></i></Link>
                            </div>
                        </li>
                        <li>
                            <h6>Sort by</h6>
                            <select name="orderby" class="selectbox">
                            <option value="Closest">Closest</option>
                            <option value="Best rated">Best rated</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            </select>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="container margin_60_35">
                    <div class="row">
                        <div class="col-lg-7">
                            {doctorImage.map(item =>(      
                                <div class="strip_list wow fadeIn">
                                    <Link to="" class="wish_bt"></Link>
                                    <figure>
                                        <Link to="/doctordetail">
                                            <img src={`../images/${item.photo}`} alt=""/>
                                        </Link>
                                    </figure>
                                    <h3>{item.name}</h3>
                                    {item.educationList.map(data =>(
                                        <small>{data.specialization}</small>
                                    ))}
                                    <span class="rating">
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            isHalf={true}
                                            edit={false}
                                            value={item.rating}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                            activeColor="#ffd700"
                                        /></span>
                                    <Link to="badges.html" data-toggle="tooltip" data-placement="top" data-original-title="Badge Level" class="badge_list_1"><img src="img/badges/badge_1.svg" width="15" height="15" alt=""/></Link>
                                    <ul>
                                        <li><Link to="#" onclick="onHtmlClick('Doctors', 0)" class="btn_listing">View on Map</Link></li>
                                        <li><Link to="https://www.google.com/maps/dir//Assistance+%E2%80%93+H%C3%B4pitaux+De+Paris,+3+Avenue+Victoria,+75004+Paris,+Francia/@48.8606548,2.3348734,14z/data=!4m15!1m6!3m5!1s0x0:0xa6a9af76b1e2d899!2sAssistance+%E2%80%93+H%C3%B4pitaux+De+Paris!8m2!3d48.8568376!4d2.3504305!4m7!1m0!1m5!1m1!1s0x47e67031f8c20147:0xa6a9af76b1e2d899!2m2!1d2.3504327!2d48.8568361" target="_blank">Directions</Link></li>
                                        <li><Link to={`/doctordetail/${item._id}`}>Book now</Link></li>
                                    </ul>
                                </div>
                            ))}    
                           
                            <nav aria-label="" class="add_top_20">
                                {/* <ul class="pagination pagination-sm">
                                    <li class="page-item disabled">
                                        <Link class="page-link" to="#" tabindex="-1">Previous</Link>
                                    </li>
                                    <li class="page-item active"><Link class="page-link" to="#">1</Link></li>
                                    <li class="page-item"><Link class="page-link" to="#">2</Link></li>
                                    <li class="page-item"><Link class="page-link" to="#">3</Link></li>
                                    <li class="page-item">
                                        <Link class="page-link" to="#">Next</Link>
                                    </li>
                                </ul> */}
                                <Stack spacing={2}>
                                    <Pagination count={5} variant="outlined" color="primary" />
                                </Stack>
                            </nav>
                        </div>
                        <aside class="col-lg-5" id="sidebar">
                            <div id="map_listing" class="normal_list">
                            </div>
                        </aside>
                    </div>
                </div>
	    </main>
    )
}