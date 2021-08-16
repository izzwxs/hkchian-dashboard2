<template>
  <div ref="qnode" class="card">
  </div>
</template>

<script type="text/ecmascript-6">
import * as echarts from 'echarts'
const map = {
  gky: '国康院全国协作中心',
  sc: '四川协作中心',
  gjjk: '国康健康医疗大数据研究院',
  wh: '威海市立医院协作中心',
  py: '平邑县协作中心',
  sdzy: '山东大学第二医院招远协作中心',
  qfs: '山东省千佛山医院协作中心',
  nmg: '内蒙古协作中心',
  sdrm: '山东省第二人民医院协作中心',
  rtyy: '济南市儿童医院协作中心'
}

const data = []
const links = []
const keys = Object.keys(map)

for (let i = 0; i < keys.length; ++i) {
  const key1 = keys[i]
  data.push({
    value: 1,
    name: key1,
    symbolSize: 14
  })

  for (let j = 0; j < keys.length; ++j) {
    const key2 = keys[j]
    if (key1 !== key2) {
      links.push({
        id: key1 + key2,
        source: key1,
        target: key2
      })
    }
  }
}

export default {
  name: 'Node', // 节点分布
  mounted () {
    this.render()
  },
  methods: {
    render () {
      const chart = echarts.init(this.$refs.qnode)

      const option = {
        title: {
          text: '节点分布',
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          show: false
        },
        legend: [{
          data: ['类目0', '类目1', '类目2', '类目3', '类目4', '类目5', '类目6', '类目7', '类目8']
        }],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [{
          name: '节点分布',
          type: 'graph',
          layout: 'circular',
          edgeSymbolSize: 16,
          label: {
            show: true,
            position: 'bottom',
            distance: 10,
            color: '#2E5DFC',
            formatter: function (params) {
              return map[params.name]
            }
          },
          itemStyle: {
            borderWidth: 2,
            borderColor: '#ddd'
          },
          lineStyle: {
            color: '#2E5DFC',
            opacity: 0.1
          },
          data: data,
          links: links,
          color: ['#2E5DFC']
        }]
      }

      chart.setOption(option)
    }
  }
}
</script>
