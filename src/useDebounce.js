import { useState, useEffect } from 'react';

function useDebounce(value, delay = 500) =>{ //딜레이 0.5초
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect (() => {      // value/ delay가 변경되면 다시 실행됨
        const handler = setTimeout(()=> {
            setDebouncedValue(value);     
        },delay);
        
        return () => {
            clearTimeout(handler) //clearTimeout(handler) , 컴포넌트가 언마운트되거나 의존성 배열의 값이 변경되어 useEffect가 다시 실행되기 직전에 호출
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;

