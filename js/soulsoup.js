// 每日一句名言
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
    }
];

// 文章内容和管理
const articles = {
    list: [
        {
            id: 1,
            title: "保持希望，永不放弃",
            summary: "生活中总会遇到各种困难和挑战，但只要我们保持希望，相信自己，就一定能够克服困难，迎来黎明...",
            content: `生活中总会遇到各种困难和挑战，但只要我们保持希望，相信自己，就一定能够克服困难，迎来黎明。
                每个人都有自己的人生道路，不要与他人比较，找到属于自己的节奏，慢慢前行。
                
                记住以下几点：
                1. 接纳现实，但不要放弃希望
                2. 相信自己，但不要过分自负
                3. 脚踏实地，但要仰望星空
                4. 珍惜现在，但要规划未来
                
                生活就像一场马拉松，重要的不是速度，而是坚持的毅力。`,
            relatedLinks: [
                { text: "如何培养积极心态", url: "https://www.zhihu.com/question/20289916" },
                { text: "每天都要保持希望", url: "https://www.douban.com/note/766286784/" },
                { text: "积极心理学：如何保持乐观", url: "https://www.psychology.org/positive-thinking" }
            ]
        },
        {
            id: 2,
            title: "学会与自己对话",
            summary: "在这个快节奏的社会中，我们常常忽略了最重要的事情——倾听自己的内心...",
            content: `在这个快节奏的社会中，我们常常忽略了最重要的事情——倾听自己的内心。
                每天花一些时间与自己对话，了解自己的需求和情绪，这是一种自我关爱的方式。
                
                如何与自己对话：
                1. 每天留出15分钟的独处时间
                2. 写日记记录自己的想法和感受
                3. 学会觉察自己的情绪变化
                4. 不要对自己太苛刻
                
                记住，你是独一无二的，要学会爱自己。`,
            relatedLinks: [
                { text: "心理学：如何进行自我对话", url: "https://www.zhihu.com/question/23504654" },
                { text: "每天写日记的好处", url: "https://www.douban.com/note/769548231/" },
                { text: "正念冥想入门指南", url: "https://www.mindfulness.org/guide" }
            ]
        },
        {
            id: 3,
            title: "给你的一封信",
            summary: "嘿，朋友们！生活有时候就像一场疯狂的过山车...",
            content: `亲爱的朋友，生活有时就像一场暴风雨，我们都在其中飘摇。但你要知道，风雨再大，也终会过去，
                雨后的彩虹就在那等着给你惊喜呢。你现在所经历的痛苦只是暂时的，你不是一个人在面对，我们都在你身边。
                
                感觉难受的时候，就把这里当作你的避风港吧。那些藏在心底的委屈、难过，都可以释放出来。
                你就像一颗被灰尘暂时掩盖的宝石，这些磨难只是让你的光芒在日后更加耀眼。`,
            relatedLinks: [
                { text: "如何度过人生低谷", url: "https://www.zhihu.com/question/19725224" },
                { text: "走出情绪困境的方法", url: "https://www.douban.com/note/772345678/" },
                { text: "心理疗愈音乐推荐", url: "https://music.163.com/playlist?id=123456" }
            ]
        },
        {
            id: 4,
            title: "心理学小课堂",
            summary: "情绪ABC理论：这是一种重要的心理知识...",
            content: `情绪ABC理论：这是一种重要的心理知识。A代表激发事件，B代表个体对激发事件的认知和评价而产生的信念，
                C代表结果。很多时候，不是事件A直接导致结果C，而是我们的信念B起了关键作用。
                
                心理防御机制：这是我们潜意识中应对焦虑等负面情绪的方式。当我们遇到无法接受的事情时，
                可能会使用否认机制，拒绝承认这件事的存在；或者使用合理化机制，为不合理的事情找一个看似合理的理由。
                
                马斯洛需求层次理论：从生理需求、安全需求、归属与爱的需求、尊重需求到自我实现需求。
                当我们感到心理不适时，可能是某一层级的需求没有得到满足。`,
            relatedLinks: [
                { text: "心理学入门指南", url: "https://www.psychology.org/intro" },
                { text: "情绪管理技巧", url: "https://www.zhihu.com/question/19651794" },
                { text: "心理学经典理论", url: "https://www.douban.com/note/775432167/" }
            ]
        }
    ],

    // 获取文章
    find: function(id) {
        return this.list.find(a => a.id === id);
    },

    // 点赞功能
    like: function(articleId) {
        const likes = JSON.parse(localStorage.getItem('article_likes') || '{}');
        likes[articleId] = (likes[articleId] || 0) + 1;
        localStorage.setItem('article_likes', JSON.stringify(likes));
        return likes[articleId];
    },

    // 获取点赞数
    getLikes: function(articleId) {
        const likes = JSON.parse(localStorage.getItem('article_likes') || '{}');
        return likes[articleId] || 0;
    }
};

