import { useState } from 'react'
import './App.css'
import InputTodo from './components/inputTodo'
import Toolbar from './components/toolbar/Toolbar';
import TodoList from './components/todoList';
import Column from './components/column';
import ColumnsList from './components/columnsList';

function App() {
  // VARIABLES ------------------------
  const [todosList, setTodosList] = useState([]);
  const [data, setData] = useState(
    {
      isLoading: true,
      data: []
    }
  );

  const [selectedContent, setSelectedcontent] = useState("columns");
  // CONDITIONS -----------------------
  useState(async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos");
    const res = await data.json()
    console.log(res);
    setData({ isLoading: false, data: res });
  })

  const actions = {
    complete: (idTodo) => {
      console.log(idTodo)
      const pos = data.data.map(elem => elem.id).indexOf(idTodo);
      const auxArr = [...data.data];
      auxArr[pos].completed = true;
      setData({ ...data, data: auxArr });
    },
    undo: (idTodo) => {
      console.log(idTodo)
      const pos = data.data.map(elem => elem.id).indexOf(idTodo);
      const auxArr = [...data.data];
      auxArr[pos].completed = false;
      setData({ ...data, data: auxArr });
    },
    delete: (idTodo) => {
      let auxArr = [...data.data];
      auxArr = auxArr.filter((todo) => todo.id !== idTodo);
      setData({ ...data, data: auxArr });
    }
  }

  const content = {
    total: () => {
      return <TodoList
        todoList={todosList}
        handleCompleteTodo={handleCompleteTodo}
        handleUndoTodo={handleUndoTodo}
        handleDeleteTodo={handleDeleteTodo}
      />
    },
    done: () => {
      const auxArr = todosList.filter(element =>
        element.completed === true
      )
      return <TodoList
        todoList={auxArr}
        handleCompleteTodo={handleCompleteTodo}
        handleUndoTodo={handleUndoTodo}
        handleDeleteTodo={handleDeleteTodo}
      />
    },
    todo: () => {
      const auxArr = todosList.filter(element =>
        element.completed === false
      )
      return <TodoList
        todoList={auxArr}
        handleCompleteTodo={handleCompleteTodo}
        handleUndoTodo={handleUndoTodo}
        handleDeleteTodo={handleDeleteTodo}
      />
    },
    columns: () => {
      return <ColumnsList data={data} actions={actions} />
    },
  }

  const handleAddTodo = (inputValue) => {
    console.log("handleAddTodo : ", inputValue);
    const obj = {
      id: Date.now(),
      todo: inputValue,
      completed: false,
      userId: 1
    }
    const auxArray = [...todosList]
    auxArray.unshift(obj)
    setTodosList(auxArray);
  }

  const handleCompleteTodo = (idTodo) => {
    console.log(idTodo)
    const pos = todosList.map(elem => elem.id).indexOf(idTodo);
    const auxArr = [...todosList];
    auxArr[pos].completed = true;
    auxArr[pos].date = new Date().toLocaleDateString();
    setTodosList(auxArr);
  }

  const handleUndoTodo = (idTodo) => {
    console.log(idTodo)
    const pos = todosList.map(elem => elem.id).indexOf(idTodo);
    const auxArr = [...todosList];
    auxArr[pos].completed = false;
    auxArr[pos].date = "";
    setTodosList(auxArr);
  }

  const handleDeleteTodo = (idTodo) => {
    let auxArr = [...todosList];
    auxArr = auxArr.filter((todo) => todo.id !== idTodo);
    setTodosList(auxArr);
  }


  // RETURN ---------------------------
  return (
    <>
      <div className='App'>
        <div className='App__content'>
          <div className='App__inputSection'>
            <InputTodo callback={handleAddTodo} />
          </div>
          <div className='App__toolbarSection'>
            <Toolbar
              selectedContent={selectedContent}
              setSelectedcontent={setSelectedcontent}
              todosList={todosList}
            />
          </div>
          <div className='App__todosSection'>
            {content[selectedContent]()}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
