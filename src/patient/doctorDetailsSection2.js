import avatar1 from "../img/avatar1.jpg";
import avatar2 from "../img/avatar2.jpg";
import avatar3 from "../img/avatar3.jpg";
import { Link,} from "react-router-dom";

function DoctorDetailSection2(){
    return(
    <div className="box_general_3">
        <div className="reviews-container">
                <div className="row">
                    <div className="col-lg-3">
                        <div id="review_summary">
                            <strong>4.7</strong>
                            <div className="rating">
                                <i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star"></i>
                            </div>
                            <small>Based on 4 reviews</small>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-lg-10 col-9">
                                <div className="progress">
                                    <div className="progress-bar"></div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-3"><small><strong>5 stars</strong></small></div>
                        </div>
                        
                        <div className="row">
                            <div className="col-lg-10 col-9">
                                <div className="progress">
                                    <div className="progress-bar"></div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-3"><small><strong>4 stars</strong></small></div>
                        </div>
                        
                        <div className="row">
                            <div className="col-lg-10 col-9">
                                <div className="progress">
                                    <div className="progress-bar"></div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-3"><small><strong>3 stars</strong></small></div>
                        </div>
                        
                        <div className="row">
                            <div className="col-lg-10 col-9">
                                <div className="progress">
                                    <div className="progress-bar"></div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-3"><small><strong>2 stars</strong></small></div>
                        </div>
                        
                        <div className="row">
                            <div className="col-lg-10 col-9">
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar"></div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-3"><small><strong>1 stars</strong></small></div>
                        </div>
                    </div>
                </div>
        
                <div className="review-box clearfix">
                    <figure className="rev-thumb"><img src={avatar1} alt=""/>
                    </figure>
                    <div className="rev-content">
                        <div className="rating">
                            <i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star"></i>
                        </div>
                        <div className="rev-info">
                            Admin – April 03, 2016:
                        </div>
                        <div className="rev-text">
                            <div>
                                Sed eget turpis Link pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
                            </div>
                        </div>
                    </div>
                </div>
                

                <div className="review-box clearfix">
                    <figure className="rev-thumb"><img src={avatar2} alt=""/>
                    </figure>
                    <div className="rev-content">
                        <div className="rating">
                            <i className="icon-star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star"></i>
                        </div>
                        <div className="rev-info">
                            Ahsan – April 01, 2016
                        </div>
                        <div className="rev-text">
                            <div>
                                Sed eget turpis Link pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="review-box clearfix">
                    <figure className="rev-thumb"><img src={avatar3} alt=""/>
                    </figure>
                    <div className="rev-content">
                        <div className="rating">
                            <i className="icon-star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star voted"></i><i className="icon_star"></i>
                        </div>
                        <div className="rev-info">
                            Sara – March 31, 2016
                        </div>
                        <div className="rev-text">
                            <div>
                                Sed eget turpis Link pede tempor malesuada. Vivamus quis mi at leo pulvinar hendrerit. Cum sociis natoque penatibus et magnis dis
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-right"><Link to="submit-review.html" className="btn_1">Submit review</Link></div>
        </div>
    )
}
export {DoctorDetailSection2}