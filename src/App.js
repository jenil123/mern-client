import './App.css'
import { useState, useEffect } from 'react'
import Axios from 'axios'
function App() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [friends, setFriends] = useState([])
  const addFriend = () => {
    Axios.post('https://mern-tut-app.herokuapp.com/addfriend', {
      name: name,
      age: age,
    })
      .then((response) => {
        //alert('It worked')
        setFriends([
          ...friends,
          { _id: response.data._id, name: name, age: age },
        ])
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const updateFriend = (id) => {
    const newAge = prompt('Enter new Age...')
    Axios.put('https://mern-tut-app.herokuapp.com/update', {
      age: newAge,
      id: id,
    }).then(() => {
      setFriends(
        friends.map((friend) => {
          return friend._id === id
            ? { _id: id, name: friend.name, age: newAge }
            : friend
        })
      )
    })
  }
  const deleteFriend = (id) => {
    Axios.delete(`https://mern-tut-app.herokuapp.com/delete/${id}`).then(() => {
      setFriends(
        friends.filter((friend) => {
          return friend._id !== id
        })
      )
    })
  }
  useEffect(() => {
    Axios.get('https://mern-tut-app.herokuapp.com/read')
      .then((response) => {
        setFriends(response.data)
        console.log('friends Data', friends)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])
  return (
    <div className='App'>
      <div className='inputs'>
        Name
        <input
          type='text'
          placeholder='Enter name here...'
          onChange={(e) => setName(e.target.value)}
        />
        Age
        <input type='Number' onChange={(e) => setAge(e.target.value)} />
        <button onClick={() => addFriend()}>Add Friend</button>
      </div>
      <div className='listOfFriends'>
        {friends.map((friend) => {
          return (
            <div className='friendContainer'>
              <div className='friend'>
                <h3>Name: {friend.name}</h3>
                <h3> Age: {friend.age}</h3>
              </div>
              <button onClick={() => updateFriend(friend._id)}>Update</button>
              <button id='removeBtn' onClick={() => deleteFriend(friend._id)}>
                Delete
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
