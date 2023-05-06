<template>
    <div>
        <el-dialog title="选择" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
            <div class="nodes-wrap">
                <div v-for="item in nodeTypeList" :key="item.nodeName" class="node"
                    @click="Drag(eventInfo, lineInfo, item)">
                    <div class="log">
                        <img :src="item.logImg" alt="" />
                    </div>
                    <div class="name">{{ item.nodeName }}</div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="handleClose">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import methods from "../config/methods"
export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false,
        },
        nodeTypeList:{
			required: true,
			type: Array
		},
        eventInfo:{

		},
        lineInfo:{

        },
        faDialogNodeDrag: {
            type: Function,
            require: true,
            default: null,
        },
    },
    data() {
        return {

        };
    },
    methods: {
        Drag(eventInfo, lineInfo, item){
            // 执行父组件dialogNodeDrag
            this.faDialogNodeDrag(eventInfo, lineInfo, item)

        },
        handleClose(done) {
            this.$emit('update:dialogVisible', false); //这里的update：固定写法
            this.$emit('update:eventInfo', null);
            this.$emit('update:lineInfo', null);
            // this.$confirm('确认关闭？')
            //     .then((_) => {

            //         done();
            //     })
            //     .catch((_) => {});
        },
    },
};
</script>

<style lang="less" scoped>
  .nodes-wrap {
    display: flex;
    flex-wrap: wrap;
    .node {
      display: flex;
      height: 40px;
      width: 110px;
      margin: 5px auto;
      border: 1px solid #ccc;
      line-height: 40px;
      margin: 2px;
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
</style>
