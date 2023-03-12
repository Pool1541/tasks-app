import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import { existsUsername, updateUser, logout } from "../firebase/firebase";
import styles from '../styles/registerUsername.module.css';
import { ThemeContext } from "../context/themeContext";

export default function RegisterUsername() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [state, setState] = useState(0);
  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const { theme } = useContext(ThemeContext);

  const style = {
    backgroundColor: theme.bg,
    color: theme.title
  }

  function handleUserLoggedIn() {
    navigate('/dashboard');
  }
  function handleUserNotLoggedIn() {
    navigate('/')
  }
  function handleUserNotRegistered(user) {
    setState(1);
    setCurrentUser(user);
  }

  function handleInput(e){
    setUsername(e.target.value);
  }

  async function handleContinue(){
    if(username !== ''){
      const exist = await existsUsername(username);
      if(exist){
        setUsernameInvalid(true);
      } else {
        await updateUser(currentUser.uid, {
          username : username,
          processCompleted : true,
        });
        setState(2);
      }
    }
  }

  if(state === 1){
    return (
      <div className={styles.container} style={style}>
        <div className={styles.content}>
          <h1 className={styles.title}>Registra tu username</h1>
          <input className={styles.input} type='text' onInput={handleInput} style={{
            backgroundColor: theme.paragraph
          }} autoFocus/>
          <div className={styles.username}>
            {usernameInvalid ? <span>El usuario es inválido</span> : <></>}
          </div>
          <div className={styles.btn_container}>
            <button className={styles.btn} onClick={handleContinue}>Continuar</button>
            <button className={styles.btn} onClick={logout}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  if(state === 2){
    return (
      <div className={styles.container} style={style}>
        <div className={styles.content} >
          <h2 className={styles.welcome}>Bienvenido {username}, dale al botón continuar para ir a tu dashboard</h2>
          <Link className={styles.continue} to='/dashboard'>continue</Link>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    >
      <div style={{
        backgroundColor: theme.bg,
        minHeight: '100vh'
      }}></div>
    </AuthProvider>
  );
}