# 项目交接说明 · HANDOFF

> 这份文档写给接手这个项目的 AI 助手或新机器上的开发者。

---

## 项目是什么

**梁家铭（Leung Ka Ming）的个人交互式简历网站**。

- 用户背景：香港中文大学社会学硕士在读 + 暨南大学新闻学本科
- 设计调性：**Manus 风温润米白 + 思源宋体 + 古铜金点缀**（"科技 × 人文"，数字宣纸感）
- 路径：从广州起步 → 上海历练 → 回粤港澳深耕（4 个城市，6 段经历）

---

## 技术栈

```
Next.js 16.2.7 (App Router, Turbopack 默认)
React 19.2
Tailwind CSS v4 (使用 @theme inline)
Framer Motion 12
TypeScript 5
Node.js ≥ 20.9
```

⚠️ **Next.js 16 有破坏性变更**，写代码前先看 `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`。

主要变更：
- `params` / `searchParams` 完全异步化
- `middleware` → `proxy` 重命名
- `next lint` 命令移除
- Image 默认值变化（`minimumCacheTTL` 4 小时、`qualities` 默认 [75]）
- Tailwind v4 用 `@theme inline` 而不是 v3 的 config 文件

---

## 在新机器上恢复运行

```bash
# 1. 解压 zip 到任意目录
unzip personal-site.zip
cd personal-site

# 2. 装依赖（约 1-2 分钟）
npm install

# 3. 启动开发服务器
npm run dev
# → http://localhost:3000
```

要求 Node.js ≥ 20.9。

---

## 项目结构

```
personal-site/
├── app/
│   ├── layout.tsx          # 根布局：4 种字体 + html lang="zh-CN"
│   ├── page.tsx            # 主页：组合所有 section
│   ├── globals.css         # Manus 配色 + 纸纹背景 + 字体变量
│   ├── components/
│   │   ├── Cover.tsx           # 封面（左文 + 右工牌）
│   │   ├── Badge.tsx           # 3D 工牌（鼠标视差/挂绳摆动/点击翻转）
│   │   ├── InternshipMap.tsx   # SVG 风格化地图 + 钉子 + 抽屉
│   │   ├── Projects.tsx        # Gantt 时间条 + 印章序号
│   │   ├── Portfolio.tsx       # 频谱仪切换 6 类作品
│   │   ├── Skills.tsx          # 工具熟练度 + 奖项时间线
│   │   └── Ending.tsx          # 字符雨 + 联系卡 + Konami 彩蛋
│   └── data/
│       ├── resume.ts           # profile + education
│       ├── internships.ts      # 4 段实习 + 学校（含坐标）
│       ├── projects.ts         # 2 个项目（虚拟自习室 + TCM）
│       ├── portfolio.ts        # 作品集 6 类（报道/影像/设计/数据/游戏/vibe）
│       └── meta.ts             # awards + skills
├── public/
│   ├── photo.jpg               # 【待替换】工牌正面照片占位
│   ├── wechat-qr.png           # 【待替换】工牌背面二维码占位
│   └── buffett-quiz/index.html # 电子巴菲特游戏（被作品集 iframe 嵌入）
└── HANDOFF.md                  # 本文件
```

---

## 设计系统（已写在 globals.css）

```
配色（CSS 变量）
  --paper      #f5f1eb   暖米白主背景（宣纸感）
  --paper-2    #ede8e0   卡片次级背景
  --paper-3    #e3dcd0   照片框等更深一层
  --ink        #1f1b16   墨褐黑（不是纯黑）
  --ink-2      #6b6358   次级文字
  --ink-3      #9a9082   三级文字（mono 标签）
  --bronze     #c9a961   古铜金（强调色）
  --bronze-d   #a88940   古铜金深
  --moss       #2b4c3f   墨绿（学校 / 罕用）
  --vermilion  #b94e3d   朱红（印章 / CURRENT 标识 / Konami）
  --rule       #d9d2c5   分隔线

字体（next/font/google）
  --font-serif   Noto Serif SC  → 标题、姓名（思源宋体）
  --font-sans    Noto Sans SC + Inter → 正文
  --font-mono    JetBrains Mono → 标签 / 时间戳 / 终端

特殊样式
  .seal          朱红印章（铭印元素，旋转 -4deg）
  body::before   纸纹噪点 SVG 滤镜叠加
```

