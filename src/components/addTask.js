import styles from '../styles/addTask.module.css';
import { IoIosAdd } from "react-icons/io";
import { useRef, useState } from 'react';
import { getList, updateTask } from '../firebase/firebase';

export default function AddTask({ id }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(false);
  const titleRef = useRef();
  const descriptionRef = useRef();

  function handleClick() {
    setActive(!active);
  }

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    addTask();
  }

  function handleBlur(e) {
    document.addEventListener('click', target, {once: true})
    function target(e) {
      if(e.target !== titleRef.current && e.target !== descriptionRef.current){
        addTask();
      }
    }
  }

  async function addTask() {
    if(title !== '' || description !==  '') {
      const task = {
        taskname: title,
        description: description,
        id: crypto.randomUUID(),
        date: Date.now(),
        completed: false,
      };
      handleClick();
      setTitle('');
      setDescription('');
      const temp = await getList(id);
      const tasks = temp.tasks;
      tasks.unshift(task);
      await updateTask(id, {tasks: tasks});
    } else {
      handleClick();
      setTitle('');
      setDescription('');
    }
  }
  
  if(active) {
    return (
      <form className={styles.container} onSubmit={handleSubmit}>
        <div>
          <input onInput={handleChangeTitle} ref={titleRef} className={styles.inputTitle} type='text' spellCheck='false' placeholder='Title' onBlur={handleBlur} autoFocus />
          <textarea onInput={handleChangeDescription} ref={descriptionRef} className={styles.inputDescription} spellCheck='false' placeholder='Description' rows='1' onBlur={handleBlur} />
        </div>
      </form>
    );
  }
  return (
    <div onClick={handleClick}> 
      <div className={styles.addTask}>
        <IoIosAdd className={styles.icon} /> Add a task
      </div>
    </div>
  );
}