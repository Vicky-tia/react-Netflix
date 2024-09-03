import { useState, useEffect } from "react";

export const useDebounce = (value, delay) => {
    
    const [debounceValue, setDebouncevalue] = useState(value);

    useEffect(() => {

        const handler = setTimeout(()=> {
            setDebouncevalue(value)
        }, delay);

        return () => {
            clearTimeout(handler)
        };
    }, [value, delay]);


    return debounceValue;

}