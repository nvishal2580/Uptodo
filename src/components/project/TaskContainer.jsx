import React, { useState } from "react";



function TaskContainer({ task, handleDeleteTask, columnId }) {
 

  return (
    <div className="h-10">
        {task.text}
    </div>
  );
}

export default TaskContainer;
