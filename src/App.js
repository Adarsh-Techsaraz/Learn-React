import './App.css';
import { useEffect, useState } from 'react';
import AddToTask from './AddToTask';

function App() {
  const localData = JSON.parse(localStorage.getItem("data"))
  const [openModel, setOpenModel] = useState(false);
  const [toDoData, setTodoData] = useState(localData);
  const [isUpdate, setUpdate] = useState(false);
  const [dataToSet, setdataToSet] = useState({});
  const handelDelete = (i) => {
    setTodoData(toDoData.filter((v,index) => i!== index))
  }
  const firstClick = ()=> {
    setOpenModel(true)
    setUpdate(false)
  }
  const storeData = (data)=> {
    setTodoData([...toDoData,data])
  }
  const handelEdit = (i)=> {
    setOpenModel(true)
    setUpdate(true)
    const filterData = toDoData.filter((value, index) => index === i)
    setdataToSet({id:i, title:filterData[0].title, status:filterData[0].status})
  }
  const handleUpdateData = (data)=> {
    const filterData = toDoData.map((value,index)=>{
      if(index===data.id){
        return {title: data.title, status: data.status}
      }else{
        return value
      }
    })
    setTodoData(filterData)
  }
  const dataToDisplay = (e)=> {
    const filterData = toDoData.filter((value,index) => value === e)
    setTodoData(filterData)
  }
  useEffect(()=> {
    localStorage.setItem('data', JSON.stringify(toDoData))
  },[toDoData])
  
  return (
    <>
      {/* Conditional Rendering */}
      {openModel && <AddToTask updateModel={(flag) => setOpenModel(flag)} todosData={(data) => storeData(data)} isUpdate={isUpdate} filterData={dataToSet} updateData={(data)=>handleUpdateData(data)}/>}
      <div className="App">
      <h1>TODO LIST</h1>
      <div style={{display:'flex',justifyContent:'space-between',margin:'4rem'}}>
        <button onClick={() => firstClick()}>Add to Task</button>
        <select>
          <option value="All" onChange={(e) => dataToDisplay(e.target.value)}>All  Task</option>
          <option value="Completed" onChange={(e) => dataToDisplay(e.target.value)}>Completed</option>
          <option value="Incompleted" onChange={(e) => dataToDisplay(e.target.value)}>Incompleted</option>
        </select>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '4rem' }}>
          {toDoData.map((value, i) => (
            <>
              <span>{value.title}</span>
              <span>{value.status}</span>
              <button onClick={()=> handelEdit(i)}>Edit</button>
              <button onClick={() => handelDelete(i)}>Delete</button>
            </>
          ))}
        </div>
    </div>
    </>
    
  );
}

export default App;
