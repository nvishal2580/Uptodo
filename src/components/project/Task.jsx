import React from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskContainer from "./TaskContainer";


const Task =React.memo( ({ task, index, handleDeleteTask, columnId }) => {
  console.log("task.js rerendered");
  return (
    <Draggable draggableId={task.id} key={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`border-[1px] border-slate-300 rounded p-2 m-3 hover:shadow ${snapshot.isDragging ? 'bg-green-400 text-white' : 'bg-white text-black'}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <TaskContainer
            task={task}
            handleDeleteTask={handleDeleteTask}
            columnId={columnId}
          />
        </div>
      )}
    </Draggable>
  );
})

export default Task;
