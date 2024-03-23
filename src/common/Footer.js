import {Link} from "react-router-dom";
import appLogo from '../../src/img/small_wecurify.png'
export default function Footer(){
    return( 
	<footer>
		<div className="container margin_60_35">
			<div className="row">
				<div className="col-lg-3 col-md-12">
					<Link to={`/doctors`}>
					<img className='appLogo' src={appLogo} alt="Something Went Wrong" />
					</Link>
				</div>
				<div className="col-lg-3 col-md-4">
					<h5>About</h5>
					<ul className="links">
						<li><Link to="#0">About us</Link></li>
						<li><Link to="blog.html">Blog</Link></li>
						<li><Link to="#0">FAQ</Link></li>
						<li><Link to="login.html">Login</Link></li>
						<li><Link to="register.html">Register</Link></li>
					</ul>
				</div>
				<div className="col-lg-3 col-md-4">
					<h5>Useful links</h5>
					<ul className="links">
						<li><Link to="#0">Doctors</Link></li>
						<li><Link to="#0">Clinics</Link></li>
						<li><Link to="#0">Specialization</Link></li>
						<li><Link to="#0">Join as Link Doctor</Link></li>
						<li><Link to="#0">Download App</Link></li>
					</ul>
				</div>
				<div className="col-lg-3 col-md-4">
					<h5>Contact with Us</h5>
					<ul className="contacts">
						<li><Link to="#"><i className="icon_mobile"></i> + 61 23 8093 3400</Link></li>
						<li><Link to="mailto:info@test.com"><i className="icon_mail_alt"></i> help@keacure.com</Link></li>
					</ul>
					<div className="follow_us">
						<h5>Follow us</h5>
						<ul>
							<li><Link to="#0"><i className="social_facebook"></i></Link></li>
							<li><Link to="#0"><i className="social_twitter"></i></Link></li>
							<li><Link to="#0"><i className="social_linkedin"></i></Link></li>
							<li><Link to="#0"><i className="social_instagram"></i></Link></li>
						</ul>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-8">
					<ul id="additional_links">
						<li><Link to="#0">Terms and conditions</Link></li>
						<li><Link to="#0">Privacy</Link></li>
					</ul>
				</div>
				<div className="col-md-4">
					<div id="copy">© 2017 KeaCure</div>
				</div>
			</div>
        </div>
	</footer>
    );
}