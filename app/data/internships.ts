export type Internship = {
  id: string;
  company: string;
  companyEn?: string;
  role: string;
  team?: string;
  city: string;
  coords: [number, number]; // [lng, lat]
  start: string;
  end: string;
  current?: boolean;
  highlights: string[];
  bullets: { title: string; body: string }[];
};

export const internships: Internship[] = [
  {
    id: "futu",
    company: "富途",
    companyEn: "Futu Holdings",
    role: "（最新进行中）",
    city: "深圳",
    coords: [113.9522, 22.5400],
    start: "2026.05",
    end: "至今",
    current: true,
    highlights: ["金融科技", "证券业务"],
    bullets: [
      { title: "实习内容", body: "暂未填写，可在后续补充。" },
    ],
  },
  {
    id: "wondershare",
    company: "万兴科技",
    companyEn: "Wondershare",
    role: "用户运营",
    team: "DT 产品部",
    city: "深圳",
    coords: [113.9484, 22.5435],
    start: "2026.02",
    end: "2026.04",
    highlights: ["3 份产品调研报告", "社区从 0→1200+ 模板", "180+ 创作者社群"],
    bullets: [
      {
        title: "产品运营与策划",
        body: "围绕产品体验、内容拓展、用户增长、AI 功能优化四大核心维度产出 3 份万兴图示专项产品调研报告，输出可落地优化方案；针对弱电领域平面设计垂类资源缺口完成需求拆解与功能规划，统筹推进 UI、垂类模板、专业符号库、AI 生成能力升级，落地 AI 点数消耗规则与商业化定价。",
      },
      {
        title: "内容运营与垂类拓展",
        body: "对标行业竞品重构符号组件库，迭代通用符号 500+，新增房屋平面设计专属符号 200+；新增交通事故复原图、科研汇报图表等细分行业模板，强化多场景适配能力。",
      },
      {
        title: "用户增长运营",
        body: "从 0-1 搭建国内创作者垂直领域社群（180+ 人），运营国内及海外共 7 个站点与社区，基于区域差异制定个性化推荐与精细化运营策略。",
      },
      {
        title: "精细化用户运营",
        body: "从 0 搭建意语社区运营体系，打通模板供给/审核/上架/加精全流程，社区模板从 0 增长至 1200+；通过 AI+Figma 完成广告物料与触达文案，拉新 20+ 核心创作者并建立 PGC 内容合作。",
      },
    ],
  },
  {
    id: "publicis",
    company: "阳狮集团",
    companyEn: "Publicis Groupe",
    role: "媒介策划",
    team: "L'Oréal Team",
    city: "上海",
    coords: [121.4778, 31.2192],
    start: "2025.07",
    end: "2025.09",
    highlights: ["欧莱雅 / 兰蔻", "多平台数据交叉验证", "竞品 Roadmap"],
    bullets: [
      {
        title: "数据挖掘与监控",
        body: "负责欧莱雅兰蔻产品广告投放数据挖掘，整合秒针、RTB、巨量云图、抖音人群包等多平台数据，进行交叉验证，构建完整数据报表与数据库支撑媒介策略。",
      },
      {
        title: "数据分析与整合",
        body: "整合广告前端数据与后端媒体数据，分析 CTR / CPM / ROI 等关键指标；通过对广告展现形式、素材及 TA 人群定向的精准优化，提升媒介投放效率。",
      },
      {
        title: "竞品调研与分析",
        body: "通过桌面研究、竞品素材收集与数据分析撰写竞品报告，覆盖竞品投放 Roadmap、媒介投放差异、素材分析及媒介选择，为差异化策略提供参考。",
      },
    ],
  },
  {
    id: "tecdo",
    company: "钛动科技",
    companyEn: "Tec-Do",
    role: "海外 KOL 运营",
    team: "Sparkfly Studio",
    city: "广州",
    coords: [113.3980, 23.1580],
    start: "2025.03",
    end: "2025.07",
    highlights: ["3K+ KOL 数据库", "6 大市场", "TripoAI / SHEIN / 崩坏:星穹铁道"],
    bullets: [
      {
        title: "KOL 策略制定与执行",
        body: "根据 Campaign 目标制定并执行达人营销策略、内容方向和合作形式；曾参与 AI 产品（TripoAI、QuestionAI）、科技产品（ANKER、华为）、服装品牌（SHEIN）及游戏（崩坏：星穹铁道、Once Human）等品牌的海外营销活动。",
      },
      {
        title: "数据库与项目管理",
        body: "维护 3K+ KOL 数据库覆盖 6 大市场；通过 SaaS 系统管理 100+ 达人进度，AI 优化建联邮件；制定 SOP 用多维表格并行推进 5+ 项目。",
      },
      {
        title: "效果跟踪与数据分析",
        body: "监测达人表现及内容投放情况，定期开展绩效回顾，关注 CPM / CTR / CPC / 互动率 / 曝光量等 KPI，提供数据驱动的优化反馈。",
      },
    ],
  },
];

// School locations for the map background context
export const schools = [
  { id: "cuhk", name: "香港中文大学", city: "香港", coords: [114.207, 22.4196] as [number, number], period: "2025.09 – 2026.11" },
  { id: "jnu", name: "暨南大学", city: "广州", coords: [113.3439, 23.1283] as [number, number], period: "2020.09 – 2024.07" },
];
