import React from 'react';
import Axios from 'axios';
import easyinvoice from 'easyinvoice';
function HistoryPage(props) {

    const invoice = (paymentId) => {
        Axios.post('/api/getPayment', paymentId)
        .then(res => {
            if (res.data.success == true) {
                const pay = res.data.pay
                console.log(pay)
                Axios.post('/api/invoice', pay)
                .then(response => {
                    if(response.data.success == true) {
                        easyinvoice.download('myInvoice.pdf', response.data.result.pdf);
                        alert("invoice successfully downloaded. Can be viewed in local storage");
                    } else {
                        alert("invoice generation failed")
                    }
                });
            }
        })
    }
     
    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>History</h1>
            </div>
            <br />

            <table>
                <thead>
                    <tr>
                        <th>Payment Id</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Product</th>
                        <th>Track order</th>
                        <th>Invoice</th>
                    </tr>
                </thead>
                <tbody>

                    {props.user.userData && props.user.userData.history &&
                        props.user.userData.history.map(item => (
                            <tr key={item.paymentId}>
                                <td>{item.paymentId}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.name}</td>
                                <td><a href = {`localhost:5001/track?id='${item.paymentId}`} >Track</a></td>
                                <td> <button onClick={() => invoice(item.paymentId)}>Get Invoice</button></td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default HistoryPage
