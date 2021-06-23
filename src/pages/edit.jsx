import React, { Component } from 'react'
import Amplify, { API } from 'aws-amplify'
import awsConfig from '../aws-exports'
import '../App.css';
import { BrowserRouter as Link } from 'react-router-dom';

Amplify.configure(awsConfig)

let apiName = 'collectionAPI'
let path = '/collection'

class edit extends Component {


  state = {
    name: '',
    content: '',
  }

  handleChange = e => {
    const { value, name } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = async e => {
    console.log("this.state.name = ", this.state.name);
    e.preventDefault()
    const body = {
      id: this.state.id,
      name: this.state.name,
      filter: this.state.filter
    }

    try {
      const res = await API.put(apiName, path, { body })
      console.log(res)
    } catch (err) {
      console.log(err)
    }

    window.location.href = "/main";

  }

  handleSelectItem = async id => {
    
    try {
      const res = await API.get(apiName, `${path + '/object/' + id}`)
      this.setState({ ...res } )
      console.log("handleSelectItem success\n",res)
    } catch (err) {
      console.log(err)
    }
  }

  handleDelete = async id => {
    try {
      await API.del(apiName, `${path + '/object' + id}`)
      this.setState({ showDetail: true })
      this.fetchList()
    } catch (err) {
      console.log(err)
    }
  }


  
  componentDidMount() {
    const { id } = this.props.match.params;
    this.handleSelectItem(id)
  }

  render() {
    const {
      handleChange,
      handleSubmit
    } = this
    const { name, filter } = this.state



    return (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="name">name</label>
            <input id="name" type="text" name="name" value={name} onChange={handleChange} />
          </div>

          <div className="row">
            <label htmlFor="filter">filter</label>
            <input id="filter" type="text" name="filter" value={filter} onChange={handleChange} />
          </div>

          <button type="submit">Submit</button>
          <button type="cancel"><a href='/main'>Cancel</a></button>

        </form>
        <hr />

      </div>
    )
  }
}

// export default withAuthenticator(edit, true)
export default edit