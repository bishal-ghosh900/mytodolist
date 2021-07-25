import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ToDoList(props) {
  const [text, setText] = useState("");
  const [todos, setTodo] = useState([]);
  const [dataCall, setDataCall] = useState(false);

  let handleTodos = () => {
    if (text) {
      let tempText = text;
      let check = false;
      let data = JSON.parse(window.localStorage.getItem("todos"));
      //   console.log(data);
      if (data) {
        setTodo([...data, { tempText, check }]);
      } else {
        setTodo([...todos, { tempText, check }]);
      }
      //   setTodo([...data, ...todos, { tempText, check }]);
      setText("");
    }
  };

  useEffect(() => {
    // console.log(todos);
    // console.log(window.localStorage.getItem("todos"));
    let data = JSON.parse(window.localStorage.getItem("todos"));
    // console.log(data);
    if (!data) {
      window.localStorage.setItem("todos", JSON.stringify(todos));
      setDataCall(true);
    } else {
      if (data.length !== 0 && dataCall === false) {
        // console.log(dataCall);
        setDataCall(true);
        setTodo([...data]);
      } else {
        window.localStorage.setItem("todos", JSON.stringify(todos));
        setDataCall(true);
      }
    }
  }, [todos, dataCall]);

  let handleCross = (e) => {
    let key = Number(e.target.name);
    let temp1 = todos.slice(0, key);
    let temp2 = todos.slice(key + 1, todos ? todos.length : 0);
    setTodo([...temp1, ...temp2]);
  };

  let handleChecked = (e) => {
    let key = Number(e.target.name);
    // console.log(e.target.name);
    if (!todos[key].check) {
      e.target.className = "checkedDiv";
      let temp = todos;
      temp[key].check = true;
      setTodo(temp);
      window.localStorage.setItem("todos", JSON.stringify(todos));
      //   console.log(e.target.className);
    } else if (todos[key].check) {
      e.target.className = "texts";
      let temp = todos;
      temp[key].check = false;
      setTodo(temp);
      window.localStorage.setItem("todos", JSON.stringify(todos));
      //   console.log(e.target.className);
    }
  };

  return (
    <div className="list">
      <div className="todos">
        <input
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
        />
        <input
          type="button"
          onClick={handleTodos}
          className="addtodos"
          value="Add"
        />
      </div>
      {todos &&
        todos.map((v, index) => (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            key={v.toString()}
            className="textDiv"
          >
            <button
              className={v.check ? "checkedDiv" : "texts"}
              name={index}
              onClick={handleChecked}
            >
              {v.tempText}
            </button>
            <button name={index} onClick={handleCross} className="cross">
              X
            </button>
          </motion.div>
        ))}
    </div>
  );
}

export default ToDoList;
