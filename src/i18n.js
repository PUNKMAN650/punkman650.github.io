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
    navOwner: "Owner Guide",
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
    owner: "Owner Guide",
    ownerTitle: "How only you edit this site",
    ownerBody:
      "This public site is static. For safety, it does not include a public upload editor. Only the GitHub account with write access to this private repository can change entries, images, and text.",
    ownerStep1Title: "Add or edit an entry",
    ownerStep1Body:
      "Open src/content.js in GitHub, edit the entries array, then commit to main. Each entry controls date, type, title, medium, tags, slug, excerpt, image, and body.",
    ownerStep2Title: "Upload images",
    ownerStep2Body:
      "Upload your image file into an assets folder in the repository, then set image to assets/your-file-name.jpg. You can also use a stable external image URL.",
    ownerStep3Title: "Delete sample content",
    ownerStep3Body:
      "Remove the full entry object from the entries array, including its opening and closing braces and the comma around it. Commit the change and GitHub Pages will redeploy.",
    ownerUpgradeTitle: "If you want editing inside the website",
    ownerUpgradeBody:
      "That needs an authenticated admin system, such as Decap CMS with GitHub login or a Supabase-backed admin page. I can add that as the next upgrade.",
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
    navOwner: "站主维护",
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
    owner: "站主维护",
    ownerTitle: "如何确保只有你能编辑这个网站",
    ownerBody:
      "这个公开网站是静态站。为了安全，它不会在公开页面里放任何人都能访问的上传编辑器。只有拥有这个私有 GitHub 仓库写入权限的账号，才能修改条目、图片和文字。",
    ownerStep1Title: "新增或编辑条目",
    ownerStep1Body:
      "在 GitHub 打开 src/content.js，编辑 entries 数组，然后提交到 main。每个条目可以填写 date、type、title、medium、tags、slug、excerpt、image 和 body。",
    ownerStep2Title: "上传图片",
    ownerStep2Body:
      "把图片上传到仓库里的 assets 文件夹，然后把 image 写成 assets/your-file-name.jpg。也可以使用稳定的外部图片链接。",
    ownerStep3Title: "删除示例内容",
    ownerStep3Body:
      "从 entries 数组里删除完整的条目对象，包括它的花括号以及前后的逗号。提交后 GitHub Pages 会自动重新部署。",
    ownerUpgradeTitle: "如果你想直接在网页里编辑",
    ownerUpgradeBody:
      "这需要带登录验证的后台系统，例如 Decap CMS + GitHub 登录，或 Supabase 后台管理页。我可以把它作为下一步升级加入。",
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
