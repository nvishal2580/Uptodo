import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import AddSimpleIcon from "../../assets/icons/AddSimpleIcon";
import DropdownMenu from "../common/DropdownMenu";
import Task from "./Task";


const Column =({
  tasks,
  column,
  index,
  handleAddTask,
  handleDeleteTask,
  handleDeleteColumn,
  handleSetAddType,
  ItemList,
  columnItemList,
  handleMenuClick,
  setShowTask
}) => {


  return (
    <React.Fragment>
      {column && <Draggable draggableId={column.id} key={column.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`px-2 py-3 w-72 mx-2 border-[1px] hover:shadow-md hover:transition-all hover:duration-700 hover:border-stone-400 flex flex-col flex-grow-0 flex-shrink-0 rounded flex-basis-auto bg-transparent ml-2  ${snapshot.isDragging ? 'border-slate-300' : 'none'}`}
          isDragging={snapshot.isDragging}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          
        <div className={`mb-2 flex`}>
          <div className={`grow pl-3 font-semibold overflow-hidden `} {...provided.dragHandleProps} >
          {column.title}
          </div>
          <div>
            <DropdownMenu ItemList={columnItemList} columnId={column.id} handleSubmit={handleMenuClick} />
          </div>
        </div>
        <div className="has-tooltip relative">
            <button onClick={() => handleSetAddType({type:"task",col:column.id})} className=" w-full flex justify-center   border-[1px] py-1 bg-[#d0e8ec] rounded">
              <span>{<AddSimpleIcon strokeWidth={1} className="text-[#238599]" />}
              </span></button>
              <span className="tooltip top-2 text-slate-600 text-xs right-10" >Add Task</span>
        </div>
          
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div
                className={`pt-2 flex-grow-1 min-h-[500px] hover:overflow-y-auto ${snapshot.isDraggingOver ? 'bg-slate-200' : 'overflow-hidden bg-transparent'}`}
                isDraggingOver={snapshot.isDraggingOver}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks?.map((task, index) => (
                  task && <Task
                    key={task && task.id}
                    task={task}
                    index={index}
                    handleDeleteTask={handleDeleteTask}
                    columnId={column.id}
                    ItemList={ItemList}
                    handleMenuClick={handleMenuClick}
                    setShowTask={setShowTask}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>}
    </React.Fragment>
  );
};

export default Column;
