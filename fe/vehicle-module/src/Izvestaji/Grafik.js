import React from "react"
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
import { useSelector } from "react-redux"




export const Grafik = () => {

    //const grafikIme = useSelector(state=>state.grafikTime)
    let grafikBroj = useSelector(state => state.grafikBrojReducer)
    let grafikIme = useSelector(state => state.grafikImeReducer)



    let tableHead = useSelector(state=>state.tableHeadReducer)
    let dataTable = useSelector(state=>state.dataTableReducer)


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
                text: grafikIme,
            },
        },
    };

    const labels = [...tableHead];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: dataTable[grafikBroj-1].data.map(item => item.ukupno),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    console.log()
    return (
        <div className="grafik-container">
            <Bar options={options} data={data} />
        </div>
    )
}