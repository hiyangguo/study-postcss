# 前言

## PostCss 是什么？
PostCSS是什么？最好的定义来自于PostCSS自身项目在github上的描述：
> “PostCSS is a tool for transforming CSS with JS plugins. These plugins can support variables and mixins, transpile future CSS syntax, inline images, and more.

简而言之，PostCSS是CSS变成JavaScript的数据，使它变成可操作。PostCSS是基于JavaScript插件，然后执行代码操作。PostCSS自身并不会改变CSS，它只是一种插件，为执行任何的转变铺平道路。

PostCSS插件可以像预处理器，它们可以优化和 `autoprefix` 代码；可以添加未来语法；可以添加变量和逻辑；可以提供完整的网格系统；可以提供编码的快捷方式......还有很多很多。

## PostCSS不是什么？

- PostCSS不是预处理器
> 许多开发人员说他们不愿意放弃当前使用的CSS预处理器来支持PostCSS。但实际上 **PostCss 并不是预处理器 **。如果你愿意，你完全可以把它当作为一个预处理器，你甚至可以继续使用你最喜欢的预处理器，并且能结合PostCSS一起使用。

- PostCSS不是后处理器
> PostCSS名称中有一个"post"单词，但它不是一个真正的”后处理器“。后处理器通常被视为在完成的样式表中根据CSS规范处理CSS，让其更有效，常做的一件事情就是给CSS属性添加浏览器私有前缀。然而，PostCSS并不局限于这种操作。正如上面提到的，它可以像一个预处理器。

- PostCSS不是未来的新语法
> 有一些优秀的PostCSS插件允许你写未来的语法，即使这些CSS语法尚未得到广泛支持。然而PostCSS并不是天生下来就支持未来语法。

- PostCSS不是一个清理/优化工具
> Autoprefixer插件成功的导致了大家对PostCSS的一个普遍看法：PostCSS是用来清理CSS、优化速度和处理跨浏览器兼容性。

- PostCSS不仅是一件事情
> PostCSS最引人注目之处在于它不局限于任何一种类型功能，它是完全可以定制的，可配置的，可以说功能是无限的。

## PostCSS特别之处
- 多样化的功能插件，创建了一个生态的插件系统
- 根据你需要的特性进行模块化
- 快速编译
- 创建自己的插件，且具可访问性
- 可以像普通的CSS一样使用它
- 不依赖于任何预处理器就具备创建一个库的能力
- 可以与许多流行工具构建无缝部署

[post-css-learn-more]: http://www.w3cplus.com/blog/tags/517.html?page=1