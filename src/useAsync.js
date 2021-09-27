import {useReducer, useEffect, useCallback } from 'react';


function asyncReducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                loading: true,
                data: null,
                error: null,
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null,
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function useAsync(callback, deps =[]){
    const [ state, dispatch] = useReducer(asyncReducer, {
        loading: false,
        data: null,
        error: null,
    });

    const fetchData = useCallback (async () =>{
        dispatch({ type: "LOADING" });
        try{
            const data = await callback();
        }catch(e){
        dispatch({ type: 'ERROR', error: e})
        }
    }, [callback]);
    useEffect(()=>{
        fetchData();
        // eslint-disable-next-line
    }, deps)
    return [state, fetchData];
}

