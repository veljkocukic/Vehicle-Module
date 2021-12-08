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

    function random_rgba() {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',0.7)';
    }


    const data = {
        labels,
        datasets:dataTable.map(item=>{
            return {
                label:item.vozilo,
                data:item.data.map(item=>item.ukupno),
                backgroundColor: random_rgba()
            }
        })
    };

    return (
        <div className="grafik-container">
            <Bar options={options} data={data} />
        </div>
    )
}