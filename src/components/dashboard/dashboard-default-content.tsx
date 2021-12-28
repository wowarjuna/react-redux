import { Box, Card, CardContent, Container, Grid, makeStyles, Theme, Typography, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react"
import { SaleType } from "../../models/sale-type"
import { getSalesAxios } from "../../services/salesService"
import Chart from 'react-apexcharts'
import Page from '../pages'


const useStyles = makeStyles(() => ({
    root: {
        minHeight: '100%',
    },
}));

const getChartStyling = (theme: Theme) => ({
    chart: {
        background: theme.palette.background.paper,
        toolbar: {
            show: false,
        },
    },
    colors: ['#13affe', '#fbab49'],
    dataLabels: {
        enabled: false,
    },
    grid: {
        borderColor: theme.palette.divider,
        yaxis: {
            lines: {
                show: false,
            },
        },
    },
    legend: {
        show: true,
        labels: {
            colors: theme.palette.text.secondary,
        },
    },
    plotOptions: {
        bar: {
            columnWidth: '40%',
        },
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
    },
    theme: {
        mode: theme.palette.type,
    },
    tooltip: {
        theme: theme.palette.type,
    },
    xaxis: {
        axisBorder: {
            show: true,
            color: theme.palette.divider,
        },
        axisTicks: {
            show: true,
            color: theme.palette.divider,
        },
        categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        labels: {
            style: {
                colors: theme.palette.text.secondary,
            },
        },
    },
    yaxis: {
        axisBorder: {
            show: true,
            color: theme.palette.divider,
        },
        axisTicks: {
            show: true,
            color: theme.palette.divider,
        },
        labels: {
            style: {
                colors: theme.palette.text.secondary,
            },
        },
    },
});


export const DashboardDefaultContent = () => {
    const classes = useStyles();
    const theme = useTheme();

    const [sales, setSales] = useState<SaleType[]>([])

    useEffect(() => {
        fetchSales()
    }, [])

    const fetchSales = async () => {
        const { data } = await getSalesAxios();
        console.log(data);
        setSales(data)
    }
    return (
        <Page title="Dashboard">
        <div>Dashboard</div>
        </Page>
    )
}