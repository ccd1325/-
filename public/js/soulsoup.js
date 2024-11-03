document.addEventListener('DOMContentLoaded', () => {
    // 每日一句随机展示
    const quotes = [
        {
            text: "生活中不是缺少美，而是缺少发现美的眼睛。",
            author: "罗丹"
        },
        {
            text: "把每一个平凡的日子，过成了不平凡的人生。",
            author: "泰戈尔"
        },
        {
            text: "生命中最重要的不是所处的位置，而是所朝的方向。",
            author: "霍姆斯"
        },
        {
            text: "微笑着面对生活，生活也会微笑着面对你。",
            author: "雨果"
        }
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.querySelector('.italic').textContent = `"${randomQuote.text}"`;
    document.querySelector('.text-sm.mt-2').textContent = `—— ${randomQuote.author}`;

    // 文章展开/收起
    document.querySelectorAll('article button').forEach(button => {
        button.addEventListener('click', (e) => {
            const article = e.target.closest('article');
            const content = article.querySelector('p');
            
            if (content.classList.contains('line-clamp-3')) {
                content.classList.remove('line-clamp-3');
                e.target.textContent = '收起';
            } else {
                content.classList.add('line-clamp-3');
                e.target.textContent = '阅读更多';
            }
        });
    });

    // 心理测试按钮点击事件
    document.querySelector('.bg-green-600').addEventListener('click', () => {
        alert('心理测试功能即将上线，敬请期待！');
    });
}); 