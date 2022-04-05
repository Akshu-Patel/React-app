import React ,{Component} from "react";
//import { IconButton } from "@material-ui/core";
import { Button } from "@material-ui/core";
// import Table from '@mui/material/Table';
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from '@mui/material/TableHead';
//import { Link } from "react-router-dom";
//import { Modal, Row,Col,Form, InputGroup,Button} from 'react-bootstrap';  
//import { useState} from 'react';
//import { Button, ButtonGroup, ButtonToolBar } from "react-bootstrap";
//import {Update} from "./update";
// import { render } from "@testing-library/react";
// import { ButtonToolbar, Table } from 'react-bootstrap';
 

export class View extends Component {
  
  constructor(props) {

    super(props)
    this.state = {
      users: [],
      updateModalShow:false
  
    }
  }
  
async componentDidMount() {
  
  this.setState({ isLoading: true })

  const response = await fetch("http://127.0.0.1:8000/api/enroll-list/?format=json")
  
  if (response.ok) {
    
    const users = await response.json()
    this.setState({ users, isLoading: false })
  } else {
    this.setState({ isError: true, isLoading: false })
  }
}


delete(username)
{
  console.log("updating")
  fetch('http://127.0.0.1:8000/api/enroll-delete/',{
    method:'POST',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    
      body:JSON.stringify({
        "username" : username
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
  const { users, isLoading, isError } = this.state;


  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return users.length > 0
    ?(
      
      <table id="customers">
            

        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Password</th>
          {/* <th>ConfirmPassword</th> */}
          <th>Designation</th>
          <th>Operations</th>
        </tr>  
        <tbody>
        {users.map(user=>
      <tr key ={user.id}>
        <td>{user.id}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
        <td>{user.user_type}</td>
        {/* <td>{user.confirmpassword}</td> */}
        <td>
          {/* <Link to={"update/"+user.username}>
                  <Button> Edit</Button>
                  </Link>/ */}
                  {/* <Button>Edit</Button>/ */}
<Button onClick={()=>this.delete(user.username)}  
                      >Delete</Button>
                      {/* <Button onClick={()=>replaceModalItem(user.id)}  
                      >edit</Button> */}
                    </td>
                      
            </tr> 
      )}
      </tbody>
      
      </table>
    ) : (
      <div>
        No users.
    </div>

    )

        }
}


//  componentDidMount(){
//   this.refreshList();
// }

// refreshList(){
  
//    fetch("http://127.0.0.1:8000/api/enroll-list/?format=json")
//   .then(response=>response.json())
//   .then(data =>{
//     this.setState({users:data});
//   }
//   );
// }
// render(){
//   const{users , uid, uname, uemail, upassword}=this.state;
//   let updateModalShow =() =>this.setState({updateModalShow:false});

//   return(
//     <div>
//     <Table className="mt-4" striped bordered hover size="sm">
//         <thead>
//         <tr>
//           <th>ID</th>
//           <th>Username</th>
//           <th>Email</th>
//           <th>Password</th>
//           {/* <th>ConfirmPassword</th> */}
//           <th>Operations</th>
//         </tr>
//         </thead >  
//         <tbody>
//         {users.map(user=>
//       <tr key ={user.id}>
//         <td>{user.id}</td>
//         <td>{user.username}</td>
//         <td>{user.email}</td>
//         <td>{user.password}</td>
//         <td><Button onClick={()=>this.delete(user.username)}>Delete</Button>/
//         <Button>Edit</Button></td>
//         <td>
//           <ButtonToolbar>
//   <Button
//     variant='primary'
//     onClick={()=>this.setState({updateModalShow:true,uid:user.userid,uname:user.username,uemail:user.email,uname:user.passowrd})}>
//   </Button>
//   <Update>
//     show = {this.state.updateModalShow}
//     onHide=  {updateModalShow}
//     uid = {uid}
//     uname = {uname}
//     uemail = {uemail}
//     upassword = {upassword}
//   </Update>
// </ButtonToolbar>
// </td>

// </tr>
//         )}
//       </tbody>
//       </Table>
//       </div>
      
//   )
//         }
//       }
