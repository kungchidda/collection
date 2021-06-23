import React, { Component } from 'react'
import Amplify, { API } from 'aws-amplify'
import awsConfig from '../aws-exports'
import '../App.css';
// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import { Button } from '@material-ui/core';

Amplify.configure(awsConfig)

let apiName = 'collectionAPI'
let path = '/collection'

class main extends Component {
  state = {
    id: '',
    upperId: '',
    title: '',
    content: '',
    list: [],
    filter: [{ label: '', value: '' }]
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
      handleChange,
      handleSubmit,
      handleSelectItem,
      handleBackList,
      handleDelete,
      handleFilterLabelChange,
      handleFilterValueChange,
      handleAddFilter,
      handleRemoveFilter
    } = this
    const { title, content, list, showDetail, selectedItem, filter } = this.state



    return (

      <div className="App">
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>

        <button><Link to={'/add'}>Add Collection</Link></button>
        <hr />
        <h3>Menu Collections</h3>
        <ul style={{ display: showDetail ? 'none' : 'block' }}>
          {list.map(item => (
            <li key={item.id}>
              {item.title}
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

// export default withAuthenticator(main, true)
export default main