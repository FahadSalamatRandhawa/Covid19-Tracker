import React, { useState, useEffect} from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './CountryList.module.css';
import { fetchcountries } from '../../api';

const CountryList = ({CountryChanger}) => {
    const [fetchedCountries, setfetchedCountries] = useState([]);

    useEffect(() => {
        const fetchCountryAPI = async () => {
            setfetchedCountries (await fetchcountries());
        }
        fetchCountryAPI();
    }, [setfetchedCountries]);


    return (
        <FormControl calssName={styles.FormControll}>
            <NativeSelect defaultValue="" onChange={(e) => CountryChanger(e.target.value)}>
                <option value="global">Global</option>;
    {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryList;