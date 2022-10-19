import { Component } from "react";
import ThemeButton from './ThemeButton';

interface IToolBar {
}

class ToolBar extends Component<IToolBar,any> {
    constructor(props: IToolBar) {
        super(props);
    }
    render() {
        return (<ThemeButton />);
    }
}

export default ToolBar;