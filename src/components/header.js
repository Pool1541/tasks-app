import { useEffect, useRef, useState, useContext } from "react";
import { logout } from "../firebase/firebase";
import { HiOutlineLogout } from "react-icons/hi";
import { FcTodoList } from "react-icons/fc";
import styles from '../styles/header.module.css';
import { useNavigate } from "react-router-dom";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { ThemeContext } from "../context/themeContext";


export default function Header({ currentUser }) {
  const [options, setOptions] = useState(false);
  const optionsBox = useRef();
  const navigate = useNavigate();
  const { theme, changeTheme } = useContext(ThemeContext);

  function handleClick() {
    setOptions(!options);
  }

  function handleLogout() {
    document.getElementsByTagName('body')[0].click();
    logout();
  }

  function handleClickOnLogo() {
    navigate('/');
  }

  function handleDarkmode() {
    changeTheme()
  }

  useEffect(() => {
    if(options){
      let count = 0; 
      document.addEventListener('click', click);
  
      function click(e) {
        count++;
        if(count >= 2 && !optionsBox.current.contains(e.target)){
          setOptions(!options);
          document.removeEventListener('click', click);
          count = 0;
        }
      }
    }
  },[options]);

  useEffect(() => {
    try {
      if(!options){
        optionsBox.current.style.animation = `${styles.fadeOut} .2s ease forwards`;
      }else {
        optionsBox.current.style.display = 'block';
        optionsBox.current.style.animation = `${styles.fadeIn} .2s ease forwards`;
      }
    } catch (error) {
      console.error(error)
    }

  },[options]);

  const style = {
    backgroundColor: theme.bgHead,
    color: theme.title,
  }

  const optionStyle = {
    backgroundColor: theme.bgOptions,
    color: theme.title,
  }


  return(
    <div className={styles.container} style={style}>
      <div className={styles.logo} onClick={handleClickOnLogo}>
        <FcTodoList className={styles.logo_image} />
        <h1 className={styles.logo_name}>Tasks App</h1>
      </div>
      <div className={styles.imageContainer}>
        <img src={currentUser.profilePicture} onClick={handleClick}/>
        <div ref={optionsBox} className={styles.options} style={optionStyle}>
          <div className={styles.arrow} style={optionStyle}></div>
          <div className={styles.optionsContent} style={optionStyle}>
            <button className={styles.btn} onClick={handleLogout} style={optionStyle}>
              <HiOutlineLogout /><span>Logout</span>
            </button>
            <button className={styles.btn} onClick={handleDarkmode} style={optionStyle}>
              <MdOutlineDarkMode /><span>Light mode</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}