import React, { useEffect, useState } from 'react'
import './adminReviews.css'
import { useDispatch, useSelector } from 'react-redux'
import { adminFetchAllProducts } from '../../../store/slices/adminStore'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import MetaData from '../../MetaData'

const AdminProducts = () => {
  const { products, status, error, productCount, filteredProductCount } = useSelector((state) => (state.AdminStore))
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  let comparePagination = productCount;
  if (productCount !== filteredProductCount) comparePagination = filteredProductCount;

  const dispatch = useDispatch()
  useEffect(() => {
    const call = async () => {
      dispatch(adminFetchAllProducts({ currentPage }))
    }
    call()
  }, [dispatch, currentPage])



  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);

    }
  }

  const PAGE_SIZE = 10; // 10 products per page
  const totalPages = Math.ceil(productCount / PAGE_SIZE);

  const renderPageNumbers = () => {
    const numbers = [];

    if (currentPage <= 3) {
      for (let i = 1; i <= 3 && i <= totalPages; i++) {
        numbers.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 2; i <= totalPages && i >= 1; i++) {
        numbers.push(i);
      }
    } else {
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        numbers.push(i);
      }
    }

    return numbers;
  };

  if (error) {
    toast.error(`${error} !`, {
      position: toast.POSITION.BOTTOM_CENTER
    });
    return <ToastContainer />
  }

  return (<>
  <MetaData title={`All Reviews`} />
    {status === 'loading' ? <div className="d-flex justify-content-center">
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden"></span>
      </div></div> : !products.length ? <div className="col-md-9 col-sm-12 px-lg-5 pt-sm-3 pt-md-0 pt-3" style={{ marginTop: '50px', textAlign: 'center' }}>
        <div className="error-message">
          <p>Oops! The Orders is currently not available.</p>
        </div>
        <div className="home-link">
          <p><Link to="/">Go back to the home page</Link></p>
        </div>
      </div>  : <div className="col-md-9 col-sm-12 px-lg-5 pt-sm-3 pt-md-0 pt-3">

        <div className="row py-2 m-0" style={{ borderRadius: '20px', background: '#c7c7c7' }}><div className="col-12">

          <div className="row">
            <div className="col-2 col-sm-4 overflow-x-auto text-center">ProductID</div>
            <div className="col-2 col-sm-2 overflow-x-auto text-center">Name</div>
            <div className="col-2 col-sm-2 overflow-x-auto text-center">Stock</div>
            <div className="col-2 col-sm-2 overflow-x-auto text-center">Price</div>
            <div className="col-4 col-sm-2 overflow-x-auto text-center">Actions</div>
          </div>
        </div></div>

        {(products.length > 0 ? (products.map((product, idx) => (<div className="row mt-3 py-2 m-0" key={idx} style={{ borderRadius: '20px', background: '#d7d7d7' }}>
          <div className="col-12">
            <div className="row m-0">
              <div className="col-2 col-sm-4 overflow-x-auto text-center remove-scrollbar">{product._id}</div>
              <div className="col-2 col-sm-2 overflow-x-auto text-center" onClick={() => navigate(`/product/${product._id}`)} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}>
                {product.name}
              </div>
              <div className="col-2 col-sm-2 overflow-x-auto text-center">{product.Stock}</div>
              <div className="col-2 col-sm-2 overflow-x-auto text-center">₹{product.price}</div>
              <div className="col-4 col-sm-2 overflow-x-auto text-center">
                <span className='edit-delete' onClick={() => navigate(`/admin/product/reviews/${product._id}`)}>
                  <i className="fa-solid fa-eye" style={{ cursor: 'pointer' }}></i>
                </span>
              </div>
            </div>
          </div>
        </div>))) : (<h3>
          {error ? `Error: ${error}` : 'Error While Fetching'}
          <br />
          <h5>We got an error, try again later</h5>
        </h3>))}

        {PAGE_SIZE < comparePagination && <div className="pagination-section">
          <button className="pagination-btn" onClick={previousPage} disabled={currentPage === 1}>Previous</button>


          {currentPage > 3 && (
            <span
              className={`pagination-number ${currentPage === 1 ? 'active-page' : ''}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </span>
          )}

          {currentPage > 4 && <span className="pagination-dots">...</span>}

          {renderPageNumbers().map((number) => (
            <span
              key={number}
              className={`pagination-number ${currentPage === number ? 'active-page' : ''}`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </span>
          ))}

          {currentPage < totalPages - 3 && <span className="pagination-dots">...</span>}


          {currentPage < totalPages - 2 && (
            <span
              className={`pagination-number ${currentPage === totalPages ? 'active-page' : ''}`}
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </span>
          )}

          <button className="pagination-btn" onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
        </div>}
      </div >}
  </>
  )
}

export default AdminProducts