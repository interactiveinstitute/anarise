<template>
  <div>
    <div id="container" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

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
  data: function () {
    return {
      keys: ['from', 'to']
    };
  },
  computed: {
    ...mapState(['units']),
    dataEmployees: function () {
      return this.graph.edges.map(e => function (){
        return{
          from: e.source, 
          to: e.target,
          type: 'employee'
        };
      }());
    },
    dataUnits: function () {
      return this.graph.nodes.map(n => function (){
        return{
          from: n.unit, 
          to: n.id,
          type: 'unit' 
        };
      }());
    },
    dataEmployer: function () {

      let data = this.graph.nodes.map(n => function (){
        return{
          from: 'RISE', 
          to: n.unit,
        };
      }());
      

      data = data.filter(() => (value, index, self) => {
        return self.indexOf(value) === index;
      });

      return data;

    }
  },
  mounted: function () {
    this.styleChart();
    this.initChart();
  },
  methods: {
    initChart: function () {
      var self = this;
      const g = this.graph;
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
            color: 'darkgray'
          },
          id: 'chart-employee',
          data: self.dataEmployees
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
              link.color = self.getWeight(link.from,link.to) < 0.4 ? 'black' : 'black';
              
              //All nodes
              self.keys.forEach((key) => {
                nodes[link[key]] = {
                  id: link[key],
                  //color: self.isCoAuthor(link[key]) ? '#66ca66' : '#fa6666',
                  color: self.getUnitColor(self.getUnit(link[key])),
                  marker: {
                    radius: self.isCoAuthor(link[key]) ? 10 : 5,
                  }
                    
                };
              });

              if(self.getUnit(link.from) === self.getUnit(link.to)){
                link.color = self.getUnitColor(self.getUnit(link.from));
              }

              //Self node
              let s = nodes[g['self-id']];
              if(s){
                s.marker.radius = 15;
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
    getUnit: function (id) {
      var node = this.graph.nodes.find(n => n.id === id);
      if (node){
        return node['unit'];
      }
      return undefined;
    },
    getWeight: function (from,to) {
      var edge = this.graph.edges.find(e => e.source === from && e.target === to);
      if (edge){
        return edge['weight'];
      }
      return 0.0;
    },
    getUnitColor: function (name) {
      var unit = this.units.find(u => u.name === name);
      if (unit){
        return unit.color;
      }
      return 'gray';
    }
  }
};
</script>
