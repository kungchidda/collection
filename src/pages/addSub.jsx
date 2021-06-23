import React, { Component } from 'react'
import Amplify, { API } from 'aws-amplify'
import awsConfig from '../aws-exports'
import '../App.css';
import { BrowserRouter as Link } from 'react-router-dom';

Amplify.configure(awsConfig)

let apiName = 'collectionAPI'
let path = '/collection'

class addSub extends Component {
  state = {
    name: '',
    filter: '',
    upperId: ''
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
      //upperId에 상위 collection의 아이디 설정
      upperId: this.state.id,
      id: Date.now().toString(),
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

  handleSelectItem = async id => {

    try {
      const res = await API.get(apiName, `${path + '/object/' + id}`)
      this.setState({
        id: res.id
      })
      console.log("handleSelectItem success\n", res.id, "\n", this.state.upperId)
    } catch (err) {
      console.log(err)
    }
  }


  async fetchList() {
    console.log("start fetchList")
    try {
      const res = await API.get(apiName, path)
      this.setState({ list: [...res] })
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

export default addSub