**铭印元素**（不要改这种调性）：
- 印章（朱红方框 `.seal`）
- 古籍线装风的虚线分隔
- 终端里的等宽字 + 命令行

---

## 当前完成度（任务 1–7 全部完成）

| # | 模块 | 状态 |
|---|------|------|
| 1 | 项目骨架 + 字体 + 主题 | ✅ |
| 2 | 封面 + 工牌（3D / 翻转） | ✅ |
| 3 | 实习地图（SVG + 抽屉） | ✅ |
| 4 | 研究项目（Gantt 时间条） | ✅ |
| 5 | 作品集（6 频段调台） | ✅ |
| 6 | 技能与荣誉 | ✅ |
| 7 | 结尾页 + Konami 彩蛋 | ✅ |

---

## 用户待补充的素材

1. **个人照片** → `public/photo.jpg`
   - 工牌正面占位现在显示 "PHOTO · 工牌正面"
   - 需要改 `app/components/Badge.tsx` 里把 placeholder 替换成 `<Image src="/photo.jpg" />`

2. **微信二维码** → `public/wechat-qr.png`
   - 工牌背面占位显示 "WeChat QR · 占位"
   - 同样改 Badge.tsx 背面部分

3. **富途实习内容**
   - `app/data/internships.ts` 第一项 `bullets` 当前是占位（"暂未填写..."）
   - 需要用户补充 bullet 内容

---

## 下一步任务（用户已确认的方向）

### 部署到 Vercel + 自定义域名

- 域名：**leungkamingcv.com**（用户已选）
- 平台：**Vercel + GitHub**
- GitHub 用户名：`K4MING-LEUNG`
- 邮箱：`leungkaming284@outlook.com`

### 部署流程

```
1. 提交所有未提交代码到 git（当前有大量未 commit 的改动）
2. 在 GitHub 创建仓库（建议 Public 命名 `leungkamingcv` 或 `personal-site`）
3. 推送代码到 GitHub
4. 登录 Vercel → Import GitHub 仓库 → 一键部署
5. 在 Vercel Dashboard 添加自定义域名 leungkamingcv.com
6. 在域名注册商处把 DNS 改成 Vercel 给的 A/CNAME 记录
   （Vercel 会给具体的 DNS 记录值）
```

### Git 当前状态

执行 `git status` 会看到：
- 已修改：`app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `package.json`, `package-lock.json`
- 未追踪：`app/components/`, `app/data/`, `public/buffett-quiz/`, `HANDOFF.md`

需要 `git add` + `git commit` 一次性提交，commit message 建议：
```
feat: build interactive resume site

- Manus-inspired cream paper theme with serif headings
- 7 sections: cover/map/projects/portfolio/skills/ending
- Interactive 3D ID badge, SVG internship map, FM tuner portfolio
- Embedded Buffett quiz game, Konami code easter egg
```

---

## 设计原则（用户反馈过的偏好）

1. **米白主色，绝对不要深色赛博风**——用户明确说要 Manus AI 那种温润米白
2. **思源宋体做标题**，给"人文"质感；mono 字体做标签数字
3. **简洁但有点科技感**，"科技 × 人文"是核心调性
4. **不要堆叠过多动画**——HR 看简历不到 30 秒
5. **作品集分类**：报道 / 影像 / 设计 / 数据 / 游戏 / Vibe coding（共 6 类，不要"游戏"凑数——已用电子巴菲特填充）
6. **富途显示为 CURRENT**（朱红色脉冲）

---

## 用户当前关注点

- 部署到生产环境给别人看
- 用 `leungkamingcv.com` 做域名
- 可能想优化的：移动端适配、字号、间距、某个 section 的呈现方式

---

## 联系信息（已写在 resume.ts）

```
姓名：梁家铭 / Leung Ka Ming
邮箱：leungkaming284@outlook.com
电话：+86 18022271234 / +852 46630306
微信：18022271234
LinkedIn: www.linkedin.com/in/leung-kaming
```

---

**Have fun. 这是个有调性的项目，请保持克制和品味。**
