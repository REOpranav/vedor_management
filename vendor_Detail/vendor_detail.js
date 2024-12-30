(async () => {
    try {
        // Get the URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const vendorId = urlParams.get('id');

        if (!vendorId) {
            throw new Error('No vendor ID provided in URL');
        }

        const [vendorResponse, reviewResponse] = await Promise.all([
            fetch(`http://localhost:3000/vendors?id=${vendorId}`),
            fetch(`http://localhost:3000/vendorReview?id=${vendorId}`)
        ]);

        if (!vendorResponse.ok || !reviewResponse.ok) {
            throw new Error(`Error: ${vendorResponse.statusText || reviewResponse.statusText}`);
        }

        const [vendorData, reviewData] = await Promise.all([
            vendorResponse.json(),
            reviewResponse.json()
        ]);

        if (!vendorData || vendorData.length === 0) {
            throw new Error('Vendor not found');
        }

        const main = document.querySelector('main');
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
                ${reviewData.map(review =>`
                    <div class="review">
                        <p>Quality: ${review.quality}/5</p>
                        <p>Delivery: ${review.delivery}/5</p>
                        <p>Service_rating: ${review.service_rating}/5</p>
                        <p>Vendor Name: ${review.vendorName}/5</p>
                        <p>Service: ${review.service}/5</p>
                        <p>Rating: ${review.rating}</p>
                    </div>
                `).join('')}
            </div>
        `;

        main.innerHTML = vendorHtml;

    } catch (err) {
        console.error('Error fetching vendor details:', err.message);
        const main = document.querySelector('main');
        main.innerHTML = `<p class="error">Error: ${err.message}</p>`;
    }
})()