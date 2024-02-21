import { useEffect, useState } from 'react';
import crossLogo from './image/close-icon.png';
const AddToTask = ({updateModel,todosData,isUpdate,filterData,updateData}) => {
  const [title, setTitle] = useState(isUpdate ? filterData.title : '');
  const [status, setStatus] = useState(isUpdate ? filterData.status : 'Incompleted');

  const handleUpdate = (e) => {
    if (title === "" || status === ""){
      alert("Title or Status can't be empty")
    }else{
          updateData({id:filterData.id, title, status})
    }
    updateModel(false)
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation()
    if (title === '' || status === '') {
      alert('All fields are required !!!');
    } else {
      todosData({
        title,status
      })
      updateModel(false);
    }
  }
  useEffect(() => {
//console.log(status,title)
//console.log(filterData)
//console.log({isUpdate})
  },[])
    return (
      <>
          <div class="modal_wrapper">
            <div class="modal_container">
              <div class="modal_closeButton-div">
                <div class="modal_closeButton" onClick={() => updateModel(false)}>
                <img src={crossLogo} alt='image' width='20px' height='20px'/>
                </div>
              </div>
              <h1 class="modal_Title">Add ToDo</h1>
              <div class='modal-content'>
              <label class='lable' for="title">Title</label>
              <input class='lables' type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
              <label class='lable' for="type">Status</label>
              <select class='lables' id="type" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Incompleted">Incompleted</option>
                  <option value="Completed">Completed</option>
                </select>
              <div class="modal_buttonContainer">
                {!isUpdate && <button type="button" class="button_add" onClick={(e) => handleFormSubmit(e)}>Add Task</button>}
                {isUpdate && <button type="button" class="button_add" onClick={(e) => handleUpdate(e)}>Update Task</button>}
                <button type="button" class="button_cancle" onClick={() => updateModel(false)}>Cancel</button>
              </div>
              </div>
            </div>
          </div>
        </>
    )
}
export default AddToTask