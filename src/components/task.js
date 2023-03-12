import styles from '../styles/task.module.css';
import { CiEdit } from "react-icons/ci";
import { useEffect, useRef, useState, useContext } from 'react';
import EditTask from './editTask';
import { getList, updateTask } from '../firebase/firebase';
import { ThemeContext } from "../context/themeContext";

export default function Task({ task, id }){
  const [edit, setEdit] = useState(false);
  const checkbox = useRef();
  const container = useRef();
  const { theme } = useContext(ThemeContext);

  const style = {
    backgroundColor : theme.bgTask,
    color: theme.title,
  }

  function handleEdit() {
    setEdit(true);
  }

  function handleFinishEdit() {
    setEdit(false);
  }

  async function handleInput(e) {
    const list = await getList(id);
    let temp = list.tasks;
    let taskTemp = temp.find(item => item.id === task.id);
    taskTemp.completed = e.target.checked;
    if(checkbox.current.checked){
      container.current.style.animation = `${styles.deleteTask} .5s ease forwards`;
      container.current.addEventListener('animationend', e => {
        container.current.remove();
      });
    }
    await updateTask(id, {tasks: temp});
  }

  useEffect(() => {
    try {
      if(task.completed){
        checkbox.current.checked = true;
      } else {
        checkbox.current.checked = false;
      }
    } catch (error) {
      
    }
  },[task]);

  return (
    <div className={styles.container} ref={container} style={style}>
      <div className={styles.checkboxContainer}>
        <input type='checkbox' className={styles.checkbox} ref={checkbox} onInput={handleInput} />
      </div>
      {
        edit ? 
          <div className={styles.taskData}>
            <EditTask id={id} task={task} onFinishEdit={handleFinishEdit}/>
          </div> : 
          <>
          <div className={styles.inputContainer}>
              <h3 className={styles.title}>{task.taskname}</h3>
              <p className={styles.description} style={{ color : theme.paragraph}}>{task.description}</p>
          </div>
          <button className={styles.btnEdit} onClick={handleEdit}>
                <CiEdit />
          </button>
          </>
      }
    </div>
  );
}