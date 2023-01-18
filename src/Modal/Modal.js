import React, { useState, useEffect } from 'react'
import "../Modal/Modal.css"
import { NavLink } from "react-router-dom"
import ReactPlayer from 'react-player'
import { putData } from "../apicalls"

const Modal = ({ task, toggleModal }) => {

  const getDate = new Date()
  let day = getDate.getDate()
  let month = ("0" + (getDate.getMonth() + 1)).slice(-2)
  let year = getDate.getFullYear()
  let currentDate = `${year}-${month}-${day}`

  const [contentDataModal, setContentModal] = useState(task.content)
  const [columnDataModal, setColumnModal] = useState(task.destination.droppableId)
  const [dateDataModal, setDateModal] = useState(currentDate)

  // const clearInputs = () => {
  //   setContent("")
  //   setColumn("column-1")
  //   setDate(currentDate)
  // }

  const submitTodo = event => {
    event.preventDefault()
    console.log("MADE IT TO SUBMIT TODO")
    const newTodo = {
      id: task.id,
      content: contentDataModal || "No title",
      date: dateDataModal,
      status: columnDataModal,
      destination: { droppableId: columnDataModal, index: 25 }
    }
    console.log("MODAL PUT", newTodo)
    putData(newTodo, `http://localhost:3001/todos/${task.id}`).then((response) => console.log(response))
    // clearInputs()
    window.location.reload(true)
  }

  return (
    <form>
      <div className="modal">
        <NavLink to="/todos">
          <div className='overlay' onClick={toggleModal}> </div>
        </NavLink>
        <div className='modal-container'>
          {/* <p>Title: {task.content}</p>
          <p>Date: {task.date}</p> */}
          <input
            className="contentInput-Modal "
            // placeholder="Make a todo..."
            type="text"
            // name="content"
            value={contentDataModal}
            onChange={event => setContentModal(event.target.value)}
          ></input>

          <input
            className="dateInput-Modal"
            type="date"
            // name="date"
            value={dateDataModal}
            onChange={event => setDateModal(event.target.value)}
            min={currentDate}
            data-date-format="YYYY-MMMM-DD"
          ></input>

          <select
            className="columnInput-Modal "
            name="column"
            id="column"
            value={columnDataModal}
            onChange={event => setColumnModal(event.target.value)}
          >
            <option value="column-1">Backlog</option>
            <option value="column-2">On deck</option>
            <option value="column-3">In progress</option>
            <option value="column-4">Done</option>
          </select>

          <button
            className="addButton-Modal"
            onClick={event => submitTodo(event)}
          >Add</button>

          <NavLink to="/todos">
            <button
              className='close-modal'
              onClick={toggleModal}>
              Close
            </button>
          </NavLink>
        </div>
      </div>
    </form>
  )
}

export default Modal