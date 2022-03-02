import React, { useState } from "react";
import data from "./InitialData";
import Column from "./Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";


function App() {
  const [tasks, setTasks] = useState(data.tasks);
  const [columns, setColumns] = useState(data.colums);
  const [columnOrder, setColumnOrder] = useState(data.columnOrder);
  const [loading, setLoading] = useState(false);

  const handleAddTask = (columnId, text) => {
    console.log(columnId, text);
    setLoading(true);
    const Id = uuidv4().toString();
    const newTask = {
      id: Id,
      text: text,
      subtext: "",
    };
    const newTaskList = {
      ...tasks,
      [Id]: newTask,
    };

    let col = columns[columnId];
    let newTaskIds = [...col.taskIds, Id];
    col = { ...col, taskIds: newTaskIds };
    console.log(col);

    let newColumns = { ...columns };
    newColumns = { ...newColumns, [columnId]: col };

    console.log(newTaskList);
    console.log(newColumns);

    setTasks(newTaskList);
    setColumns(newColumns);

    // console.log(newTaskList);
    // console.log(newColumns);
    setLoading(false);
  };

  const handleDeleteColumn = (columnId) => {
    const col = columns[columnId];
    const taskIds = col.taskIds;
    let newTasks = { ...tasks };
    taskIds.forEach((taskId) => {
      delete newTasks[taskId];
    });
    let newColumns = { ...columns };
    delete newColumns[columnId];
    const newColumnOrder = columnOrder.filter((colId) => colId !== columnId);
    setTasks(newTasks);
    setColumns(newColumns);
    setColumnOrder(newColumnOrder);
  };

  const handleDeleteTask = (taskId, columnId) => {
    console.log(columnId, taskId);

    let newTasks = { ...tasks };
    delete newTasks[taskId];
    const newTaskIds = columns[columnId].taskIds.filter((id) => id !== taskId);
    const newColumn = columns;
    newColumn[columnId].taskIds = newTaskIds;
    const newColumnOrder = [...columnOrder];
    setColumns(newColumn);
    setTasks(newTasks);
    setColumnOrder(newColumnOrder);
    console.log(newTasks);
    console.log(newColumn);
  };

  console.log("index.js rendered");

  const handleAddColumn = (title) => {
    setLoading(true);
    const Id = uuidv4().toString();
    const newColumn = {
      id: Id,
      title: title,
      taskIds: [],
    };

    const newColumns = {
      ...columns,
      [Id]: newColumn,
    };
    const newColumnOrder = [...columnOrder, Id];
    setColumns(newColumns);
    setColumnOrder(newColumnOrder);

    console.log(newColumnOrder);
    console.log(newColumns);

    setLoading(false);
  };

  const onDragEnd = (result) => {
    // console.log(result);
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
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" type="column" direction="horizontal">
        {(provided, snapshot) => (
          <div
            className={`flex overflow-x-scroll h-[calc(100vh_-_118px)] w-full overflow-y-hidden ${snapshot.isDraggingOver ? 'bg-pink-400': 'bg-white'}`}
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {columnOrder.map((columnId, index) => {
              const column = columns[columnId];
              const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);
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
                />
              );
            })}
            
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
