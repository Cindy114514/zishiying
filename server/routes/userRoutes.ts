import express from 'express';
import { UserModel } from '../models/user';

const router = express.Router();

// 获取所有用户
router.get('/', async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (error) {
        console.error('获取用户列表失败:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 根据 ID 获取用户
router.get('/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await UserModel.findById(userId);
        
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: '用户不存在' });
        }
    } catch (error) {
        console.error('获取用户失败:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 创建用户
router.post('/', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        
        // 简单验证
        if (!username || !password || !email) {
            return res.status(400).json({ error: '缺少必要字段' });
        }
        
        const userId = await UserModel.create({ username, password, email });
        res.status(201).json({ id: userId, message: '用户创建成功' });
    } catch (error) {
        console.error('创建用户失败:', error);
        res.status(500).json({ error: '服务器错误' });
    }
});

// 更新用户
router.put('/:id', async (req, res) => {
    try {
        // 实现更新逻辑
        res.json({ message: '更新功能待实现' });
    } catch (error) {
        res.status(500).json({ error: '服务器错误' });
    }
});

// 删除用户
router.delete('/:id', async (req, res) => {
    try {
        // 实现删除逻辑
        res.json({ message: '删除功能待实现' });
    } catch (error) {
        res.status(500).json({ error: '服务器错误' });
    }
});

export default router;