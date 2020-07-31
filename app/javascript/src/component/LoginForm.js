import React from 'react'
import axios from 'axios'

class LoginForm extends React.Component {

  state = {
    username: "",
    password: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    axios.post("/api/v1/login", {
      username: this.state.username,
      password: this.state.password
    })
    .then(response => {
      //set user to state
      //redirect!
      if (response.errors){
        alert(response.errors)
      } else {
        // this.props.history.push("/items")
        this.props.setUser(response)
      }
    })
    // .catch(error => console.log(error))

    this.setState({
        username: "",
        password: ""
      })

  }

  render(){
    return (
      
      
      <form className="formLogin" onSubmit={this.handleSubmit}>
              <div className="form-row loginDiv">
                  <div>
                    <h1 className='salut'> Hi {this.state.username}</h1>
                    <input className="form-control loginInput" placeholder="username" className='formInput' name="username" 
                      value={this.state.username} 
                      onChange={this.handleChange}placeholder="username"/>
                    <br></br>
                    <br></br>
                    <br></br>
                    <input className="form-control loginInput" placeholder="password" className='formInput' name="password" 
                        value={this.state.password} type="password"  
                        onChange={this.handleChange}placeholder="password"/>
                  </div>
              <br></br>
              <div className="loginSubmit">
                  <button className="formInput" type="submit">Log In</button>
              </div>
              </div>  
          </form>
    
    )
  }
  
}

export default LoginForm
