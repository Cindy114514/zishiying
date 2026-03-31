<template>
  <div class="teaching-page">
    <div class="subjects">
      <button
        v-for="s in subjects"
        :key="s.id"
        :class="{ active: current === s.id }"
        @click="current = s.id"
        type="button"
      >
        {{ s.name }}
      </button>
    </div>

    <main class="content">
      <div v-if="current === 'overview'" class="overview-card">
        <h3>教学工作台</h3>
        <p>快速查看课程、学生学习状态与作业完成情况。</p>

        <div class="actions">
          <button @click="handleAction('管理课程')">📚 管理课程</button>
          <button @click="handleAction('布置作业')">📝 布置作业</button>
          <button @click="handleAction('学情分析')">📊 学情分析</button>
        </div>
      </div>

      <div v-else class="placeholder">
        <p>{{ currentName }} 功能模块开发中…</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Subject {
  id: string
  name: string
}

const subjects: Subject[] = [
  { id: 'overview', name: '总览' },
  { id: 'courses', name: '课程管理' },
  { id: 'assignments', name: '作业管理' }
]

const current = ref<string>('overview')

const currentName = computed(() => {
  const s = subjects.find(s => s.id === current.value)
  return s ? s.name : ''
})

const handleAction = (name: string) => {
  // 简单占位行为，后续可替换为路由/接口逻辑
  alert(`触发：${name}`)
}
</script>

<style scoped>
.teaching-page {
  min-height: calc(100vh - 60px);
  font-family: system-ui, -apple-system, sans-serif;
  background: transparent;
  background-color: #f5f7fa;
  border-radius: 16px;
}

/* 顶部选科/模块切换 */
.subjects {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 8px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
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
  color: #fff;
  box-shadow: 0 6px 18px rgba(59,130,246,0.12);
}

/* 内容主体：居中卡片 */
.content {
  max-width: 1000px;
  margin: 24px auto;
  padding: 0 20px;
}

/* 概览卡片 */
.overview-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 6px 20px rgba(2,6,23,0.06);

}

/* 行为按钮用响应式网格均匀铺开 */
.actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 8px;
}
.actions button {
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #e6e9ee;
  background: #f8fafc;
  cursor: pointer;
  font-size: 15px;
  text-align: left;
}
.actions button:hover {
  background: #fff;
  border-color: #3b82f6;
}

/* 占位样式 */
.placeholder {
  background: #ffffff;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  color: #64748b;
  box-shadow: 0 6px 20px rgba(2,6,23,0.04);
}

/* 响应式 */
@media (max-width: 900px) {
  .actions { grid-template-columns: 1fr; }
  .subjects { padding: 8px; gap: 8px; }
}
</style>