import React, { Component } from 'react'
import Amplify, { API } from 'aws-amplify'
import awsConfig from '../aws-exports'
import '../App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

Amplify.configure(awsConfig)

let apiName = 'collectionAPI'
let path = '/collection'

class main extends Component {
 state = {
    name: '',
    filter: '',
    list: []
  }

  handleDelete = async id => {
    try {
      console.log("start handleDelete");

      const params = { // OPTIONAL
        queryStringParameters: {  // OPTIONAL
          upperId: id,
        }
      };
      console.log("end set params");

      const res = await API.get(apiName, path, params);
      const tempList = [...res]
      console.log(tempList.length)

      for (var i = 0; i < tempList.length; i++) {
        console.log(tempList[i].id)
        console.log(`${path + '/object/' + tempList[i].id}`);
        await API.del(apiName, `${path + '/object/' + tempList[i].id}`)
        this.handleDelete(tempList[i].id)
      }

      await API.del(apiName, `${path + '/object/' + id}`)

      this.fetchList()
    } catch (err) {
      console.log(err)
    }
  }

  async fetchList() {
    try {
      const res = await API.get(apiName, path)
      this.setState({ list: [...res] })
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.fetchList()
  }

  render() {
    const {
      handleDelete,
    } = this
    const {list} = this.state



    return (

      <div className="App">
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>

        <button><Link to={'/add'}>Add Collection</Link></button>
        <hr />
        <h3>Menu Collections</h3>
        <ul>
          {list.map(item => (
            <li key={item.id}>
              {item.name}
              <button><Link to={`/addSub/${item.id}`}>Add</Link> </button>
              <button><Link to={`/edit/${item.id}`}>Edit</Link> </button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default main