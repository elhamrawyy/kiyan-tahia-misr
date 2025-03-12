document.addEventListener('DOMContentLoaded', function() {
    const contestForm = document.getElementById('contestForm');
    const loadingElement = document.getElementById('loading');
    const successMessage = document.getElementById('successMessage');
    
    contestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        loadingElement.style.display = 'flex';
        
        const formData = new FormData(contestForm);
        
        const formDataObject = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            city: formData.get('city'),
            q1: formData.get('q1'),
            q2: formData.get('q2'),
            q3: formData.get('q3'),
            q4: formData.get('q4'),
            q5: formData.get('q5'),
            q6: formData.get('q6'),
            q7: formData.get('q7'),
            q8: formData.get('q8'),
            q9: formData.get('q9'),
            q10: formData.get('q10'),
            timestamp: new Date().toISOString()
        };
        
        // استبدل الرابط بالـ URL الذي زودتني به
        const scriptURL = 'https://script.google.com/macros/s/AKfycbyuvKPT520DCLs2d3feMcWEd7VlVsQUHq9N0pWfhqiOe1S822PGIJQvEfQaFK5zjXiz/exec';
        
        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors', 
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            body: JSON.stringify(formDataObject)
        })
        .then(() => {
            loadingElement.style.display = 'none';
            successMessage.style.display = 'block';
            contestForm.reset();
        })
        .catch(error => {
            console.error('خطأ:', error);
            loadingElement.style.display = 'none';
            successMessage.style.display = 'block';
            contestForm.reset();
        });
    });
});
