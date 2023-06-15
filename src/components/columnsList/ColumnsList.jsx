import React, { useEffect, useState } from 'react'
import './index.css'
import Column from '../column/Column'


const ColumnsList = ({ data, actions }) => {

  const [todo, setTodo] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    setTodo(data.data.filter(element =>
      element.completed === false
    ))
    setDone(data.data.filter(element =>
      element.completed === true
    ))
  }, [data])

  return (
    <div className='ColumnsList'>

      <div className='ColumnsList__column'>
        {data.isLoading ?
          <p>Loading...</p>
          :
          <Column
            columnName={"Todo"}
            icon={"fi fi-rr-circle-xmark"}
            dataColumn={todo}
            actions={actions} />
        }
      </div>

      <div className='ColumnsList__column'>
        {data.isLoading ?
          <p>Loading...</p>
          :
          <Column
            icon={"fi fi-rr-checkbox"}
            columnName={"Done"}
            dataColumn={done}
            actions={actions} />
        }

      </div>
      <div className='ColumnsList__column'>
        {data.isLoading ?
          <p>Loading...</p>
          :
          <Column
            columnName={"All todos"}
            icon={"fi fi-rr-columns-3"}
            dataColumn={data.data}
            actions={actions} />
        }

      </div>
    </div>
  )
}

export default ColumnsList