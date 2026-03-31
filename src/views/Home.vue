<template>
  <section class="home-wrap">
    <header class="hero">
      <h1 class="hero-title">个性化学习中心</h1>
      <p class="hero-sub">让每一位学习者都能获得最适合自己的教育！</p>
    </header>

    <div class="card-list">
      <article class="card">
        <div class="card-icon" aria-hidden="true">👥</div>
        <h2 class="card-title">大规模因材施教</h2>
        <p class="card-desc">AI 诊断认知起点，辅助教师实现个性化与差异化教学，覆盖大规模学生场景。</p>
        <div class="tags">
          <span>认知诊断</span>
          <span>智能导师</span>
          <span>因材施教</span>
        </div>
        <a class="card-action" @click.prevent="goToTeaching">进入系统 →</a>
      </article>

      <article class="card">
        <div class="card-icon" aria-hidden="true">✅</div>
        <h2 class="card-title">自适应学习</h2>
        <p class="card-desc">系统提供即时个性化反馈与推荐，赋能学生自主学习并不断调整学习路径。</p>
        <div class="tags">
          <span>智能学习</span>
          <span>自主学习</span>
          <span>学习路径</span>
        </div>
        <a class="card-action" @click.prevent="goToLearning">进入系统 →</a>
      </article>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goToTeaching = () => router.push('/teaching')
const goToLearning = () => router.push('/learning')
</script>

<style scoped>
:root{
  --bg-gradient: linear-gradient(135deg,#667eea 0%,#764ba2 100%);
  --primary: #3b82f6;
  --mint: #2dd4bf; /* 与项目颜色相近的青绿色 */
  --card-bg-top: #ffffff;    /* 顶部更白 */
  --card-bg-bottom: #f3f4f6; /* 底部浅灰 */
  --muted: #6b7280;
}

/* 页面整体 */
.home-wrap{
  min-height: calc(100vh - 60px);
  padding: 48px 20px;
  background: var(--bg-gradient);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 头部标题 */
.hero{
  text-align: center;
  margin-bottom: 36px;
  color: #0f172a;
}
.hero-title{
  font-family: "PingFang SC","Noto Sans SC", "Microsoft YaHei", sans-serif;
  font-size: 36px;
  margin: 0 0 8px;
  color: #07111a;
}
.hero-sub{
  margin: 0;
  color: rgba(7,17,26,0.7);
  font-size: 16px;
}

/* 卡片容器：左右并列，居中 */
.card-list{
  display: grid;
  grid-template-columns: repeat(2, minmax(260px, 420px));
  gap: 28px;
  width: 100%;
  max-width: 1100px;
  align-items: start;
  justify-content: center;
  box-sizing: border-box;
}

/* 单张卡片样式：上白下浅灰的渐变，使卡片内部看起来“白色再灰一点点” */
.card{
  background: #f5f7fa; /* 纯白背景 */
  border-radius: 14px;
  padding: 28px;
  box-shadow: 0 8px 30px rgba(2,6,23,0.06);
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  border: 1px solid rgba(15,23,42,0.04);
}

/* icon 圆圈，与项目主色/青绿色呼应 */
.card-icon{
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: #f5f7fa;
  color: var(--mint);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  box-shadow: 0 6px 18px rgba(2,6,23,0.04);
  border: 1px solid rgba(45,212,191,0.12);
}

/* 标题与描述 */
.card-title{
  font-size: 22px;
  margin: 0;
  color: #07111a;
  font-weight: 700;
}
.card-desc{
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
  font-size: 14px;
}

/* 标签 */
.tags{
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.tags span{
  background: rgba(45,212,191,0.12);
  color: #0f766e;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 13px;
}

/* 操作链接，与项目颜色一致 */
.card-action{
  margin-top: 8px;
  color: var(--mint);
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
}
.card-action:hover{
  text-decoration: underline;
}

/* 响应式：窄屏变为一列 */
@media (max-width: 900px){
  .card-list{
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 12px;
  }
  .hero-title{ font-size: 30px; }
}
</style>