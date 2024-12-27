const form = document.querySelector('form');
const vendorName = document.querySelector('#vendorName');
const service = document.querySelector('#service');

(async () => {
    try {
        const response = await fetch('http://localhost:3000/vendors')
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`)
        }
        const vendors = await response.json()
        vendors.forEach((vendorValue) => {
            const option = document.createElement('option')
            option.value = vendorValue.id
            option.textContent = vendorValue.vendorName
            vendorName.appendChild(option)
        })
    } catch (err) {
        console.error('Error fetching vendors:', err.message)
    }
})()

vendorName.addEventListener('click', (eve) => {
    eve.preventDefault()
    let vendorID = document.querySelector('#vendorName').value
    service.innerHTML = ''
    service.innerHTML = `<option value="">Select a service</option>`
    vendorID && selectedUser(vendorID)
})

form.addEventListener('submit', async (eve) => {
    eve.preventDefault()
    let getVendorName = await fetchSpecificVendor(document.querySelector('#vendorName').value)

    let quality = document.querySelector('input[name="quality"]:checked').value == 'poor' ? 1.5 : 3.33
    let delivery = document.querySelector('input[name="delivery"]:checked').value == 'poor' ? 1.5 : 3.33
    let service_rating = document.querySelector('input[name="service_rating"]:checked').value == 'poor' ? 1.5 : 3.33

    let userReviewData = {
        id: document.querySelector('#vendorName').value,
        quality: document.querySelector('input[name="quality"]:checked').value,
        delivery: document.querySelector('input[name="delivery"]:checked').value,
        service_rating: document.querySelector('input[name="service_rating"]:checked').value,
        vendorName: getVendorName[0].vendorName,
        service: document.querySelector('#service').value,
        rating: quality + delivery + service_rating
    }

    for (const key in userReviewData) {
        if (userReviewData[key] == '') {
            return
        }
    }
    postingVendorReview(userReviewData)
})

// fetching the specific vendors
const fetchSpecificVendor = async (vendorID) => {
    const response = await fetch(`http://localhost:3000/vendors/?id=${vendorID}`)
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
    }
    const specificVendor = await response.json()
    return specificVendor
}

// get the servic based on vendor selection in drop down
const selectedUser = async (vendorID) => {
    try {
        let searchedVendors = await fetchSpecificVendor(vendorID)
        service.innerHTML = ''
        searchedVendors.forEach((vendorValue) => {
            const option = document.createElement('option')
            option.value = vendorValue.service
            option.textContent = vendorValue.service
            service.appendChild(option)
        })
    } catch (err) {
        console.error('Error fetching vendors:', err.message)
    }
}

// posting the review data in DB (JSON server)
const postingVendorReview = async (vendorReviewValue) => {
    try {
        const posting = await fetch(`http://localhost:3000/vendorReview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vendorReviewValue)
        })

        if (posting.ok) {
            window.location.href = '/Vendor_review/vendorReview.html'
        }

        if (!posting.ok) { throw new Error(posting.statusText) }
        form.reset()
    } catch (err) {
        console.log(err.message);
    }
}