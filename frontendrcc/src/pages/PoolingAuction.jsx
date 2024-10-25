import { useState } from "react";
import PoolingAuctionForm from "./PoolingAuctionForm";
import PoolingAuctionList from "./PoolingAuctionList";

const PoolingAuction = () => {
    const [refresh, setRefresh] = useState(false);

    const fetchPoolingAuctions = async () => {
        setRefresh(prev => !prev);
    };
    return (
        <>
            <h1>This is the PoolingAuction</h1>
            <PoolingAuctionForm fetchPoolingAuctions={fetchPoolingAuctions} />
            <PoolingAuctionList refresh={refresh}/>
        </>
    );
}

export default PoolingAuction;