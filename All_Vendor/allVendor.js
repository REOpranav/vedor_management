const form = document.querySelector('form')
const tbody = document.createElement('tbody')
const searchKey = document.querySelector('#searchKey')
const add_vendor = document.querySelector('#add_vendor')

async function fetchVendors() { // Initially get all the data from DB
    try {
        const response = await fetch('http://localhost:3000/vendors')
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`)
        }
        const vendors = await response.json()
        Object.entries(vendors[0]).map((value) => {
            const option = document.createElement('option')
            option.value = value[0]
            option.textContent = value[0]
            searchKey.appendChild(option)
        })

        displayVendors(vendors)
    } catch (err) {
        console.error('Error fetching vendors:', err.message)
    }
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
    const vendorList = document.getElementById('vendorList')
    tbody.innerHTML = ''
    fetchedVendor.forEach(vendor => {
        const tr = document.createElement('tr');
        tr.setAttribute('id', 'tableData')
        tr.innerHTML = `
        <td>${vendor.vendorName}</td>
        <td>${vendor.totalSpend}</td>
        <td>${vendor.service}</td>
        <td>${vendor.location}</td>
        <td>${vendor.status}</td>
        <td>${vendor.contactPerson}</td>
        <td>${vendor.email}</td>
        <td>${vendor.mobile}</td>
    `;
        tbody.appendChild(tr)
    })
    vendorList.appendChild(tbody)
}

// searching function
function searchingValue(totalList, searchedKey, value) {
    if (!searchedKey || !value) {
        return totalList
    } else {
        let searchedValue = totalList?.filter(e => e[searchedKey == String ? searchedKey.toLowerCase() : searchedKey].toLowerCase() == value.toLowerCase())
        return searchedValue
    }
}

window.addEventListener('load', fetchVendors)