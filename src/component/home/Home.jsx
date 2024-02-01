import React, { useEffect, useState } from "react";
import Product from "../product/Product.jsx";
import MetaData from "../MetaData.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../store/slices/products.jsx";
import { toast, ToastContainer } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css';
import ApplyFilters from "../filter/ApplyFilters.jsx";
import { Link } from "react-router-dom";

const Home = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const { products, status, error, productCount, minPrice, maxPrice, filteredProductCount, applyFilter, keyword } = useSelector((state) => (state.Products))
  // console.log(products);
  let comparePagination = productCount;
  if (productCount !== filteredProductCount) comparePagination = filteredProductCount;

  useEffect(() => {
    dispatch(fetchAllProducts({ currentPage, minPrice, maxPrice, keyword, category: applyFilter.category, ratings: applyFilter.ratings }));
  }, [dispatch, currentPage, minPrice, maxPrice, applyFilter, keyword])

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

  return (
    <>
      <MetaData title={`Discover Products with EliteHub`} />

      <div className="py-2 py-md-3 bg-light">
        <div className="row">
          <div className="col-2 sidebar-filter-section">
            <ApplyFilters />
          </div>

          <div className="col">
            <div className="row">
              <div className="col-md-12">
                <h4 className="mb-4">Our Products</h4>

              </div>
              {status === 'loading' ? (<div className="d-flex justify-content-center">
                <div className="spinner-grow text-primary" role="status">
                  <span className="visually-hidden"></span>
                </div></div>) : !products || !Array.isArray(products) || products.length === 0 ? <div className="col-md-9 col-sm-12 px-lg-5 pt-sm-3 pt-md-0 pt-3" style={{ marginTop: '50px', textAlign: 'center' }}>
                  <div className="error-message">
                    <p>Oops! The Orders is currently not available.</p>
                  </div>
                  <div className="home-link">
                    <p><Link to="/">Go back to the home page</Link></p>
                  </div>
                </div> : (products.map((product, idx) => (<Product key={idx} product={product} />)))}
            </div>

            {status !== 'loading' && PAGE_SIZE < comparePagination && <div className="pagination-section">
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
          </div>

        </div>
      </div>
    </>
  );
};

export default Home;
