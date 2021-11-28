import React, { useContext } from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { DataContext } from "../Context";




export const Grafik = () => {


    let { tableHead, dataTable } = useContext(DataContext)


    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const labels = [...tableHead];
    console.log(dataTable)

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: dataTable[0].data.map(item => item.ukupno),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };


    return (
        <div className="grafik-container">
            <Bar options={options} data={data} />;
        </div>
    )
}