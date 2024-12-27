const tbody = document.getElementById('reviewTableBody');

(async function fetchVendorReviews() {
    try {
        const response = await fetch('http://localhost:3000/vendorReview')
        if (!response.ok) {
            throw new Error (response.statusText)
        }
        const data = await response.json();
        data.forEach(review => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${review.vendorName}</td>
                <td>${review.service}</td>
                <td>${review.quality}</td>
                <td>${review.delivery}</td>
                <td>${review.rating}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (e) {
        console.log(e.message)
    }
})();

