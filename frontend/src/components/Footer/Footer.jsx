import { assets } from "../../assets/assets"
import "./Footer.css"

const Footer = () => {
  return (
    <div className="footer" id="footer">
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt=""/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et dolor non velit commodo pulvinar.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="Facebook"/>
                    <img src={assets.twitter_icon} alt="Twitter"/>
                    <img src={assets.linkedin_icon} alt="Instagram"/>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>HOME</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-212-456-7890</li>
                    <li>contact@tamato.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="copyright">&copy; 2024 Tamato. All rights reserved.</p>
    </div>
  )
}

export default Footer