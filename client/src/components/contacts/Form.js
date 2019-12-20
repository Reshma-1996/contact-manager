import React from 'react'

class ContactForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name: props.contact? props.contact.name : '',
            email: props.contact? props.contact.email:'',
            mobile: props.contact? props.contact.mobile:'',
            category:props.contact?props.contact.category:''
        }  
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
handleChange(e){
    this.setState({
        [e.target.name]:e.target.value
    })
}

handleSubmit(e){
        e.preventDefault()
        const formData={
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile,
            category:this.state.category
            }
         console.log(formData)
         this.props.handleSubmit(formData)
    }

render(){
    
    return(
        <div>
            <h1>Add contacts</h1>
            <form>
                <label>Name
                    <input type="text" value={this.state.name} onChange={this.handleChange} name="name"/>
                </label><br/>

                <label>email
                    <input type="text" value={this.state.email} onChange={this.handleChange} name="email"/>  
                </label><br/>

                <label>Mobile
                    <input type="text" value={this.state.mobile} onChange={this.handleChange} name="mobile"/>
                </label><br/>
                <label>Category
                     <input type="text" value={this.state.category} onChange={this.handleChange} name="category"/>
                </label>
                
                <button onClick={this.handleSubmit}>Submit</button>
            </form>
        </div>
    )
}
}
export default ContactForm
