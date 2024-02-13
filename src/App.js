import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import AddToTask from './AddToTask';

function App() {
  const [openModel, setOpenModel] = useState(false);
  const [toDoData, setTodoData] = useState([]);
  const [isUpdate, setUpdate] = useState(false);
  const [dataToSet, setdataToSet] = useState({})
  const handelDelete = (i) => {
   setTodoData(toDoData.filter((v,index) => i!== index))
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
  return (
    <>
      {/* Conditional Rendering */}
      {openModel && <AddToTask updateModel={(flag) => setOpenModel(flag)} todosData={(data) => setTodoData([...toDoData,data])} isUpdate={isUpdate} filterData={dataToSet} updateData={(data)=>handleUpdateData(data)}/>}
      <div className="App">
      <h1>TODO LIST</h1>
      <div style={{display:'flex',justifyContent:'space-between',margin:'4rem'}}>
        <button onClick={() => setOpenModel(true)}>Add to Task</button>
        <select>
          <option value="All">All  Task</option>
        <option value="Completed">Completed</option>
        <option value="Incompleted">Incompleted</option>
          
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
