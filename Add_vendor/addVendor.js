const form = document.querySelector('form');

console.log(form);

const sanitized = (inputValue) => {
    const div = document.createElement('div');
    div.textContent = inputValue;
    return div.innerHTML;
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formElements = {
        id: Math.floor(Math.random() * 1000000000),
        vendorName: sanitized((document.querySelector('#vendorName').value).trim()),
        totalSpend: sanitized((document.querySelector('#totalSpend').value).trim()),
        service: sanitized((document.querySelector('#service').value).trim()),
        location: sanitized((document.querySelector('#location').value).trim()),
        status: sanitized((document.querySelector('#status').value).trim()),
        contactPerson: sanitized((document.querySelector('#contactPerson').value).trim()),
        email: sanitized((document.querySelector('#email').value).trim()),
        mobile: sanitized((document.querySelector('#mobile').value).trim()),
    };

    const mandatoryValue = Object.values(formElements).every(value => value !== '');
    if (mandatoryValue) {
        try {
            const response = await fetch('http://localhost:3000/vendors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formElements),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            if (response.ok) {
                window.location.href = 'http://127.0.0.1:5500/All_Vendor/allVendor.html'
            }

            form.reset()
        } catch (err) {
            console.error('Error submitting form:', err.message);
        }
    } else {
        console.error('Not all mandatory values are filled.');
    }
});
