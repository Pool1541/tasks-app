import { useRef, useState, useContext } from 'react';
import styles from '../styles/addList.module.css';
import { IoIosAdd } from "react-icons/io";
import { auth, setNewList } from '../firebase/firebase';
import { ThemeContext } from "../context/themeContext";

export default function AddList() {
  const [add, setAdd] = useState(false);
  const [listName, setListName] = useState('');
  const ref = useRef();
  const { theme } = useContext(ThemeContext);

  const style = {
    backgroundColor: theme.bgTask,
    color: theme.title
  }

  function handleClick() {
    setAdd(!add)
    try {
      if(ref.current.value !== ''){
        const newList = {
          listname: listName,
          tasks: [],
          uid: auth.currentUser.uid,
          timestamp: Date.now(),
        }
        setNewList(newList);
      }
    } catch (error) {
      
    }
  }

  function handleInput(e) {
    setListName(e.target.value);
  }

  if(add){
    return (
      <div className={styles.inputContainer} onBlur={handleClick} style={style}>
        <div className={styles.inputContent}>
          <input ref={ref} className={styles.input} type='text' autoFocus onInput={handleInput} style={{
            color: theme.title
          }}/>
          <IoIosAdd className={styles.icon} onClick={handleClick}/>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} onClick={handleClick} style={style}>
      <div className={styles.content}>
        <span>+ Add new list</span>
      </div>
    </div>
  );
}