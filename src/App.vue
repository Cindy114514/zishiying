<template>
  <div class="app">
    <!-- 页眉 -->
    <header class="header">
      <span class="logo">COCO</span>
      <div class="user">
        <div class="avatar-placeholder"></div>
      </div>
    </header>

    <!-- 学科栏 -->
    <div class="subjects">
      <button 
        v-for="s in subjects" 
        :key="s.id"
        :class="{ active: current === s.id }"
        @click="current = s.id"
      >
        {{ s.name }}
      </button>
    </div>

    <!-- 内容区 -->
    <main class="content">
      <!-- 数学页面 -->
      <div v-if="current === 'math'" class="math-page">
        <div class="buttons">
          <button @click="handleClick('学习课程')">📚 学习课程</button>
          <button @click="handleClick('学习建议')">💡 学习建议</button>
          <button @click="handleClick('错题本')" class="wrong-notes">📘 错题本</button>
        </div>
      </div>

      <!-- 语文/英语占位 -->
      <div v-else class="placeholder">
        <p>{{ currentName }}页面开发中...</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 学科
const subjects = [
  { id: 'chinese', name: '语文' },
  { id: 'math', name: '数学' },
  { id: 'english', name: '英语' }
]
const current = ref('math')

// 当前学科名
const currentName = computed(() => {
  const s = subjects.find(s => s.id === current.value)
  return s ? s.name : ''
})

// 按钮点击
const handleClick = (name) => {
  alert(`「${name}」功能待接入`)
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
  background: #f5f7fa;
  font-family: system-ui, -apple-system, sans-serif;
}

/* 页眉 */
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
  gap: 8px;
  padding: 4px 8px;
}

.avatar-placeholder {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #cbd5e1;
}

/* 学科栏 */
.subjects {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
}

.subjects button {
  padding: 8px 24px;
  font-size: 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 24px;
  color: #64748b;
}

.subjects button.active {
  background: #3b82f6;
  color: white;
}

.subjects button:hover:not(.active) {
  background: #e2e8f0;
}

/* 内容区 */
.content {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
}

/* 数学页面 */
.math-page {
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.buttons button {
  padding: 14px 20px;
  font-size: 18px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.buttons button:hover {
  background: #f8fafc;
  border-color: #3b82f6;
  transform: translateX(4px);
}

/* 错题本样式（可选，与其他按钮一致） */
.wrong-notes {
  /* 保持与其他按钮一致即可 */
}

/* 占位页 */
.placeholder {
  text-align: center;
  padding: 60px;
  background: white;
  border-radius: 16px;
  color: #64748b;
}
</style>