// 心理测试题库
const test = {
    questions: [
        {
            id: 'q1',
            text: '最近一周，你感到心情低落的频率是？',
            options: ['从不', '偶尔', '经常', '总是']
        },
        {
            id: 'q2',
            text: '你是否经常感到焦虑或紧张？',
            options: ['从不', '偶尔', '经常', '总是']
        },
        {
            id: 'q3',
            text: '你的睡眠质量如何？',
            options: ['很好', '一般', '较差', '很差']
        },
        {
            id: 'q4',
            text: '你是否对日常活动失去兴趣？',
            options: ['没有', '偶尔', '经常', '总是']
        },
        {
            id: 'q5',
            text: '你是否容易感到疲劳或精力不足？',
            options: ['从不', '偶尔', '经常', '总是']
        },
        {
            id: 'q6',
            text: '你是否经常感到孤独或缺乏社交？',
            options: ['从不', '偶尔', '经常', '总是']
        },
        {
            id: 'q7',
            text: '你对未来是否感到悲观？',
            options: ['从不', '偶尔', '经常', '总是']
        },
        {
            id: 'q8',
            text: '你是否经常感到压力过大？',
            options: ['从不', '偶尔', '经常', '总是']
        },
        {
            id: 'q9',
            text: '你是否有过自责或自我否定的想法？',
            options: ['从不', '偶尔', '经常', '总是']
        },
        {
            id: 'q10',
            text: '你是否能够集中注意力做事？',
            options: ['总是能', '经常能', '偶尔能', '很难']
        },
        {
            id: 'q11',
            text: '你是否经常感到烦躁或易怒？',
            options: ['从不', '偶尔', '经常', '总是']
        },
        {
            id: 'q12',
            text: '你是否能够享受生活中的乐趣？',
            options: ['总是能', '经常能', '偶尔能', '很难']
        },
        {
            id: 'q13',
            text: '你是否经常感到身体不适（如头痛、胃痛等）？',
            options: ['从不', '偶尔', '经常', '总是']
        },
        {
            id: 'q14',
            text: '你是否对自己的外表感到不满意？',
            options: ['从不', '偶尔', '经常', '总是']
        },
        {
            id: 'q15',
            text: '你是否能够与家人朋友保持良好的关系？',
            options: ['总是能', '经常能', '偶尔能', '很难']
        }
    ],

    calculateResult: (answers) => {
        let score = 0;
        Object.values(answers).forEach(value => {
            score += parseInt(value);
        });

        // 根据总分判断心理状态（满分45分）
        if (score <= 15) {
            return {
                level: '心理状态良好',
                description: '你的心理状态很好，继续保持积极乐观的心态！你能够很好地应对生活中的压力和挑战。',
                suggestions: [
                    '继续保持当前的生活方式',
                    '规律运动，保持健康的作息',
                    '多与家人朋友交流，保持良好的社交关系',
                    '培养兴趣爱好，丰富生活',
                    '定期进行自我反思和调节'
                ],
                resources: [
                    { text: '如何保持心理健康', url: 'https://www.zhihu.com/question/20289916' },
                    { text: '每日冥想指南', url: 'https://www.mindfulness.org/guide' }
                ]
            };
        } else if (score <= 25) {
            return {
                level: '轻度压力',
                description: '你的心理状态基本正常，但存在一些压力，需要适当调节。',
                suggestions: [
                    '增加运动量，规律作息',
                    '学习简单的减压方法，如深呼吸、冥想',
                    '与朋友分享心事，寻求社交支持',
                    '适当放松，不要给自己太大压力'
                ],
                resources: [
                    { text: '压力管理技巧', url: 'https://www.zhihu.com/question/19651794' },
                    { text: '运动减压指南', url: 'https://www.zhihu.com/question/20642937' }
                ]
            };
        } else if (score <= 35) {
            return {
                level: '中度压力',
                description: '你可能正在经历一些困扰，建议寻求适当的帮助和支持。',
                suggestions: [
                    '考虑咨询心理专家获取专业建议',
                    '与家人朋友多交流，不要把问题憋在心里',
                    '调整作息时间，确保充足的休息',
                    '尝试放松技巧，如瑜伽、冥想等'
                ],
                resources: [
                    { text: '心理咨询指南', url: 'https://www.zhihu.com/question/22543183' },
                    { text: '情绪管理方法', url: 'https://www.zhihu.com/question/19651794' }
                ]
            };
        } else {
            return {
                level: '需要关注',
                description: '你当前的心理压力较大，建议及时寻求专业帮助。',
                suggestions: [
                    '建议尽快寻求专业心理咨询',
                    '告诉信任的亲友你的感受',
                    '保持规律的作息和饮食',
                    '适当运动，但不要给自己太大压力'
                ],
                resources: [
                    { text: '心理援助热线：400-161-9995', url: '#' },
                    { text: '全国心理咨询师推荐', url: 'https://www.zhihu.com/question/19731075' }
                ],
                emergency: '如果你有任何自伤或极端的想法，请立即拨打心理援助热线：400-161-9995'
            };
        }
    }
};

