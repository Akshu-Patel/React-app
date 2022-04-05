import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
//import Radio from '@material-ui/core/Radio';
//import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import FormControl from '@material-ui/core/FormControl';
//import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import * as yup from "yup";
import { useFormik} from "formik";



const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const validationSchema = yup.object({
    username: yup.string().min(3, "Please enter your real name").required("FullName is required"),
    email: yup.string().email("Please enter a valid email address").required(),
    password: yup.string().matches(PASSWORD_REGEX, "Please enter a strong password").required(),
    confirmpassword: yup.string().when("password",{
      is:val =>(val && val.length > 0 ? true: false),
      then: yup.string().oneOf([yup.ref("password")],"Password does not match"),
    user_type: yup.string().min(3, "Please enter your position").required("Usertype is required")
    }),
  });
  

//const Signup = () => {
function Signup({handleChange}){
  
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    //const marginTop = { marginTop: 5 }
    
    
    const onSubmit = async (values) =>{
   
        console.log(values.username)
      
        let result = fetch("http://127.0.0.1:8000/api/enroll-register/",{
          method:'POST',
          body:JSON.stringify({
            "username" : values.username,
            "email" : values.email,
            "password" : values.password,
            "confirm_password" : values.confirmpassword, 
            "user_type" : values.usertype
          }
           ),
          headers:{
            "Content-Type":'application/json',
            "Accept":'application/json'
          }
      })
      console.warn("result",result)
      }
      

    const formik = useFormik({
        initialValues: { 
          username:"" , 
          email:"",
          password:"",
          confirmpassword:"",
          usertype:""
        },
      validateOnBlur: true,
      onSubmit,
      validationSchema: validationSchema,
      
      })
      
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form onSubmit={formik.handleSubmit}>
                
                    <TextField fullWidth 
                    type="text"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}  
                    onBlur={formik.handleBlur}
                    placeholder="Username" />
                    {/* <FieldError>{formik.touched.username && formik.errors.username ? formik.errors.username: ""}</FieldError> */}

                    <TextField fullWidth
                    type="text"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}  
                    onBlur={formik.handleBlur}
                    placeholder="Email" />
                    {/* <FieldError>{formik.touched.email && formik.errors.email ? formik.errors.email: ""}</FieldError> */}
                  
                    <TextField fullWidth
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}  
                    onBlur={formik.handleBlur}
                    placeholder="Password"/>
                    <i class="bi bi-eye-slash" 
                    id="togglePassword"></i>                
                                 
                    {/* <FieldError>{formik.touched.password && formik.errors.password ? formik.errors.password: ""}</FieldError> */}

                    <TextField fullWidth
                    type="password"
                    name="confirmpassword"
                    value={formik.values.confirmpassword}
                    onChange={formik.handleChange}  
                    onBlur={formik.handleBlur}
                    placeholder="Confirm Password" />
                    {/* <FieldError>{formik.touched.confirmpassword && formik.errors.confirmpassword ? formik.errors.confirmpassword: ""}</FieldError> */}
                    
                    <TextField fullWidth
                    type="text"
                    name="usertype"
                    value={formik.values.usertype}
                    onChange={formik.handleChange}  
                    onBlur={formik.handleBlur}
                    placeholder="Usertype" />
                    {/* <FieldError>{formik.touched.usertype && formik.errors.usertype ? formik.errors.usertype: ""}</FieldError> */}

                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                    />

                    <Button type='submit' variant='contained' color='primary' onClick={()=>handleChange("event",1)}>Sign up</Button>
                </form>
                
            </Paper>
        </Grid>
    )
}

export default Signup;