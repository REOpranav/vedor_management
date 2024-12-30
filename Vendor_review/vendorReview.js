const tbody = document.getElementById('reviewTableBody')
const form = document.querySelector('form')
const searchKey = document.querySelector('#searchKey')
const search = document.querySelector('#search');

(async function fetchVendorReviews() {
    try {
        const response = await fetch('http://localhost:3000/vendorReview')
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        const vendors = await response.json();
        Object.entries(vendors[0]).map((value) => {
            const option = document.createElement('option')
            option.value = value[0]
            option.textContent = value[0]
            searchKey.appendChild(option)
        })
        displayVendors(vendors)
    } catch (e) {
        console.log(e.message)
    }
})();

function displayVendors(totalVendors) {
    ['keyup', 'submit'].forEach((triggeredEvent) => {
        form.addEventListener(triggeredEvent, (eve) => {
            eve.preventDefault()
            const searchKey = document.querySelector('#searchKey').value
            const search = (document.querySelector('#search').value).trim()
            const insearchedValue = searchingValue(totalVendors, searchKey, search) // if user search a particular vendor it will work
            updateVerdorList(insearchedValue)
        })
    })
    updateVerdorList(totalVendors) // initially show all the vendor list
}

function displayVendors(totalVendors) {
    ['keyup', 'submit'].forEach((triggeredEvent) => {
        form.addEventListener(triggeredEvent, (eve) => {
            eve.preventDefault()
            const searchKey = document.querySelector('#searchKey').value
            const search = (document.querySelector('#search').value).trim()
            const insearchedValue = searchingValue(totalVendors, searchKey, search) // if user search a particular vendor it will work
            updateVerdorList(insearchedValue)
        })
    })
    updateVerdorList(totalVendors) // initially show all the vendor list
}

function updateVerdorList(fetchedVendor) {
    tbody.innerHTML = ''
    fetchedVendor?.forEach((vendorValue) => {
        const tr = document.createElement('tr')
        tr.setAttribute('id', 'tableData')
        tr.innerHTML = `
        <td><a href=${`/vendor_Detail/vendor_detail.html?id=${vendorValue.id}`} style="color: blue;"> ${vendorValue.vendorName}</a></td>
        <td>${vendorValue.service}</td>
        <td>${vendorValue.quality}</td>
        <td>${vendorValue.delivery}</td>
        <td>${vendorValue.rating}</td>
    `;
        tbody.appendChild(tr)
    })
}

// searching function
function searchingValue(totalList, searchedKey, value) {
    if (!searchedKey || !value) {
        return totalList
    } else {
        let searchedValue = totalList?.filter(e => {
            const fieldValue = e[searchedKey]?.toString().toLowerCase()
            const searchValue = value.toLowerCase()
            return fieldValue == searchValue
        })
        return searchedValue
    }
}