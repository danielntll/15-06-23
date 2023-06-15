import React from 'react'
import './index.css'
import DbTodo from '../dbTodo'

export const Column = ({ columnName, icon, dataColumn, actions }) => {

  return (
    <div className='Column'>
      <div className='Column__header'>
        <i className={"display-flex " + icon}></i>
        <p>

          {columnName}
        </p>
      </div>
      <div className='Column__body'>
        {dataColumn.map((todo, index) => {
          return <DbTodo key={columnName + index} data={todo}
            handleCompleteTodo={(id) => actions.complete(id)}
            handleUndoTodo={(id) => actions.undo(id)}
            handleDeleteTodo={(id) => actions.delete(id)} />
        })}
      </div>
    </div>
  )
}
export default Column;