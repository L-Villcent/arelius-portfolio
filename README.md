# Arelius Villcent — Design Archive

一个以工业 HUD / 技术规格书语言呈现的个人设计档案。网站为纯静态项目，不依赖构建框架，可直接部署到 GitHub Pages、Vercel 或任意静态托管服务。

## 当前体验

- 滚动驱动的 Hero、演示作品切换与封面检阅场景
- 鼠标视差、坐标反馈与 Deck 横向页面预览
- 原生全屏幻灯片阅览器，支持键盘、触控和焦点恢复
- 桌面、平板、手机三档响应式布局
- `prefers-reduced-motion` 减弱动效支持
- WebP 轻量预览图；全屏阅览时再按需加载原图

## 文件结构

```text
arelius-portfolio/
├── index.html                 # 页面结构与文字内容
├── style.css                  # 视觉系统、布局与动效
├── script.js                  # 作品数据、滚动与交互逻辑
├── tools/
│   └── build_previews.py      # 从原图批量生成 WebP 预览图
└── images/
    ├── ppt/                   # 演示文稿原图
    ├── xiaohongshu/           # 小红书封面原图
    └── previews/              # 页面使用的轻量 WebP 预览图
```

## 本地预览

在项目目录启动任意静态服务器，例如：

```bash
python -m http.server 4173
```

然后访问 `http://127.0.0.1:4173/`。

## 修改作品

演示作品和封面作品的数据都集中在 `script.js` 顶部：

- `DECKS`：标题、说明、文件夹和页数
- `NOTES`：标题、封面和小红书原帖链接
- `PROCESS`：设计流程模块的五个节点

PPT 图片使用连续编号：`01.jpg`、`02.jpg`、`03.jpg`……。增减页面后，同时修改对应 `makeFrames()` 与 `makePreviews()` 的页数。

替换原图后，可重新生成轻量预览：

```bash
python tools/build_previews.py
```

脚本需要 Pillow；输出会写入 `images/previews/`，不会改动原图。

## 部署

这是纯 HTML / CSS / JavaScript 项目。把仓库推送到 GitHub 后，可直接连接 Vercel，或在仓库设置中启用 GitHub Pages。无需填写构建命令。

## 联系

`l.villcent@gmail.com`

HOBBY ARCHIVE · NON-COMMERCIAL · 2026
