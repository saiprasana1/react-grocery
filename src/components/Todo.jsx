import React, { useEffect, useRef, useState } from 'react'
import Todoitem from './Todoitem'
import { data } from 'autoprefixer';

const Test = () => {
  const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [] );
  const inputRef = useRef();

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todoList));

  },[todoList]);

  const addTask = () => {
    const inputText =inputRef.current.value.trim();
    if (inputText === ""){
      return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const toggleTask = (id) => {
    setTodoList((prev) => {
      return prev.map((todo) => {
        if (id === todo.id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };
  const deleteTodo =(id) => {
    setTodoList((prev) => {
      return prev.filter((todo) =>todo.id !== id);


    });
  };
  


  return (
    <>
     <div className='w-[30-rem]'>
      <h1 className='text-lg my-2 font-medium text-amber-500'>To-Do-List</h1>
      <div className='flex gap-2'>
        <div className='flex-1'> 
          <input ref={inputRef} type="text" name="" id="" className='py-3 px-4 w-full text-sm border focus:outline-none focus:border-amber-500' placeholder='Enter your list' />
        </div>
        <button className='py-3 px-4 text-white bg-blue-600 hover:bg-blue-800 text-sm font-medium rounded-sm border-none 'onClick={addTask} >ADD LIST</button>
      </div>
      <p className='text-zinc-400 text-sm my-3 px-1 font-bold ' > List Details</p>
      <div className='w-[30-rem] bg-white py-6 px-4'>
        <fieldset className='space-y-3'>
          <legend className='text-blue-950 font-extrabold'>Added List</legend>
          {/* list start*/}
          {todoList.length===0?(<p className='text-sm text-gray-500'>no list found</p>):(
            todoList.map((todo,index) =>{
              return <Todoitem text={todo.text} isComplete={todo.isComplete} id={todo.id} toggleTask={toggleTask} deleteTodo={deleteTodo} />
            })
          )}
         
          
          {/* list end*/}
        </fieldset>
      </div>

     </div>
        
    </>
   
  )
}

export default Test