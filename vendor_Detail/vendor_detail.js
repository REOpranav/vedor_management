(async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const vendorId = urlParams.get('id');

        if (!vendorId) {
            throw new Error('No vendor ID provided in URL')
        }
        const [vendorResponse, reviewResponse, contractResponse] = await Promise.all([
            fetch(`http://localhost:3000/vendors?id=${vendorId}`),
            fetch(`http://localhost:3000/vendorReview?id=${vendorId}`),
            fetch(`http://localhost:3000/contracts?id=${vendorId}`)
        ]);

        if (!vendorResponse.ok || !reviewResponse.ok) {
            throw new Error(`Error: ${vendorResponse.statusText || reviewResponse.statusText}`);
        }

        const [vendorData, reviewData, contractDetail] = await Promise.all([
            vendorResponse.json(),
            reviewResponse.json(),
            contractResponse.json()
        ]);

        if (!vendorData || vendorData.length === 0) {
            throw new Error('Vendor not found');
        }

        const main = document.querySelector('main')
        const vendor = vendorData[0]
        console.log(vendor)

        const vendorHtml = `
            <div class="vendor-details">
                <h2>${vendor.vendorName}</h2>
                <p>Total Spend: ${vendor.totalSpend}</p>
                <p>Service: ${vendor.service}</p>
                <p>Location: ${vendor.location}</p>
                <p>Status: ${vendor.status}</p>
                <p>Contact Person: ${vendor.contactPerson}</p>
                <p>Email: ${vendor.email}</p>
                <p>Mobile: ${vendor.mobile}</p>
            </div>
            <div class="reviews">
                <h3>Reviews</h3>
                ${reviewData.map(review => `
                    <div class="review">
                        <p>Quality: ${review.quality}</p>
                        <p>Delivery: ${review.delivery}</p>
                        <p>Service_rating: ${review.service_rating}</p>
                        <p>Vendor Name: ${review.vendorName}</p>
                        <p>Service: ${review.service}</p>
                        <p>Rating: ${review.rating}</p>
                    </div>
                `).join('')}
            </div>
             <div class="contract">
                <h3>Contract Detail</h3>
                ${contractDetail.length > 0 ? contractDetail?.map(review => `
                    <div class="review">
                        <p>vendorName: ${review.vendorName}</p>
                        <p>vendorTitle: ${review.vendorTitle}</p>
                        <p>contractType: ${review.contractType}</p>
                        <p>startDate: ${review.startDate}</p>
                        <p>endDate: ${review.endDate}</p>
                        <p>contractValue: ${review.contractValue}</p>
                    </div>
                `).join('') : `<div>No contract availablr for this vendor </div>`}
            </div>
        `;
        main.innerHTML = vendorHtml
    } catch (err) {
        console.error(err.message)
    }
})()