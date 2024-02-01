import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { adminDeleteReview, adminFetchAllReviews } from '../../../store/slices/adminStore'
import Rating from 'react-rating-stars-component';
import ReactStars from 'react-rating-stars-component'
import profileImg from '../../assets/images/Profile.png'
import "./adminProductReviews.css"
import { toast, ToastContainer } from 'react-toastify'
import { Toast } from 'react-bootstrap';
import MetaData from '../../MetaData';

const AdminProductReviews = () => {
    const { id } = useParams()
    const { reviews, ratingCounts, status, error } = useSelector((state) => (state.AdminStore))

    const [visibleReviews, setVisibleReviews] = useState(5);
    const [showToast, setShowToast] = useState({ status: false, error: false, msg: '' });

    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 15 : 20,

        isHalf: true,
    }

    // console.log(reviews);
    const dispatch = useDispatch()
    useEffect(() => {
        const call = async () => {
            dispatch(adminFetchAllReviews(id))
        }
        call()
    }, [dispatch])

    const deleteProduct = (reviewId) => {
        dispatch(adminDeleteReview({ reviewId, productId: id })).finally(() => {
            setShowToast({ status: true, msg: 'Product Deleted Successfully', error: false });
            dispatch(adminFetchAllReviews(id))
        })
    }
    function loadMoreReviews() {
        setVisibleReviews(prevVisibleReviews => prevVisibleReviews + 5);
    }

    if (error) {
        toast.error(`${error} !`, {
            position: toast.POSITION.BOTTOM_CENTER
        });
        return <ToastContainer />
    }

    return (<>  <MetaData title={`Delete/View Review`} />

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
            </div></div> : reviews && !reviews.length ? <div className="col-md-9 col-sm-12 px-lg-5 pt-sm-3 pt-md-0 pt-3" style={{ marginTop: '50px', textAlign: 'center' }}>
        <div className="error-message">
          <p>Oops! The Reviews is currently not available.</p>
        </div>
        <div className="home-link">
          <p><Link to="/">Go back to the home page</Link></p>
        </div>
      </div>  : <div className="col-12 col-sm-12 col-md-9">
                <div className="row">
                    <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                        <div className="row">

                            <div className="col-12 d-flex align-items-center gap-2 justify-content-center">  <Rating
                                count={5}
                                value={ratingCounts[5] ? 5 : 0}
                                // value={5}
                                size={window.innerWidth < 600 ? 15 : 20}
                                edit={false}
                            /> <span>{ratingCounts[5] ? ratingCounts[5] : ''}</span> </div>

                            <div className="col-12 d-flex align-items-center gap-2 justify-content-center"><Rating
                                count={5}
                                value={ratingCounts[4] ? 4 : 0}
                                size={window.innerWidth < 600 ? 15 : 20}
                                edit={false}
                            /><span>{ratingCounts[4] ? ratingCounts[4] : ''}</span></div>

                            <div className="col-12 d-flex align-items-center gap-2 justify-content-center"><Rating
                                count={5}
                                value={ratingCounts[3] ? 3 : 0}
                                size={window.innerWidth < 600 ? 15 : 20}
                                edit={false}
                            /><span>{ratingCounts[3] ? ratingCounts[3] : ''}</span></div>

                            <div className="col-12 d-flex align-items-center gap-2 justify-content-center"><Rating
                                count={5}
                                value={ratingCounts[2] ? 2 : 0}
                                size={window.innerWidth < 600 ? 15 : 20}
                                edit={false}
                            /><span>{ratingCounts[2] ? ratingCounts[2] : ''}</span></div>

                            <div className="col-12 d-flex align-items-center gap-2 justify-content-center"><Rating
                                count={5}
                                value={ratingCounts[1] ? 1 : 0}
                                size={window.innerWidth < 600 ? 15 : 20}
                                edit={false}
                            /><span>{ratingCounts[1] ? ratingCounts[1] : ''}</span></div>

                        </div>
                    </div>
                    <div className="col-12 col-sm-8 col-md-8 col-lg-8">
                        {reviews && reviews.length > 0 && <h2>Reviews</h2>}

                        {reviews && reviews.slice(0, visibleReviews).map((review, index) => (
                            <div key={index} className="col-md-12 mt-3">
                                <div className="card">
                                    <div className="card-header bg-white" style={{ position: 'relative' }}>

                                        <img src={review.image ? review.image : profileImg} alt={`Avatar of ${review.name}`} className="user-avatar" />
                                        <h4 className='m-0'>{review.name}</h4>

                                        <span className='edit-delete admin-delete-review' onClick={() => deleteProduct(review._id)}><i className="fa-solid fa-trash" style={{ cursor: 'pointer' }}></i></span>

                                    </div>
                                    <div className="card-body">
                                        <ReactStars value={review.rating} {...options} />
                                        <p>
                                            {review.comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {reviews && reviews.length > 5 && (
                            <button onClick={loadMoreReviews} className="load-more-btn col-12">See more reviews</button>
                        )}
                    </div>

                </div>
            </div>}
    </>
    )
}

export default AdminProductReviews