const nodeTypeList = [{
  type: 'startNode',
  descName: '开始',
  nodeName: '开始',
  logImg: require('@/assets/svg/1开始.svg'),
  log_bg_color: 'rgba(0, 128, 0, 0.2)'
},{
  type: 'endNode',
  descName: '结束',
  nodeName: '结束',
  logImg: require('@/assets/svg/2结束.svg'),
  log_bg_color: 'rgba(255, 0, 0, 0.2)'
},{
  type: 'actionNode',
  descName: '文件',
  nodeName: '文件',
  logImg: require('@/assets/svg/5文件数据.svg'),
  log_bg_color: 'rgba(0, 128, 0, 0.2)'
},{
  type: 'actionNode',
  descName: '加密',
  nodeName: '加密',
  logImg: require('@/assets/svg/6数据校验.svg'),
  log_bg_color: 'rgba(163, 117, 233, 0.2)'
},{
  type: 'actionNode',
  descName: '个人服务个人服务个人服务个人服务个人服务个人服务个人服务个人服务个人服务个人服务',
  nodeName: '个人服务',
  logImg: require('@/assets/svg/8个人服务.svg'),
  log_bg_color: 'rgba(132, 166, 251, 0.2)'
},{
  type: 'judgeNode',
  descName: '判断',
  nodeName: '判断',
  logImg: require('@/assets/svg/15清洗.svg'),
  log_bg_color: 'rgba(250, 205, 81, 0.2)'
}
]

console.log(nodeTypeList)

export {nodeTypeList};