import { useState, useEffect } from 'react';

function useDebounce(value, delay = 500)  {//딜레이 0.5초
    const [debouncedValue, setDebouncedValue] = useState(value); // <<-  setDebouncedValue(value);가 state의 기본값으로 변경   

    useEffect (() => {      // value/ delay가 변경되면 다시 실행됨
        const handler = setTimeout(()=> {
            setDebouncedValue(value);     
        },delay);

        return () => {
            clearTimeout(handler); //clearTimeout(handler) , 컴포넌트가 언마운트되거나 의존성 배열의 값이 변경되어 useEffect가 다시 실행되기 직전에 호출
        };
    }, [value, delay]); // 계속 붙으면 안되니까 떼준다

    return debouncedValue;     //debouncedValue를 -> usedebounce 사용하는곳에 준다 (반환한다)
};

export default useDebounce;

