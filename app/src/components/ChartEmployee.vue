<template>
  <div>
    <div id="container" />
  </div>
</template>

<script>

import Highcharts from 'highcharts';
// require('highcharts/modules/networkgraph')(Highcharts);

import networkgraph from 'highcharts/modules/networkgraph';
networkgraph(Highcharts);

export default {
  name: 'EssentialLink',
  props: {
    graph: {
      type: Object,
      required: true
    }
  },
  data: function () {return {
    keys: ['from', 'to']
  };},
  mounted: function () {
    this.styleChart();
    this.initChart();
  },
  methods: {
    initChart: function () {
      var self = this;
      const g = this.graph;
      const dataMap = g.edges.map(e => function (){return{from: e.source, to:e.target};}());
      console.log(dataMap);
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
            keys: self.keys,
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
          link: {
            color: 'black'
          },
          id: 'chart-employee',
          data: dataMap
        }]
      });
    },
    styleChart: function () {
      const self = this;
      const g = this.graph;
      Highcharts.addEvent(
        Highcharts.Series,
        'afterSetOptions',
        function (e) {
          
          var nodes = {};

          if (
            this instanceof Highcharts.seriesTypes.networkgraph &&
            e.options.id === 'chart-employee'
          ) {
            e.options.data.forEach(function (link) {

              link.width = self.getWeight(link.from,link.to) < 0.4 ? 1 : 3;
              console.log(link.width);
              if (link.from === g['self-id']) {
                nodes[g['self-id']] = {
                  id: g['self-id'],
                  marker: {
                    radius: 10
                  }
                };
              } else {

                self.keys.forEach((key) => {
                  nodes[link[key]] = {
                    id: link[key],
                    color: self.isCoAuthor(link[key]) ? '#66ca66' : '#fa6666',
                    marker: {
                      radius: self.isCoAuthor(link[key]) ? 8 : 5,
                    }
                    
                  };
                });

              }


            });

            

            e.options.nodes = Object.keys(nodes).map(function (id) {
              return nodes[id];
            });
          }
        }
      );
    },
    isCoAuthor: function (id) {
      var node = this.graph.nodes.find(n => n.id === id);
      if (node){
        return node['co-author'];
      }
      return false;
    },
    getWeight: function (from,to) {
      var edge = this.graph.edges.find(e => e.source === from && e.target === to);
      if (edge){
        return edge['weight'];
      }
      return 0.0;
    }
  }
};
</script>
