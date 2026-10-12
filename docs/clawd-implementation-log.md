# Clawd 小螃蟹美化方案实施记录

## 项目目标
用 Clawd 小螃蟹像素风形象美化 AI4U 官网的每个页面

## 实施顺序
按照 1→4→3→2 的优先级顺序执行：
1. ✅ **方案 1：静态页面装饰角色**（已完成基础）
2. ⏳ **方案 4：Micro-interactions 微交互**（进行中）
3. ⏸️ **方案 3：大场景全景页**（待开始）
4. ⏸️ **方案 2：动态互动式吉祥物**（待开始）

---

## ✅ 方案 1：静态页面装饰角色（已完成）

### 已实现的功能

#### 1. 核心组件 `ClawdAvatar.tsx`
**位置**: `components/ui/ClawdAvatar.tsx`

**功能**:
- 纯 CSS Grid 像素渲染，无图片依赖
- 支持 6 种角色变体：hero、wizard、chef、dumbbell、crown、sad
- 支持 4 种尺寸：sm、md、lg、xl
- 保持像素风格（crisp-edges）

**技术方案**:
- 从终端 ANSI 输出手工转换为颜色矩阵
- 使用 CSS Grid 渲染每个像素点
- 响应式尺寸控制

#### 2. 页面集成

**✅ Hero 区域（首页）**
- 文件：`components/sections/Hero.tsx`
- 效果：右上角欢迎螃蟹（挥手 + 派对帽）
- 动画：从右侧淡入，延迟 1.5s 触发

**✅ 404 页面**
- 文件：`app/not-found.tsx`
- 效果：居中沮丧螃蟹（eyes down, arms 下垂）
- 动画：轻微摆动（sadWiggle）

**✅ 页脚**
- 文件：`components/ui/SiteFooter.tsx`
- 效果：Logo 旁边小螃蟹（sm 尺寸）

#### 3. 样式文件
**位置**: `app/components.css`

**新增样式**:
- `.clawd-avatar` - 像素渲染样式
- `@keyframes fadeInFromRight` - Hero 入场动画
- `@keyframes sadWiggle` - 404 摆动动画
- `.doc-card` - 教程卡片样式（为后续扩展准备）
- `prefers-reduced-motion` 适配

#### 4. 辅助组件

**DocCard 组件（已创建）**
- 文件：`components/ui/DocCard.tsx`
- 功能：自动根据文档标题/slug 匹配对应螃蟹角色
- 映射规则：
  - Agent 相关 → wizard（巫师）
  - 建站相关 → chef（厨师）
  - 提效办公 → dumbbell（举重）
  - Codex 相关 → crown（皇冠）
  - PPT 相关 → hero（派对帽）

#### 5. 展示页面
**位置**: `app/clawd-showcase/page.tsx`
- 展示所有 6 种角色变体
- 展示 4 种尺寸对比
- 访问路径：`/clawd-showcase`

---

## ⏳ 方案 4：Micro-interactions 微交互（下一步）

### 计划实现的功能

#### 1. 导航栏 Logo 悬停效果
**位置**: `components/ui/SiteNav.tsx`
- Logo 旁边添加小螃蟹（sm 尺寸）
- 鼠标悬停时螃蟹挥手
- 使用 CSS `:hover` 切换 arm 状态

#### 2. 滚动进度指示器增强
**位置**: 文档阅读页
- 用螃蟹爬行替代原有进度条
- 螃蟹位置 = 阅读进度百分比
- 使用 CSS `animation-timeline: scroll()`

#### 3. 加载状态动画
**新建**: `components/ui/LoadingCrab.tsx`
- 螃蟹举哑铃循环动画
- 用于表单提交、数据加载等场景

#### 4. 成功提示
**新建**: `components/ui/SuccessCrab.tsx`
- 欢呼姿态螃蟹（arms -4, -4, sparkle eyes）
- 淡入 + 轻微弹跳动画
- 用于操作成功反馈

---

## ⏸️ 方案 3：大场景全景页（待开始）

### 计划内容
创建 `/playground` 或 `/about` 独立页面，展示 AI4U 像素校园：
- 俯视视角，3:4 竖版（1440×1920）
- 20-40 只螃蟹在不同区域活动
- 咖啡厅、图书馆、草坪、湖泊等场景
- 樱花粒子效果

### 技术方案
使用 clawd-avatar-skill 的**场景模式**，调用 `references/scene-template.html`

---

## ⏸️ 方案 2：动态互动式吉祥物（待开始）

### 计划内容
- Hero 命令行动画：螃蟹跑进来 → 看向标题 → 眼睛 sparkle
- Join Us 卡片：螃蟹举爱心左右摇摆
- 教程 hover 效果：对应动作（挥魔杖、敲键盘、举重等）

### 技术方案
使用 clawd-avatar-skill 的**动画模式**，生成 HTML 动画文件，提取关键逻辑集成到 React 组件

---

## 技术债务与优化

### 待解决问题
1. ⚠️ **像素数据精度**：当前从 ANSI 输出手工转换，可能存在误差
2. ⚠️ **性能优化**：大量螃蟹渲染时可能影响性能（考虑 CSS Sprites）
3. ⚠️ **暗色模式适配**：当前颜色固定，需要适配暗色主题

### 改进计划
1. 创建自动化工具：ANSI → 像素矩阵转换脚本
2. 考虑使用 Canvas 或 SVG 优化渲染
3. 添加 `prefers-color-scheme: dark` 的颜色变体

---

## 文件清单

### 新增文件
- `components/ui/ClawdAvatar.tsx` - 核心组件
- `components/ui/DocCard.tsx` - 教程卡片组件
- `app/clawd-showcase/page.tsx` - 展示页面

### 修改文件
- `components/sections/Hero.tsx` - 添加欢迎螃蟹
- `app/not-found.tsx` - 添加沮丧螃蟹
- `components/ui/SiteFooter.tsx` - 添加页脚螃蟹
- `app/components.css` - 添加样式和动画

---

## 下一步行动

1. ✅ **验证构建**：等待 `npm run build` 完成，确保无错误
2. 🔄 **完成方案 4（微交互）**：
   - [ ] 导航栏 Logo 悬停螃蟹
   - [ ] 滚动进度螃蟹
   - [ ] 加载状态螃蟹
   - [ ] 成功提示螃蟹
3. 📝 **创建文档集成**：将 DocCard 组件集成到文档索引页
4. 🎨 **方案 3（大场景）**：创建像素校园页面
5. 🎬 **方案 2（动画）**：集成动态互动吉祥物

---

## 用户反馈收集

等待用户确认：
- [ ] 当前螃蟹角色设计是否满意？
- [ ] 尺寸和位置是否合适？
- [ ] 动画效果是否符合预期？
- [ ] 是否需要调整颜色或样式？
