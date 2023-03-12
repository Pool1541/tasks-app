import { useEffect, useRef, useState, useContext } from "react";
import style from '../styles/editTask.module.css';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { getList, updateTask } from "../firebase/firebase";
import { ThemeContext } from "../context/themeContext";

export default function EditTask({ task, onFinishEdit, id }){
  const [title, setTitle] = useState(task.taskname);
  const [description, setDescription] = useState(task.description);
  const descriptionRef = useRef();
  const titleRef = useRef();
  const { theme } = useContext(ThemeContext);

  const styles = {
    backgroundColor: theme.bgTask,
    color: theme.title
  }

  useEffect(() => {
    descriptionRef.current.value = description;
    titleRef.current.value = title;
    titleRef.current.select();
  },[]);

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const list = await getList(id);
    let temp = list.tasks;
    let taskTemp = temp.find(item => item.id === task.id);
    taskTemp.taskname = title;
    taskTemp.description = description;
    await updateTask(id, {tasks: temp});
    onFinishEdit();
  }

  function setHeight(e) {
    const textArea = e.target ?? e.current;
    textArea.setAttribute("style", "height:" + (textArea.scrollHeight) + "px;overflow-y:hidden;");
    textArea.addEventListener("input", OnInput, false);
  }

  function OnInput() {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
  }

  useEffect(() => {
    setHeight(titleRef);
    setHeight(descriptionRef);
  },[])

  return (
    <form className={style.container} onSubmit={handleSubmit} style={styles}>
      <div className={style.textAreaContainer}>
        <textarea className={style.inputTitle} ref={titleRef} spellCheck='false' onInput={handleTitle} onChange={setHeight} rows='1'/>
        <textarea className={style.inputDescription} ref={descriptionRef} spellCheck='false' onInput={handleDescription} onChange={setHeight} rows='1'/>
      </div>
      <button className={style.btnEdit}>
        <IoIosCheckmarkCircleOutline />
      </button>
    </form>
  );
} 