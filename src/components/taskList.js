import Task from "./task";
import styles from '../styles/taskList.module.css';
import { useEffect, useRef, useState, useContext } from "react";
import EditListName from "./editListName";
import AddTask from "./addTask";
import CompletedTasks from "./completedTasks";
import { HiDotsVertical } from "react-icons/hi";
import Options from "./options";
import { ThemeContext } from "../context/themeContext";

export default function TaskList({ taskList }) {
  const [edit, setEdit] = useState(false);
  const [options, setOptions] = useState(false);
  const [pending, setPending] = useState([]);
  const [done, setDone] = useState([]);
  const { theme } = useContext(ThemeContext);

  const style = {
    backgroundColor : theme.bgTask,
    color: theme.title,
  }

  const title = useRef();

  function handleClick() {
    setEdit(true);
  }

  function handleFinishEdit() {
    setEdit(false);
  }

  function handleOptions() {
    setOptions(!options);
  }
  
  function clickOut(container) {
    let count = 0;
    document.getElementsByTagName('body')[0].addEventListener('click', click);
    function click(e) {
      count++;
      if(count >= 2 && !container.contains(e.target)){
          setOptions(!options);
          document.getElementsByTagName('body')[0].removeEventListener('click', click);
          count = 0;
      }
    }
  }

  useEffect(() => {
    const tempDone = taskList.tasks.filter(task => task.completed);
    const tempPending = taskList.tasks.filter(task => !task.completed);
    setPending(tempPending);
    setDone(tempDone);
  },[taskList])



  return (
    <div className={styles.container} style={style}>
      <div className={styles.titleContainer}>
        { edit ? <EditListName id={taskList.id} listName={taskList.listname} onFinishEdit={handleFinishEdit}/> : <h2 onClick={handleClick} ref={title}>{taskList.listname}</h2>}
        <button className={styles.options} onClick={handleOptions} style={{color: theme.title}}><HiDotsVertical /></button>
        {options ? <Options clickOut={clickOut} title={title} id={taskList.id}/> : <></>}
      </div>
      <AddTask id={taskList.id}/>
      { taskList.tasks.length !== 0 ? 
        <div className={styles.tasksContainer}>
          {pending.map(task => <Task key={task.id} id={taskList.id} task={task} />)}
        </div> : 
        <></>
      }
      <CompletedTasks tasks={done} id={taskList.id} />
    </div>
  );
}