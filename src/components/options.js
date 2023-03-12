import { useEffect, useRef, useContext } from 'react';
import styles from '../styles/options.module.css';
import { HiPencil, HiOutlineTrash } from "react-icons/hi";
import { deleteList } from '../firebase/firebase';
import { ThemeContext } from "../context/themeContext";

export default function Options({ clickOut, title, id }) {
  const container = useRef();
  const { theme } = useContext(ThemeContext);

  const style = {
    backgroundColor : theme.bgOptions,
    color: theme.title,
  }


  function handleEdit() {
    title.current.click();
  }

  function handleDelete(){
    deleteList(id);
    document.getElementsByTagName('body')[0].click();
  }


  useEffect(()=> {
    clickOut(container.current);
  }, [container])

  return (
    <div ref={container} className={styles.container} style={style}>
      <div className={styles.arrow}></div>
      <div className={styles.box} style={style}>
        <div className={styles.option} onClick={handleEdit}><HiPencil /><h4>Editar lista</h4></div>
        <div className={styles.option} onClick={handleDelete}><HiOutlineTrash /><h4>Borrar lista</h4></div>
      </div>
    </div>
  );
}