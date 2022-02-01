import React from "react"
import "./App.css";
import { getHealthCheck } from "./api";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            health: null,
            error: null
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        getHealthCheck()
            .then(json => {
                this.setState({ health: json.data.status })
            })
            .catch(err => {
                this.setState({ error: err })
            })
    }

    render() {
        return(
            <div className = "healthCheck">
                <h1>Health Check</h1>
                <button
                    onClick = {this.handleClick}
                >
                    Click!
                </button>
                {this.state.health !== null && (
                    <div>
                        {this.state.health}
                    </div>
                )}
            </div>
        );
    }
}

export default App;
