import styles from './Chart.module.css';

import React , {useState, useEffect} from 'react';
import { fetchdailyData } from '../../api/index';
import { Line, Bar } from 'react-chartjs-2';

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
    const [dailyData, setdailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setdailyData(await fetchdailyData());
        }

        fetchAPI();
    }, []);

    //Global Line chart 

    const lineChart = (
        dailyData.length
        ? (
            <Line
            data={{
                labels : dailyData.map(({date}) => date),
                datasets : [{
                    data: dailyData.map(({confirmed}) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: 'black',
                    backgroundColor : 'rgb(50, 50, 80, 1)',
                    fill: true,
                }],
            }}
            />) : null
    );

    console.log(confirmed, recovered, deaths);

    const barChart = (
        confirmed
        ? (
        <Bar 
            data={{ 
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{label: 'People',
                backgroundColor: [
                    'rgba(200, 0, 0, 1)',
                    'rgba(0, 255, 150, 1)',
                    'rgb(50, 50, 80, 1)'
                    ],
                    data:[confirmed.value, recovered.value, deaths.value]
                }]
            }}
            options={{legend: {display: false},
            title: {display: true, text: `Current Sate of ${country}`}    
            }}
        />
        ) : null
    )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart;