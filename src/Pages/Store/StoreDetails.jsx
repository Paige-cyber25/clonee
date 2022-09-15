import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { authUserDetails, isLoggedIn, pageModalReset, responseMessage, uploadSelectedFiles } from '../../libs/app'
import { FilePond, registerPlugin } from 'react-filepond'
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const StoreDetails = () => {

    const { user, store, token } = authUserDetails();
    const [errors, setErrors] = useState(null);
    const [storeInformation, setStoreInformation] = useState(store);
    const [storeAddress, setStoreAddress] = useState(null);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);

    useEffect(() => {
        getAddressInformation()
        getCountries()
    }, []);

    async function getCountries() {

        try {
            var request = axios.get('/countries');
            var response = (await request).data;

            if (response.success) {
                setCountries(response.data);
            }

        } catch (error) { }
    }

    async function getStates(country_id) {
        try {
            var request = axios.get(`/states/${country_id}`);
            var response = (await request).data;

            if (response.success) {
                setStates(response.data);
            }

        } catch (error) { }
    }

    async function getAddressInformation() {

        try {
            var request = axios.get('/settings/address-information');
            var response = (await request).data;

            if (response.success) {
                setStoreAddress(response.address);
            }
        } catch (error) {
        }
    }

    async function uploadCompanyLogo(selectedFiles) {

        var response = (await uploadSelectedFiles(selectedFiles, {
            field: 'image',
            data: {
                store_id: store.id
            }
        }));

        if (response.success) {

            localStorage.setItem('store', JSON.stringify({ ...store, logo: response.image }));
            responseMessage('Image has been uploaded successfully!', 'success')
        }
        else {
            responseMessage('Unable to upload image, please try again', 'error')
        }
    }

    async function saveStoreInformation() {

        try {

            var request = axios.put('/settings/update/personal-infomation', storeInformation);
            var response = (await request).data;

            if (response.success) {
                responseMessage(response.message, 'success')
                localStorage.setItem('store', response.store);
            }

            pageModalReset("#myModal");

        } catch (error) {
            console.log(error);
            if (error.response) {
                responseMessage(error.response.error.message, 'error')
                return;
            }

            responseMessage('Something went wrong, please try again', 'error')
        }

    }

    async function saveStoreAddress() {

        try {

            var request = axios.put('/settings/update/address-infomation', storeAddress);
            var response = (await request).data;

            if (response.success) {
                responseMessage(response.message, 'success')
                localStorage.setItem('store', response.store);
            }

            pageModalReset("#addressModal");

        } catch (error) {
            console.log(error);
            if (error.response) {
                responseMessage(error.response.error.message, 'error')
                return;
            }

            responseMessage('Something went wrong, please try again', 'error')
        }

    }

    const handleFieldChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setStoreInformation({ ...storeInformation, [name]: value });
    }

    const handleAddressFieldChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setStoreAddress({ ...storeAddress, [name]: value });
    }

    return (
        <>
            <div className="page-content">
                <div className="container-fluid">


                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Store Details</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#">Store Settings</a></li>
                                        <li className="breadcrumb-item active">Details</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-xxl-6">
                            <div className="card">
                                <div className="card-header align-items-center d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">Store Information</h4>
                                    <div className="flex-shrink-0">
                                        <div className="form-check form-switch form-switch-right form-switch-md">
                                            <label htmlFor="default-modal" className="form-label text-muted">Show on Store</label>
                                            <input className="form-check-input code-switcher" type="checkbox" id="default-modal" />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p className="text-muted text-muted">Details about your store to engage more customers, build more visibility and gain trust.</p>
                                    <div className="live-preview">
                                        <div>
                                            <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#myModal">Update Information</button>
                                            <div id="myModal" className="modal fade" tabIndex="-1" aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: "none" }}>
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="myModalLabel">Store Information</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <form action="" method="POST" className="form" id="storeInformationForm" encType="multipart/form-data">
                                                                <div className="card-body">

                                                                    <div className="form-group row mb-3">
                                                                        <label className="col-xl-3 col-lg-3 col-form-label text-right">Store Logo</label>
                                                                        <div className="col-lg-9 col-xl-9">
                                                                            {
                                                                                store.picture !== null ? (
                                                                                    <div className="image-input-wrapper" style={{ backgroundImage: `url(/storage/stores/${store.picture})` }}></div>
                                                                                ) : (
                                                                                    <div className="image-input-wrapper" style={{ backgroundImage: "url(/assets/images/blank.png)" }}></div>
                                                                                )
                                                                            }
                                                                            <FilePond allowMultiple={true} maxFiles={1} server="http://dev.wearslot.com/api/settings/update/store-logo" />
                                                                            <span className="form-text text-muted">Allowed file types: png, jpg, jpeg.</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-group row mb-3">
                                                                        <label className="col-xl-3 col-lg-3 col-form-label text-right">Store Name</label>
                                                                        <div className="col-lg-9 col-xl-9">
                                                                            <input className="form-control form-control-solid" disabled name="store_name" type="text" value={store.vendor_name || ''}
                                                                                onChange={(e) => null} />
                                                                            <p className="form-text text-muted">Store name is not editable, if you're willing change your store name. Kindly <a href="">Contact Support</a>.</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group row mb-3">
                                                                        <label className="col-xl-3 col-lg-3 col-form-label text-right">Store Bio (optional)</label>
                                                                        <div className="col-lg-9 col-xl-9">
                                                                            <textarea className="form-control form-control-solid" rows="5" name="description" value={store.description || ''}
                                                                                onChange={(e) => {
                                                                                    handleFieldChange(e)
                                                                                }}></textarea>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group row mb-3">
                                                                        <label className="col-xl-3 col-lg-3 col-form-label text-right">Facebook</label>
                                                                        <div className="col-lg-9 col-xl-9">
                                                                            <div className="input-group input-group-solid">
                                                                                <div className="input-group-prepend">
                                                                                    <span className="input-group-text">
                                                                                        <i className="la la-facebook"></i>
                                                                                    </span>
                                                                                </div>
                                                                                <input type="text" className="form-control form-control-solid" name="facebook"
                                                                                    value={store.facebook || ''} placeholder=" e.g @wearslot" onChange={(e) => {
                                                                                        handleFieldChange(e)
                                                                                    }} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group row mb-3">
                                                                        <label className="col-xl-3 col-lg-3 col-form-label text-right">Instagram</label>
                                                                        <div className="col-lg-9 col-xl-9">
                                                                            <div className="input-group input-group-solid">
                                                                                <div className="input-group-prepend">
                                                                                    <span className="input-group-text">
                                                                                        <i className="la la-instagram"></i>
                                                                                    </span>
                                                                                </div>
                                                                                <input type="text" className="form-control form-control-solid" name="instagram"
                                                                                    value={store.instagram || ''} placeholder=" e.g @wearslot" onChange={(e) => {
                                                                                        handleFieldChange(e)
                                                                                    }} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <label className="col-xl-3"></label>
                                                                        <div className="col-lg-9 col-xl-9">
                                                                            <h5 className="font-weight-bold mt-10 mb-6">Contact Info</h5>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group row mb-3">
                                                                        <label className="col-xl-3 col-lg-3 col-form-label text-right">Contact Phone</label>
                                                                        <div className="col-lg-9 col-xl-9">
                                                                            <div className="input-group input-group-solid">
                                                                                <div className="input-group-prepend">
                                                                                    <span className="input-group-text">
                                                                                        <i className="la la-phone"></i>
                                                                                    </span>
                                                                                </div>
                                                                                <input type="text" className="form-control form-control-solid" name="contact_phone"
                                                                                    value={store.phone || ''} placeholder=" Phone" onChange={(e) => {
                                                                                        handleFieldChange(e)
                                                                                    }} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group row mb-3">
                                                                        <label className="col-xl-3 col-lg-3 col-form-label text-right">Email Address</label>
                                                                        <div className="col-lg-9 col-xl-9">
                                                                            <div className="input-group input-group-solid">
                                                                                <div className="input-group-prepend">
                                                                                    <span className="input-group-text">
                                                                                        <i className="la la-at"></i>
                                                                                    </span>
                                                                                </div>
                                                                                <input type="email" name="email" className="form-control form-control-solid" value={store.vendor_email || ''}
                                                                                    placeholder=" Email"
                                                                                    onChange={(e) => {
                                                                                        handleFieldChange(e)
                                                                                    }} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group row mb-3">
                                                                        <label className="col-xl-3 col-lg-3 col-form-label text-right">Website</label>
                                                                        <div className="col-lg-9 col-xl-9">
                                                                            <div className="input-group input-group-solid">
                                                                                <input type="text" name="website" className="form-control form-control-solid" placeholder=" e.g www.wearslot.com"
                                                                                    value={store.website || ''}
                                                                                    onChange={(e) => {
                                                                                        handleFieldChange(e)
                                                                                    }} />
                                                                                <div className="input-group-append">
                                                                                    <span className="input-group-text">
                                                                                        <i className="la la-globe"></i>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" className="btn btn-primary" onClick={() => {
                                                                saveStoreInformation()
                                                            }}>Save Changes</button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-6">
                            <div className="card">
                                <div className="card-header align-items-center d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">Address Information</h4>
                                    <div className="flex-shrink-0">
                                        <div className="form-check form-switch form-switch-right form-switch-md">
                                            <label htmlFor="default-modal" className="form-label text-muted">Show on Store</label>
                                            <input className="form-check-input code-switcher" type="checkbox" id="default-modal" />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p className="text-muted">Add your address physical store locations to enable customers locate you.</p>
                                    <div className="live-preview">
                                        <div>
                                            <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#addressModal">Update Address</button>
                                            <div id="addressModal" className="modal fade" tabIndex="-1" aria-labelledby="addressModalLabel" aria-hidden="true" style={{ display: "none" }}>
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="addressModalLabel">Store Address</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <form action="" method="POST" className="form" id="storeAddressForm" encType="multipart/form-data">
                                                                <div className="card-body">
                                                                    <div className="form-group row mb-3">
                                                                        <label className="col-xl-3 col-lg-3 col-form-label text-right">Suite, Apt no.</label>
                                                                        <div className="col-lg-9 col-xl-9">
                                                                            <input type="text" className="form-control form-control-solid" name="additional_address"
                                                                                value={storeAddress?.additional_address || ''} placeholder="Suite, Apt."
                                                                                onChange={(e) => handleAddressFieldChange(e)} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group row mb-3">
                                                                        <label className="col-xl-3 col-lg-3 col-form-label text-right">street</label>
                                                                        <div className="col-lg-9 col-xl-9">
                                                                            <input className="form-control form-control-solid" name="street" type="text" value={storeAddress?.street || ''}
                                                                                onChange={(e) => handleAddressFieldChange(e)} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group row mb-3">
                                                                        <label className="col-xl-3 col-lg-3 col-form-label text-right">City</label>
                                                                        <div className="col-lg-9 col-xl-9">
                                                                            <input className="form-control form-control-solid" name="city" type="text"
                                                                                placeholder="City" value={storeAddress?.city || ''} onChange={(e) => handleAddressFieldChange(e)} />
                                                                        </div>
                                                                    </div>
                                                                    <div className='form-group row mb-3'>
                                                                        <label className='col-xl-3 col-lg-3 col-form-label text-right'>Country</label>
                                                                        <div className='col-lg-9 col-xl-9'>
                                                                            <select className="form-select" name="country_id" aria-label=".form-select-sm example" onChange={e => { handleAddressFieldChange(e); getStates(e.target.value)}}>
                                                                                <option disabled selected>Select country</option>
                                                                                {
                                                                                    countries.map((country, index) => (
                                                                                        storeAddress.country_id === country.id
                                                                                        ? <option key={index} selected value={country.id}>{country.name}</option>
                                                                                        : <option key={index} value={country.id}>{country.name}</option>
                                                                                    ))
                                                                                }
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className='form-group row mb-3'>
                                                                        <label className='col-xl-3 col-lg-3 col-form-label text-right'>State</label>
                                                                        <div className='col-lg-9 col-xl-9'>
                                                                            <select className="form-select" name='state_id' aria-label=".form-select-sm example" onChange={e => handleAddressFieldChange(e)}>
                                                                                <option disabled selected>Select state</option>
                                                                                {
                                                                                    states.map((state, index) => (
                                                                                        storeAddress.state_id === state.id
                                                                                            ? <option key={index} selected value={state.id}>{state.name}</option>
                                                                                            : <option key={index} value={state.id}>{state.name}</option>
                                                                                    ))
                                                                                }
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group row">
                                                                        <label className="col-xl-3 col-lg-3 col-form-label text-right">Zip Code</label>
                                                                        <div className="col-lg-9 col-xl-9">
                                                                            <input type="text" name="zip" className="form-control form-control-solid"
                                                                                placeholder="Zip Code" value={storeAddress?.zip || ''} onChange={(e) => handleAddressFieldChange(e)} />
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" className="btn btn-primary" onClick={() => {
                                                                saveStoreAddress()
                                                            }}>Save Changes</button>
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
            <Outlet />
        </>
    )
}

export default StoreDetails