import CountryList from "@/constants/CountryList";
import { useCallback, useState } from "react";

export const useNewsCountries = () => {
    const [countries, setCountries] = useState(CountryList);
    
    const toggleCountry = useCallback((name: string)=>{
        setCountries((prevCountries:any)=>{
            return prevCountries.map((item:any)=>{
                if(item.name === name){
                    return {
                        ...item,
                        selected: !item.selected
                    }
                }
                return item;
            })
        });
    }, []);

    return {
        countries,
        toggleCountry
    }
}