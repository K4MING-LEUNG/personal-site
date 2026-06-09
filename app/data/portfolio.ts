export type WorkCategory =
  | "report"
  | "film"
  | "design"
  | "data"
  | "game"
  | "vibe";

export type Work = {
  id: string;
  category: WorkCategory;
  title: string;
  meta?: string;
  url?: string;
  embed?: string;
  note?: string;
};

export const categories: { key: WorkCategory; label: string; sub: string; freq: string }[] = [
  { key: "report", label: "深度报道", sub: "Long-form Journalism", freq: "88.1 MHz" },
  { key: "film", label: "影像创作", sub: "Documentary & Video", freq: "94.3 MHz" },
  { key: "design", label: "视觉设计", sub: "Animation & Graphic", freq: "100.7 MHz" },
  { key: "data", label: "数据洞察", sub: "Data Visualization", freq: "104.5 MHz" },
  { key: "game", label: "互动游戏", sub: "Playable Demo", freq: "108.0 MHz" },
  { key: "vibe", label: "此站本身", sub: "Vibe Coding", freq: "FM ∞" },
];

export const works: Work[] = [
  // 深度报道（南都为主，7 篇）
  { id: "r1", category: "report", title: "「台湾阿公」寻根路", meta: "南方都市报 · 2023.01", url: "https://m.mp.oeeee.com/a/BAAFRD000020230112756560.html" },
  { id: "r2", category: "report", title: "飞往伊斯坦布尔：寻亲者与救援队", meta: "南方都市报 · 2023.02", url: "https://m.mp.oeeee.com/a/BAAFRD000020230210763388.html" },
  { id: "r3", category: "report", title: "台青馆长传承南京云锦", meta: "南方都市报 · 2023.03", url: "https://m.mp.oeeee.com/a/BAAFRD000020230307770832.html" },
  { id: "r4", category: "report", title: "新北少年枪响之外", meta: "南方都市报 · 2023.04", url: "https://m.mp.oeeee.com/a/BAAFRD000020230421786711.html" },
  { id: "r5", category: "report", title: "「汪辜会谈」三十年", meta: "南方都市报 · 2023.04", url: "https://m.mp.oeeee.com/a/BAAFRD000020230426790170.html" },
  { id: "r6", category: "report", title: "「通关」之路：粤港澳各界迅速行动", meta: "南方都市报 · 2023.01", url: "https://m.mp.oeeee.com/a/BAAFRD000020230106754676.html" },
  { id: "r7", category: "report", title: "俄乌战火中的中国留学生", meta: "微信公众号", url: "https://mp.weixin.qq.com/s/0v0LJscrsPdO4OGnxh1meQ" },

  // 影像创作
  { id: "f1", category: "film", title: "《艺剪裁梦》", meta: "纪录片 · Bilibili", url: "https://www.bilibili.com/video/BV1pu411b7AK/" },
  { id: "f2", category: "film", title: "《青春手艺人》", meta: "央视 CCTV17 播出", url: "https://tv.cctv.com/2023/09/18/VIDEtACMNiRvM3yGopwWniDv230918.shtml", note: "合作作品" },
  { id: "f3", category: "film", title: "《TA 的武器》", meta: "公益广告 · Bilibili", url: "https://www.bilibili.com/video/av903670662/" },

  // 视觉设计 / 动画
  { id: "d1", category: "design", title: '《"字"从遇到你》', meta: "动画 · 国赛三等奖（2022）", note: "中国大学生计算机设计大赛" },
  { id: "d2", category: "design", title: "A First Look At The Upcoming 20th CPC National Congress", meta: "国际传播 · YouTube" },
  { id: "d3", category: "design", title: "《西装猛兽》", meta: "金利来 × 圆明园 品牌联合设计" },

  // 数据洞察
  {
    id: "data1",
    category: "data",
    title: "中国出海企业数据可视化",
    meta: "Power BI · Python · 八爪鱼",
    note: "覆盖：行业出海概况 / 医疗健康 / 粮农产品 / 信息科技",
    url: "https://app.powerbi.com/groups/me/reports/353c6741-693a-4863-8e89-9493972a2d44",
  },

  // 互动游戏（嵌入电子巴菲特）
  {
    id: "game1",
    category: "game",
    title: "《电子巴菲特 · 与先知对谈》",
    meta: "像素风金融问答 · 单文件 HTML",
    embed: "/buffett-quiz/index.html",
    note: "Press Start 2P + 思源黑体；游戏化金融认知测试",
  },

  // 此站本身
  {
    id: "vibe1",
    category: "vibe",
    title: "leungkaming.dev",
    meta: "Next.js 16 · Tailwind v4 · Framer Motion",
    note: "你正在浏览的网站本身。AI 协作搭建，源码可见。",
  },
];
