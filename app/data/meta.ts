export const awards = [
  { year: "2024", title: "优秀毕业生奖学金", org: "暨南大学" },
  { year: "2024", title: '"互联网+"大学生创新创业大赛 银奖', org: "国家级" },
  { year: "2024", title: "粤港澳大湾区大学生创意节 冠军 / 金奖", org: "省级" },
  { year: "2023", title: "一等奖学金", org: "暨南大学" },
  { year: "2022", title: "中国大学生计算机设计大赛 国赛三等奖", org: "国家级" },
  { year: "2022", title: "一等奖学金 · 港澳及华侨学生奖学金一等奖", org: "暨南大学" },
];

export type SkillGroup = {
  group: string;
  items: { name: string; level: number }[]; // level 1-5
};

export const skills: SkillGroup[] = [
  {
    group: "数据分析",
    items: [
      { name: "SPSS", level: 5 },
      { name: "Excel（数据透视/Vlookup）", level: 4 },
      { name: "AMOS", level: 3 },
      { name: "Python", level: 3 },
      { name: "SQL", level: 3 },
    ],
  },
  {
    group: "设计与内容",
    items: [
      { name: "Adobe Pr / AE / PS / ID", level: 5 },
      { name: "Figma", level: 4 },
      { name: "墨刀（流程图）", level: 4 },
      { name: "HTML-5（秀米）", level: 4 },
    ],
  },
  {
    group: "语言",
    items: [
      { name: "中文（母语）", level: 5 },
      { name: "粤语（工作语言）", level: 5 },
      { name: "英语（IELTS 6.5）", level: 4 },
    ],
  },
];
