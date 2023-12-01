import { useAppSelector } from "../store/hoocs";
import { checkIsAuth } from "../store/reduces/AuthSlice";
import '../styles/header.css'

const Header = () => {
    const isAuth = useAppSelector((state) => checkIsAuth(state.authSlice));
    //console.log(isAuth)
    return (
      <div className="header">
        <div className="left_section">
            <a href="/"> Logo </a>
        </div>
    
        <div className="right_section">
          {isAuth ? <a href="/dashboard">Account</a>
          : 
          <a href="/login">Log in</a>}
        </div>
      </div>
    )
}
export default Header;
