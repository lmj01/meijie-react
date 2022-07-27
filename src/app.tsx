import { useState } from 'react';
import {EmployeeComponent} from './test/Employee';

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
            <EmployeeComponent />
        </div>
    )
}

export default App;