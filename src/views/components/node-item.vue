<template>
  <div class="node-item" ref="node"
    :class="[(isActive || isSelected) ? 'active' : '', node.type]"
    :style="flowNodeContainer"
    v-click-outside="setNotActive"
    @click="setActive"
    @mouseenter="showAnchor"
    @mouseleave="hideAnchor"
    @dblclick.prevent="editNode"
    @contextmenu.prevent="onContextmenu">
    <div class=nodeDiv>
      <div class="log-wrap">
        <img :src="node.logImg" alt="">
      </div>
      <div class="nodeName-wrap">
        <div class="node-name">{{node.nodeName}}</div>
        <span class="node-desc">{{node.id}}</span>
      </div>
        <!--连线用--//触发连线的区域-->
        <div class="node-anchor anchor-top" v-show="mouseEnter"></div>
        <div class="node-anchor anchor-right" v-show="mouseEnter"></div>
        <div class="node-anchor anchor-bottom" v-show="mouseEnter"></div>
        <div class="node-anchor anchor-left" v-show="mouseEnter"></div>
    </div>

  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
export default {
  name: "nodeItem",
  props: {
      node: Object
  },
  directives: {
    ClickOutside
  },
  computed: {
    // 节点容器样式
    flowNodeContainer: {
      get() {
        return {
          top: this.node.top,
          left: this.node.left
        };
      }
    }
  },
  data() {
    return {
      mouseEnter: false,
      isActive: false,
      isSelected: false
    };
  },
  methods: {
    showAnchor() {
      this.mouseEnter = true
    },
    hideAnchor() {
      this.mouseEnter = false
    },
    // 右键
    onContextmenu() {
      this.$contextmenu({
        items: [{
          label: '删除节点',
          disabled: false,
          icon: "",
          onClick: () => {
            this.toDeleteNode()
          }
        }],
        event,
        customClass: 'custom-class',
        zIndex: 9999,
        minWidth: 180
      })
    },
    setActive() {
      console.log('setActive点击节点',this.node)
      if(window.event.ctrlKey){
        this.isSelected = !this.isSelected
        return false
      }
      this.isActive = true
      this.isSelected = false
      setTimeout(() => {
        this.$emit("changeLineState", this.node.id, true)
      },0)

    },
    setNotActive() {
      // console.log('setNotActive',this.node)
      if(!window.event.ctrlKey){
        this.isSelected = false
      }
      if(!this.isActive) {
        return
      }
      this.$emit("changeLineState", this.node.id, false)
      this.isActive = false
    },
    editNode() {
      this.newNodeName = this.node.nodeName
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
              props: {
                value: this.newNodeName,
                autofocus: true
              },
              on: {
                input: (val) => {
                  this.newNodeName = val;
                }
              }
          })
        },
        onOk: () => {
          console.log(this.newNodeName)
          this.$emit('setNodeName', this.node.id, this.newNodeName)
        }
      })
    },
    toDeleteNode() {
      this.$emit("toDeleteNode", this.node)
    }
  }
};
</script>

<style lang="less" scoped>
@labelColor: #409eff;
@nodeSize: 10px;
@viewSize: 10px;
.node-item {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: move;
  box-sizing: content-box;
  z-index: 9995;
  &:hover {
    z-index: 9998;
    .delete-btn{
      display: block;
    }
  }
  .nodeDiv {
    position: relative;
    display: flex;
    align-items: center;
  
    .log-wrap{
      width: 40px;
      height: 40px;
      border: 1px solid #b7b6b6;
      border-radius: 4px;
      box-shadow: 0 1px 4px rgba(211, 211, 236, 0.65);
    }
    .nodeName-wrap {
      position: absolute;
      width: 80px;
      margin-left: calc(100% + 10px);

      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      overflow-wrap: break-word;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      text-align:left;
      .node-name {
        color: #011447;
      }
      .node-desc {
        display: block;
        color: #849bc0;
        font-size: 13px;
      }
    }
  }

  .node-anchor {
    display: flex;
    position: absolute;
    width: @nodeSize;
    height: @nodeSize;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    cursor: crosshair;
    z-index: 9999;
    background: -webkit-radial-gradient(sandybrown 10%, white 30%, #9a54ff 60%);
  }
  .anchor-top{
    top: calc((@nodeSize / 2)*-1);
    left: 50%;
    margin-left: calc((@nodeSize/2)*-1);
  }
  .anchor-right{
    top: 50%;
    right: calc((@nodeSize / 2)*-1);
    margin-top: calc((@nodeSize / 2)*-1);
  }
  .anchor-bottom{
    bottom: calc((@nodeSize / 2)*-1);
    left: 50%;
    margin-left: calc((@nodeSize / 2)*-1);
  }
  .anchor-left{
    top: 50%;
    left: calc((@nodeSize / 2)*-1);
    margin-top: calc((@nodeSize / 2)*-1);
  }
}

.active{
  // border: 2px dashed @labelColor;
  box-shadow: 0px 5px 9px 0px rgba(0,0,0,0.3);
}
// 开始节点样式
.startNode .log-wrap {
  color: #d8f4e9;
  border: 1px solid #d8f4e9 !important;
  border-radius: 4px;
  background-color: #ecfcf6;
  transition: color 0.3s ease-out, background-color 0.3s ease-out;
}
// 结束节点样式
.endNode .log-wrap {
  color: #f16b6f;
  border: 1px solid #f9c4c5 !important;
  border-radius: 4px;
  background-color: #fef0f1;
  transition: color 0.3s ease-out, background-color 0.3s ease-out;
}
// 判断节点样式
.judgeNode .log-wrap {  
  color: #ee8912;
  border: 1px solid #f8d0a0 !important;
  background-color: #fdf3e7;
  transition: color 0.3s ease-out, background-color 0.3s ease-out;
  transform: rotate(45deg) scale(0.8);
  img{
    transform: rotate(-45deg);
  }
}


</style>