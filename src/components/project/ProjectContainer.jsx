import React, { useState } from "react";
import Column from "./Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import AddSimpleIcon from '../../assets/icons/AddSimpleIcon';

function areEqueal(prevProps,nextPros){
  return prevProps.tasks && prevProps.columns && prevProps.columnOrder && prevProps.tasks === nextPros.tasks && prevProps.columns === nextPros.columns && prevProps.columnOrder === nextPros.columnOrder;
}

const ProjectContainer =React.memo(({columnItemList,ItemList,handleMenuClick,handleSetAddType,columnOrder,setColumnOrder,columns,setColumns,tasks,setTasks,handleAddTask,handleDeleteTask,handleDeleteColumn}) => {

  const onDragEnd = (result) => {
    console.log('on drag end',result);
    const { source, destination, draggableId, type } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "column") {

      const newColumnOrder = [...columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      console.log(newColumnOrder);
      setColumnOrder(newColumnOrder);
      return;
    }

    // const newColumns = columns;
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    if (start === end) {
      const newTaskIds = [...start.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newColumns = {
        ...columns,
        [newColumn.id]: newColumn,
      };

      setColumns(newColumns);

      return;
    }

    // moving task from one column to another

    const startTaskIds = [...start.taskIds];
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const endTaskIds = [...end.taskIds];
    endTaskIds.splice(destination.index, 0, draggableId);
    const newEnd = {
      ...end,
      taskIds: endTaskIds,
    };
    const newColumns = {
      ...columns,
      [newStart.id]: newStart,
      [newEnd.id]: newEnd,
    };

    setColumns(newColumns);
  };

  const onDragStart = (result) => {};

  

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}  >
      <Droppable droppableId="all-columns" type="column" direction="horizontal">
        {(provided, snapshot) => (
          <div
            className={`flex overflow-x-auto h-[calc(100vh_-_118px)] w-full overflow-y-none ${snapshot.isDraggingOver ? '': 'bg-transparent'}`}
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {columns && columnOrder?.map((columnId, index) => {
              const column = columns[columnId];
              const columnTasks = column?.taskIds?.map((taskId) => tasks[taskId]);
              
              return (
                <Column
                  key={columnId}
                  tasks={columnTasks}
                  column={column}
                  index={index}
                  setColumnOrder={setColumnOrder}
                  setColumns={setColumns}
                  setTasks={setTasks}
                  handleAddTask={handleAddTask}
                  handleDeleteTask={handleDeleteTask}
                  handleDeleteColumn={handleDeleteColumn}
                  handleSetAddType={handleSetAddType}
                  ItemList={ItemList}
                  handleMenuClick={handleMenuClick}
                  columnItemList={columnItemList}
                />
              );
            })}
           <div className={`mr-8 pt-1 ${snapshot.isDraggingOver ? "hidden" : ""}`}>
            <button onClick={() => handleSetAddType({type:"column"})} className=" w-72 flex justify-center   border-[1px] py-1 bg-transparent border-stone-400 rounded">
              <span className="font-semibold" >Add Section</span>
            </button>
  
        </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
},areEqueal);

export default ProjectContainer;
