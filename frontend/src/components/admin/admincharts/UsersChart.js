import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {Chart, ArcElement} from 'chart.js'
import { Doughnut, Pie } from "react-chartjs-2";
Chart.register(ArcElement);


function UsersChart({adminCount,associateCount}) {

    const data = {
        labels: ["Admin", "Asociates"],
        datasets: [{
            label: 'Admin  and Associates Totals',
            data: [adminCount, associateCount],
            backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',

            ],
            hoverOffset: 4
        }]
    }
    return (
        <div>
            <Doughnut

                data={data} />
        </div>
    )
}

export  default   UsersChart;