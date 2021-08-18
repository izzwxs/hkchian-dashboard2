<template>
  <div ref="qnode" class="card"></div>
</template>

<script type="text/ecmascript-6">
import * as echarts from 'echarts'
import { getNodes } from '@/api/index'

export default {
  name: 'Node', // 节点分布
  mounted () {
    this.render()
    this.$bus.$on('update', (res) => {
      const st = setInterval(() => {
        if (this.chart) {
          clearInterval(st)
          const { series } = this.chart.getOption()
          const { links, data } = series[0]

          for (let i = 0; i < res.length; ++i) {
            const current = res[i]
            for (let i = 0; i < links.length; ++i) {
              const _current = links[i]
              if (
                _current.source === current.from_node_uuid &&
                _current.target === current.to_node_uuid
              ) {
                links[i].lineStyle = {
                  color: '#E8222D',
                  opacity: 1,
                  curveness: 0.1,
                  symbol: ['circle', 'arrow']
                }
              }
            }

            for (let i = 0; i < data.length; ++i) {
              const _current = data[i]
              if (_current.name === current.from_node_uuid) {
                data[i].itemStyle = {
                  color: '#E8222D'
                }
              }
            }
          }
          series[0].links = links
          series[0].data = data
          console.log(series)
          this.chart.setOption({
            series: series
          })

          const sto = setTimeout(() => {
            series[0].links = this.linksOrigin
            series[0].data = this.dataOrigin
            this.chart.setOption({
              series: series
            })
            console.log(series)
            clearTimeout(sto)
          }, 5000)
        }
      }, 100)
    })
  },
  methods: {
    async render () {
      const nodes = await getNodes()
      const data = []
      const links = []

      for (let i = 0; i < nodes.length; ++i) {
        const current = nodes[i]
        const key1 = nodes[i].uuid
        data.push({
          value: 1,
          name: current.uuid,
          symbolSize: 14,
          itemStyle: {
            opacity: 0.9
          }
        })

        for (let j = 0; j < nodes.length; ++j) {
          const key2 = nodes[j].uuid
          if (key1 !== key2) {
            links.push({
              id: key1 + j,
              source: key1,
              target: key2
            })
          }
        }
      }
      this.chart = echarts.init(this.$refs.qnode)

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
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: '节点分布',
            type: 'graph',
            layout: 'circular',
            edgeSymbolSize: 16,
            edgeSymbol: ['none', 'arrow'],
            label: {
              show: true,
              position: 'bottom',
              distance: 10,
              color: '#2E5DFC',
              formatter: function (params) {
                return nodes.filter(
                  (item) => item.uuid === params.name
                )[0].name
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
          }
        ]
      }

      this.dataOrigin = data
      this.linksOrigin = links
      this.chart.setOption(option)
    },
    getGetNodes () {
      getNodes().then((res) => {
        console.log(res)
      })
    },
    formatData (data) {}
  }
}
</script>
