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

    loadStories: () => {
        const allPosts = posts.getAll();
        const container = document.getElementById('stories-container');
        
        if (allPosts.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center text-gray-500 py-8">
                    还没有任何故事，来分享第一个故事吧！
                </div>
            `;
            return;
        }
        
        container.innerHTML = allPosts.map(post => `
            <div class="bg-white p-6 rounded-lg shadow-md">
                <p class="text-gray-600 mb-4">${post.content}</p>
                <div class="flex justify-between items-center text-sm text-gray-500">
                    <span>${new Date(post.createdAt).toLocaleDateString()}</span>
                    <div class="flex items-center gap-4">
                        <button onclick="handleLike(${post.id})" class="flex items-center gap-1">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                            </svg>
                            ${post.likes}
                        </button>
                        <button onclick="handleShowComments(${post.id})" class="flex items-center gap-1">
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
const handleLike = (postId) => {
    posts.like(postId);
    ui.loadStories();
};

const handlePost = (e) => {
    e.preventDefault();
    const content = document.getElementById('postContent').value;
    const category = document.getElementById('postCategory').value;
    
    if (!content.trim()) {
        alert('请输入内容');
        return;
    }
    
    posts.create(content, category);
    ui.closeModal('postModal');
    ui.loadStories();
    document.getElementById('postContent').value = '';
};

const handleShowComments = (postId) => {
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

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    ui.loadStories();

    // 发帖按钮事件
    document.querySelector('.cta-button').addEventListener('click', () => {
        ui.showModal('postModal');
    });

    // 发帖表单提交事件
    document.getElementById('postForm').addEventListener('submit', handlePost);
}); 