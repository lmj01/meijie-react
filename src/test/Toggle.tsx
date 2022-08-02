import { Component } from "react";

export class Toggle extends Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state = {isToggleOn: true};

        // 你必须谨慎对待 JSX 回调函数中的 this，在 JavaScript 中，class 的方法默认不会绑定 this
        // bind函数可以通过箭头函数来避免this，但使用不当会造成性能问题
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState((prevState:any) => ({
            isToggleOn: !prevState.isToggleOn,
        }));
    }
    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn?'On':'Off'}
            </button>
        )
    }
}