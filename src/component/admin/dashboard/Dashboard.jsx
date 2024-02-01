import React, { useEffect } from 'react'
import { Doughnut, Line } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux'
import { adminFetchAllProducts, adminFetchAllOrders, adminFetchAllUsers } from "../../../store/slices/adminStore";
import './dashboard.css'
import { toast, ToastContainer } from 'react-toastify'
import MetaData from '../../MetaData';

const Dashboard = () => {
    Chart.register(CategoryScale);
    const { products, productCount, orders, users, error } = useSelector((state) => (state.AdminStore))

    const dispatch = useDispatch()
    useEffect(() => {
        const call = async () => {
            dispatch(adminFetchAllProducts({ all: true }))
            dispatch(adminFetchAllOrders())
            dispatch(adminFetchAllUsers())
        }
        call()
    }, [dispatch])

    let outOfStock = 0;
    products && products.forEach((item) => {
        if (item.Stock === 0) {
            outOfStock += 1;
        }
    });

    let totalAmount = 0;
    orders && orders.forEach(ele => {
        totalAmount += ele.totalPrice
    });

    const lineState = {
        labels: ["Intial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 42, 49)"],
                data: [0, totalAmount],
            }
        ],
    };

    const doughnutState = {
        labels: ["Out Of Stock", "In Stock"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["#00A648", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, products.length - outOfStock],
            }
        ],
    }

    if (error) {
        toast.error(`${error} !`, {
            position: toast.POSITION.BOTTOM_CENTER
        });
        return <ToastContainer />
    }

    return (
        <>
        <MetaData title={`Admin Dashboard`} />
            <div className="col-md-9 col-sm-12 px-lg-5 px-sm-0 pt-sm-3 pt-3">
                <div className="dashboard-one w-100">
                    Total Amount<span>₹{totalAmount}</span>
                </div>
                <div className="three-circle d-flex justify-content-center align-items-center gap-2 gap-sm-3 my-3">
                    <div className="circle one">Products<br />{productCount}</div>
                    <div className="circle two">Orders<br />{orders.length}</div>
                    <div className="circle three">Users<br />{users.length}</div>
                </div>
                <div className="line-chart d-flex justify-content-center">
                    <Line data={lineState} />
                </div>

                <div className="doughnut-chart d-flex justify-content-center" style={{ height: '380px' }}>
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </>
    )
}

export default Dashboard