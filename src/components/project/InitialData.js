const data = {
  tasks : {
    "task1" : {
      id : "task1",
      title:"This is the first task we have to add new feature in this project. we have to add new feature in this project.",
      priority: "1",
      labels : ['development'],
      deadline: new Date(),
      members:["u1","u2"],
    },
    "task2" : {
      id : "task2",
      title:"task 2",
      priority: "2",
      labels : ['management'],
      deadline: new Date(),
      members:["u1","u2"],
    },
    "task3" : {
      id : "task3",
      title:"task 3",
      priority: "3",
      labels : ['dev'],
      deadline: new Date(),
      members:["u1","u2"],
    },
    "task4" : {
      id : "task4",
      title:"task 4",
      priority: "4",
      labels : ['development'],
      deadline: new Date(),
      members:["u1","u2"],
    },
    "task5" : {
      id : "task5",
      title:"task 5",
      priority: "2",
      labels : ['development'],
      deadline: new Date(),
      members:["u1","u2"],
    },
    
    },
    colums: {
      "column-1": {
        id: "column-1",
        title: "TO DO",
        taskIds: ['task1','task2'
        ],
      },
      "column-2": {
        id: "column-2",
        title: "In Progress",
        taskIds: ['task3','task4'],
      },
      "column-3": {
        id: "column-3",
        title: "Done",
        taskIds: ['task5'],
      },
      "column-4": {
        id: "column-4",
        title: "qa",
        taskIds: [],
      },
      "column-5": {
        id: "column-5",
        title: "Done",
        taskIds: [],
      },
      "column-6": {
        id: "column-6",
        title: "mai dikha",
        taskIds: [],
      },
    },
  
    columnOrder: ["column-1", "column-2", "column-3", "column-4", "column-5","column-6"],
  };
  
const tk = {
  tasks: {
    "task-1": {
      id: "task-1",
      text: "this is task 1",
    },
    "task-2": {
      id: "task-2",
      text: "this is task 2",
    },
    "task-3": {
      id: "task-3",
      text: "this is task 3",
    },
    "task-4": {
      id: "task-4",
      text: "this is task 4",
    },
    "task-5": {
      id: "task-5",
      text: "this is task 5",
    },
    "task-6": {
      id: "task-6",
      text: "this is task 6",
    },
    "task-7": {
      id: "task-7",
      text: "this is task 7",
    },
    "task-8": {
      id: "task-8",
      text: "this is task 8",
    },
    "task-9": {
      id: "task-9",
      text: "this is task 9",
    },
    "task-10": {
      id: "task-10",
      text: "this is task 10",
    },
}
};

export const priority = {
  "1" : {id:"1", name:"Priority 1" , color:"light-blue-600"},
  "2":{id:"2" , name:"Priority 2" ,color:"cyan-600"},
  "3":{id:"3" , name:"Priority 3",color:"purple-600"},
  "4":{id:"4" , name:"Priority 4", color:"deep-purple-600"}
}

export default data;
  