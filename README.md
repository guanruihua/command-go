# command-go

> 封装日常使用到的cmd指令

## 安装

```shell
pnpm install -D command-go enquirer
```

## 使用

```js
const { GitCommand } = require('command-go')
GitCommand('0.0.1')
```

## GitCommand

> 基础git命令
> 复杂的命令请使用原生git命令

```js
const { GitCommand } = require('command-go')
// 0.0.1 当前项目版本, 主要给branch 和 tag 设置默认值
GitCommand('0.0.1')
```
