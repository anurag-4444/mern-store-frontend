import React, { useEffect, useState } from 'react'
import './adminOrders.css'
import { useDispatch, useSelector } from 'react-redux'
import { adminDeleteOrder, adminFetchAllOrders } from '../../../store/slices/adminStore'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { Toast } from 'react-bootstrap';
import NotAvailable from '../../Not-Available/NotAvailable'
import MetaData from '../../MetaData'

const AdminOrders = () => {
  const { orders, status, error, productCount, filteredProductCount } = useSelector((state) => (state.AdminStore))
  const [showToast, setShowToast] = useState({ status: false, error: false, msg: '' });
  const navigate = useNavigate()
  // console.log(orders);
  let comparePagination = productCount;
  if (productCount !== filteredProductCount) comparePagination = filteredProductCount;

  const dispatch = useDispatch()
  useEffect(() => {
    const call = async () => {
      dispatch(adminFetchAllOrders())
    }
    call()
  }, [dispatch])

  const deleteProduct = (id) => {
    dispatch(adminDeleteOrder(id)).finally(() => {
      dispatch(adminFetchAllOrders())
      setShowToast({ status: true, msg: 'Order Deleted Successfully', error: false });
    })
  }

  if (error) {
    toast.error(`${error} !`, {
      position: toast.POSITION.BOTTOM_CENTER
    });
    return <ToastContainer />
  }
  return (<>
  <MetaData title={`All Orders`} />
    <Toast
      show={showToast.status}
      onClose={() => setShowToast({ status: false, msg: '' })}
      style={{
        position: 'fixed',
        bottom: 10,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999, // Higher z-index
      }}
      autohide
      delay={5000} // Auto-hide after 5 seconds
    >
      {showToast.error === false ? (
        <Toast.Header style={{ background: '#28a745', color: '#fff' }}>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
      ) : (
        <Toast.Header style={{ background: '#dc3545', color: '#fff' }}>
          <strong className="me-auto">Failure</strong>
        </Toast.Header>
      )}
      <Toast.Body style={{ background: showToast.error === false ? '#d4edda' : '#f8d7da', color: showToast.error === false ? '#155724' : '#721c24' }}>
        {showToast.msg}
      </Toast.Body>
    </Toast>

    {status === 'loading' ? <div className="d-flex justify-content-center">
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden"></span>
      </div></div> : !orders.length ? <div className="col-md-9 col-sm-12 px-lg-5 pt-sm-3 pt-md-0 pt-3" style={{ marginTop: '50px', textAlign: 'center' }}>
        <div className="error-message">
          <p>Oops! The Orders is currently not available.</p>
        </div>
        <div className="home-link">
          <p><Link to="/">Go back to the home page</Link></p>
        </div>
      </div> : <div className="col-md-9 col-sm-12 px-lg-5 pt-sm-3 pt-md-0 pt-3">

      <div className="row py-2 m-0" style={{ borderRadius: '20px', background: '#c7c7c7' }}><div className="col-12">

        <div className="row">
          <div className="col-2 col-sm-4 overflow-x-auto text-center">Order ID</div>
          <div className="col-2 col-sm-2 overflow-x-auto text-center">Status</div>
          <div className="col-2 col-sm-2 overflow-x-auto text-center">Items Qty</div>
          <div className="col-2 col-sm-2 overflow-x-auto text-center">Amount</div>
          <div className="col-4 col-sm-2 overflow-x-auto text-center">Actions</div>
        </div>
      </div></div>

      {(orders.length > 0 ? (orders.map((ele, idx) => (<div className="row mt-3 py-2 m-0" key={idx} style={{ borderRadius: '20px', background: '#d7d7d7' }}>
        <div className="col-12">
          <div className="row m-0">
            <div className="col-2 col-sm-4 overflow-x-auto text-center remove-scrollbar">{ele._id}</div>
            <div className="col-2 col-sm-2 overflow-x-auto text-center">{ele.orderStatus}</div>
            <div className="col-2 col-sm-2 overflow-x-auto text-center">{ele.orderItems.length}</div>
            <div className="col-2 col-sm-2 overflow-x-auto text-center">₹{ele.totalPrice}</div>
            <div className="col-4 col-sm-2 overflow-x-auto text-center">
              <span className='me-2 me-sm-3 edit-delete' onClick={() => navigate(`/admin/update/order/${ele._id}`)}>
                <i className="fa-solid fa-pen" style={{ cursor: 'pointer' }}></i>
              </span>

              <span className='edit-delete' onClick={() => deleteProduct(ele._id)}><i className="fa-solid fa-trash" style={{ cursor: 'pointer' }}></i></span>
            </div>
          </div>
        </div>
      </div>))) : (<h3>
        {error ? `Error: ${error}` : 'Error While Fetching'}
        <br />
        <h5>We got an error, try again later</h5>
      </h3>))}


    </div >}
  </>
  )
}

export default AdminOrders