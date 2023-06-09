export const jsplumbSetting = {
  grid: [10, 10],
  // 动态锚点、位置自适应
  Anchors: [
    // "TopCenter",
    // "RightMiddle",
    // "LeftMiddle",
    // "BottomCenter",
  ],
  Container: "flow",
  // 连线的样式 StateMachine、Flowchart,有四种默认类型：Bezier（贝塞尔曲线），Straight（直线），Flowchart（流程图），State machine（状态机）
  Connector: ["Flowchart", { cornerRadius: 5, alwaysRespectStubs: true, stub: 30 }],
  // connector: [
  //   'Flowchart',
  //   {
  //     stub: 5,
  //     // gap: 5,
  //     cornerRadius: 5,
  //     midpoint: 2,
  //     alwaysRespectStubs: true,
  //   },
  // ],
  // 鼠标不能拖动删除线
  ConnectionsDetachable: false,
  // 删除线的时候节点不删除
  DeleteEndpointsOnDetach: false,
  // 连线的端点
  // Endpoint: ["Dot", {radius: 5}],
  Endpoint: [
    "Rectangle",
    {
      height: 10,
      width: 10
    }
  ],
  // 线端点的样式
  EndpointStyle: {
    fill: "rgba(255,255,255,0)",
    outlineWidth: 1
  },
  LogEnabled: false, //是否打开jsPlumb的内部日志记录
  // 绘制线
  PaintStyle: {
    stroke: "#409eff",
    strokeWidth: 2,
    outlineStroke: 'transparent', // 设置外边线的颜色，默认设置透明，这样别人就看不见了，点击线的时候可以不用精确点击
    outlineWidth: 10 // 线外边的宽，值越大，线的点击范围越大
    
  },
  // 鼠标滑过线的样式
  HoverPaintStyle: { stroke: "#ff00cc", strokeWidth: 2 },
  // 绘制箭头
  Overlays: [
    [
      "Arrow",
      {
        width: 10,
        length: 10,
        location: 1
      }
    ],
    // ['Label', {
    //   location: 0.5,
    //   label: '<div class="line-node-btn"></div>',
    //   events: {
    //     click: function (labelOverlay, originalEvent) {
    //       console.log('连线上按钮 click' + labelOverlay.component,originalEvent)
    //     }
    //   }
    // }]
  ],
  RenderMode: "svg"
}

// jsplumb连接参数 this.jsPlumb.connect
export const jsplumbConnectOptions = {
  isSource: true,
  isTarget: true,
  // 动态锚点、提供了4个方向 Continuous、AutoDefault
  // anchor: [
  //   "TopCenter",
  //   // "RightMiddle",
  //   "BottomCenter",
  //   // "LeftMiddle",
  // ],
  endpointStyle:{ width:40, height:40 },
}

export const jsplumbSourceOptions = {
  filter: ".node-anchor", //触发连线的区域
  /*"span"表示标签，".className"表示类，"#id"表示元素id*/
  filterExclude: false,
  anchor: [
    // "TopCenter",
    // "RightMiddle",
    "BottomCenter",
    // "LeftMiddle"
  ],
  allowLoopback: false //防止环回连接
}

export const jsplumbTargetOptions = {
  filter: ".node-anchor",
  /*"span"表示标签，".className"表示类，"#id"表示元素id*/
  filterExclude: false,
  anchor: [
    "TopCenter",
    // "RightMiddle",
    // "BottomCenter",
    // "LeftMiddle"
  ],
  allowLoopback: false
}