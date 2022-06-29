import "./App.css";
import { Container, Button, Form } from "react-bootstrap";
import { TaskForm } from "./Components/TaskForm";
import { ListArea } from "./Components/ListArea";
import react, { useState } from "react";

const wklyHrs = 7 * 24;
function App() {
  const [taskList, settaskList] = useState([]);

  const [ids, setIds] = useState([]);

  const total = taskList.reduce((acc, item) => acc + +item.hr, 0);

  const addTask = (task) => {
    if (total + +task.hr > wklyHrs)
      return alert(
        "sorry Sir, you dont have enough time left to fit this task."
      );
    settaskList([...taskList, task]);
  };

  const switchTask = (id, type) => {
    console.log(id, type);

    const switchedArg = taskList.map((item, index) => {
      if (item.id === id) {
        item.type = type;
      }
      return item;
    });
    settaskList(switchedArg);
  };

  const HandleOnCheck = (e) => {
    const { checked, value, name } = e.target;
    console.log(checked, value, name);
    if (value === "entry" || value === "bad") {
      // console.log(taskList);
      let toDeletIDS = [];
      taskList.forEach((item) => {
        if (item.type === value) {
          toDeletIDS.push(item.id);
        }
      });
      if (checked) {
        setIds([...ids, ...toDeletIDS]);
      } else {
        console.log("remove");
        const tempArg = ids.filter((id) => !toDeletIDS.includes(id));
        setIds(tempArg);
      }
      return;
    }
    if (checked) {
      setIds([...ids, value]);
    } else {
      const filteredArg = ids.filter((id) => id !== value);
      setIds(filteredArg);
    }
  };

  const handleOnDelete = () => {
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }
    const tempArg = taskList.filter((item) => !ids.includes(item.id));
    settaskList(tempArg);
    setIds([]);
  };
  console.log(ids);
  return (
    <div className="wrapper">
      <Container>
        <h1 className="text-center py-5">My to do list</h1>
        <TaskForm addTask={addTask} />
        <ListArea
          taskList={taskList}
          switchTask={switchTask}
          total={total}
          HandleOnCheck={HandleOnCheck}
          ids={ids}
        />
        <div>
          {ids.length > 0 && (
            <Button onClick={handleOnDelete} variant="danger">
              Delete Selected Tasks
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;
