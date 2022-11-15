import React, { useState, useEffect, useReducer } from 'react';

const FETCH_INIT = 'FETCH_INIT';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILED = 'FETCH_FAILED';

const initState = {
    loading: false,
    error: false,
    data: '',
}

function reducer(state:any = initState, action:any) {
    let res = Object.assign({}, state);
    switch(action.type) {
        case FETCH_INIT:
            res.error = false;
            res.loading = true;
            res.data = '';
            break;
        case FETCH_SUCCESS:
            res.data = action.payload;
            res.loading = false;
            res.error = false;
            break;
        case FETCH_FAILED:
        default:
            res.loading = false;
            res.error = true;
            break;
    }
    console.log('-reducer-', res)
    return res;
}

function useFetch() {
    const [url, setUrl] = useState(`/hello?name=redux`);
    const [state, dispatch] = useReducer(reducer, initState);
    useEffect(() => {
        async function request() {
            dispatch({type: FETCH_INIT});
            try {
                const value = await fetch(url, {mode: 'cors'});
                const text = await value.text();
                console.log('--2', text)
                dispatch({type:FETCH_SUCCESS, payload:text});
            } catch (e) {
                dispatch({type: FETCH_FAILED});
            }
        }
        request();
    }, [url]);
    return {
        ...state,
        setUrl
    }
}

export default function Effect() {
    const [query, setQuery] = useState('');
    const { loading, error, data, setUrl} = useFetch();
    return <div>
        {loading && <h2>loading...</h2>}
        {error && <h2>error</h2>}
        {!(loading || error) && <h4>{data}</h4>}
        <div>
            <input type="text" value={query} onChange={event=>setQuery(event.target.value)} />
            <button onClick={() => setUrl(`/hello?name=${query}`)}>query</button>
        </div>
    </div>;
}