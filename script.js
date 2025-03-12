// هذا الكود يقوم بجمع بيانات النموذج وإرسالها إلى Google Sheets باستخدام Google Apps Script
document.addEventListener('DOMContentLoaded', function() {
    // الحصول على عناصر النموذج
    const contestForm = document.getElementById('contestForm');
    const loadingElement = document.getElementById('loading');
    const successMessage = document.getElementById('successMessage');
    
    // إضافة مستمع حدث عند تقديم النموذج
    contestForm.addEventListener('submit', function(e) {
        // منع السلوك الافتراضي لإرسال النموذج
        e.preventDefault();
        
        // إظهار مؤشر التحميل
        loadingElement.style.display = 'flex';
        
        // إنشاء كائن FormData من النموذج
        const formData = new FormData(contestForm);
        
        // الحصول على قيم النموذج
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
        
        // استبدل هذا الرابط برابط نشر تطبيق Google Apps Script الخاص بك
        const scriptURL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID_HERE/exec';
        
        // إرسال البيانات باستخدام fetch API
        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors', // مهم للتعامل مع CORS
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            body: JSON.stringify(formDataObject)
        })
        .then(() => {
            // إخفاء مؤشر التحميل
            loadingElement.style.display = 'none';
            
            // إظهار رسالة النجاح
            successMessage.style.display = 'block';
            
            // إعادة تعيين النموذج
            contestForm.reset();
        })
        .catch(error => {
            console.error('خطأ:', error);
            
            // معالجة الحالات التي قد لا تعمل فيها fetch API بشكل صحيح مع no-cors
            // غالبًا ما ستنجح العملية حتى مع وجود خطأ بسبب no-cors
            loadingElement.style.display = 'none';
            successMessage.style.display = 'block';
            contestForm.reset();
        });
    });
    
    // وظيفة المؤقت
    const timerElement = document.querySelector('.tm-timer-value');
    const timerCircle = document.querySelector('.tm-timer-circle svg circle');
    const timerContainer = document.querySelector('.tm-timer');
    
    let timeLeft = 4 * 60; // 4 دقائق بالثواني
    const totalTime = timeLeft;
    
    // تحديث المؤقت كل ثانية
    const timerInterval = setInterval(() => {
        timeLeft--;
        
        // حساب الدقائق والثواني
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        // تحديث نص المؤقت
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // تحديث دائرة المؤقت
        const dashOffset = 200 * (1 - timeLeft / totalTime);
        timerCircle.style.strokeDashoffset = dashOffset;
        
        // تغيير لون المؤقت بناءً على الوقت المتبقي
        if (timeLeft <= 60) { // آخر دقيقة
            timerContainer.classList.add('danger');
        } else if (timeLeft <= 120) { // آخر دقيقتين
            timerContainer.classList.add('warning');
        }
        
        // إذا انتهى الوقت
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            
            // إرسال النموذج تلقائيًا
            contestForm.dispatchEvent(new Event('submit'));
        }
    }, 1000);
});
