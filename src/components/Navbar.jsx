import React from 'react'
import Home from './Home'
import Profile from './Profile'
import './stylesheets/navbar.css'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {FaHome, FaUserCircle} from 'react-icons/fa'

class Navbar extends React.Component {

    render() {
        return (
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>
                                <FaHome />
                            </Link>
                        </li>
                        <li>
                            <Link to='/profile'>
                                <FaUserCircle/>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Route exact path='/' component={Home} />
                <Route path='/profile' component={Profile} />
            </Router>
        )
    }

}

export default Navbar