import './BuyCoins.css';
import paymentAxios from '../../services/paymentAxios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const BuyCoins = () => {
    // const { user } = useContext(AuthContext);
    const [coins, setCoins] = useState(0);
    const [url, setUrl] = useState(null);
    const navigate = useNavigate();

    const handlePayment = async (e) => {
        e.preventDefault();
        paymentAxios
            .createPayment(coins)
            .then((res) => {
                console.log(res);
                setUrl(res.url);
                window?.open(`${res.url}`, '_blank').focus();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="container" >
            <div className="row">
                <div className="col-12">
                    <h1>Buy Coins</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handlePayment}>
                        <div className="form-group">
                            <label htmlFor="coins">Coins</label>
                            <input type="number" className="form-control" id="coins" name="coins" min={1} value={coins} onChange={(e) => setCoins(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Buy</button>
                    </form>
                </div>
            </div>
            {/* {
                url && <iframe src={`${url}`} title="payment" width="100%" height="500px" />
            } */}
        </div >
    );
}

export default BuyCoins;