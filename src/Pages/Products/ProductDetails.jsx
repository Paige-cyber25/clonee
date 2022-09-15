import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';

const ProductDetails = () => {

    return(
        <>
            <div className="page-content">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Product Details</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="">Ecommerce</Link></li>
                                        <li className="breadcrumb-item active">Product Details</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row gx-lg-5">
                                        <div className="col-xl-4 col-md-8 mx-auto">
                                            <div className="product-img-slider sticky-side-div">
                                                <div className="swiper product-thumbnail-slider p-2 rounded bg-light">
                                                    <div className="swiper-wrapper">
                                                        <div className="swiper-slide">
                                                            <img src="/assets/images/products/img-8.png" alt=""
                                                                className="img-fluid d-block" />
                                                        </div>
                                                        <div className="swiper-slide">
                                                            <img src="/assets/images/products/img-6.png" alt=""
                                                                className="img-fluid d-block" />
                                                        </div>
                                                        <div className="swiper-slide">
                                                            <img src="/assets/images/products/img-1.png" alt=""
                                                                className="img-fluid d-block" />
                                                        </div>
                                                        <div className="swiper-slide">
                                                            <img src="/assets/images/products/img-8.png" alt=""
                                                                className="img-fluid d-block" />
                                                        </div>
                                                    </div>
                                                    <div className="swiper-button-next"></div>
                                                    <div className="swiper-button-prev"></div>
                                                </div>
                                                
                                                <div className="swiper product-nav-slider mt-2">
                                                    <div className="swiper-wrapper">
                                                        <div className="swiper-slide">
                                                            <div className="nav-slide-item ">
                                                                <img src="/assets/images/products/img-8.png" alt=""
                                                                    className="img-fluid d-block" />
                                                            </div>
                                                        </div>
                                                        <div className="swiper-slide">
                                                            <div className="nav-slide-item">
                                                                <img src="/assets/images/products/img-6.png" alt=""
                                                                    className="img-fluid d-block" />
                                                            </div>
                                                        </div>
                                                        <div className="swiper-slide">
                                                            <div className="nav-slide-item">
                                                                <img src="/assets/images/products/img-1.png" alt=""
                                                                    className="img-fluid d-block" />
                                                            </div>
                                                        </div>
                                                        <div className="swiper-slide">
                                                            <div className="nav-slide-item">
                                                                <img src="/assets/images/products/img-8.png" alt=""
                                                                    className="img-fluid d-block" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        

                                        <div className="col-xl-8">
                                            <div className="mt-xl-0 mt-5">
                                                <div className="d-flex">
                                                    <div className="flex-grow-1">
                                                        <h4>Full Sleeve Sweatshirt for Men (Pink)</h4>
                                                        <div className="hstack gap-3 flex-wrap">
                                                            <div><Link to="#" className="text-primary d-block">Tommy
                                                                    Hilfiger</Link></div>
                                                            <div className="vr"></div>
                                                            <div className="text-muted">Seller : <span
                                                                    className="text-body fw-medium">Zoetic Fashion</span>
                                                            </div>
                                                            <div className="vr"></div>
                                                            <div className="text-muted">Published : <span
                                                                    className="text-body fw-medium">26 Mar, 2021</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        <div>
                                                            <Link to="apps-ecommerce-add-product.html"
                                                                className="btn btn-light" data-bs-toggle="tooltip"
                                                                data-bs-placement="top" title="Edit"><i
                                                                    className="ri-pencil-fill align-bottom"></i></Link>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-wrap gap-2 align-items-center mt-3">
                                                    <div className="text-muted fs-16">
                                                        <span className="mdi mdi-star text-warning"></span>
                                                        <span className="mdi mdi-star text-warning"></span>
                                                        <span className="mdi mdi-star text-warning"></span>
                                                        <span className="mdi mdi-star text-warning"></span>
                                                        <span className="mdi mdi-star text-warning"></span>
                                                    </div>
                                                    <div className="text-muted">( 5.50k Customer Review )</div>
                                                </div>

                                                <div className="row mt-4">
                                                    <div className="col-lg-3 col-sm-6">
                                                        <div className="p-2 border border-dashed rounded">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-sm me-2">
                                                                    <div
                                                                        className="avatar-title rounded bg-transparent text-info fs-24">
                                                                        <i className="ri-money-dollar-circle-fill"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <p className="text-muted mb-1">Price :</p>
                                                                    <h5 className="mb-0">$120.40</h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col-lg-3 col-sm-6">
                                                        <div className="p-2 border border-dashed rounded">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-sm me-2">
                                                                    <div
                                                                        className="avatar-title rounded bg-transparent text-info fs-24">
                                                                        <i className="ri-file-copy-2-fill"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <p className="text-muted mb-1">No. of Orders :</p>
                                                                    <h5 className="mb-0">2,234</h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col-lg-3 col-sm-6">
                                                        <div className="p-2 border border-dashed rounded">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-sm me-2">
                                                                    <div
                                                                        className="avatar-title rounded bg-transparent text-info fs-24">
                                                                        <i className="ri-stack-fill"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <p className="text-muted mb-1">Available Stocks :</p>
                                                                    <h5 className="mb-0">1,230</h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col-lg-3 col-sm-6">
                                                        <div className="p-2 border border-dashed rounded">
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-sm me-2">
                                                                    <div
                                                                        className="avatar-title rounded bg-transparent text-info fs-24">
                                                                        <i className="ri-inbox-archive-fill"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <p className="text-muted mb-1">Total Revenue :</p>
                                                                    <h5 className="mb-0">$60,645</h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>

                                                <div className="row">
                                                    <div className="col-xl-6">
                                                        <div className=" mt-4">
                                                            <h5 className="fs-14">Sizes :</h5>
                                                            <div className="d-flex flex-wrap gap-2">
                                                                <div data-bs-toggle="tooltip" data-bs-trigger="hover"
                                                                    data-bs-placement="top" title="Out of Stock">
                                                                    <input type="radio" className="btn-check"
                                                                        name="productsize-radio" id="productsize-radio1"
                                                                        disabled />
                                                                    <label
                                                                        className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center"
                                                                        htmlFor="productsize-radio1">S</label>
                                                                </div>

                                                                <div data-bs-toggle="tooltip" data-bs-trigger="hover"
                                                                    data-bs-placement="top" title="04 Items Available">
                                                                    <input type="radio" className="btn-check"
                                                                        name="productsize-radio"
                                                                        id="productsize-radio2" />
                                                                    <label
                                                                        className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center"
                                                                        htmlFor="productsize-radio2">M</label>
                                                                </div>
                                                                <div data-bs-toggle="tooltip" data-bs-trigger="hover"
                                                                    data-bs-placement="top" title="06 Items Available">
                                                                    <input type="radio" className="btn-check"
                                                                        name="productsize-radio"
                                                                        id="productsize-radio3" />
                                                                    <label
                                                                        className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center"
                                                                        htmlFor="productsize-radio3">L</label>
                                                                </div>

                                                                <div data-bs-toggle="tooltip" data-bs-trigger="hover"
                                                                    data-bs-placement="top" title="Out of Stock">
                                                                    <input type="radio" className="btn-check"
                                                                        name="productsize-radio" id="productsize-radio4"
                                                                        disabled />
                                                                    <label
                                                                        className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center"
                                                                        htmlFor="productsize-radio4">XL</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    

                                                    <div className="col-xl-6">
                                                        <div className=" mt-4">
                                                            <h5 className="fs-14">Colors :</h5>
                                                            <div className="d-flex flex-wrap gap-2">
                                                                <div data-bs-toggle="tooltip" data-bs-trigger="hover"
                                                                    data-bs-placement="top" title="Out of Stock">
                                                                    <button type="button"
                                                                        className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-primary"
                                                                        disabled>
                                                                        <i className="ri-checkbox-blank-circle-fill"></i>
                                                                    </button>
                                                                </div>
                                                                <div data-bs-toggle="tooltip" data-bs-trigger="hover"
                                                                    data-bs-placement="top" title="03 Items Available">
                                                                    <button type="button"
                                                                        className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-secondary">
                                                                        <i className="ri-checkbox-blank-circle-fill"></i>
                                                                    </button>
                                                                </div>
                                                                <div data-bs-toggle="tooltip" data-bs-trigger="hover"
                                                                    data-bs-placement="top" title="03 Items Available">
                                                                    <button type="button"
                                                                        className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-success">
                                                                        <i className="ri-checkbox-blank-circle-fill"></i>
                                                                    </button>
                                                                </div>
                                                                <div data-bs-toggle="tooltip" data-bs-trigger="hover"
                                                                    data-bs-placement="top" title="02 Items Available">
                                                                    <button type="button"
                                                                        className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-info">
                                                                        <i className="ri-checkbox-blank-circle-fill"></i>
                                                                    </button>
                                                                </div>
                                                                <div data-bs-toggle="tooltip" data-bs-trigger="hover"
                                                                    data-bs-placement="top" title="01 Items Available">
                                                                    <button type="button"
                                                                        className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-warning">
                                                                        <i className="ri-checkbox-blank-circle-fill"></i>
                                                                    </button>
                                                                </div>
                                                                <div data-bs-toggle="tooltip" data-bs-trigger="hover"
                                                                    data-bs-placement="top" title="04 Items Available">
                                                                    <button type="button"
                                                                        className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-danger">
                                                                        <i className="ri-checkbox-blank-circle-fill"></i>
                                                                    </button>
                                                                </div>
                                                                <div data-bs-toggle="tooltip" data-bs-trigger="hover"
                                                                    data-bs-placement="top" title="03 Items Available">
                                                                    <button type="button"
                                                                        className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-light">
                                                                        <i className="ri-checkbox-blank-circle-fill"></i>
                                                                    </button>
                                                                </div>
                                                                <div data-bs-toggle="tooltip" data-bs-trigger="hover"
                                                                    data-bs-placement="top" title="04 Items Available">
                                                                    <button type="button"
                                                                        className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-dark">
                                                                        <i className="ri-checkbox-blank-circle-fill"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                                

                                                <div className="mt-4 text-muted">
                                                    <h5 className="fs-14">Description :</h5>
                                                    <p>Tommy Hilfiger men striped pink sweatshirt. Crafted with cotton.
                                                        Material composition is 100% organic cotton. This is one of the
                                                        world’s leading designer lifestyle brands and is internationally
                                                        recognized for celebrating the essence of classic American cool
                                                        style, featuring preppy with a twist designs.</p>
                                                </div>

                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="mt-3">
                                                            <h5 className="fs-14">Features :</h5>
                                                            <ul className="list-unstyled">
                                                                <li className="py-1"><i
                                                                        className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>
                                                                    Full Sleeve</li>
                                                                <li className="py-1"><i
                                                                        className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>
                                                                    Cotton</li>
                                                                <li className="py-1"><i
                                                                        className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>
                                                                    All Sizes available</li>
                                                                <li className="py-1"><i
                                                                        className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>
                                                                    4 Different Color</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="mt-3">
                                                            <h5 className="fs-14">Services :</h5>
                                                            <ul className="list-unstyled product-desc-list">
                                                                <li className="py-1">10 Days Replacement</li>
                                                                <li className="py-1">Cash on Delivery available</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="product-content mt-5">
                                                    <h5 className="fs-14 mb-3">Product Description :</h5>
                                                    <nav>
                                                        <ul className="nav nav-tabs nav-tabs-custom nav-success"
                                                            id="nav-tab" role="tablist">
                                                            <li className="nav-item">
                                                                <Link className="nav-link active" id="nav-speci-tab"
                                                                    data-bs-toggle="tab" to="#nav-speci" role="tab"
                                                                    aria-controls="nav-speci"
                                                                    aria-selected="true">Specification</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link className="nav-link" id="nav-detail-tab"
                                                                    data-bs-toggle="tab" to="#nav-detail" role="tab"
                                                                    aria-controls="nav-detail"
                                                                    aria-selected="false">Details</Link>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                    <div className="tab-content border border-top-0 p-4"
                                                        id="nav-tabContent">
                                                        <div className="tab-pane fade show active" id="nav-speci"
                                                            role="tabpanel" aria-labelledby="nav-speci-tab">
                                                            <div className="table-responsive">
                                                                <table className="table mb-0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <th scope="row" style={{width: '200px'}}>
                                                                                Category</th>
                                                                            <td>T-Shirt</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th scope="row">Brand</th>
                                                                            <td>Tommy Hilfiger</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th scope="row">Color</th>
                                                                            <td>Blue</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th scope="row">Material</th>
                                                                            <td>Cotton</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th scope="row">Weight</th>
                                                                            <td>140 Gram</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade" id="nav-detail" role="tabpanel"
                                                            aria-labelledby="nav-detail-tab">
                                                            <div>
                                                                <h5 className="font-size-16 mb-3">Tommy Hilfiger Sweatshirt
                                                                    for Men (Pink)</h5>
                                                                <p>Tommy Hilfiger men striped pink sweatshirt. Crafted
                                                                    with cotton. Material composition is 100% organic
                                                                    cotton. This is one of the world’s leading designer
                                                                    lifestyle brands and is internationally recognized
                                                                    for celebrating the essence of classic American cool
                                                                    style, featuring preppy with a twist designs.</p>
                                                                <div>
                                                                    <p className="mb-2"><i
                                                                            className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>
                                                                        Machine Wash</p>
                                                                    <p className="mb-2"><i
                                                                            className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>
                                                                        Fit Type: Regular</p>
                                                                    <p className="mb-2"><i
                                                                            className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>
                                                                        100% Cotton</p>
                                                                    <p className="mb-0"><i
                                                                            className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>
                                                                        Long sleeve</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                

                                                <div className="mt-5">
                                                    <div>
                                                        <h5 className="fs-14 mb-3">Ratings & Reviews</h5>
                                                    </div>
                                                    <div className="row gy-4 gx-0">
                                                        <div className="col-lg-4">
                                                            <div>
                                                                <div className="pb-3">
                                                                    <div className="bg-light px-3 py-2 rounded-2 mb-2">
                                                                        <div className="d-flex align-items-center">
                                                                            <div className="flex-grow-1">
                                                                                <div
                                                                                    className="fs-16 align-middle text-warning">
                                                                                    <i className="ri-star-fill"></i>
                                                                                    <i className="ri-star-fill"></i>
                                                                                    <i className="ri-star-fill"></i>
                                                                                    <i className="ri-star-fill"></i>
                                                                                    <i className="ri-star-half-fill"></i>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex-shrink-0">
                                                                                <h6 className="mb-0">4.5 out of 5</h6>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-center">
                                                                        <div className="text-muted">Total <span
                                                                                className="fw-medium">5.50k</span> reviews
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="mt-3">
                                                                    <div className="row align-items-center g-2">
                                                                        <div className="col-auto">
                                                                            <div className="p-2">
                                                                                <h6 className="mb-0">5 star</h6>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col">
                                                                            <div className="p-2">
                                                                                <div
                                                                                    className="progress animated-progress progress-sm">
                                                                                    <div className="progress-bar bg-success"
                                                                                        role="progressbar"
                                                                                        style={{width: '50.16%'}}
                                                                                        aria-valuenow="50.16"
                                                                                        aria-valuemin="0"
                                                                                        aria-valuemax="100"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-auto">
                                                                            <div className="p-2">
                                                                                <h6 className="mb-0 text-muted">2758</h6>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    

                                                                    <div className="row align-items-center g-2">
                                                                        <div className="col-auto">
                                                                            <div className="p-2">
                                                                                <h6 className="mb-0">4 star</h6>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col">
                                                                            <div className="p-2">
                                                                                <div
                                                                                    className="progress animated-progress progress-sm">
                                                                                    <div className="progress-bar bg-success"
                                                                                        role="progressbar"
                                                                                        style={{width: '19.32%'}}
                                                                                        aria-valuenow="19.32"
                                                                                        aria-valuemin="0"
                                                                                        aria-valuemax="100"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-auto">
                                                                            <div className="p-2">
                                                                                <h6 className="mb-0 text-muted">1063</h6>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    

                                                                    <div className="row align-items-center g-2">
                                                                        <div className="col-auto">
                                                                            <div className="p-2">
                                                                                <h6 className="mb-0">3 star</h6>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col">
                                                                            <div className="p-2">
                                                                                <div
                                                                                    className="progress animated-progress progress-sm">
                                                                                    <div className="progress-bar bg-success"
                                                                                        role="progressbar"
                                                                                        style={{width: '18.12%'}}
                                                                                        aria-valuenow="18.12"
                                                                                        aria-valuemin="0"
                                                                                        aria-valuemax="100"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-auto">
                                                                            <div className="p-2">
                                                                                <h6 className="mb-0 text-muted">997</h6>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    

                                                                    <div className="row align-items-center g-2">
                                                                        <div className="col-auto">
                                                                            <div className="p-2">
                                                                                <h6 className="mb-0">2 star</h6>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col">
                                                                            <div className="p-2">
                                                                                <div
                                                                                    className="progress animated-progress progress-sm">
                                                                                    <div className="progress-bar bg-warning"
                                                                                        role="progressbar"
                                                                                        style={{width: '7.42%'}}
                                                                                        aria-valuenow="7.42"
                                                                                        aria-valuemin="0"
                                                                                        aria-valuemax="100"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-auto">
                                                                            <div className="p-2">
                                                                                <h6 className="mb-0 text-muted">408</h6>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    

                                                                    <div className="row align-items-center g-2">
                                                                        <div className="col-auto">
                                                                            <div className="p-2">
                                                                                <h6 className="mb-0">1 star</h6>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col">
                                                                            <div className="p-2">
                                                                                <div
                                                                                    className="progress animated-progress progress-sm">
                                                                                    <div className="progress-bar bg-danger"
                                                                                        role="progressbar"
                                                                                        style={{width: "4.98%"}}
                                                                                        aria-valuenow="4.98"
                                                                                        aria-valuemin="0"
                                                                                        aria-valuemax="100"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-auto">
                                                                            <div className="p-2">
                                                                                <h6 className="mb-0 text-muted">274</h6>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                        

                                                        <div className="col-lg-8">
                                                            <div className="ps-lg-4">
                                                                <div className="d-flex flex-wrap align-items-start gap-3">
                                                                    <h5 className="fs-14">Reviews: </h5>
                                                                </div>

                                                                <SimpleBar id="scrollbar" className="me-lg-n3 pe-lg-4" style={{maxHeight: "225px"}}>
                                                                    <ul className="list-unstyled mb-0">
                                                                        <li className="py-2">
                                                                            <div
                                                                                className="border border-dashed rounded p-3">
                                                                                <div
                                                                                    className="d-flex align-items-start mb-3">
                                                                                    <div className="hstack gap-3">
                                                                                        <div
                                                                                            className="badge rounded-pill bg-success mb-0">
                                                                                            <i className="mdi mdi-star"></i>
                                                                                            4.2</div>
                                                                                        <div className="vr"></div>
                                                                                        <div className="flex-grow-1">
                                                                                            <p className="text-muted mb-0">
                                                                                                Superb sweatshirt. I
                                                                                                loved it. It is for
                                                                                                winter.</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div
                                                                                    className="d-flex flex-grow-1 gap-2 mb-3">
                                                                                    <Link to="#" className="d-block">
                                                                                        <img src="/assets/images/small/img-12.jpg"
                                                                                            alt=""
                                                                                            className="avatar-sm rounded object-cover" />
                                                                                    </Link>
                                                                                    <Link to="#" className="d-block">
                                                                                        <img src="/assets/images/small/img-11.jpg"
                                                                                            alt=""
                                                                                            className="avatar-sm rounded object-cover" />
                                                                                    </Link>
                                                                                    <Link to="#" className="d-block">
                                                                                        <img src="/assets/images/small/img-10.jpg"
                                                                                            alt=""
                                                                                            className="avatar-sm rounded object-cover" />
                                                                                    </Link>
                                                                                </div>

                                                                                <div className="d-flex align-items-end">
                                                                                    <div className="flex-grow-1">
                                                                                        <h5 className="fs-14 mb-0">Henry
                                                                                        </h5>
                                                                                    </div>

                                                                                    <div className="flex-shrink-0">
                                                                                        <p
                                                                                            className="text-muted fs-13 mb-0">
                                                                                            12 Jul, 21</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                        <li className="py-2">
                                                                            <div
                                                                                className="border border-dashed rounded p-3">
                                                                                <div
                                                                                    className="d-flex align-items-start mb-3">
                                                                                    <div className="hstack gap-3">
                                                                                        <div
                                                                                            className="badge rounded-pill bg-success mb-0">
                                                                                            <i className="mdi mdi-star"></i>
                                                                                            4.0</div>
                                                                                        <div className="vr"></div>
                                                                                        <div className="flex-grow-1">
                                                                                            <p className="text-muted mb-0">
                                                                                                Great at this price,
                                                                                                Product quality and look
                                                                                                is awesome.</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="d-flex align-items-end">
                                                                                    <div className="flex-grow-1">
                                                                                        <h5 className="fs-14 mb-0">Nancy
                                                                                        </h5>
                                                                                    </div>

                                                                                    <div className="flex-shrink-0">
                                                                                        <p
                                                                                            className="text-muted fs-13 mb-0">
                                                                                            06 Jul, 21</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>

                                                                        <li className="py-2">
                                                                            <div
                                                                                className="border border-dashed rounded p-3">
                                                                                <div
                                                                                    className="d-flex align-items-start mb-3">
                                                                                    <div className="hstack gap-3">
                                                                                        <div
                                                                                            className="badge rounded-pill bg-success mb-0">
                                                                                            <i className="mdi mdi-star"></i>
                                                                                            4.2</div>
                                                                                        <div className="vr"></div>
                                                                                        <div className="flex-grow-1">
                                                                                            <p className="text-muted mb-0">
                                                                                                Good product. I am so
                                                                                                happy.</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="d-flex align-items-end">
                                                                                    <div className="flex-grow-1">
                                                                                        <h5 className="fs-14 mb-0">Joseph
                                                                                        </h5>
                                                                                    </div>

                                                                                    <div className="flex-shrink-0">
                                                                                        <p
                                                                                            className="text-muted fs-13 mb-0">
                                                                                            06 Jul, 21</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>

                                                                        <li className="py-2">
                                                                            <div
                                                                                className="border border-dashed rounded p-3">
                                                                                <div
                                                                                    className="d-flex align-items-start mb-3">
                                                                                    <div className="hstack gap-3">
                                                                                        <div
                                                                                            className="badge rounded-pill bg-success mb-0">
                                                                                            <i className="mdi mdi-star"></i>
                                                                                            4.1</div>
                                                                                        <div className="vr"></div>
                                                                                        <div className="flex-grow-1">
                                                                                            <p className="text-muted mb-0">
                                                                                                Nice Product, Good
                                                                                                Quality.</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="d-flex align-items-end">
                                                                                    <div className="flex-grow-1">
                                                                                        <h5 className="fs-14 mb-0">Jimmy
                                                                                        </h5>
                                                                                    </div>

                                                                                    <div className="flex-shrink-0">
                                                                                        <p
                                                                                            className="text-muted fs-13 mb-0">
                                                                                            24 Jun, 21</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </li>

                                                                    </ul>
                                                                </SimpleBar>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            <Outlet/>
        </>
    );
};


export default ProductDetails;