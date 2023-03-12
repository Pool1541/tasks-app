import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styles from '../styles/completedTasks.module.css';
import CompleteTask from "./completedTask";

export default function CompletedTasks({ tasks, id }) {
  const [completedTasks, setCompletedTasks] = useState(tasks);
  const [numberOfTasks, setNumberOfTasks] = useState(0);
  const [colapse, setColapse] = useState(false);
  const svg = useRef();
  const tasksContainer = useRef();

  function handleClick(e) {
    svg.current.classList.toggle(`${styles.rotate}`);
    setColapse(!colapse);
    if(colapse){
      tasksContainer.current.style.height = '0';
    } else {
      tasksContainer.current.style.height = `${tasks.length * 42}px`
    }
  }

  useEffect(() => {
    try {
      if(colapse){
        tasksContainer.current.style.height = `${tasks.length * 42}px`;
      }
    } catch (error) {
      
    }

  },[tasks]);

  useEffect(() => {
    setNumberOfTasks(tasks.length);
  });

  if(numberOfTasks == 0){
    return <></>
  }

  return (
    <div className={styles.root}>
      <div className={styles.container} onClick={handleClick}>
        <span className={styles.title}>completed ({numberOfTasks})</span>
        <button ref={svg} className={styles.button}><IoIosArrowDown  /></button>
      </div>
      <div ref={tasksContainer} className={styles.tasks}>
      { colapse ? tasks.map(task => <CompleteTask key={task.id} id={id} task={task} />) : <></>}
      </div>
    </div>

  );
}