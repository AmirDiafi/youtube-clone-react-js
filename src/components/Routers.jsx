import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Home'
import VideoCard from './VideoCard'
import Error404 from './Error404'

class Routers extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/videos/:id' component={VideoCard} />
                    <Route component={Error404} />
                </Switch>
            </Router>
        )
    }
}

export default Routers