import React from 'react';
import axios from '../../config/axios';
import {Link} from 'react-router-dom'

class ContactShow extends React.Component{
    constructor(){
        super()
        this.state={
            contact:{}
        }
    }
    handleRemove=()=>{
        const id=this.props.match.params.id
        const confirmRemove=window.confirm('are you sure?')
        if(confirmRemove){
        axios.delete(`/contacts/${id}`,{
            headers:{
            'x-auth':localStorage.getItem('authToken')
                } 
           }).then (response=> {
              this.props.history.push('/contacts')
               
           })
        }
    }
    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`/contacts/${id}`,{
            headers:{
            'x-auth':localStorage.getItem('authToken')
                } 
           }).then (response=> {
               const contact=response.data
               this.setState({contact})
           })
           .catch(err =>{
               alert(err)
           })
    }
    render(){
        return(
            <div>
                <h2>contact show page</h2>
                <p>
                    {this.state.contact.name},
                    {this.state.contact.mobile},
                    {this.state.contact.email}
                </p>
                <button onClick={this.handleRemove}>delete</button>
                <Link to="/contacts">Back</Link>
            </div>
        )
    }
  
}
export default ContactShow
