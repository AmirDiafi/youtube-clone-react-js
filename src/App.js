import React from 'react'
import './App.css'
import Navbar from './components/Navbar'

class App extends React.Component {
  render() { 
    return ( 
      <React.Fragment>
        <Navbar />
        <div className='footer-line'></div>
      </React.Fragment>
     )
  }
}
 
export default App;