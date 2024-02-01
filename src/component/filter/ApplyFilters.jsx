import React, { useState } from 'react';
import PriceSlider from './PriceSlider';
import { priceChangeState, resetFilter, categoryChangeState, ratingChangeState } from '../../store/slices/products';
import { useDispatch } from 'react-redux';

const ApplyFilters = () => {
    const dispatch = useDispatch()
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const [scaling, setScaling] = useState(null);

    const categories = [
        { id: 'Smartphones', name: 'Mobiles' },
        { id: 'Laptop', name: 'Laptops' },
        { id: 'Bottom', name: 'Bottom' },
        { id: 'Tops', name: 'Tops' },
        { id: 'Attire', name: 'Attire' },
        { id: 'Camera', name: 'Camera' },
        { id: 'Footwear', name: 'Footwear' },
    ];

    const handlePriceChange = (initial, final) => {
        setPriceRange({ min: initial, max: final });
    };

    const handleGoClick = () => {
        dispatch(priceChangeState({ min: priceRange.min, max: priceRange.max }));
    };

    const changeCategory = (args) => {
        dispatch(categoryChangeState({ category: args }));
    };

    const changeRatings = (args) => {
        dispatch(ratingChangeState({ ratings: args }));
    };

    return (<>


        <div className="list-group">
            <h5 className='filter-title'>Categories</h5>
            <ul className='category'>

                {categories.map(category => (
                    <li
                        key={category.id}
                        className="list-group-item"
                        onClick={() => {
                            setSelectedCategory(category.id === selectedCategory ? null : category.id);
                            changeCategory(category.id);
                            setScaling(category.id);  // set scaling for the clicked item
                            setTimeout(() => setScaling(null), 100);  // revert after 200ms
                        }}
                        style={{
                            color: selectedCategory === category.id ? 'orange' : '#212529',
                            transform: scaling === category.id ? 'scale(1.1)' : 'scale(1)',  // scale by 1.1 times if scaling
                            transition: 'transform 0.2s ease'  // smooth transition effect
                        }}
                    >
                        {category.name}
                    </li>
                ))}

            </ul>
        </div>

        <div className="list-group">
            <h5 className='filter-title'>Price</h5>
            <ul className='price-slider'>
                <li className="list-group-item px-0">
                    <PriceSlider
                        minPrice={0}
                        maxPrice={10000}
                        currentValues={priceRange}
                        onPriceChange={handlePriceChange}
                    />
                </li>
                <li className="list-group-item mt-3">
                    <div className="row">
                        <div className="col-6"><input type="text" className="form-control" placeholder='Min' id='min'
                            value={priceRange.min}
                            onChange={(e) => (parseInt(e.target.value) < 10000) ? setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 }) : ''} /></div>

                        <div className="col-6"> <input type="text" className="form-control" placeholder='Max' id='max'
                            value={priceRange.max}
                            onChange={(e) => (parseInt(e.target.value) < 10000) ? setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 0 }) : ''} /></div>
                        <div className="col-2 mt-2"><button className="btn btn-info" onClick={handleGoClick}>Go</button></div>
                    </div>
                </li>
            </ul>
        </div>

        {/* <div className="list-group">
            <h5 className='filter-title'>Brands</h5>
            <ul>
                <li className="list-group-item">
                    <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                    <label className="form-check-label" htmlFor="firstCheckbox">Iphone</label>
                </li>
                <li className="list-group-item">
                    <input className="form-check-input me-1" type="checkbox" value="" id="secondCheckbox" />
                    <label className="form-check-label" htmlFor="secondCheckbox">Samsung</label>
                </li>
            </ul>
        </div> */}

        <div className="list-group">
            <h5 className='filter-title'>Customer Reviews</h5>
            <ul>
                <li className="list-group-item rating-filter">
                    <div className="container-fluid" onClick={() => { changeRatings(4); setSelectedRating(4 === selectedRating ? null : 4) }} style={{
                        borderBottom: selectedRating === 4 ? '1px solid rgb(255, 164, 28)' : '0'
                    }}>
                        <i className="fa-solid fa-star" style={{ color: '#ffa41c' }}></i>
                        <i className="fa-solid fa-star" style={{ color: '#ffa41c' }}></i>
                        <i className="fa-solid fa-star" style={{ color: '#ffa41c' }}></i>
                        <i className="fa-solid fa-star" style={{ color: '#ffa41c' }}></i>
                        <i className="fa-regular fa-star" style={{ color: '#ffa41c', marginRight: '3px' }}></i>
                        <span style={{ fontSize: '13px' }}>& Up</span>
                    </div>
                </li>

                <li className="list-group-item rating-filter">
                    <div className="container-fluid" onClick={() => { changeRatings(3); setSelectedRating(3 === selectedRating ? null : 3) }} style={{
                        borderBottom: selectedRating === 3 ? '1px solid rgb(255, 164, 28)' : '0'
                    }}>                        <i className="fa-solid fa-star" style={{ color: '#ffa41c' }}></i>
                        <i className="fa-solid fa-star" style={{ color: '#ffa41c' }}></i>
                        <i className="fa-solid fa-star" style={{ color: '#ffa41c' }}></i>
                        <i className="fa-regular fa-star" style={{ color: '#ffa41c' }}></i>
                        <i className="fa-regular fa-star" style={{ color: '#ffa41c', marginRight: '3px' }}></i>
                        <span style={{ fontSize: '13px' }}>& Up</span>
                    </div>
                </li>

                <li className="list-group-item rating-filter">
                    <div className="container-fluid" onClick={() => { changeRatings(2); setSelectedRating(2 === selectedRating ? null : 2) }} style={{
                        borderBottom: selectedRating === 2 ? '1px solid rgb(255, 164, 28)' : '0'
                    }}>                        <i className="fa-solid fa-star" style={{ color: '#ffa41c' }}></i>
                        <i className="fa-solid fa-star" style={{ color: '#ffa41c' }}></i>
                        <i className="fa-regular fa-star" style={{ color: '#ffa41c' }}></i>
                        <i className="fa-regular fa-star" style={{ color: '#ffa41c' }}></i>
                        <i className="fa-regular fa-star" style={{ color: '#ffa41c', marginRight: '3px' }}></i>
                        <span style={{ fontSize: '13px' }}>& Up</span>
                    </div>
                </li>

                <li className="list-group-item rating-filter">
                    <div className="container-fluid" onClick={() => { changeRatings(1); setSelectedRating(1 === selectedRating ? null : 1) }} style={{
                        borderBottom: selectedRating === 1 ? '1px solid rgb(255, 164, 28)' : '0'
                    }}>                        <i className="fa-solid fa-star" style={{ color: '#ffa41c' }}></i>
                        <i className="fa-regular fa-star" style={{ color: '#ffa41c' }}></i>
                        <i className="fa-regular fa-star" style={{ color: '#ffa41c' }}></i>
                        <i className="fa-regular fa-star" style={{ color: '#ffa41c' }}></i>
                        <i className="fa-regular fa-star" style={{ color: '#ffa41c', marginRight: '3px' }}></i>
                        <span style={{ fontSize: '13px' }}>& Up</span>
                    </div>
                </li>
            </ul>
        </div >

        <button className="btn apply-filter-btn" onClick={() => {
            dispatch(resetFilter())
            setPriceRange({ min: 1, max: 10000 })
            setSelectedCategory(null)
            setSelectedRating(null)
        }}>Reset Filters</button>

    </>
    );
}

export default ApplyFilters;
