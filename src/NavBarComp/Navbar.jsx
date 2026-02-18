import logo from '../assets/chatbot_logo.png'
import avatar from '../assets/avatar.png'
import "./nav_style.css";
function Navbar(){
    return(
        <div className='nav_container'>
            <div className='logo_container'>
                <img className='logo_img' src={logo} alt="logo" />
            </div>
            <div className='logo_container'>
                
                <img className='logo_img2' src={avatar} alt="" srcset="" />
            </div>
        </div>
    );
}
export default Navbar;