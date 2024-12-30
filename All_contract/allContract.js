document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/contracts')
        if (!response.ok) {
            throw new Error('Failed to fetch contracts')
        }
        const contracts = await response.json()
        const tBody = document.getElementById('contractTableBody')
        contracts.forEach(contract => {
            const row = document.createElement('tr')
            row.innerHTML = `
                <td>${contract.vendorName}</td>
                <td>${contract.vendorTitle}</td>
                <td>${contract.contractType}</td>
                <td>${contract.startDate}</td>
                <td>${contract.endDate}</td>
                <td>${contract.contractValue}</td>
            `
            tBody.appendChild(row)
        })
    } catch (error) {
        console.error('Error fetching contracts:', error)
    }
})