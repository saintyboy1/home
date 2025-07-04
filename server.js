const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;
const ADDRESS = 'bc1qexgc37py40hp0wyp0lsme50gzym7u9xv50jqrn';

app.use(express.static(__dirname));

async function addressReceived(amountBtc) {
  try {
    const res = await fetch(`https://api.blockcypher.com/v1/btc/main/addrs/${ADDRESS}`);
    if (!res.ok) throw new Error('network');
    const data = await res.json();
    const totalReceived = (data.total_received || 0) / 1e8;
    return totalReceived >= amountBtc;
  } catch (err) {
    console.error('Error fetching address info', err);
    return false;
  }
}

app.get('/api/check-payment', async (req, res) => {
  const amount = parseFloat(req.query.amount || '0');
  const paid = await addressReceived(amount);
  res.json({ paid });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
