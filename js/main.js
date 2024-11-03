// 搜索功能
const search = {
    // 获取所有可搜索的内容
    getAllContent: () => {
        const results = [];
        
        // 获取树洞帖子
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        posts.forEach(post => {
            results.push({
                type: 'post',
                title: `树洞 - ${post.category}`,
                content: post.content,
                url: `treehole.html?id=${post.id}`,
                category: post.category,
                tags: [post.category, '树洞', '分享']
            });
        });

        // 获取妙妙屋文章
        const articles = [
            {
                id: 1,
                title: "保持希望，永不放弃",
                content: "生活中总会遇到各种困难和挑战，但只要我们保持希望...",
                url: "soulsoup.html#article-1",
                category: "励志",
                tags: ['励志', '希望', '成长', '心理']
            },
            {
                id: 2,
                title: "学会与自己对话",
                content: "在这个快节奏的社会中，我们常常忽略了最重要的事情...",
                url: "soulsoup.html#article-2",
                category: "心理",
                tags: ['自我对话', '心理', '成长', '情绪管理']
            },
            {
                id: 3,
                title: "情绪管理指南",
                content: "如何有效管理自己的情绪...",
                url: "soulsoup.html#article-3",
                category: "心理",
                tags: ['情绪管理', '心理', '压力', '自我调节']
            }
        ];
        articles.forEach(article => {
            results.push({
                type: 'article',
                title: article.title,
                content: article.content,
                url: article.url,
                category: article.category,
                tags: article.tags
            });
        });

        // 获取心理测试
        const tests = [
            {
                title: "心理健康自测",
                description: "通过专业量表了解自己的心理状态",
                url: "soulsoup.html#test",
                category: "测试",
                tags: ['心理测试', '自我评估', '心理健康']
            }
        ];
        tests.forEach(test => {
            results.push({
                type: 'test',
                title: test.title,
                content: test.description,
                url: test.url,
                category: test.category,
                tags: test.tags
            });
        });

        return results;
    },

    // 执行搜索
    performSearch: (keyword) => {
        if (!keyword.trim()) return [];
        
        const allContent = search.getAllContent();
        const lowercaseKeyword = keyword.toLowerCase();
        
        // 搜索结果
        const results = allContent.filter(item => 
            item.title.toLowerCase().includes(lowercaseKeyword) ||
            item.content.toLowerCase().includes(lowercaseKeyword) ||
            item.tags.some(tag => tag.toLowerCase().includes(lowercaseKeyword))
        );

        // 相关推荐
        const recommendations = allContent.filter(item => 
            !results.includes(item) && // 不在搜索结果中
            item.tags.some(tag => 
                results.some(result => 
                    result.tags.includes(tag)
                )
            )
        ).slice(0, 3); // 只取前3个推荐

        return {
            results,
            recommendations
        };
    },

    // 显示搜索结果
    showResults: (searchData) => {
        const modal = document.getElementById('searchResultsModal');
        const container = document.getElementById('searchResultsContainer');
        
        if (searchData.results.length === 0) {
            container.innerHTML = `
                <div class="text-center text-gray-500 py-8">
                    没有找到相关内容
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="space-y-8">
                    <!-- 搜索结果 -->
                    <div>
                        <h3 class="text-xl font-bold mb-4">搜索结果</h3>
                        <div class="space-y-4">
                            ${searchData.results.map(result => `
                                <a href="${result.url}" class="block bg-white p-4 rounded-lg shadow hover:shadow-md transition duration-200">
                                    <div class="flex items-center justify-between mb-2">
                                        <h4 class="text-lg font-semibold text-gray-800">${result.title}</h4>
                                        <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                                            ${result.type === 'post' ? '树洞' : 
                                              result.type === 'test' ? '测试' : '文章'}
                                        </span>
                                    </div>
                                    <p class="text-gray-600 mb-2">${result.content.substring(0, 100)}...</p>
                                    <div class="flex flex-wrap gap-2">
                                        ${result.tags.map(tag => `
                                            <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                                ${tag}
                                            </span>
                                        `).join('')}
                                    </div>
                                </a>
                            `).join('')}
                        </div>
                    </div>

                    <!-- 相关推荐 -->
                    ${searchData.recommendations.length > 0 ? `
                        <div>
                            <h3 class="text-xl font-bold mb-4">相关推荐</h3>
                            <div class="space-y-4">
                                ${searchData.recommendations.map(item => `
                                    <a href="${item.url}" class="block bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition duration-200">
                                        <div class="flex items-center justify-between mb-2">
                                            <h4 class="text-lg font-semibold text-gray-800">${item.title}</h4>
                                            <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                                推荐
                                            </span>
                                        </div>
                                        <p class="text-gray-600 mb-2">${item.content.substring(0, 100)}...</p>
                                        <div class="flex flex-wrap gap-2">
                                            ${item.tags.map(tag => `
                                                <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                                    ${tag}
                                                </span>
                                            `).join('')}
                                        </div>
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        }
        
        ui.showModal('searchResultsModal');
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
    }
};

// 事件处理
const handleSearch = (e) => {
    e.preventDefault();
    const searchInput = document.getElementById('searchInput');
    const keyword = searchInput.value.trim();
    
    if (!keyword) {
        alert('请输入搜索内容');
        return;
    }
    
    const searchData = search.performSearch(keyword);
    search.showResults(searchData);
};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 搜索表单提交事件
    document.getElementById('searchForm').addEventListener('submit', handleSearch);

    // 关闭模态框按钮事件
    document.querySelectorAll('[onclick^="ui.closeModal"]').forEach(button => {
        const modalId = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        button.addEventListener('click', () => ui.closeModal(modalId));
    });
});

// 将必要的函数添加到全局作用域
window.ui = ui;
window.handleSearch = handleSearch;