// UI 控制
const ui = {
    // 显示文章详情
    showArticle: function(articleId) {
        const article = articles.find(articleId);
        if (!article) return;

        const articleElement = document.querySelector(`button[data-article-id="${articleId}"]`).closest('article');
        const contentDiv = articleElement.querySelector('.article-content');
        const button = articleElement.querySelector('button');

        if (button.textContent === '阅读更多') {
            contentDiv.innerHTML = `
                <div class="prose max-w-none">
                    ${article.content.split('\n').map(p => 
                        `<p class="mb-4 text-gray-600">${p.trim()}</p>`
                    ).join('')}
                    
                    ${article.relatedLinks ? `
                        <div class="mt-8 border-t pt-4">
                            <h4 class="font-semibold text-lg mb-2">相关阅读：</h4>
                            <ul class="space-y-2">
                                ${article.relatedLinks.map(link => `
                                    <li>
                                        <a href="${link.url}" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           class="text-green-600 hover:text-green-700 hover:underline">
                                            ${link.text}
                                        </a>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            `;
            button.textContent = '收起';
        } else {
            contentDiv.innerHTML = `
                <p class="text-gray-600 mb-4">${article.summary}</p>
            `;
            button.textContent = '阅读更多';
        }
    },

    // 显示心理测试
    showTest: function() {
        const testModal = document.getElementById('testModal');
        const testContent = document.getElementById('testContent');
        
        testContent.innerHTML = `
            <form id="testForm" class="space-y-8">
                ${test.questions.map((q, index) => `
                    <div class="question-container">
                        <h3 class="text-lg font-semibold mb-4">${index + 1}. ${q.text}</h3>
                        <div class="space-y-2">
                            ${q.options.map((option, optIndex) => `
                                <label class="flex items-center cursor-pointer">
                                    <input type="radio" name="${q.id}" value="${optIndex}" class="mr-2">
                                    <span>${option}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
                
                <button type="button" onclick="submitTest()" 
                        class="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200">
                    提交测试
                </button>
            </form>
        `;
        
        testModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    },

    // 显示测试结果
    showTestResult: function(result) {
        const testContent = document.getElementById('testContent');
        testContent.innerHTML = `
            <div class="space-y-6">
                <div class="text-center">
                    <h3 class="text-2xl font-bold mb-2">${result.level}</h3>
                    <p class="text-gray-600">${result.description}</p>
                </div>
                
                <div class="bg-green-50 p-4 rounded-lg">
                    <h4 class="font-semibold mb-2">建议：</h4>
                    <ul class="list-disc list-inside space-y-1">
                        ${result.suggestions.map(s => `
                            <li class="text-gray-600">${s}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="bg-blue-50 p-4 rounded-lg">
                    <h4 class="font-semibold mb-2">推荐资源：</h4>
                    <ul class="space-y-1">
                        ${result.resources.map(r => `
                            <li>
                                <a href="${r.url}" 
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   class="text-blue-600 hover:text-blue-800 hover:underline">
                                    ${r.text}
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                ${result.emergency ? `
                    <div class="bg-red-50 p-4 rounded-lg">
                        <p class="text-red-600">${result.emergency}</p>
                    </div>
                ` : ''}
                
                <div class="flex space-x-4">
                    <button onclick="ui.showTest()" 
                            class="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        重新测试
                    </button>
                    <button onclick="closeTestModal()" 
                            class="flex-1 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                        关闭
                    </button>
                </div>
            </div>
        `;
    }
};

// 艺术疗法内容
const artTherapy = {
    categories: [
        {
            id: 'drawing',
            title: '绘画疗法',
            description: '通过绘画表达内心情感，释放压力',
            activities: [
                {
                    title: '情绪色彩',
                    description: '用不同的颜色表达当下的情绪状态',
                    guide: '选择能代表你当前心情的颜色，在纸上自由绘画，不需要具体的形状，让颜色流动...',
                    examples: [
                        { url: 'images/art/emotion-color1.jpg', author: '匿名用户', description: '愤怒与平静的交织' },
                        { url: 'images/art/emotion-color2.jpg', author: '匿名用户', description: '希望的曙光' }
                    ]
                },
                {
                    title: '心情涂鸦',
                    description: '随意涂鸦，不要想太多，让手自由移动',
                    guide: '拿起笔，闭上眼睛，感受当下的情绪，让手随意在纸上移动...',
                    examples: [
                        { url: 'images/art/doodle1.jpg', author: '匿名用户', description: '内心的漩涡' },
                        { url: 'images/art/doodle2.jpg', author: '匿名用户', description: '放飞的思绪' }
                    ]
                }
            ]
        },
        {
            id: 'music',
            title: '音乐疗法',
            description: '通过音乐表达和调节情绪',
            activities: [
                {
                    title: '情绪节奏',
                    description: '用简单的打击乐器表达情绪',
                    guide: '选择一种打击乐器，随着你的情绪节奏自由演奏...',
                    audioExamples: [
                        { url: 'audio/therapy/rhythm1.mp3', author: '匿名用户', description: '愤怒的鼓点' },
                        { url: 'audio/therapy/rhythm2.mp3', author: '匿名用户', description: '平静的节奏' }
                    ]
                },
                {
                    title: '歌声疗愈',
                    description: '通过哼唱或演唱释放情绪',
                    guide: '选择一首能表达当前心情的歌曲，跟着音乐轻轻哼唱...',
                    audioExamples: [
                        { url: 'audio/therapy/singing1.mp3', author: '匿名用户', description: '希望之歌' },
                        { url: 'audio/therapy/singing2.mp3', author: '匿名用户', description: '内心独白' }
                    ]
                }
            ]
        },
        {
            id: 'writing',
            title: '写作疗法',
            description: '通过文字表达内心感受',
            activities: [
                {
                    title: '情感日记',
                    description: '记录每天的情绪变化和感受',
                    guide: '找一个安静的时刻，写下今天的心情，不需要华丽的词藻，真实表达即可...',
                    examples: [
                        { content: '今天的天气很好，阳光温暖，但我的心情却很低落...', author: '匿名用户' },
                        { content: '终���完成了一直想做��事，虽然过程很艰难，但很有成就感...', author: '匿名用户' }
                    ]
                },
                {
                    title: '诗歌创作',
                    description: '用诗歌的形式表达情感',
                    guide: '尝试用简短的诗句表达当下的感受，不要在意格式，随心而写...',
                    examples: [
                        { content: '黑夜里的星光/照亮我前行的路/虽然孤独/但不再迷茫', author: '匿名用户' },
                        { content: '春风拂面/带走冬日的忧伤/新的希望/在心中绽放', author: '匿名用户' }
                    ]
                }
            ]
        }
    ],

    // 展示艺术疗法内容
    showArtTherapy: function(categoryId) {
        const category = this.categories.find(c => c.id === categoryId);
        if (!category) return;

        const contentHtml = `
            <div class="space-y-8">
                <div class="text-center">
                    <h3 class="text-2xl font-bold mb-2">${category.title}</h3>
                    <p class="text-gray-600">${category.description}</p>
                </div>
                
                <div class="grid md:grid-cols-2 gap-8">
                    ${category.activities.map(activity => `
                        <div class="bg-white p-6 rounded-lg shadow-md">
                            <h4 class="text-xl font-semibold mb-3">${activity.title}</h4>
                            <p class="text-gray-600 mb-4">${activity.description}</p>
                            
                            <div class="bg-green-50 p-4 rounded-lg mb-6">
                                <h5 class="font-semibold mb-2">活动指导：</h5>
                                <p class="text-gray-600">${activity.guide}</p>
                            </div>
                            
                            <div class="space-y-4">
                                <h5 class="font-semibold">作品展示：</h5>
                                ${activity.examples ? `
                                    <div class="grid grid-cols-2 gap-4">
                                        ${activity.examples.map(example => `
                                            <div class="space-y-2">
                                                <img src="${example.url}" alt="${example.description}"
                                                     class="w-full h-40 object-cover rounded-lg">
                                                <p class="text-sm text-gray-500">${example.description}</p>
                                                <p class="text-sm text-gray-400">by ${example.author}</p>
                                            </div>
                                        `).join('')}
                                    </div>
                                ` : ''}
                                ${activity.audioExamples ? `
                                    <div class="space-y-4">
                                        ${activity.audioExamples.map(example => `
                                            <div class="space-y-2">
                                                <audio controls class="w-full">
                                                    <source src="${example.url}" type="audio/mpeg">
                                                </audio>
                                                <p class="text-sm text-gray-500">${example.description}</p>
                                                <p class="text-sm text-gray-400">by ${example.author}</p>
                                            </div>
                                        `).join('')}
                                    </div>
                                ` : ''}
                                ${activity.examples && activity.examples[0].content ? `
                                    <div class="space-y-4">
                                        ${activity.examples.map(example => `
                                            <div class="bg-gray-50 p-4 rounded-lg">
                                                <p class="text-gray-600 mb-2">${example.content}</p>
                                                <p class="text-sm text-gray-400">by ${example.author}</p>
                                            </div>
                                        `).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        document.getElementById('artTherapyContent').innerHTML = contentHtml;
    },

    // 上传作品
    uploadArtwork: function(categoryId, activityId, artwork) {
        // 这里可以添加作品上传的逻辑
        console.log('上传作品:', categoryId, activityId, artwork);
    }
};

// 添加滚动动画
function handleScrollAnimations() {
    const animateOnScroll = (element, threshold = 0.3) => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1) translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: threshold
            }
        );
        observer.observe(element);
    };

    // 获取需要动画的元素
    const healingTitle = document.getElementById('healing-title');
    const healingCards = document.getElementById('healing-cards');
    const therapyCards = document.getElementById('therapy-cards');
    const wisdomTitle = document.getElementById('wisdom-title');
    const wisdomCards = document.getElementById('wisdom-cards');

    // 添加观察者
    if (healingTitle) animateOnScroll(healingTitle);
    if (healingCards) animateOnScroll(healingCards);
    if (therapyCards) animateOnScroll(therapyCards);
    if (wisdomTitle) animateOnScroll(wisdomTitle);
    if (wisdomCards) animateOnScroll(wisdomCards);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimations();

    // 随机显示一条名言
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.querySelector('.italic').textContent = `"${randomQuote.text}"`;
    document.querySelector('.text-sm.mt-2').textContent = `—— ${randomQuote.author}`;

    // 文章阅读更多按钮点击事件
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function() {
            const articleId = parseInt(this.getAttribute('data-article-id'));
            const article = articles.list.find(a => a.id === articleId);
            if (!article) return;

            const articleContent = this.closest('article').querySelector('.article-content');
            const button = this;

            if (button.textContent === '阅读更多') {
                articleContent.innerHTML = `
                    <div class="prose max-w-none">
                        ${article.content.split('\n').map(p => 
                            `<p class="mb-4 text-gray-600">${p.trim()}</p>`
                        ).join('')}
                        
                        ${article.relatedLinks ? `
                            <div class="mt-8 border-t pt-4">
                                <h4 class="font-semibold text-lg mb-2">相关阅读：</h4>
                                <ul class="space-y-2">
                                    ${article.relatedLinks.map(link => `
                                        <li>
                                            <a href="${link.url}" 
                                               target="_blank" 
                                               rel="noopener noreferrer"
                                               class="text-green-600 hover:text-green-700 hover:underline">
                                                ${link.text}
                                            </a>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                `;
                button.textContent = '收起';
            } else {
                articleContent.innerHTML = `
                    <p class="text-gray-600 mb-4">${article.summary}</p>
                `;
                button.textContent = '阅读更多';
            }
        });
    });

    // 心理测试按钮点击事件
    const startTestBtn = document.getElementById('startTestBtn');
    if (startTestBtn) {
        startTestBtn.addEventListener('click', function() {
            const testModal = document.getElementById('testModal');
            const testContent = document.getElementById('testContent');
            
            // 生成测试题目
            testContent.innerHTML = test.questions.map((q, index) => `
                <div class="question-container mb-6">
                    <h3 class="text-lg font-semibold mb-4">${index + 1}. ${q.text}</h3>
                    <div class="space-y-2">
                        ${q.options.map((option, optIndex) => `
                            <label class="flex items-center cursor-pointer">
                                <input type="radio" name="${q.id}" value="${optIndex}" class="mr-2">
                                <span>${option}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            `).join('') + `
                <button onclick="submitTest()" 
                        class="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200">
                    提交测试
                </button>
            `;
            
            testModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    // 艺术疗法分类按钮点击事件
    document.querySelectorAll('[data-art-category]').forEach(button => {
        button.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-art-category');
            artTherapy.showArtTherapy(categoryId);
        });
    });
});

// 将必要的函数添加到全局作用域
window.ui = ui;
window.startTest = () => {
    const startTestBtn = document.getElementById('startTestBtn');
    if (startTestBtn) {
        startTestBtn.click();
    }
};
window.closeTestModal = () => {
    document.getElementById('testModal').style.display = 'none';
    document.body.style.overflow = 'auto';
};
window.submitTest = () => {
    const answers = {};
    test.questions.forEach(q => {
        const selected = document.querySelector(`input[name="${q.id}"]:checked`);
        if (selected) {
            answers[q.id] = selected.value;
        }
    });

    if (Object.keys(answers).length !== test.questions.length) {
        alert('请回答所有问题');
        return;
    }

    const result = test.calculateResult(answers);
    const testContent = document.getElementById('testContent');
    
    testContent.innerHTML = `
        <div class="space-y-6">
            <div class="text-center">
                <h3 class="text-2xl font-bold mb-2">${result.level}</h3>
                <p class="text-gray-600">${result.description}</p>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg">
                <h4 class="font-semibold mb-2">建议：</h4>
                <ul class="list-disc list-inside space-y-1">
                    ${result.suggestions.map(s => `
                        <li class="text-gray-600">${s}</li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg">
                <h4 class="font-semibold mb-2">推荐资源：</h4>
                <ul class="space-y-1">
                    ${result.resources.map(r => `
                        <li>
                            <a href="${r.url}" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               class="text-blue-600 hover:text-blue-800 hover:underline">
                                ${r.text}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            ${result.emergency ? `
                <div class="bg-red-50 p-4 rounded-lg">
                    <p class="text-red-600">${result.emergency}</p>
                </div>
            ` : ''}
            
            <div class="flex space-x-4">
                <button onclick="startTest()" 
                        class="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    重新测试
                </button>
                <button onclick="closeTestModal()" 
                        class="flex-1 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-green-700">
                    关闭
                </button>
            </div>
        </div>
    `;
};
window.artTherapy = artTherapy;