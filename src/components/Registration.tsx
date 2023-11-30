import { useState } from 'react';
import { useAppDispatch, useAppSelector } from "../store/hoocs";
import { checkIsAuth, registerUser } from "../store/reduces/AuthSlice";

const RegisterPage = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const isAuth = useAppSelector((state) => checkIsAuth(state.authSlice));
  const {status,isLoading} = useAppSelector((state) => state.authSlice);


  const handleRegistration = () => {
    try {
      dispatch(
        registerUser({
          email,
          password,
          username,
        })
      );
      setEmail('')
      setPassword('');
      setUsername('');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="login">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Регистрация пользователя</h1>
        <input 
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      <input 
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
            <button onClick={handleRegistration} className='reg_button'>Зарегистрироваться</button>


            <div className='hor_line'></div>
        
      </form>
      {isLoading ? <h2>Loading</h2>: ''}
      {status ? <h2>{status}</h2>: ''}
    </div>
  );
  
};




export default RegisterPage