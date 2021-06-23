import React, { Component } from 'react'
import Amplify, { API } from 'aws-amplify'
import awsConfig from '../aws-exports'
import '../App.css';
import { BrowserRouter as Link } from 'react-router-dom';

Amplify.configure(awsConfig)

let apiName = 'collectionAPI'
let path = '/collection'

class add extends Component {
  state = {
    name: '',
    filter: '',
    createDate:''
  }
  //변경되는 데이터 업데이트
  handleChange = e => {
    const { value, name } = e.target
    this.setState({ [name]: value })
  }

  //submit시 처리
  handleSubmit = async e => {
    e.preventDefault()
    //createDate 값 formating
    var createDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')

    //body 설정
    const body = {
      id: Date.now().toString(),
      upperId: '0',
      name: this.state.name,
      filter: this.state.filter,
      createDate: createDate
    }
    try {
      //API 호출
      const res = await API.post(apiName, path, { body })
      console.log(res)
    } catch (err) {
      console.log(err)
    }
    //메인 페이지로 이동
    window.location.href = "/main";
  }
  componentDidMount() {

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

export default add