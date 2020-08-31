import React from 'react'
import * as Icons from 'react-icons/all'
import './stylesheets/home.css'
import Data from '../data.json'
import Video from './Video'

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            value:'',
            products: []
        }
    }

    handleValue = (event) => {
        this.setState({value: event.target.value})
    }

    getData = async (value) => {
        try {
            let newData = Data.filter(result=>result.title
                .toLowerCase().includes(value)||
            result.tags.toLowerCase().includes(value))
            this.setState({products: newData})
        } catch (error) {
            alert('please enter correct value')
            console.log(error)
        }
        this.setState({value: ''})
    }

    componentDidMount () {
        this.getData('nature')
    }

    getByUserSearch = (event) => {
        event.preventDefault()
        this.getData(this.state.value.toLowerCase())
    }

    
    render() { 
        return ( 
            <div className='home'>
                <form onSubmit={this.getByUserSearch}>
                    <input 
                        required
                        value={this.state.value}
                        onChange={this.handleValue}
                        type='search' 
                        placeholder='search'
                    />
                    <button 
                        disabled={this.state.value===''} 
                        type='submit' 
                        className='btn'>
                        <Icons.GoSearch />
                    </button>
                </form>

                <div className='results row'>
                    {(this.state.products.length!==0)
                    ?this.state.products.map(result=>
                        <div key={result.id}
                            className='item col col-12 col-sm-4 col-md-3'>
                            <Video 
                                data={result}
                                source={'media/videos/'+result.source}
                            />
                        </div>
                    ):<div className='wait'>
                        <img src='media/images/norecordfound.png' alt=''/>
                        <h3 className='text-center'>
                            There is no video found
                        </h3>
                    </div>}
                </div>
            </div>
         );
    }
}
 
export default Home;