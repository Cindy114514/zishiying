import { ResultSetHeader, RowDataPacket } from 'mysql2'
import pool from '../config/database'

// 用户接口定义
export interface User {
  id?: number
  username: string
  password: string
  email: string
  created_at?: Date
}

// 数据库查询结果类型
interface UserRow extends RowDataPacket, User {}

// 用户模型类
export class UserModel {
  // 创建用户，返回新插入的 id
  static async create(user: User): Promise<number> {
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [user.username, user.password, user.email]
    )
    return (result as ResultSetHeader).insertId
  }

  // 根据用户名查找用户（包含密码）
  static async findByUsername(username: string): Promise<User | null> {
    const [rows] = await pool.execute<UserRow[]>(
      'SELECT id, username, password, email, created_at FROM users WHERE username = ? LIMIT 1',
      [username]
    )
    if ((rows as UserRow[]).length === 0) return null
    const r = (rows as UserRow[])[0]
    return {
      id: r.id,
      username: r.username,
      password: r.password,
      email: r.email,
      created_at: r.created_at
    }
  }

  // 根据 ID 查找用户（不返回密码）
  static async findById(id: number): Promise<User | null> {
    const [rows] = await pool.execute<UserRow[]>(
      'SELECT id, username, email, created_at FROM users WHERE id = ? LIMIT 1',
      [id]
    )
    if ((rows as UserRow[]).length === 0) return null
    const r = (rows as UserRow[])[0]
    return {
      id: r.id,
      username: r.username,
      // password intentionally omitted
      password: '',
      email: r.email,
      created_at: r.created_at
    }
  }

  // 获取所有用户（不返回密码）
  static async findAll(): Promise<User[]> {
    const [rows] = await pool.execute<UserRow[]>(
      'SELECT id, username, email, created_at FROM users'
    )
    return (rows as UserRow[]).map(r => ({
      id: r.id,
      username: r.username,
      password: '',
      email: r.email,
      created_at: r.created_at
    }))
  }
}