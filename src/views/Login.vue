<template>
  <div class="login-container">
    <div class="login-box" role="main" aria-labelledby="login-title">
      <h2 id="login-title">COCO</h2>

      <section v-if="!isRegister" class="login-form" aria-label="登录表单">
        <h3>登录</h3>

        <label class="visually-hidden">用户名</label>
        <input
          v-model.trim="loginForm.username"
          type="text"
          placeholder="用户名"
          autocomplete="username"
        />

        <label class="visually-hidden">密码</label>
        <input
          v-model="loginForm.password"
          type="password"
          placeholder="密码"
          autocomplete="current-password"
          @keyup.enter="handleLogin"
        />

        <button :disabled="loading" @click="handleLogin">
          {{ loading ? '登录中...' : '登录' }}
        </button>

        <p class="toggle">
          还没有账号？
          <a @click="switchToRegister">立即注册</a>
        </p>
      </section>

      <section v-else class="register-form" aria-label="注册表单">
        <h3>注册</h3>

        <label class="visually-hidden">用户名</label>
        <input
          v-model.trim="registerForm.username"
          type="text"
          placeholder="用户名"
        />

        <label class="visually-hidden">邮箱</label>
        <input
          v-model.trim="registerForm.email"
          type="email"
          placeholder="邮箱"
        />

        <label class="visually-hidden">密码</label>
        <input
          v-model="registerForm.password"
          type="password"
          placeholder="密码（建议 6 位以上）"
          @keyup.enter="handleRegister"
        />

        <button :disabled="loading" @click="handleRegister">
          {{ loading ? '提交中...' : '注册' }}
        </button>

        <p class="toggle">
          已有账号？
          <a @click="switchToLogin">返回登录</a>
        </p>
      </section>

      <div v-if="message" class="message" :class="messageType">{{ message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import request from '../utils/request'

const router = useRouter()

const isRegister = ref(false)
const loading = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error' | ''>('')

const loginForm = ref({
  username: '',
  password: ''
})

const registerForm = ref({
  username: '',
  email: '',
  password: ''
})

const showMessage = (msg: string, type: 'success' | 'error') => {
  message.value = msg
  messageType.value = type
  setTimeout(() => {
    message.value = ''
    messageType.value = ''
  }, 3000)
}

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const handleLogin = async () => {
  if (!loginForm.value.username || !loginForm.value.password) {
    showMessage('请填写用户名和密码', 'error')
    return
  }

  loading.value = true
  try {
    const res: any = await request.post('/auth/login', loginForm.value)
    // 期待后端返回 { success: boolean, token?: string, user?: {...}, message?: string }
    if (res && res.success) {
      if (res.token) localStorage.setItem('token', res.token)
      if (res.user) localStorage.setItem('user', JSON.stringify(res.user))
      showMessage('登录成功！', 'success')
      // 跳回首页或上一个页面
      setTimeout(() => {
        router.push('/')
      }, 700)
    } else {
      showMessage(res?.message || '登录失败，请检查用户名或密码', 'error')
    }
  } catch (err) {
    showMessage('网络或服务器错误，登录失败', 'error')
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  const { username, email, password } = registerForm.value
  if (!username || !email || !password) {
    showMessage('请填写完整信息', 'error')
    return
  }
  if (!validateEmail(email)) {
    showMessage('请输入有效的邮箱地址', 'error')
    return
  }
  if (password.length < 6) {
    showMessage('密码长度应至少为 6 位', 'error')
    return
  }

  loading.value = true
  try {
    const res: any = await request.post('/auth/register', registerForm.value)
    if (res && res.success) {
      showMessage('注册成功，请登录', 'success')
      // 清空并切回登录
      setTimeout(() => {
        isRegister.value = false
        registerForm.value = { username: '', email: '', password: '' }
      }, 800)
    } else {
      showMessage(res?.message || '注册失败', 'error')
    }
  } catch (err) {
    showMessage('网络或服务器错误，注册失败', 'error')
  } finally {
    loading.value = false
  }
}

const switchToRegister = () => {
  isRegister.value = true
  message.value = ''
}

const switchToLogin = () => {
  isRegister.value = false
  message.value = ''
}
</script>

<style scoped>
.login-container {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px;
}

.login-box {
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.12);
  width: 420px;
  max-width: 100%;
}

.login-box h2 {
  text-align: center;
  color: #3b82f6;
  margin-bottom: 18px;
}

.login-box h3 {
  margin-bottom: 12px;
  color: #333;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 12px;
  border: 1px solid #e6e9ee;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59,130,246,0.08);
}

button {
  width: 100%;
  padding: 10px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
}

button[disabled] {
  opacity: 0.7;
  cursor: not-allowed;
}

.toggle {
  text-align: center;
  margin-top: 12px;
  color: #666;
}

.toggle a {
  color: #3b82f6;
  cursor: pointer;
  text-decoration: none;
}

.toggle a:hover {
  text-decoration: underline;
}

.message {
  margin-top: 14px;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
}

.message.success {
  background: #e6ffed;
  color: #0b6b2b;
}

.message.error {
  background: #fff1f0;
  color: #7a1b1b;
}

/* 无障碍隐藏文本 */
.visually-hidden {
  position: absolute !important;
  height: 1px; width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
</style>