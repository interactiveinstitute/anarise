<template>
  <div>

    <div id="container"></div>

  </div>
</template>

<script>

import Highcharts from 'highcharts'
require('highcharts/modules/networkgraph')(Highcharts)

// import networkgraph from 'highcharts/modules/networkgraph'

export default {
  name: 'EssentialLink',
  props: {
    graph: {
      type: Object,
      required: true
    }
  },
  methods: {
    initChart: function () {
      const g = this.graph
      Highcharts.chart('container', {
        chart: {
          type: 'networkgraph',
          height: '100%'
        },
        title: {
          text: 'Edge graph for ' + g['self-id']
        },
        subtitle: {
          // text: 'A Force-Directed Network Graph in Highcharts'
        },
        plotOptions: {
          networkgraph: {
            keys: ['from', 'to'],
            layoutAlgorithm: {
              enableSimulation: true,
              friction: -0.9
            }
          }
        },
        series: [{
          dataLabels: {
            enabled: true,
            linkFormat: ''
          },
          id: 'lang-tree',
          data: g.edges.map(e => [e.source, e.target])
        }]
      })
    }
  },
  mounted: function () {
    this.initChart()
  }
}
</script>
