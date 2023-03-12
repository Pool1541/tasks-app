import { useEffect, useRef, useState, useContext } from "react";
import { updateListName } from "../firebase/firebase";
import styles from '../styles/editListName.module.css';
import { ThemeContext } from "../context/themeContext";


export default function EditListName({ id, listName, onFinishEdit }) {
  const [title, setListName] = useState(listName);
  const ref = useRef();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    ref.current.value = title;
    ref.current.select();
    ref.current.focus();
  },[]);

  function handleChange(e) {
    setListName(e.target.value);
  }

  async function handleBlur() {
    const temp = {
      listname : title
    }
    await updateListName(id, temp);
    onFinishEdit();
  }

  function setHeight(e) {
    const textArea = e.target ?? e.current;
    textArea.setAttribute("style", "height:" + (textArea.scrollHeight) + "px;overflow-y:hidden;" + `color: ${theme.title}`);
    textArea.addEventListener("input", OnInput, false);
  }

  function OnInput() {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
  }

  useEffect(() => {
    setHeight(ref);
  },[])

  return (
    <textarea className={styles.title} ref={ref} type='text' onInput={handleChange} onBlur={handleBlur} spellCheck='false' onChange={setHeight} rows='1' />
  );
}