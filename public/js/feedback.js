document.addEventListener('DOMContentLoaded', () => {
    // FAQ 折叠面板
    document.querySelectorAll('.faq-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const arrow = toggle.querySelector('svg');
            
            // 切换内容显示/隐藏
            content.classList.toggle('hidden');
            
            // 旋转箭头
            arrow.style.transform = content.classList.contains('hidden') 
                ? 'rotate(0deg)' 
                : 'rotate(180deg)';
        });
    });

    // 反馈表单提交
    document.getElementById('feedbackForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const feedback = {
            type: document.getElementById('feedbackType').value,
            content: document.getElementById('feedbackContent').value,
            email: document.getElementById('contactEmail').value,
            timestamp: new Date().toISOString()
        };

        // 存储反馈到本地存储
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
        feedbacks.push(feedback);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

        // 清空表单
        document.getElementById('feedbackContent').value = '';
        document.getElementById('contactEmail').value = '';

        // 显示成功消息
        alert('感谢您的反馈！我们会认真考虑您的建议。');
    });
}); 