import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../config/database';

const router = express.Router();

// 注册接口 - 不加密密码
router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        
        // 验证必填字段
        if (!username || !password || !email) {
            return res.json({ 
                success: false, 
                message: '请填写完整信息' 
            });
        }
        
        // 检查用户是否已存在
        const [existing]: any = await pool.execute(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            [username, email]
        );
        
        if (existing.length > 0) {
            return res.json({ 
                success: false, 
                message: '用户名或邮箱已存在' 
            });
        }
        
        // 直接插入明文密码（不加密）
        const [result]: any = await pool.execute(
            'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
            [username, password, email]  // 直接使用明文密码
        );
        
        res.json({ 
            success: true, 
            message: '注册成功',
            data: {
                id: result.insertId,
                username,
                email
            }
        });
        
    } catch (error) {
        console.error('注册失败:', error);
        res.json({ 
            success: false, 
            message: '注册失败，请重试' 
        });
    }
});

// 登录接口 - 直接比较明文密码
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.json({ 
                success: false, 
                message: '请填写用户名和密码' 
            });
        }
        
        const [rows]: any = await pool.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );
        
        const user = rows[0];
        
        if (!user) {
            return res.json({ 
                success: false, 
                message: '用户名或密码错误' 
            });
        }
        
        // 直接比较明文密码
        if (user.password !== password) {
            return res.json({ 
                success: false, 
                message: '用户名或密码错误' 
            });
        }
        
        const token = jwt.sign(
            { id: user.id, username: user.username },
            'my_secret_key',
            { expiresIn: '7d' }
        );
        
        res.json({
            success: true,
            message: '登录成功',
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
        
    } catch (error) {
        console.error('登录失败:', error);
        res.json({ success: false, message: '登录失败' });
    }
});

export default router;