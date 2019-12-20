import React from 'react'
import ContactForm from './Form'
import axios from '../../config/axios'

class ContactEdit extends React.Component{
constructor(){
    super()
    this.state={
        singleContact:{}
    }
    // this.handleSubmit=this.handleSubmit.bind(this)
}
componentDidMount=()=>{
    const id=this.props.match.params.id
    axios.get(`/contacts/${id}`,{
        headers:{
            'x-auth':localStorage.getItem('authToken')
        }
    })
    .then (response=> {
        console.log(response.data)
        const contact=response.data
        this.setState({singleContact:contact})
    })
}

    handleSubmit=(formData)=>{
        const id=this.props.match.params.id
    axios.put(`/contacts/${id}`,formData,{
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
        console.log('b',this.state.singleContact)
        return(
            <div>
                <h2>Edit Contacts</h2>
             {  Object.keys(this.state.singleContact).length!=0 && <ContactForm handleSubmit={this.handleSubmit} contact={this.state.singleContact}/>}
            </div>
        )
    }
}
export default ContactEdit
