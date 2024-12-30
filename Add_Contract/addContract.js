document.addEventListener('DOMContentLoaded', async () => {
    const contractForm = document.querySelector('.contract-form form')
    const vendorSelect = document.getElementById('vendorName')

    try {
        const response = await fetch('http://localhost:3000/vendors')
        if (!response.ok) {
            throw new Error('Failed to fetch vendors')
        }
        const vendors = await response.json();
        vendors.forEach(vendor => {            
            const option = document.createElement('option')
            option.value = vendor.id
            option.textContent = vendor.vendorName
            vendorSelect.appendChild(option)
        });
    } catch (error) {
        console.error('Error fetching vendors:', error)
    }

    contractForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const formData = {
            id: document.getElementById('vendorName').value,
            vendorName: document.getElementById('vendorName').selectedOptions[0].text,
            vendorTitle: document.getElementById('vendorTitle').value,
            contractType: document.getElementById('contractType').value,
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value,
            contractValue: document.getElementById('contractValue').value
        }

        for (const [key, value] of Object.entries(formData)) {
            if (!value) {
                alert(`Please fill the all required field`)
                return
            }
        }

        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);
        if (startDate >= endDate) {
            alert('Start date must be before end date');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/contracts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (!response.ok) {
                throw new Error('Failed to submit contract');
            }
            
            if (response.ok) {
                window.location.href = '/All_contract/allContract.html'
            }
            contractForm.reset()
        } catch (error) {
            alert('Failed to submit contract. Please try again.')
        }
    });
});