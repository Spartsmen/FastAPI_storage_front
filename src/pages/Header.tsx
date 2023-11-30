import { useAppDispatch, useAppSelector } from "../store/hoocs";
import { checkIsAuth } from "../store/reduces/AuthSlice";
import '../styles/header.css'

const Header = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector((state) => checkIsAuth(state.authSlice));
    
    return (
      <div className="header">
        <div className="left_section">
            <a href="/"> Logo </a>
        </div>
    
        <div className="right_section">
          {isAuth ? <a href="/dashboard">Аккаунт</a> : <a href="/login">Войти</a>}
        </div>
      </div>
    )
}

export default Header;
