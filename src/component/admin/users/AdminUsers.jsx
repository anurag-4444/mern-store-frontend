import React, { useEffect, useState } from 'react'
import './adminUsers.css'
import { useDispatch, useSelector } from 'react-redux'
import { adminDeleteUser, adminFetchAllUsers, adminUpdateUser } from '../../../store/slices/adminStore'
import { toast, ToastContainer } from 'react-toastify'
import { Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import MetaData from '../../MetaData'

const AdminUsers = () => {
  const { users, error, status, productCount, filteredProductCount } = useSelector((state) => (state.AdminStore))
  const [currentPage, setCurrentPage] = useState(1)

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showToast, setShowToast] = useState({ status: false, error: false, msg: '' });

  let comparePagination = users.length;
  if (productCount !== filteredProductCount) comparePagination = filteredProductCount;

  const dispatch = useDispatch()
  useEffect(() => {
    const call = async () => {
      dispatch(adminFetchAllUsers())
    }
    call()
  }, [dispatch])

  const deleteUser = (id) => {
    dispatch(adminDeleteUser(id)).finally(() => {
      setShowToast({ status: true, msg: 'User Deleted Successfully', error: false });
      dispatch(adminFetchAllUsers())
    })
  }

  const updateRole = (role) => {
    dispatch(adminUpdateUser({ id: selectedUserId, role })).finally(() => {
      setShowToast({ status: true, msg: 'User Role Updated Successfully', error: false });
      dispatch(adminFetchAllUsers())
    })
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);

    }
  }

  const PAGE_SIZE = 10; // 10 products per page
  const totalPages = Math.ceil(users.length / PAGE_SIZE);

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

<MetaData title={`All Users`} />
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
      </div></div> : !users.length ? <div className="col-md-9 col-sm-12 px-lg-5 pt-sm-3 pt-md-0 pt-3" style={{ marginTop: '50px', textAlign: 'center' }}>
        <div className="error-message">
          <p>Oops! The Users is currently not available.</p>
        </div>
        <div className="home-link">
          <p><Link to="/">Go back to the home page</Link></p>
        </div>
      </div>  : <div className="col-md-9 col-sm-12 px-lg-5 pt-sm-3 pt-md-0 pt-3">

        <div className="row py-2 m-0" style={{ borderRadius: '20px', background: '#c7c7c7' }}><div className="col-12">

          <div className="row">
            <div className="col-2 col-sm-4 overflow-x-auto text-center">Order Id</div>
            <div className="col-2 col-sm-2 overflow-x-auto text-center">Email</div>
            <div className="col-2 col-sm-2 overflow-x-auto text-center">Name</div>
            <div className="col-2 col-sm-2 overflow-x-auto text-center">Role</div>
            <div className="col-4 col-sm-2 overflow-x-auto text-center">Actions</div>
          </div>
        </div></div>

        {(users.length > 0 ? (users.map((ele, idx) => (<div className="row mt-3 py-2 m-0" key={idx} style={{ borderRadius: '20px', background: '#d7d7d7' }}>
          <div className="col-12">
            <div className="row m-0">
              <div className="col-2 col-sm-4 overflow-x-auto text-center remove-scrollbar">{ele._id}</div>
              <div className="col-2 col-sm-2 overflow-x-auto text-center">{ele.email}</div>
              <div className="col-2 col-sm-2 overflow-x-auto text-center">{ele.name}</div>
              <div className="col-2 col-sm-2 overflow-x-auto text-center">{ele.role}</div>
              <div className="col-4 col-sm-2 overflow-x-auto text-center">
                <span className='me-2 me-sm-3 edit-delete' onClick={() => setSelectedUserId(ele._id)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <i className="fa-solid fa-pen" style={{ cursor: 'pointer' }}></i>
                </span>

                <span className='edit-delete' onClick={() => deleteUser(ele._id)}><i className="fa-solid fa-trash" style={{ cursor: 'pointer' }}></i></span>
              </div>
            </div>
          </div>
        </div>
        ))) : (<h3>
          {error ? `Error: ${error}` : 'Error While Fetching'}
          <br />
          <h5>We got an error, try again later</h5>
        </h3>))}

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Choose Role
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#" data-bs-dismiss="modal" onClick={() => updateRole("user")}>User</a></li>
                    <li><a className="dropdown-item" href="#" data-bs-dismiss="modal" onClick={() => updateRole("admin")}>Admin</a></li>
                  </ul>
                </div>

              </div>
              {/* <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div> */}
            </div>
          </div>
        </div>

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

export default AdminUsers