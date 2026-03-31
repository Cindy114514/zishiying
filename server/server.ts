import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/database';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 添加认证路由
app.use('/api/auth', authRoutes);

// 健康检查
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

const startServer = async () => {
    const dbConnected = await testConnection();
    
    if (dbConnected) {
        app.listen(PORT, () => {
            console.log(`🚀 服务器启动: http://localhost:${PORT}`);
        });
    } else {
        console.error('数据库连接失败');
        process.exit(1);
    }
};

startServer();