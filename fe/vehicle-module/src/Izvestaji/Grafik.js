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
                text: "Grafički prikaz",
            },
        },
    };

    const labels = [...tableHead];


    const data = {
        labels,
        datasets:dataTable.map(item=>{
            let random = Math.floor(Math.random()*200)
            return {
                label:item.vozilo,
                data:item.data.map(item=>item.ukupno),
                backgroundColor: "rgba("+random+", 99,285, 0.5)"
            }
        })
    };

    return (
        <div className="grafik-container">
            <Bar options={options} data={data} />
        </div>
    )
}