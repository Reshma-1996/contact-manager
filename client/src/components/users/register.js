import React from 'react'
import axios from '../../config/axios'

class Register extends React.Component{
    constructor(){
        super()
        this.state={
                username:'',
                email:'',
                mobile:'',
                password:'',
                nameError:'',
                emailError:''
              }
        }
    
        handleChange=(e)=>{
            this.setState({
                [e.target.name]: e.target.value})
            }
   
// handleChange=(e)=>{
//     // const name=e.target.name
//     // const value=e.target.value
// }
    validate=()=>{
         let nameError='' 
         let emailError=''
          if(!this.state.username){
            nameError="name must be atleast 4 characters" }
       
         if(!this.state.email.includes("@")){
             emailError="invalid email"
         }
         if(emailError||nameError){
             this.setState({emailError:emailError,nameError:nameError})
             return false
         }return true

        }
    
    
        handleSubmit=(e)=>{
            e.preventDefault()
        const formData={
            username:this.state.username,
            email:this.state.email,
            mobile:this.state.mobile,
            password:this.state.password
        }
         const isValid=this.validate()
            if(isValid){
                this.setState(formData)
                axios.post('/users/register',formData)
                .then(response=>{
                    console.log(response)
                    this.props.history.push('/users/login')
                    })
                
                .catch(err=>{
                    alert(err)
                })
            }else{
                alert("inavlid form")
            }
    }


    render(){
        return(
            <div>
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Name:
                    <input type="text" placeholder="Enter name" name="username" value={this.state.username} onChange={this.handleChange}/>
                    </label><br></br>
                    <div style={{fontSize:"10", color:'red'}}>{this.state.nameError}</div>
                    <label>Email:
                    <input type="text"placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange}/>
                    </label><br></br>
                    <div style={{fontSize:"10", color:'red'}}>{this.state.emailError}</div>

                    <label>Mobile:
                    <input type="text" placeholder="Enter mobile number" name="mobile" value={this.state.mobile} onChange={this.handleChange}/>
                    </label><br></br>
                    <label>password:
                    <input type="password" placeholder="Enter password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    </label><br></br>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}
export default Register
