import React from 'react'
import ReactStars from 'react-rating-stars-component'
import profileImg from '../assets/images/Profile.png'

const ReviewCard = ({ review, index }) => {

    const options = {
        edit: false,
        color: "rgba(20, 20, 20, 0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 15 : 20,
        value: review.rating,
        isHalf: true,
    }
    return (<>

       

        <div key={index} className="col-md-12 mt-3">
            <div className="card">
                <div className="card-header bg-white">

                    <img src={review.image ? review.image : profileImg} alt={`Avatar of ${review.name}`} className="user-avatar" />
                    <h4 className='m-0'>{review.name}</h4>
                </div>
                <div className="card-body">
                    <ReactStars value={review.rating} {...options} />
                    <p>
                        {review.comment}
                    </p>
                </div>
            </div>
        </div>

    </>

    )
}

export default ReviewCard