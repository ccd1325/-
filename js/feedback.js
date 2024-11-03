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

    // 添加新的切换函数
    function toggleFAQ(button) {
        // 获取当前卡片的内容区域
        const content = button.nextElementSibling;
        const arrow = button.querySelector('svg');
        
        // 获取当前行的所有卡片（同一行的两个卡片）
        const currentRow = button.closest('.grid').querySelectorAll('.faq-content');
        const currentRowArrows = button.closest('.grid').querySelectorAll('svg');
        
        // 切换当前卡片的显示状态
        if (content.classList.contains('hidden')) {
            // 显示当前卡片
            content.classList.remove('hidden');
            arrow.classList.add('rotate-180');
        } else {
            // 隐藏当前卡片
            content.classList.add('hidden');
            arrow.classList.remove('rotate-180');
        }
    }
}); 