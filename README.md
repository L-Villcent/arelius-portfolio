# Arelius Villcent — Design Archive

> 一个兴趣使然的非专业设计爱好者的作品展示站。

---

## 📁 项目结构

```
arelius-portfolio/
├── index.html              # 主页
├── style.css               # 样式
├── script.js               # PPT 数据 + 灯箱逻辑
├── README.md               # 本文档
└── images/
    ├── xiaohongshu/        # 小红书封面
    │   ├── cover-01.jpg
    │   ├── cover-02.jpg
    │   ├── cover-03.jpg
    │   ├── cover-04.jpg
    │   └── cover-05.jpg
    └── ppt/                # PPT 图片
        ├── ppt-01/         # 第 1 套 PPT
        │   ├── 01.jpg      # 封面
        │   ├── 02.jpg      # 内容页 1
        │   ├── 03.jpg      # 内容页 2
        │   └── ...
        ├── ppt-02/
        ├── ppt-03/
        └── ppt-04/
```

---

## 🚀 部署到 Vercel（完整步骤）

### 第 1 步：注册账号

1. 注册 GitHub 账号：<https://github.com/signup>
2. 注册 Vercel 账号（直接用 GitHub 登录）：<https://vercel.com/signup>

### 第 2 步：在 GitHub 上创建仓库

1. 登录 GitHub，点击右上角 `+` → **New repository**
2. 仓库名填：`arelius-portfolio`（或任何你喜欢的名字）
3. 选择 **Public**（这样 Vercel 能免费部署）
4. **不要** 勾选 "Add a README file"（我们已经有了）
5. 点击 **Create repository**

### 第 3 步：上传文件到 GitHub

**方法 A（最简单，浏览器上传）：**

1. 在新建的空仓库页面，点击 **"uploading an existing file"** 链接
2. 把这个项目里的所有文件拖拽进去（包括 `images` 文件夹下所有图片）
3. 滚到底部，点击 **Commit changes**

**方法 B（用 Git 命令行）：**

```bash
cd /path/to/arelius-portfolio
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/arelius-portfolio.git
git push -u origin main
```

### 第 4 步：用 Vercel 部署

1. 登录 Vercel：<https://vercel.com/dashboard>
2. 点击 **Add New** → **Project**
3. 在 "Import Git Repository" 里找到刚才的 `arelius-portfolio`，点 **Import**
4. 其他设置全部保持默认，直接点 **Deploy**
5. 等 30 秒～1 分钟，部署完成。
6. Vercel 会给你一个网址，比如 `arelius-portfolio.vercel.app`，直接访问就能看到网站！

### 第 5 步（可选）：绑定自己的域名

1. 在 Vercel 项目面板，进入 **Settings** → **Domains**
2. 输入你买的域名（在阿里云/腾讯云/Namecheap 等买的），点 Add
3. 按提示在域名服务商那边设置 DNS 记录
4. 几分钟到几小时后生效

---

## ✏️ 如何编辑内容

**所有的小红书笔记和 PPT 信息都在一个文件里：`script.js`。**

打开 `script.js`，最上方有两个数组：
- `rednoteNotes` — 小红书笔记列表
- `pptDecks` — PPT 套装列表

增删条目只需要在这两个数组里改，**不用动 HTML**。

---

### A. 增删小红书封面

在 `script.js` 里找到 `rednoteNotes` 数组，每一条对应一张卡片：

```javascript
const rednoteNotes = [
  {
    title: '笔记标题 / TITLE 01',              // ← 改成你的笔记标题
    image: 'images/xiaohongshu/cover-01.jpg', // ← 改成对应的图片路径
    link: 'https://www.xiaohongshu.com/'      // ← 改成笔记真实链接
  },
  // ... 其他笔记
];
```

**新增一张：** 复制一个 `{ ... }` 块到数组里，改内容。注意每条末尾要有逗号。

**删除一张：** 把整个 `{ ... },` 删掉（包括末尾逗号）。

**调整顺序：** 直接把数组里的对象上下移动。

