import {useEffect, useState} from "react"


function useCurrencyInfo(currency){
    const [data, setData] = useState({})
    useEffect(() => {
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`;
        let mounted = true;

        fetch(url)
        .then((res) => res.json())
        .then((res) => {
            if (!mounted) return;
            setData(res && res[currency] ? res[currency] : {});
        })
        .catch((err) => {
            if (!mounted) return;
            console.error('Failed to fetch currency info:', err);
            setData({});
        });

        return () => {
            mounted = false;
        };
    }, [currency])
    return data
}

export default useCurrencyInfo;