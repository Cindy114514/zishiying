<template>
  <div class="app">
    <header class="header">
      <span class="logo" @click="goToHome" style="cursor: pointer">COCO</span>
      <div class="user">
        <div class="avatar-placeholder" @click="goToLogin" title="登录/个人中心" style="cursor: pointer"></div>
      </div>
    </header>

    <main class="main-content">
      <!-- 将路由视图放在这里，路由组件（Home / Learning）会渲染到此 -->
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  router.push('/')
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* header 保留 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #3b82f6;
}

.user {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar-placeholder {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #cbd5e1;
  /* 可点击的视觉提示 */
  cursor: pointer;
}

/* 关键改动：移除强制居中，让路由页自己决定布局 */
.main-content {
  min-height: calc(100vh - 60px);
  padding: 20px;
  /* 不再居中或限制宽度，页面组件自行控制最大宽度和布局 */
  background: transparent;
}

/* 保留一些可被页面复用的样式 */
.center-box {
  text-align: center;
}

.title {
  font-size: 48px;
  color: white;
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.subtitle {
  font-size: 18px;
  color: rgba(255,255,255,0.9);
  margin-bottom: 40px;
}

.start-btn {
  background: white;
  color: #667eea;
  border: none;
  padding: 14px 36px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.start-btn:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
}
</style>