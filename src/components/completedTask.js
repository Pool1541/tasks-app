import styles from '../styles/completeTask.module.css';
import { IoIosCheckmark, IoIosTrash } from "react-icons/io";
import { deleteTask, getList, updateTask } from '../firebase/firebase';

export default function CompleteTask({ task, id}) {

  async function handleClick() {
    const list = await getList(id);
    let temp = list.tasks;
    let taskTemp = temp.find(item => item.id === task.id);
    taskTemp.completed = false;
    await updateTask(id, {tasks: temp});
  }

  async function handleDelete() {
    const list = await getList(id);
    let temp = list.tasks;
    temp = temp.filter(item => item.id !== task.id);
    await deleteTask(id, {tasks: temp});
  }



  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleClick}><IoIosCheckmark /></button>
      <h3 className={styles.title}>{task.taskname}</h3>
      <button className={styles.btnDelete} onClick={handleDelete}><IoIosTrash /></button>
  </div>
  );
}