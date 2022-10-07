import InitAxios from "./initAxios";

class PaymentAxios extends InitAxios {
    constructor() {
        super("/payment");
    }

    // Create a new payment
    // POST /payment/checkout
    //
    // Parameters:
    //   coinsToBuy: number
    createPayment(coinsToBuy) {
        // console.log("coins", coinsToBuy);
        return this.axios.post("/checkout", { coinsToBuy }).then((response) => response.data);
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new PaymentAxios();
        }
        return this.instance;
    }
}

export default PaymentAxios.getInstance();