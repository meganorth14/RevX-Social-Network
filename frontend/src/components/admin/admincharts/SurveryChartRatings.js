import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {Chart, ArcElement} from 'chart.js'
import { Doughnut, Pie } from "react-chartjs-2";
Chart.register(ArcElement);


function SurveyChartRating() {

    //GOING TO MAKE ALL TOTAL GENRE FOR THE SUB CATEGORY BASED ON THEIR POST AND ADD IT HERE

    const data = {
        labels: ["Beginner","Intermediate", "Advanced", "Java", "React"],
        datasets: [{
            label: 'All Total Post Per Genre',
            data: [ 5, 7, 8, 2, 3],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',

            ],
            hoverOffset: 4
        }]
    }
    return (
        <div>
            <Doughnut data={data} />
        </div>
    )
}

export  default SurveyChartRating;