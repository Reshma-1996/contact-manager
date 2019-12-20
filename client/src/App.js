import React from 'react'
import {BrowserRouter,Route,Link, Switch} from 'react-router-dom'
import axios from './config/axios'
//import axios from 'axios'
// import "./css/bootstrap.css"

import Home from "./components/Home"
import Register from "./components/users/register"
import Login from "./components/users/login"

import ContactList from "./components/contacts/List"
import ContactForm from "./components/contacts/Form"
import ContactNew from './components/contacts/New'
import ContactShow from "./components/contacts/show"
import ContactEdit from "./components/contacts/Edit"


function App(){
     const handleClick = () => {
        axios.delete('/users/logout',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            localStorage.removeItem('authToken' )
            window.location.reload()
            window.location.href = "/"
         })
         .catch(err=>{
             alert(err)
         })
    }

    return(
        <BrowserRouter>
            <div>
                <h2>contact manager</h2>

                <ul>
                    
                    <li><Link to="/">Home</Link></li>
                    {localStorage.getItem('authToken')?
                        (
                            <div>
                                <li><Link to="/contacts">contacts</Link></li>
                                <li><Link to= "#" onClick={handleClick}>Logout</Link></li>
                            </div>
                        ):(
                            <div>
                                <li><Link to="/users/register">Register</Link></li>
                                <li><Link to="/users/login">Login</Link></li>
                            </div>
                        )
                    }

                </ul>
                <Switch>
                    <Route exact path="/" component={Home}/>

                    <Route path="/users/register" component={Register} exact={true}/>
                    <Route path="/users/login" component={Login} exact={true}/>
                    <Route path="/contacts" component={ContactList} exact={true}/>
                    <Route path="/contacts/new" component={ContactNew}/>
                    {/* <Route path="/contacts/new" component={ContactNew} exact={true}/> */}
                    <Route path="/contacts/edit/:id" component={ContactEdit} exact={true}/>
                    <Route path="/contacts/:id" component={ContactShow} exact={true}/>
                   




                </Switch>

            </div>
        </BrowserRouter>
    )
            }
            
        
export default App