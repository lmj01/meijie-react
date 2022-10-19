import { Component, createContext } from 'react';
import {TestIndex} from './test/Index';
import { ThemeList, ThemeContext } from './helper/Theme';
import ToolBar from './layouts/ToolBar';
import '../style/css/index.css';

class App extends Component<any,any> {
    toggleTheme:any;
    constructor(props:any){
        super(props);
        this.toggleTheme = () => {
            this.setState((state:any) => ({
                theme: state.theme == ThemeList.dark ? ThemeList.light : ThemeList.dark,
            }));
        }
        this.state = {
            count: 0,
            theme: ThemeList.dark,
            toggleTheme: this.toggleTheme,
        }
        this.handleBtnClick = this.handleBtnClick.bind(this);
    }
    
    handleBtnClick() {
        this.setState((prevProps:any) => ({
            count: prevProps.count+1,
        }))
    }
    render() {
        let state = this.state;
        return (
            <div>
                <ThemeContext.Provider value={{theme:state.theme, toggleTheme:state.toggleTheme}} >
                    <ToolBar />
                    
                    <div className="app">
                        <h4>vite + react</h4>
                        <div className="card">
                            <button onClick={this.handleBtnClick}>
                                count is {this.state.count}
                            </button>
                        </div>
                        <TestIndex />
                    </div>
                </ThemeContext.Provider>
            </div>
        );
    }
}

export default App;