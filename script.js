const PAYMENT_ADDRESS = 'bc1qexgc37py40hp0wyp0lsme50gzym7u9xv50jqrn';
const REQUIRED_AMOUNT_BTC = 0.001;

async function checkPayment() {
    const statusEl = document.getElementById('paymentStatus');
    statusEl.textContent = 'Checking for payment...';
    try {
        const response = await fetch(`/api/check-payment?amount=${REQUIRED_AMOUNT_BTC}`);
        if (!response.ok) throw new Error('Request failed');
        const data = await response.json();
        if (data.paid) {
            statusEl.textContent = 'Payment received! Thank you.';
        } else {
            statusEl.textContent = 'Payment not detected yet.';
        }
    } catch (err) {
        statusEl.textContent = 'Error while checking payment.';
    }
}

document.getElementById('buyButton').addEventListener('click', checkPayment);
