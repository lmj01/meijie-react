import { useState } from 'react';
import {TestIndex} from './test/Index';
import '../style/css/index.css';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="app">
            <h1>vite + react</h1>
            <div className="card">
                <button onClick={()=>setCount((count) => count+1)}>
                    count is {count}
                </button>
            </div>
            <TestIndex />
        </div>
    )
}

export default App;