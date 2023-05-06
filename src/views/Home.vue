<template>
  <div class="flow_region">
    <!-- 左侧栏 -->
    <div class="nodes-wrap">
      <div v-for="item in nodeTypeList" :key="item.nodeName" class="node" draggable="true" @dragstart="drag($event, item)">
        <div class="log">
          <img :src="item.logImg" alt="">
        </div>
        <div class="name">{{item.nodeName}}</div>
      </div>
    </div>
    <!-- 画布 -->
    <div id="flowWrap" ref="flowWrap" class="flow-wrap" @drop="drop($event)" @dragover="allowDrop($event)">
      <div id="flow">
        <div v-show="auxiliaryLine.isShowXLine" class="auxiliary-line-x" :style="{width: auxiliaryLinePos.width, top:auxiliaryLinePos.y + 'px', left: auxiliaryLinePos.offsetX + 'px'}"></div>
        <div v-show="auxiliaryLine.isShowYLine" class="auxiliary-line-y" :style="{height: auxiliaryLinePos.height, left:auxiliaryLinePos.x + 'px', top: auxiliaryLinePos.offsetY + 'px'}"></div>
        <flowNode v-for="item in data.nodeList" :id="item.id" :key="item.id" :node="item" @setNodeName="setNodeName" @toDeleteNode = "toDeleteNode" @changeLineState="changeLineState"></flowNode>
      </div>
    </div>
    <div class="button-div">
      <button @click="showCurData">保存</button>
    </div>
    <nodeTypeListDialog :dialogVisible.sync="nodeTypeListDialog" :nodeTypeList="nodeTypeList" :eventInfo.sync="TempLineNodeBtnEventInfo" :lineInfo.sync="TempLineNodeBtnLine" :faDialogNodeDrag="dialogNodeDrag"></nodeTypeListDialog>
  </div>
</template>

<script>
import { jsPlumb } from "jsplumb"
import { nodeTypeList } from './config/init'
import { jsplumbSetting, jsplumbConnectOptions, jsplumbSourceOptions, jsplumbTargetOptions } from './config/commonConfig'
import methods from "./config/methods"
import data from './config/data.json'//画布上节点信息
import flowNode from "./components/node-item"
import nodeTypeListDialog from "./components/nodeTypeListDialog.vue"
export default {
  name: "FlowEdit",
  components: {
    flowNode,
    nodeTypeListDialog
  },
  data() {
    return {
      TempLineNodeBtnEventInfo: null,//LineNodeBtn按钮位置
      TempLineNodeBtnLine: null,// LineNodeBtn按钮所属的线
      nodeTypeListDialog: false,
      jsPlumb: null,
      currentItem: null,
      nodeTypeList: nodeTypeList,
      nodeTypeObj: {},
      data: { //画布上节点信息
        nodeList: [],
        lineList: []
      },
      selectedList: [],
      jsplumbSetting: jsplumbSetting,
      jsplumbConnectOptions: jsplumbConnectOptions,
      jsplumbSourceOptions: jsplumbSourceOptions,
      jsplumbTargetOptions: jsplumbTargetOptions,
      auxiliaryLine: { isShowXLine: false, isShowYLine: false},  //对齐辅助线是否显示
      auxiliaryLinePos: { width: '100%', height: '100%', offsetX: 0, offsetY: 0, x: 20, y: 20 },
      commonGrid: [5, 5], //节点移动最小距离
      selectModuleFlag: false, //多选标识
      rectAngle: {
        px: '',  //多选框绘制时的起始点横坐标
        py: '',  //多选框绘制时的起始点纵坐标
        left: 0,
        top: 0,
        height: 0,
        width: 0
      }
    };
  },
  mounted() {
    this.jsPlumb = jsPlumb.getInstance();
    this.initNodeTypeObj() //左侧边栏
    this.initNode() //画布节点
    this.fixNodesPosition() // 初始化节点位置 
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    ...methods,
    showCurData(){
      console.log('data',JSON.stringify(this.data))
    },
    initNodeTypeObj() {
      nodeTypeList.map(v => {
        this.nodeTypeObj[v.type] = v
      })
    },
    initNode() {
      this.data.lineList = data.lineList
      data.nodeList.map(v => {
        v.logImg = this.nodeTypeObj[v.type].logImg
        v.log_bg_color = this.nodeTypeObj[v.type].log_bg_color
        this.data.nodeList.push(v)
      })
    },
  }
};
</script>

<style lang="less" scoped>
.flow_region {
  display: flex;
  width: 90%;
  height: 90%;
  margin: 20px auto;
  border: 1px solid #ccc;
  .nodes-wrap {
    width: 150px;
    height: 100%;
    border-right: 1px solid #ccc;
    .node {
      display: flex;
      height: 40px;
      width: 80%;
      margin: 5px auto;
      border: 1px solid #ccc;
      line-height: 40px;
      &:hover{
        // cursor: grab;
      }
      &:active{
        cursor: grabbing;
      }
      .log {
        width: 40px;
        height: 40px;
      }
      .name {
        width: 0;
        flex-grow: 1;
      }
    }
  }
  .flow-wrap {
    height: 100%;
    position: relative;
    overflow: hidden;
    outline: none !important;
    flex-grow: 1;
    background-image: url("../assets/point.png");
    #flow {
      position: relative;
      width: 100%;
      height: 100%;
      .auxiliary-line-x {
        position: absolute;
        border: .5px dashed #2ab1e8;
        z-index: 9999;
      }
      .auxiliary-line-y {
        position: absolute;
        border: .5px dashed #2ab1e8;
        z-index: 9999;
      }
    }
  }
}
</style>

<style lang="less">
.jtk-connector.active{
  z-index: 9999;
  // 连接线激活
  path {
    stroke: #150042;
    stroke-width: 2;
    animation: ring;
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    stroke-dasharray: 5;
  }
}
@keyframes ring {
  from {
    stroke-dashoffset: 50;
  }
  to {
    stroke-dashoffset: 0;
  }
}
// 连线上按钮样式
.line-node-btn {
  position: relative;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: #9ca8b4;
    border: 1px dashed #9ca8b4;
    border-radius: 50%;
    background-color: #ffffff;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    z-index: 1;
    transition: width 0.15s ease-out, height 0.15s ease-out;

  }
  .line-node-btn::after {
    content: '';
    position: absolute;
    width: 1px;
    height: 12px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #9ca8b4;
  }
  .line-node-btn::before {
    content: '';
    position: absolute;
    width: 12px;
    height: 1px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #9ca8b4;
  }
  .judge-false-text {
    color: #ff4f63;
    position: absolute;
    left: 15px;
    top: -5px;
    white-space: nowrap;
  }
  .judge-true-text {
    color: #6fd028;
    position: absolute;
    left: 15px;
    top: -5px;
    white-space: nowrap;
  }
</style>