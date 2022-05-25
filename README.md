# g-gulp
自动化构建模板

## Usage

- 安装

```shell
pnpm add -D gb-gulp
```

- 项目中新建 g-gulp.config.js 文件
  - data 是 html 模板的数据，根据项目中的模板自定义
  - build 是构建是的默认参数，可以不用传，传了会替换默认值

```js
const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
};

const build = {
  src: 'src',
  dist: 'dist',
  temp: 'temp',
  public: 'public',
  paths: {
    styles: 'assets/styles/*.scss',
    scripts: 'assets/scripts/*.js',
    pages: '*.html',
    images: 'assets/images/**',
    fonts: 'assets/fonts/**'
  }
}

module.exports = { data, build };
```

- 脚本配置

```shell
"scripts": {
  "clean": "gb-gulp clean",
  "build": "gb-gulp build",
  "dev": "gb-gulp dev"
}
```

- 使用

```shell
pnpm dev
pnpm build
pnpm clean
```
