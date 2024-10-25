import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import SalesForm from './SalesForm';

const PoolingAuctionList = () => {
    const [poolingAuctions, setPoolingAuctions] = useState([]);

    const fetchPoolingAuctions = async () => {
        const response = await axios.get('/api/pooling-auctions');
        setPoolingAuctions(response.data);
    };

    useEffect(() => {
        fetchPoolingAuctions();
    }, []);

    return (
        <div>
            {poolingAuctions && poolingAuctions.length && poolingAuctions.map(auction => {
                const totalKgsSold = auction.SalesDetails && auction.SalesDetails.reduce((sum, sale) => sum + sale.KgsSold, 0);
                const kgsDifference = auction.QuantityInKGS - totalKgsSold;
                return (
                    <div key={auction.ChallanNo}>
                        <h3>Challan No: {auction.ChallanNo}</h3>
                        <p>Date: {new Date(auction.Date).toLocaleDateString()}</p>
                        <p>Vehicle No: {auction.VehicleNo}</p>
                        <p>Supplier ID: {auction.SupplierID}</p>
                        <p>Quantity in KGS: {auction.QuantityInKGS}</p>
                        <p>Rate INR: {auction.RateINR}</p>
                        <h4>Sales</h4>
                        <ul>
                            {auction.SalesDetails && auction.SalesDetails.length && auction.SalesDetails.map(sale => (
                                <li key={sale.InvoiceNo}>
                                    Invoice No: {sale.InvoiceNo}, Kgs Sold: {sale.KgsSold}
                                </li>
                            ))}
                        </ul>
                        <p>Total Kgs Sold: {totalKgsSold}</p>
                        <p>Kgs Difference: {kgsDifference}</p>
                        {/* <SalesForm fetchPoolingAuctions={fetchPoolingAuctions} challanNo={auction.ChallanNo} /> */}
                    </div>
                );
            })}
        </div>
    );
};

export default PoolingAuctionList;