> 卡片编号（RED — 001、RED — 002...）会按数组顺序**自动生成**，不用手动改。Hero 区的总数统计也会自动更新。

---

### B. 增删 PPT 套装

同样在 `script.js`，找到 `pptDecks` 数组：

```javascript
const pptDecks = [
  {
    id: 'PPT — 001',                        // ← 编号（自己改）
    title: 'PPT 标题 01',                    // ← PPT 名称
    category: 'PRESENTATION DECK',           // ← 小标签
    images: [                                // ← 每张幻灯片的路径
      'images/ppt/ppt-01/01.jpg',
      'images/ppt/ppt-01/02.jpg',
      // ...
    ]
  },
  // ... 其他 PPT
];
```

**关键点：** `images` 数组里有几张图就显示几张，**不限制必须 5 张**。第一张会作为封面缩略图，灯箱浏览也按这个顺序播放。

**新增一套 PPT：**
1. 在 `images/ppt/` 下新建一个文件夹（比如 `ppt-05`），把幻灯片图片放进去（命名为 `01.jpg`、`02.jpg`、...）
2. 在 `pptDecks` 数组里复制粘贴一个对象，把 `images` 数组里的路径改成新文件夹

**删除一套 PPT：**
1. 把对应的 `{ ... },` 从数组里删掉
2. 删掉 `images/ppt/` 下对应的文件夹

---

### C. 替换图片

把图片按 `script.js` 里指定的路径和文件名放到对应的文件夹里就行。如果你想用别的文件名，只要在 `script.js` 里把路径改成你的实际文件名即可。

**显示规则：**
- 网站按 `image` / `images` 里写的路径去找图
- 图片不存在时，卡片会显示"占位框 + 文件名"提示你该上传了
- 文件名**区分大小写**，`Cover-01.JPG` 和 `cover-01.jpg` 是两个不同的文件

---

### D. 修改其他信息

- Logo 名字、Hero 区自我介绍、联系邮箱 → 直接编辑 `index.html`

---

## 🔄 修改后如何更新到网站

**最关键的点：每次你修改文件并 push 到 GitHub，Vercel 会自动重新部署网站，不需要你做任何其他操作。**

**方法 A（浏览器，最简单）：**
1. 在 GitHub 仓库页面，进入要修改的文件
2. 点右上角铅笔图标 ✏️ 编辑
3. 改完点 Commit changes
4. 等 30 秒，Vercel 自动更新

**方法 B（命令行）：**
```bash
git add .
git commit -m "更新内容"
git push
```

**上传新图片：**
进入对应文件夹（如 `images/xiaohongshu`），点 **Add file** → **Upload files**，拖图片进去 Commit 即可。

---

## 🖼️ 图片建议

| 类型 | 推荐尺寸 | 格式 | 单文件大小 |
|------|---------|------|-----------|
| 小红书封面 | 1080×1440（3:4） | JPG / PNG | < 500 KB |
| PPT 幻灯片 | 1920×1080（16:9） | JPG | < 800 KB |

图片太大会拖慢加载，可以用 [TinyPNG](https://tinypng.com) 压缩一下再上传。

---

## ❓ 常见问题

**Q: 图片上传后没显示？**
A: 检查文件名是否完全一致（包括大小写和扩展名）。`Cover-01.JPG` 和 `cover-01.jpg` 是两个不同的文件名。

**Q: 我想加更多小红书封面（超过 5 张）怎么办？**
A: 打开 `script.js`，在 `rednoteNotes` 数组里复制粘贴一条 `{ title, image, link }` 即可。卡片会自动出现，编号也会自动更新。

**Q: PPT 灯箱可以用键盘操作吗？**
A: 可以。`←` `→` 翻页，`Esc` 关闭。

**Q: 网站打开很慢怎么办？**
A: 大概率是图片太大。压缩图片后重新上传。

---

## 📮 联系

l.villcent@gmail.com

---

** A HOBBY ARCHIVE · NON-COMMERCIAL · 2026
