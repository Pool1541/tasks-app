import styles from '../styles/tasksContainer.module.css';

export default function TasksContainer({ children }) {

  return (
    <div className={styles.container}>{children}</div>
  );
}