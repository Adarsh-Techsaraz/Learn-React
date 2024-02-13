import { useEffect, useState } from 'react';
const AddToTask = ({updateModel,todosData,isUpdate,filterData,updateData}) => {
  const [title, setTitle] = useState(isUpdate ? filterData.title : '');
  const [status, setStatus] = useState(isUpdate ? filterData.status : 'Incomplete');

  const handleUpdate = (e) => {
    if (title === "" || status === ""){
      alert("Title or Status can't be empty")
    }else{
          updateData({id:filterData.id, title, status})
    }
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
console.log(filterData)
console.log({isUpdate})
  },[])
    return (
        <>
            <div class="modal_wrapper__PM20x" style={{opacity: 1}}>
  <div class="modal_container__A++T7" style={{opacity: 1, transform: "scale(1)"}}>
            <div class="modal_closeButton__Fg7AM" role="button" tabindex="0" style={{ top: "-10px", opacity: 1 }} onClick={() => updateModel(false)}>
      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" d="M0 0h24v24H0V0z"></path>
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
      </svg>
    </div>
      <h1 class="modal_formTitle__dyssK">Add TODO</h1>
      <label for="title">Title <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
              <label for="type">Status <select id="type" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Completed</option>
        </select>
      </label>
      <div class="modal_buttonContainer__r9NWb">
        {!isUpdate && <button type="button" class="button_button__zbfSX button_button--primary__09xDJ" onClick={(e) => handleFormSubmit(e)}>Add Task</button>}
        {isUpdate && <button type="button" class="button_button__zbfSX button_button--primary__09xDJ" onClick={(e) => handleUpdate(e)}>Update Task</button>}
                <button type="button" class="button_button__zbfSX button_button--secondary__mWkmM" onClick={() => updateModel(false)}>Cancel</button>
      </div>
  </div>
</div>
        </>
    )
}
export default AddToTask