import LinearProgress from "@material-ui/core/LinearProgress";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState} from "react";
import { doctorIdState} from "../recoil/selector/doctorIdState";
import { useRecoilValue } from "recoil";
import { HomePageTitle} from "../common/homePageTitle";
import { MostViewedDoctorsInHome} from "../common/mostViewedDoctorsInHome";

export default function Home(){
//using for preloader
	const doctorId = useRecoilValue(doctorIdState);
	const [loading] = useState(false);
	
	let history = useHistory();
    const handleButtonClick = () => {
		// if (!loading) {
		//   setLoading(true);
		//   timer.current = window.setTimeout(() => {
		// 	setLoading(false);
			history.push(`/doctorlist`);
		  //}, 2000);
	//	}
	};
	
    return(
		<main>
			{loading && <LinearProgress size={800} />}
			<HomePageTitle/>
			{/* Most Viewed doctors */}
			<div className="bg_color_1">
				<div className="container margin_120_95">
					<div className="main_title">
						<h2>Most Viewed doctors</h2>
						<div>Usu habeo equidem sanctus no. Suas summo id sed, erat erant oporteat cu pri.</div>
					</div>

					<MostViewedDoctorsInHome doctorId={doctorId}/>
						
					<div className="text-center add_top_30"><Link to="/doctorlist" disabled={loading}  onClick={handleButtonClick} className="btn_1 medium">View all Doctors</Link></div>
				</div>
			</div>

			{/* Application Download */}
			<div id="app_section">
				<div className="container">
					<div className="row justify-content-around">
						<div className="col-md-6">
							<small>Application</small>
							<h3>Download <strong>KeaCure App</strong> Now!</h3>
							<div className="lead">Tota omittantur necessitatibus mei ei. Quo paulo perfecto eu, errem percipit ponderum no eos. Has eu mazim sensibus. Ad nonumes dissentiunt qui, ei menandri electram eos. Nam iisque consequuntur cu.</div>
						</div>
					</div>
				</div>
			</div>
		</main>
    )
}