// 帖子管理
const posts = {
    create: (content, category) => {
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        const newPost = {
            id: Date.now(),
            content,
            category,
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
        { text: "讨厌上课，好无聊...", type: "study" },
        { text: "又被老师批评了", type: "study" },
        { text: "考试考砸了，怎么办", type: "study" },
        { text: "作业写不完了", type: "study" },
        { text: "上课听不懂", type: "study" },
        
        { text: "工作好累，想辞职", type: "work" },
        { text: "又被老板说了", type: "work" },
        { text: "加班没完没了", type: "work" },
        { text: "工资好低", type: "work" },
        { text: "同事又在甩锅", type: "work" },
        
        { text: "好想回家...", type: "life" },
        { text: "压力好大，喘不过气", type: "life" },
        { text: "生活好无趣", type: "life" },
        { text: "睡不着觉", type: "life" },
        { text: "好想放假", type: "life" },
        
        { text: "感觉被孤立了", type: "social" },
        { text: "没人理解我", type: "social" },
        { text: "好孤单", type: "social" },
        { text: "朋友都不联系我了", type: "social" },
        { text: "社交好累", type: "social" }
    ],

    createFloatingEmotion: () => {
        const container = document.getElementById('floating-emotions');
        const emotion = document.createElement('div');
        emotion.className = 'floating-emotion';
        
        // 随机选择一个负面情绪
        const randomThought = emotions.negativeThoughts[
            Math.floor(Math.random() * emotions.negativeThoughts.length)
        ];
        
        emotion.textContent = randomThought.text;
        emotion.setAttribute('data-type', randomThought.type);

        // 随机位置和延迟
        const randomX = Math.random() * (window.innerWidth - 200);
        const randomDelay = Math.random() * -20;
        emotion.style.left = `${randomX}px`;
        emotion.style.animationDelay = `${randomDelay}s`;

        // 添加鼠标悬停和点击事件
        emotion.addEventListener('mouseover', () => {
            emotion.style.opacity = '0';
            emotion.style.transform = 'scale(0.5) rotate(15deg)';
            setTimeout(() => {
                container.removeChild(emotion);
            }, 500);
        });

        // 动画结束后移除元素
        emotion.addEventListener('animationend', () => {
            container.removeChild(emotion);
        });

        container.appendChild(emotion);
    },

    startFloating: () => {
        // 初始生成一些飘窗
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                emotions.createFloatingEmotion();
            }, i * 500);
        }

        // 每隔1-3创建一个新的飘窗
        setInterval(() => {
            emotions.createFloatingEmotion();
        }, Math.random() * 2000 + 1000);
    }
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    ui.loadStories();

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
        const category = document.getElementById('postCategory').value;
        
        if (!content.trim()) {
            alert('请输入内容');
            return;
        }
        
        if (!category) {
            alert('请选择分类');
            return;
        }
        
        posts.create(content, category);
        document.getElementById('postContent').value = '';
        document.getElementById('postCategory').value = '';
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
}); 