const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// 获取所有帖子
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .limit(20);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: '服务器错误' });
    }
});

// 创建新帖子
router.post('/', auth, async (req, res) => {
    try {
        const { content, category } = req.body;
        const post = new Post({
            content,
            category
        });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: '服务器错误' });
    }
});

// 点赞帖子
router.post('/:id/like', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: '帖子不存在' });
        }
        post.likes += 1;
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: '服务器错误' });
    }
});

// 评论帖子
router.post('/:id/comments', auth, async (req, res) => {
    try {
        const { content } = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: '帖子不存在' });
        }
        post.comments.push({ content });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: '服务器错误' });
    }
});

module.exports = router; 