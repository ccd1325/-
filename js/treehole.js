// 帖子管理
const posts = {
    create: (content, category, images = []) => {
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        const newPost = {
            id: Date.now(),
            content,
            category,
            images,
            author: '匿名用户',
            createdAt: new Date().toISOString(),
            likes: 0,
            comments: []
        };
        posts.unshift(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));
        return newPost;
    },

    getAll: () => JSON.parse(localStorage.getItem('posts') || '[]'),
    
    getByCategory: (category) => {
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        if (category === 'all') return posts;
        return posts.filter(post => post.category === category);
    },

    like: (postId) => {
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.likes += 1;
            localStorage.setItem('posts', JSON.stringify(posts));
        }
    },

    addComment: (postId, content) => {
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.comments.push({
                id: Date.now(),
                content,
                author: '匿名用户',
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('posts', JSON.stringify(posts));
        }
    }
};

// UI 控制
const ui = {
    showModal: (modalId) => {
        document.getElementById(modalId).style.display = 'flex';
        document.body.style.overflow = 'hidden';
    },

    closeModal: (modalId) => {
        document.getElementById(modalId).style.display = 'none';
        document.body.style.overflow = 'auto';
    },

    loadStories: (category = 'all') => {
        const allPosts = posts.getByCategory(category);
        const container = document.getElementById('stories-container');
        
        if (allPosts.length === 0) {
            container.innerHTML = `
                <div class="text-center text-gray-500 py-8">
                    还没有任何故事，来分享第一个故事吧！
                </div>
            `;
            return;
        }
        
        container.innerHTML = allPosts.map(post => `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <div class="flex justify-between items-center mb-4">
                    <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        ${post.category}
                    </span>
                    <span class="text-sm text-gray-500">
                        ${new Date(post.createdAt).toLocaleDateString()}
                    </span>
                </div>
                <p class="text-gray-600 mb-4">${post.content}</p>
                
                ${post.images && post.images.length > 0 ? `
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        ${post.images.map(img => `
                            <div class="w-full h-48 overflow-hidden rounded-lg">
                                <img src="${img}" 
                                     alt="故事图片" 
                                     class="w-full h-full object-cover hover:scale-110 transition duration-300">
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                <div class="flex justify-between items-center text-sm text-gray-500">
                    <div class="flex items-center gap-4">
                        <button onclick="handleLike(${post.id})" class="flex items-center gap-1 hover:text-green-600">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                            </svg>
                            ${post.likes}
                        </button>
                        <button onclick="handleShowComments(${post.id})" class="flex items-center gap-1 hover:text-green-600">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                            </svg>
                            ${post.comments.length}
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
};

// 事件处理
let currentPostId = null;

const handleLike = (postId) => {
    posts.like(postId);
    ui.loadStories();
};

const handleShowComments = (postId) => {
    currentPostId = postId;
    const post = posts.getAll().find(p => p.id === postId);
    if (!post) return;
    
    const commentsHtml = post.comments.map(comment => `
        <div class="border-b border-gray-200 py-3">
            <p class="text-gray-600">${comment.content}</p>
            <div class="text-sm text-gray-500 mt-1">
                ${comment.author} · ${new Date(comment.createdAt).toLocaleDateString()}
            </div>
        </div>
    `).join('') || '<p class="text-gray-500 text-center py-4">暂无评论</p>';

    document.getElementById('commentsContainer').innerHTML = commentsHtml;
    ui.showModal('commentsModal');
};

// 飘窗功能
const emotions = {
    negativeThoughts: [
        // 情感类
        { text: "我默默喜欢他已经两年了，每次看到他的笑容，我的心就像被阳光照耀。可我不敢表白，只能把这份情感藏在心底...", type: "emotion" },
        { text: "分手后，我感觉自己的世界崩塌了。但我每天告诉自己要振作，现在我慢慢走出来了...", type: "emotion" },
        { text: "我和最好的朋友因为一点小事吵架了，我们已经一周没说话，我很想念她，又不知道怎么开口...", type: "emotion" },
        { text: "我和朋友一起在海边看日出的那次经历，让我永远难忘，那种彼此陪伴的温暖，是我最珍视的...", type: "emotion" },
        { text: "我妈妈总是默默地为我付出，她做的每一顿饭都充满了爱，我很感谢她，但从来没好好说出口...", type: "emotion" },
        { text: "我选择的职业不被家人理解，他们觉得不稳定，每次谈到这个话题，我都很心酸...", type: "emotion" },
        
        // 学习类
        { text: "快要考试了，我感觉自己怎么复习都不够，压力好大，真担心自己考不好让父母失望...", type: "study" },
        { text: "我开始学习编程，那些代码就像天书一样，我觉得自己很笨，但又不想放弃...", type: "study" },
        { text: "考研的日子真的好难熬，每天都在书堆里度过...", type: "study" },
        { text: "在学校里，我总是被同学孤立，不知道自己做错了什么...", type: "study" },
        
        // 工作类
        { text: "我在工作中遇到了瓶颈，不知道是该坚持现在的岗位等待机会，还是换一个工作重新开始，很迷茫...", type: "work" },
        { text: "办公室里有同事总是针对道该怎么这种况，天���班都很压抑...", type: "work" },
        { text: "工作好累，想辞职", type: "work" },
        { text: "加班没完没了", type: "work" },
        
        // 生活类
        { text: "我希望自己这个月能够坚持每天跑步，锻炼好身体，为参加马拉松做准备...", type: "life" },
        { text: "我正在努力学习绘画，我的小目标是这个季度能画出一幅让自己满意的风景油画...", type: "life" },
        { text: "我的梦想是能去贫困地区当一名教师，为那里的孩子们带去知识和希望，虽然很难，但我一直在朝个方向努力...", type: "life" },
        { text: "我想自己创业，拥有一家有特色的咖啡店，为此我在不断积累资金和经验...", type: "life" },
        { text: "我在一次旅行中迷路了，结果误打误撞进入了一个美丽的小山村，那里的风景如画，村民也特别热情...", type: "life" },
        { text: "今天走在路上，看到一朵盛开的小花，它在阳光下特别美，那一刻我感觉生活充满了美好...", type: "life" }
    ],

    createFloatingEmotion: () => {
        const container = document.getElementById('floating-emotions');
        const emotion = document.createElement('div');
        emotion.className = 'floating-emotion';
        
        const randomThought = emotions.negativeThoughts[
            Math.floor(Math.random() * emotions.negativeThoughts.length)
        ];
        
        emotion.textContent = randomThought.text;
        emotion.setAttribute('data-type', randomThought.type);

        // 随机位置（整个屏幕范围）
        const randomX = Math.random() * (window.innerWidth - 200);
        const randomY = Math.random() * (window.innerHeight - 100);
        emotion.style.left = `${randomX}px`;
        emotion.style.top = `${randomY}px`;

        // 修改鼠标悬停事件，添加碎片效果
        emotion.addEventListener('mouseover', () => {
            // 创建碎片
            const fragments = 15; // 增加碎片数量
            const colors = ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80']; // 绿色系碎片颜色

            for (let i = 0; i < fragments; i++) {
                const fragment = document.createElement('div');
                fragment.className = 'emotion-fragment';
                fragment.style.position = 'absolute';
                fragment.style.width = '4px';
                fragment.style.height = '4px';
                fragment.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                fragment.style.left = '50%';
                fragment.style.top = '50%';
                fragment.style.transform = 'translate(-50%, -50%)';
                
                // 随机角度和距离
                const angle = (i / fragments) * 360 + Math.random() * 30;
                const distance = 100 + Math.random() * 200; // 增加扩散距离
                
                fragment.style.animation = `
                    fragment-scatter 2s cubic-bezier(0.4, 0, 0.2, 1) forwards,
                    fragment-fade 2s ease-out forwards
                `;
                
                // 设置最终位置
                fragment.style.setProperty('--final-x', `${Math.cos(angle * Math.PI / 180) * distance}px`);
                fragment.style.setProperty('--final-y', `${Math.sin(angle * Math.PI / 180) * distance}px`);
                
                emotion.appendChild(fragment);
            }

            // 添加CSS动画
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fragment-scatter {
                    0% {
                        transform: translate(-50%, -50%) scale(1);
                    }
                    100% {
                        transform: translate(
                            calc(-50% + var(--final-x)),
                            calc(-50% + var(--final-y))
                        ) scale(0.5) rotate(${Math.random() * 360}deg);
                    }
                }
                @keyframes fragment-fade {
                    0% { opacity: 1; }
                    70% { opacity: 0.7; }
                    100% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);

            // 原始文字淡出
            emotion.style.transition = 'all 0.8s ease-out';
            emotion.style.opacity = '0';
            emotion.style.transform = 'scale(0.8)';

            // 延长移除时间
            setTimeout(() => {
                container.removeChild(emotion);
                document.head.removeChild(style);
            }, 2000);
        });

        container.appendChild(emotion);
    },

    startFloating: () => {
        // 初始生成一些飘窗
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                // 检查当前飘窗数量
                const currentEmotions = document.querySelectorAll('.floating-emotion');
                if (currentEmotions.length < 15) {
                    emotions.createFloatingEmotion();
                }
            }, i * 450);
        }

        // 每隔2-3秒创建一个新的飘窗
        setInterval(() => {
            // 检查当前飘窗数量
            const currentEmotions = document.querySelectorAll('.floating-emotion');
            if (currentEmotions.length < 15) {
                emotions.createFloatingEmotion();
            }
        }, Math.random() * 1000 + 2000);
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    ui.loadStories();

    // 添加表情按钮点击事件
    document.querySelectorAll('.emoji-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const postContent = document.getElementById('postContent');
            const emojiAlt = button.querySelector('img').alt;
            
            // 在光标位置插入表情文字
            const cursorPosition = postContent.selectionStart;
            const textBefore = postContent.value.substring(0, cursorPosition);
            const textAfter = postContent.value.substring(cursorPosition);
            
            // 根据表情类型插入对应的文字
            let emojiText = '';
            switch(emojiAlt) {
                case '开心':
                    emojiText = '[开心]';
                    break;
                case '难过':
                    emojiText = '[难过]';
                    break;
                case '生气':
                    emojiText = '[生气]';
                    break;
                case '平静':
                    emojiText = '[平静]';
                    break;
            }
            
            postContent.value = textBefore + emojiText + textAfter;
            
            // 将光标移动到插入的表情文字后面
            const newPosition = cursorPosition + emojiText.length;
            postContent.setSelectionRange(newPosition, newPosition);
            postContent.focus();
        });
    });

    // 分类按钮点击事件
    document.querySelectorAll('[data-category]').forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            document.querySelectorAll('[data-category]').forEach(btn => {
                btn.classList.remove('bg-green-600', 'text-white');
                btn.classList.add('bg-gray-200');
            });
            e.target.classList.remove('bg-gray-200');
            e.target.classList.add('bg-green-600', 'text-white');
            ui.loadStories(category);
        });
    });

    // 发帖表单提交事件
    document.getElementById('postForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const content = document.getElementById('postContent').value;
        
        if (!content.trim()) {
            alert('请输入内容');
            return;
        }
        
        posts.create(content, "all", uploadedImages); // 默认分类为 "all"
        document.getElementById('postContent').value = '';
        uploadedImages = [];
        imagePreview.innerHTML = '';
        imageCount.textContent = '';
        ui.loadStories();
    });

    // 评论表单提交事件
    document.getElementById('commentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const content = document.getElementById('commentContent').value;
        
        if (!content.trim()) {
            alert('请输入评论内容');
            return;
        }
        
        posts.addComment(currentPostId, content);
        document.getElementById('commentContent').value = '';
        handleShowComments(currentPostId);
        ui.loadStories();
    });

    // 启动情绪飘窗
    emotions.startFloating();

    // 获取用户发布的帖子并添加到飘窗内容中
    const userPosts = posts.getAll();
    userPosts.forEach(post => {
        emotions.negativeThoughts.push({
            text: post.content,
            type: post.category.toLowerCase()
        });
    });

    // 图片上传处理
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const imageCount = document.getElementById('imageCount');
    let uploadedImages = [];

    imageUpload.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        uploadedImages = []; // 清空之前的图片
        imagePreview.innerHTML = ''; // 清空预览区域

        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imgData = e.target.result;
                    uploadedImages.push(imgData);
                    
                    // 添加预览
                    const previewDiv = document.createElement('div');
                    previewDiv.className = 'relative';
                    previewDiv.innerHTML = `
                        <img src="${imgData}" class="w-full h-32 object-cover rounded-lg">
                        <button type="button" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    `;
                    imagePreview.appendChild(previewDiv);

                    // 删除按钮事件
                    const deleteBtn = previewDiv.querySelector('button');
                    deleteBtn.onclick = () => {
                        const index = uploadedImages.indexOf(imgData);
                        if (index > -1) {
                            uploadedImages.splice(index, 1);
                            previewDiv.remove();
                            imageCount.textContent = `已选择 ${uploadedImages.length} 张图片`;
                        }
                    };
                };
                reader.readAsDataURL(file);
            }
        });

        imageCount.textContent = `已选择 ${files.length} 张图片`;
    });
}); 