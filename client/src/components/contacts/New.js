import React from 'react'
import ContactForm from './Form'
import axios from '../../config/axios'

class ContactNew extends React.Component{
constructor(){
    super()
    // this.handleSubmit=this.handleSubmit.bind(this)
}

    handleSubmit=(formData)=>{
    axios.post('/contacts',formData,{
    headers:{
        'x-auth':localStorage.getItem('authToken')
    }
})
    .then(response=>{
        if(response.data.hasOwnProperty('errors')){
            alert(response.data.message)
        }else{
            this.props.history.push('/contacts')
        }
        })
        .catch(err=>{
            alert(err)
        })
    }


    render(){
        return(
            <div>
                <h2>Add Contacts</h2>
                <ContactForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}
export default ContactNew
