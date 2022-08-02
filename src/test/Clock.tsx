import { Component } from "react";

export class Clock extends Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state = {
            date:new Date(),
            timerID: 0,
        }
    }

    componentDidMount() {
        // setState是浅合并，会自动合并对应的key，比如这里的timerID
        this.setState({
            timerID: setInterval(
                () => {
                    this.tick();
                }, 
                1000
            )
        });
    }
    componentWillUnmount() {
        clearInterval(this.state.timerID);
    }

    tick() {
        this.setState({
            date: new Date(),
        });
    }

    render() {
        return (
            <div>
                <h4>It is {this.state.date.toLocaleString()}</h4>
            </div>
        );
    }
}