import './App.css';
import { useEffect, useState } from 'react';
import AddToTask from './AddToTask';
import deleteLogo from './image/delete-icon-png.png';
import editLogo from './image/edit-icon-png.png';

function App() {
   const localData = JSON.parse(localStorage.getItem("data"))
   const [openModel, setOpenModel] = useState(false);
   const [toDoData, setTodoData] = useState(localData);
   const [isUpdate, setUpdate] = useState(false);
   const [dataToSet, setdataToSet] = useState({});
   const [filterData, setFilterData] = useState(localData)
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
    const filterData = e==="All" ? toDoData : toDoData.filter((value,index) => value.status === e)
    setFilterData(filterData)
  }
  useEffect(()=> {
    localStorage.setItem('data', JSON.stringify(toDoData))
  },[toDoData])
  //console.log(toDoData)
  
  return (
    <>
      {/* Conditional Rendering */}
      {openModel && <AddToTask updateModel={(flag) => setOpenModel(flag)} todosData={(data) => storeData(data)} isUpdate={isUpdate} filterData={dataToSet} updateData={(data)=>handleUpdateData(data)}/>}
      <div className="App">
      <h1 class="heading">TODO LIST</h1>
      <div class="button-div" style={{display:'flex'}}>
        <button class="add-task-btn" onClick={() => firstClick()}>Add Task</button>
        <select class="category" onChange={(e) => dataToDisplay(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incompleted">Incompleted</option>
        </select>
        </div>
        <div class="content-div" style={{display: 'flex'}}>
          {filterData.map((value, i) => (
            <div class="content">
              <span>{value.title}</span>
              <span>{value.status}</span>
              <div class='icon-div'>
                <div class='delete-div'><img src={deleteLogo} alt='image' width='20px' height='20px' onClick={() => handelDelete(i)}/></div>
                <div class='edit-div'><img src={editLogo} alt='image' width='20px' height='20px' onClick={()=> handelEdit(i)}/></div>
              </div>
              {/* <button onClick={()=> handelEdit(i)}>Edit</button>
              <button onClick={() => handelDelete(i)}>Delete</button> */}
            </div>
          ))}
        </div>
    </div>
    </>
    
  );
}

export default App;
