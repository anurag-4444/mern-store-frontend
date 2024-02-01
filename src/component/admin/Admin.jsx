import React, { useState } from 'react'
import { MdDashboard } from "react-icons/md";
import { IoOptionsOutline } from "react-icons/io5";
import './admin.css'
import Dashboard from './dashboard/Dashboard';
import AdminProducts from './products/AdminProducts';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import CreateProduct from './create_product/CreateProduct';
import UpdateProduct from './update_product/UpdateProduct';
import AdminOrders from './orders/AdminOrders';
import AdminUpdateOrder from './update-order/AdminUpdateOrder';
import AdminUsers from './users/AdminUsers';
import AdminReviews from './reviews/AdminReviews';
import AdminProductReviews from './product-reviews/AdminProductReviews.jsx';
// import { Routes, Route } from "react-router-dom"


const Admin = () => {
    const navigate = useNavigate()

    return (

        <section className='py-3'>
            <div className="row">

                <div className="col-md-3 col-sm-12 col-12 ">
                    <ul className="list-group gap-2 flex-sm-row flex-row flex-md-column admin-list overflow-x-auto">

                        <li className="list-group-item border-white text-center" onClick={() => navigate('/admin')} style={{ borderRadius: '21px', background: '#dedede', cursor: 'pointer' }} aria-current="true"><span className='me-2'><MdDashboard /></span>Dashboard</li>

                        <li className="list-group-item border-white text-center d-flex justify-content-center"  style={{ borderRadius: '21px', background: '#dedede', cursor: 'pointer' }}>
                            <button className="btn border-0 p-0 d-sm-flex d-flex " type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                <span className='me-2'><i className="fa-solid fa-angle-down"></i></span>
                                Products
                            </button>
                        </li>

                        <div className="collapse product-collapse" id="collapseExample">
                            <div className='product-admin py-sm-1 product-one' onClick={() => navigate("/admin/products")} style={{ cursor: 'pointer' }}><span className='me-2 me-md-1'><i className="fa-solid fa-check-double"></i></span>All</div>
                            <div className='product-admin py-sm-1 product-two' onClick={() => navigate('/admin/product/create')} style={{ cursor: 'pointer' }}><span className='me-2 me-md-1'><i className="fa-solid fa-plus"></i></span>Create</div>
                        </div>

                        <li className="list-group-item border-white text-center" onClick={() => navigate('/admin/orders')} style={{ borderRadius: '21px', background: '#dedede', cursor: 'pointer' }}><span className='me-2'><IoOptionsOutline /></span> Orders</li>

                        <li className="list-group-item border-white text-center" onClick={() => navigate('/admin/users')} style={{ borderRadius: '21px', background: '#dedede', cursor: 'pointer' }}><span className='me-2'><i className="fa-solid fa-user-group"></i></span> Users</li>

                        <li className="list-group-item border-white text-center" onClick={() => navigate('/admin/reviews')} style={{ borderRadius: '21px', background: '#dedede', cursor: 'pointer' }}><span className='me-2'><i className="fa-solid fa-square-pen"></i></span>Reviews</li>
                    </ul>
                </div>

                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/products' element={<AdminProducts />} />
                    <Route path='/product/create' element={<CreateProduct />} />
                    <Route path='/product/update/:id' element={<UpdateProduct />} />
                    <Route path='/orders' element={<AdminOrders />} />
                    <Route path='/update/order/:id' element={<AdminUpdateOrder />} />
                    <Route path='/product/reviews/:id' element={<AdminProductReviews />} />
                    <Route path='/users' element={<AdminUsers />} />
                    <Route path='/reviews' element={<AdminReviews />} />
                </Routes>

            </div>
        </section>
    )
}

export default Admin