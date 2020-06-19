import React from 'react';

import {fetchData} from './api';
import banner from './images/covidbanner.png';

import { Cards,Chart,CountryList } from './components';
import styles from './App.module.css';


class App extends React.Component {
    state = {
        data: {},
        country: '',
    }
async componentDidMount() {
    const fetcheddata = await fetchData();

    
    this.setState({ data: fetcheddata });
    }

    CountryChanger = async (country) => {
        const fetcheddata = await fetchData(country);

        this.setState({ data: fetcheddata, country: country});
    }

    render() {
        const { data, country } = this.state;
        return(
            <div className={styles.container}> 
                <img className={styles.image} src={banner} alt="Covid-19" />
                <Cards data={data} />
                <CountryList CountryChanger={this.CountryChanger} />
                <Chart data={data} country={country} />
            </div>
        )
    }
}

export default App;