import { useState,useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../store/hoocs";
import { useNavigate } from 'react-router-dom';
import { checkIsAuth, loginUser } from "../store/reduces/AuthSlice";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => checkIsAuth(state.authSlice));
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>('');
  const {status,isLoading} = useAppSelector((state) => state.authSlice);


  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard'); 
    }
  }, [isAuth, navigate]);


  const handleLogin = () => {
    try {
      dispatch(
        loginUser({
          email,
          password
        })
      );
      setEmail('')
      setPassword('');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="login">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Log in </h1>
      <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
            <button onClick={handleLogin} className='log_button'>Log in</button>

            <div>
              <h3> Not registered yet?</h3>
              <a href="register">Register</a>
            </div>

            <div className='hor_line'></div>
        
      </form>
      {isLoading ? <h2>Loading</h2>: ''}
      {status ? <h2>{status}</h2>: ''}
    </div>
  );
  
};




export default LoginPage