import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import AuthProvider from './components/authProvider';
import loginUser from './login/login';
import styles from './styles/app.module.css';
import { FcTodoList } from "react-icons/fc";
import { ThemeContext } from "./context/themeContext";

function App() {
  const [state, setState] = useState(0);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const style = {
    backgroundColor: theme.bg,
    color: theme.title
  }

  function handleUserNotRegistered(user){
    navigate('/register-username');
  }

  function handleUserLoggedIn(user){
    navigate('/dashboard');
  }

  function handleUserNotLoggedIn(user){
    setState(1);
  }

  if(state === 1) { 
    return (
      <div className={styles.container} style={style}>
        <div className={styles.signIn}>
          <div className={styles.logo}>
            <FcTodoList className={styles.logo_image}/>
            <h1 className={styles.logo_name} style={style}>Tasks App</h1>
          </div>
          <button onClick={loginUser} className={styles.btn}>Sign in with Google</button>
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

export default App;
