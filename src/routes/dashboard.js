import { useEffect, useState, useContext } from "react";
import { Form, useNavigate } from "react-router-dom";
import AddList from "../components/addList";
import AuthProvider from "../components/authProvider";
import Header from "../components/header";
import TaskList from "../components/taskList";
import TasksContainer from "../components/tasksContainer";
import { getInfo, logout } from "../firebase/firebase";
import { onChanges } from "../firebase/firebase";
import { ThemeContext } from "../context/themeContext";

export default function Dashboard() {
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  async function handleUserLoggedIn(user) {
    setState(1);
    setCurrentUser(user);
  }

  function handleUserNotLoggedIn(user) {
    navigate("/");
  }

  function handleUserNotRegistered(user) {
    navigate("/register-username");
  }

  useEffect(() => {
    if (currentUser !== undefined) {
      onChanges(change);
    }
  }, [onChanges, currentUser]);

  async function change() {
    const temp = await getInfo(currentUser.uid);
    setData(temp);
  }

  const styles = {
    minHeight: "100vh",
    backgroundColor: theme.bg,
    transition: "all .2s ease",
    color: theme.title,
  };

  if (state === 1) {
    return (
      <div style={styles}>
        <Header currentUser={currentUser} />
        <TasksContainer>
          <AddList />
          {data.map((taskList) => (
            <TaskList key={taskList.id} taskList={taskList} />
          ))}
        </TasksContainer>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    >
      <div style={styles}></div>
    </AuthProvider>
  );
}
