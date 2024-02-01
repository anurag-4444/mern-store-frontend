import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../../store/slices/products'
import { useParams } from 'react-router-dom'
import Product from './Product'
import MetaData from '../MetaData'

const Products = () => {
    const { keyword } = useParams()
    const dispatch = useDispatch()
    const { products, status, error } = useSelector((state) => (state.Products))
    // console.log(products);

    useEffect(() => {
        const call = async () => {
            dispatch(fetchAllProducts({ keyword }))
        }
        call()
    }, [dispatch, keyword])

    return (
        <>
            <MetaData title={`EliteHub.com : ${keyword}`} />
            <div className="main-content">

                <h4>Showing Results for '{keyword}'</h4>
                <div className="container" id="container">

                    {status === 'loading' ? (<div class="d-flex justify-content-center">
                        <div className="spinner-grow text-primary" role="status">
                            <span className="visually-hidden"></span>
                        </div></div>) : (products.length > 0 ? (products.map((product, idx) => (<Product key={idx} product={product} />))) : (<h3>No Results for '{keyword}'<br /><h5>Try checking your spelling or use more general terms</h5></h3>))}

                </div>
            </div>
        </>
    )
}

export default Products