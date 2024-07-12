按照 css 那元素本省就在 center 之上 而且没办法向下滚动 初始位置本身就考前 那 gsap 怎么处理？
gsap 会为元素添加空白 把元素顶到触发的位置
当设定的触发点因为页面的初始布局而无法通过正常滚动到达时，GSAP ScrollTrigger 将如何处理。

在这种情况下，如果.pinned 元素在页面加载时已经在视口中心之上，并且页面内容不足以使用户向下滚动到达一个使元素顶部与视口中心对齐的位置，ScrollTrigger 会自动调整处理方式，以保证钉住效果可以被触发。具体行为取决于你的设置和页面布局：

自动调整
如果触发点在可视范围内或者因为页面内容不够长而无法通过滚动到达，ScrollTrigger 通常会在页面初始加载时就触发钉住效果。这意味着：

钉住立即生效：即使页面没有滚动到使元素顶部与视口中心对齐的位置，ScrollTrigger 也可能立即钉住元素。
调整触发点：在某些情况下，ScrollTrigger 可能会调整内部的触发点计算，以适应页面的实际滚动范围。

# self 的确定

1. ScrollTrigger 实例的创建

```
let tops = panels.map((panel) =>
  ScrollTrigger.create({ trigger: panel, start: "top top" })
);
```

2. Snap 配置

```
ScrollTrigger.create({
  snap: {
    snapTo: (progress, self) => {
      let panelStarts = tops.map((st) => st.start);
      let snapScroll = gsap.utils.snap(panelStarts, self.scroll());
      return gsap.utils.normalize(
        0,
        ScrollTrigger.maxScroll(window),
        snapScroll
      );
    },
    duration: 0.5,
  },
});

```

## snapTo 函数在以下情况下被触发：
