import React ,{Component} from "react";
import { Button } from "@material-ui/core";

export class Bug extends Component {
  
    constructor(props) {
  
      super(props)
      this.state = {
        bugs: [],
      }
    }
    
  async componentDidMount() {
    
    this.setState({ isLoading: true })
    const response = await fetch("http://127.0.0.1:8000/api/bug-record/?format=json")
    
    if (response.ok) {
      
      const bugs = await response.json()
      this.setState({ bugs, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

  delete(head)
  {
    console.log("updating")
    fetch('http://127.0.0.1:8000/api/bug-delete/',{
      method:'POST',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      
        body:JSON.stringify({
          "head" : head
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
    const { bugs, isLoading, isError } = this.state;
  
  
    if (isLoading) {
      return <div>Loading...</div>
    }
  
    if (isError) {
      return <div>Error</div>
    }
  
    return bugs.length > 0
      ?(
        
        <table id="customers">
          <tr>
            <th>ID</th>
            <th>Head</th>
            {/* <th>Resolved</th> */}
            <th>Tester</th>
            <th>Task</th>
            <th>Operations</th>
          </tr>  
          <tbody>
          {bugs.map(bug=>
        <tr key ={bug.id}>
          <td>{bug.id}</td>
          <td>{bug.head}</td>
          {/* <td>{bug.resolved}</td> */}
          <td>{bug.tester}</td>
          {<td>{bug.task}</td>}
          {<td><Button onClick={()=>this.delete(bug.head)}  
                      >Delete</Button></td>}
          </tr> 
        )}
        </tbody>
        </table>
      ) : (
        <div>
          No bugs.
      </div>
  
      )
  
          }
  }