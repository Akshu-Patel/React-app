import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import * as yup from "yup";
import { useFormik} from "formik";
import { useNavigate } from "react-router-dom";


const validationSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
    });
    

function Login({props}) {
  let navigate = useNavigate();
    
    
    const paperStyle={padding :20,height:'73vh',width:300, margin:"0 auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    const onSubmit = async(values) =>{
        console.log(values.user_type)
        let path = ""
        await fetch("http://127.0.0.1:8000/api/enroll-login",{
                      method:'POST',
                      body:JSON.stringify({
                        "email" : values.email,
                        "password" : values.password,
                        "user_type" : values.user_type
                      }
                      ),
                      headers:{
                        "Content-Type":'application/json',
                        "Accept":'application/json'
                      }
                    }).then((response) => response.text()).then((data)=>{
                      if(data === 'developer'){
                        path=`/components/task`
                      }else if(data === 'admin'){
                        path=`/components/table`
                      }else if(data === 'project manager'){
                        path=`/components/project`
                      }else if(data === 'tester'){
                        path=`/components/bug`
                      }
                      navigate(path);
                    })
    
    }
      const formik = useFormik({
        initialValues: { email:"",password:"",user_type:""},
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
      });

      
    
    return(
        <Grid>
            <Paper  style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <form onSubmit={formik.handleSubmit}>
                <TextField fullWidth
                    type="text"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}  
                    onBlur={formik.handleBlur}
                    placeholder="Email" />
                    
                    <TextField fullWidth
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}  
                    onBlur={formik.handleBlur}
                    placeholder="Password" />

                    <TextField fullWidth
                    type="text"
                    name="user_type"
                    value={formik.values.user_type}
                    onChange={formik.handleChange}  
                    onBlur={formik.handleBlur}
                    placeholder="Usertype" />

                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth 
                onClick={onsubmit}
                >
                  Sign in</Button>
                </form>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="#" onClick={()=>props("event",1)} >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}


export default Login