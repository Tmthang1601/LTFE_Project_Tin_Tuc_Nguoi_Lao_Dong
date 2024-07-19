import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ArticleChart = ({ data }) => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Số lượng bài viết',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    });

    useEffect(() => {
        const articlesByDate = data.reduce((acc, article) => {
            const date = new Date(article.pubDate).toLocaleDateString();
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        const sortedDates = Object.keys(articlesByDate).sort((a, b) => new Date(a) - new Date(b));

        setChartData({
            labels: sortedDates,
            datasets: [
                {
                    label: 'Số lượng bài viết',
                    data: sortedDates.map(date => articlesByDate[date]),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
            ],
        });
    }, [data]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Số lượng bài viết theo ngày',
            },
        },
    };

    return <Bar options={options} data={chartData} />;
};

export default ArticleChart;