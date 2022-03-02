import React, { useState } from "react";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import DotsHorizontal from '../../assets/icons/DotsHorizontal';
import { v4 as uuidv4 } from "uuid";


const Column = React.memo( ({
  tasks,
  column,
  index,
  handleAddTask,
  handleDeleteTask,
  handleDeleteColumn,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  console.log("column rerendered");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Draggable draggableId={column.id} key={column.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`px-2 py-3 w-72 flex flex-col flex-grow-0 flex-shrink-0 flex-basis-auto bg-white border-2 ${snapshot.isDragging ? 'border-red-500' : 'none'}`}
          isDragging={snapshot.isDragging}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          
        <div 
            className={`mb-2 flex`}
            
        
        >
          <div className={`grow pl-3`} {...provided.dragHandleProps} >
          {column.title}
          </div>
          <span className="bg-yellow-300 mr-3">
            <button>
            <DotsHorizontal />
            </button>
          </span>
        </div>
          
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div
                className={`pt-2 flex-grow-1 min-h-full  hover:overflow-y-auto ${snapshot.isDraggingOver ? 'bg-sky-400' : 'bg-white'}`}
                isDraggingOver={snapshot.isDraggingOver}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    handleDeleteTask={handleDeleteTask}
                    columnId={column.id}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
});

export default Column;
