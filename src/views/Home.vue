<template>
  <div class="center-box">
    <h1 class="title">自适应学习系统</h1>
    <p class="subtitle">个性化学习，智能推荐</p>
    <button class="start-btn" @click="goToLearning">
      开始自适应学习
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goToLearning = () => {
  console.log('点击按钮，跳转到学习页面')
  router.push('/learning')
}
</script>

<style scoped>
/* 可重用 App.vue 中的样式，或复制需要的样式到这里 */
.center-box { text-align: center; }
.title { font-size: 48px; color: white; margin-bottom: 16px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1); }
.subtitle { font-size: 18px; color: rgba(255,255,255,0.9); margin-bottom: 40px; }
.start-btn { background: white; color: #667eea; border: none; padding: 14px 36px; font-size: 18px; font-weight: bold; border-radius: 50px; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
.start-btn:hover { background: #f8f9fa; transform: translateY(-2px); }
</style>