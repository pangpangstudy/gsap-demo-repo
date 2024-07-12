import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

type Props = {};

function PageCover({}: Props) {
  // useGsap是useEffect gsap.context()的替代品 会自动处理 动画 清理
  useEffect(() => {
    //   拿到所有的元素
    let panels = gsap.utils.toArray(".panel");

    // 为每个面板创建一个 ScrollTrigger，以跟踪每个面板的顶部何时到达视口的顶部（用于捕捉）
    //   返回ScrollTrigger对象
    let tops = panels.map((panel) =>
      ScrollTrigger.create({ trigger: panel as any, start: "top top" })
    );
    //    循环创建动画
    panels.forEach((panel: any, i) => {
      ScrollTrigger.create({
        // 创建trigger 触发者就是自己
        trigger: panel,
        //   开始条件
        start: () =>
          // 如果元素的高度是小于窗口的高度的话 就是元素顶部到达顶部触发动画
          // 反之 元素底部到达 窗口底部触发动画
          panel.offsetHeight < window.innerHeight ? "top top" : "bottom bottom",
        // 触发的效果 pin到窗口固定位置
        // 如果下一个元素也是pin那么就会实现覆盖
        pin: true,
        // 元素固定后，不会在其原位置保留空白
        // 当pin之后，如果下边的元素还是按照css紧挨着 但是因为上边的 那么下边的元素也会跟着滚动条往上走 就会对布局导致错乱 导致看不到下边的组件的完整内容
        // 所以这里的选择就是 ： 要不要让下边的元素进行重叠，
        pinSpacing: false,
        markers: true,
      });
    });
    //
    ScrollTrigger.create({
      snap: {
        //   snapTo 会在滚动结束时根据当前滚动位置自动触发
        //   progress 是当前的滚动进度（0 到 1 之间的值）。相对于整个进度条
        //   self 是当前的 ScrollTrigger 实例。
        //   这个函数本质是控制滚动条进度的 0-1
        snapTo: (progress, self) => {
          //  获取起始位置 比如 panelStarts = [100, 200, 300];
          let panelStarts = tops.map((st) => st.start);
          console.log(panelStarts);
          console.log(self!.scroll());
          //self 包含有关当前触发器的信息和方法，例如 scroll() 方法可以获取当前的滚动位置。
          //gsap.utils.snap 是一个 GSAP 提供的实用工具函数，用于将一个值捕捉到最接近的捕捉点。
          let snapScroll = gsap.utils.snap(panelStarts, self!.scroll());
          //   用于将一个特定的滚动位置 snapScroll 转换为 0 到 1 之间的标准化进度值。
          return gsap.utils.normalize(
            0,
            //   ScrollTrigger.maxScroll(window) 会返回一个数值，表示从页面顶部到可以滚动的最底部的距离。
            ScrollTrigger.maxScroll(window),
            snapScroll
          );
        },
        duration: 0.5,
      },
    });

    // Clean up ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <div>
      {/* 定义四个页面 */}
      <div className="description panel blue">
        <div>
          <h1>Variable height stacked pinning</h1>
          <p>Use pinning to layer panels on top of each other as you scroll.</p>
          <div className="scroll-down">
            Scroll down<div className="arrow"></div>
          </div>
        </div>
      </div>

      <section className="panel red">ONE</section>
      <section className="panel orange" style={{ height: "140vh" }}>
        TWO
      </section>
      <section className="panel purple" style={{ height: "50vh" }}>
        THREE
      </section>
      <section className="panel green">FOUR</section>
    </div>
  );
}

export default PageCover;
