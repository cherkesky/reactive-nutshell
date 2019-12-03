import React, {Component} from 'react'
import ApiManager from '../../modules/ApiManager.js'
import TasksCard from './TasksCard'

const loggedInUser=1

class TaskList extends Component {
  state={
    tasks: []
  }

  // toggling the isCompleted value based on if the checkbox is checked or not
    handleCheckbox = (id) => {
      // {isComplete: !this.state.tasks[id].isComplete})
       console.log("taskId", this.state.tasks[id].id, this.state.tasks[id].isComplete)
       const editedObj = {
        id: this.state.tasks[id].id,
        userId: this.state.tasks[id].userId,
        task: this.state.tasks[id].task,
        // expectedCompletionDate: this.state.task[id].expectedCompletionDate,
        isComplete: !this.state.tasks[id].isComplete
       }
       console.log (editedObj)
      ApiManager.update("tasks", editedObj)

  }


// Fetching the data from the Json file and setting it as state
componentDidMount() {
  ApiManager.getAll("tasks", `_sort=expectedCompletionDate&_order=asc&userId=${loggedInUser}`)
  .then ((tasksArr)=>{
    this.setState(
      {
        tasks: tasksArr
      }
    )
  })
}

// Rendering the data from state
render(){
  return(
    <>
    {
      this.state.tasks.map(task=>
        <TasksCard 
        key={task.id} 
        task={task} 
        handleCheckbox={this.handleCheckbox}
        />
        )
    }
    </>
  ) 
}
}

export default TaskList