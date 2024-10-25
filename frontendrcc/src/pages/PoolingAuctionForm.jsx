import React, { useState } from 'react';
import axios from 'axios';

const PoolingAuctionForm = ({ fetchPoolingAuctions }) => {
    const [formData, setFormData] = useState({
        ChallanNo: '',
        Date: '',
        VehicleNo: '',
        SupplierID: '',
        QuantityInKGS: '',
        RateINR: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/pooling-auctions', formData);
        fetchPoolingAuctions();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="ChallanNo" placeholder="Challan No" value={formData.ChallanNo} onChange={handleChange} />
            <input type="date" name="Date" placeholder="Date" value={formData.Date} onChange={handleChange} />
            <input name="VehicleNo" placeholder="Vehicle No" value={formData.VehicleNo} onChange={handleChange} />
            <input name="SupplierID" placeholder="Supplier ID" value={formData.SupplierID} onChange={handleChange} />
            <input name="QuantityInKGS" placeholder="Quantity in KGS" value={formData.QuantityInKGS} onChange={handleChange} />
            <input name="RateINR" placeholder="Rate INR" value={formData.RateINR} onChange={handleChange} />
            <button type="submit">Add Pooling Auction</button>
        </form>
    );
};

export default PoolingAuctionForm;
