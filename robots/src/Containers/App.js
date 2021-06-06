import React, { Component } from 'react';
import Cardlist from "../Components/CardList";
import robots from "../robots";
import SearchBox from '../Components/Searchbox';
import Scroll from "../Components/Scroll";
import "./App.css";

class App extends Component{
    constructor(props) {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    onsearch = (event) => {
        this.setState({searchfield: event.target.value});
    };

    componentDidMount() {
        this.setState({ robots: robots });
    }

    render() {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        });
        return (
        <div className="tc">
            <h1 className="">RoboFriends</h1>
            <SearchBox search={this.onsearch}/>
            <Scroll>
                <Cardlist robots={filteredRobots} />
            </Scroll>

        </div>
        )
    }
}

export default App;
