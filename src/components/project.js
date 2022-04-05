import React ,{Component} from "react";
import { Button } from "@material-ui/core";

export class Project extends Component {
  
    constructor(props) {
  
      super(props)
      this.state = {
        projects: [],
      }
    }
    
  async componentDidMount() {
    
    this.setState({ isLoading: true })
    const response = await fetch("http://127.0.0.1:8000/api/project-log/?format=json")
    
    if (response.ok) {
      
      const projects = await response.json()
      this.setState({ projects, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

  delete(name)
{
  console.log("updating")
  fetch('http://127.0.0.1:8000/api/project-delete/',{
    method:'POST',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    
      body:JSON.stringify({
        "name" : name
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
    const { projects, isLoading, isError } = this.state;
  
  
    if (isLoading) {
      return <div>Loading...</div>
    }
  
    if (isError) {
      return <div>Error</div>
    }
  
    return projects.length > 0
      ?(
        
        <table class="table table-striped">
          <tr>
            <th>Name</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Billable</th>
            <th>Technology</th>
            <th>project manager</th>
            <th>Operations</th>
          </tr>  
          <tbody>
          {projects.map(project=>
        <tr key ={project.id}>
          <td>{project.name}</td>
          <td>{project.start_date}</td>
          <td>{project.end_date}</td>
          <td>{project.billable}</td>
          {<td>{project.technology}</td>}
          {<td>{project.project_manager}</td>}
          {<td><Button onClick={()=>this.delete(project.name)}  
                      >Delete</Button></td>}
                        
              </tr> 
        )}
        </tbody>
        </table>
      ) : (
        <div>
          No projects.
      </div>
  
      )
  
          }
  }
  