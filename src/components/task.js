import React ,{Component} from "react";
import { Button } from "@material-ui/core";

export class Task extends Component {
  
    constructor(props) {
  
      super(props)
      this.state = {
        tasks: [],
      }
    }
    
  async componentDidMount() {
    
    this.setState({ isLoading: true })
    const response = await fetch("http://127.0.0.1:8000/api/task-record/?format=json")
    
    if (response.ok) {
      
      const tasks = await response.json()
      this.setState({ tasks, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

  delete(title)
  {
    console.log("updating")
    fetch('http://127.0.0.1:8000/api/task-delete/',{
      method:'POST',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      
        body:JSON.stringify({
          "title" : title
          ,
        }
         ),
         headers:{
        
          "Content-Type":'application/json',
          "Accept":'application/json'
        }
      
    })
  }

  render() {
    const { tasks, isLoading, isError } = this.state;
  
  
    if (isLoading) {
      return <div>Loading...</div>
    }
  
    if (isError) {
      return <div>Error</div>
    }
  
    return tasks.length > 0
      ?(
        
        <table id="customers">
          <tr>
            <th>Title</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Developer</th>
            <th>Project</th>
            {/* <th>Completed</th> */}
            <th>Status</th>
            <th>Operations</th>
          </tr>  
          <tbody>
          {tasks.map(task=>
          
        <tr key ={task.id}>
          {console.log(task.completed)}
          <td>{task.title}</td>
          <td>{task.start_date}</td>
          <td>{task.end_date}</td>
          <td>{task.developer}</td>
          {<td>{task.project}</td>}
          {/* {<td>{task.completed}</td>} */}
          {<td>{task.status}</td>}
          {<td><Button onClick={()=>this.delete(task.title)}  
                      >Delete</Button></td>}             
              </tr> 
        )}
        </tbody>
        </table>
      ) : (
        <div>
          No tasks.
      </div>
  
      )
  
          }
  }
  