export const languageLabels = {
  en: "EN",
  zh: "中文"
};

export const dictionary = {
  en: {
    navHome: "Home",
    navIndex: "Index",
    navWorks: "Works",
    navNotes: "Notes",
    navAbout: "About",
    languageLabel: "Language",
    visualNotes: "Visual Notes",
    year: "Year",
    mediums: "Mediums",
    status: "Status",
    latestEntries: "Latest entries",
    archiveIndex: "Archive index",
    worksAndNotes: "Works and notes",
    latest: "Latest",
    recentRecords: "Recent records",
    dateLevelIndex: "Date-level index",
    archiveFilters: "Archive filters",
    archiveEntries: "Archive entries",
    all: "All",
    images: "Images",
    writing: "Writing",
    projects: "Projects",
    date: "Date",
    type: "Type",
    title: "Title",
    medium: "Medium",
    tags: "Tags",
    works: "Works",
    imageLedRecords: "Image-led records",
    notes: "Notes",
    writtenObservations: "Written observations",
    viewEntry: "View entry",
    backToIndex: "Back to index",
    about: "About",
    aboutTitle: "A quiet index of images, writing, and project fragments.",
    aboutBody:
      "ESTWEN BRENCH / Visual Notes collects visual studies, written observations, and small systems for looking. The site is structured as a living archive rather than a fixed portfolio.",
    entryTypeNote: "Note",
    entryTypeImage: "Image",
    entryTypeProject: "Project",
    mediumWriting: "Writing",
    mediumPhotography: "Photography",
    mediumDesign: "Design",
    mediumMixed: "Mixed"
  },
  zh: {
    navHome: "首页",
    navIndex: "索引",
    navWorks: "作品",
    navNotes: "文字",
    navAbout: "关于",
    languageLabel: "语言",
    visualNotes: "视觉笔记",
    year: "年份",
    mediums: "媒介",
    status: "状态",
    latestEntries: "最新内容",
    archiveIndex: "归档索引",
    worksAndNotes: "作品与文字",
    latest: "最新",
    recentRecords: "最近记录",
    dateLevelIndex: "按日期索引",
    archiveFilters: "归档筛选",
    archiveEntries: "归档条目",
    all: "全部",
    images: "图像",
    writing: "文字",
    projects: "项目",
    date: "日期",
    type: "类型",
    title: "标题",
    medium: "媒介",
    tags: "标签",
    works: "作品",
    imageLedRecords: "图像作品记录",
    notes: "文字",
    writtenObservations: "文字观察",
    viewEntry: "查看条目",
    backToIndex: "返回索引",
    about: "关于",
    aboutTitle: "一个关于图像、文字和项目片段的安静索引。",
    aboutBody:
      "ESTWEN BRENCH / Visual Notes 收集视觉研究、文字观察和小型观看系统。这个网站更像一个持续生长的档案，而不是固定不变的作品集。",
    entryTypeNote: "文字",
    entryTypeImage: "图像",
    entryTypeProject: "项目",
    mediumWriting: "写作",
    mediumPhotography: "摄影",
    mediumDesign: "设计",
    mediumMixed: "混合"
  }
};

export function getInitialLanguage() {
  const saved = localStorage.getItem("visual-notes-language");
  if (saved === "zh" || saved === "en") {
    return saved;
  }
  return navigator.language?.toLowerCase().startsWith("zh") ? "zh" : "en";
}

export function translateEntryType(type, t) {
  return t[`entryType${type}`] ?? type;
}

export function translateMedium(medium, t) {
  return t[`medium${medium}`] ?? medium;
}
