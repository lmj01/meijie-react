import { ThemeContext } from '../helper/Theme';
import { Component } from 'react';

class ThemeButton extends Component<any,any> {
    constructor(props:any) {
        super(props);
    }
    render() {
        return (
        <ThemeContext.Consumer>
            {({theme, toggleTheme}) => (
                <button onClick={toggleTheme}  style={{color:theme.foreground,backgroundColor:theme.background}}>toggle theme</button>
            )}
        </ThemeContext.Consumer>
        );
    }
}
ThemeButton.contextType = ThemeContext;

export default ThemeButton;