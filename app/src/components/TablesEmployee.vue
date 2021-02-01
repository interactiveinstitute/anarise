<template>
  <div> 
    <h4>Closest matches</h4>
    <table>
      <tr>
        <td>
          Name
        </td>
        <td>
          RISE unit
        </td>
      </tr>
      <tr v-for="node in matches" :key="node.id" :style="{'background-color': unitColor(node)}">
        <td>
          {{ node["id"] }}
        </td>
        <td>
          {{ node["unit"] }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'TablesEmployee',
  props: {
    graph: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['units']),
    matches: function () {
      let sorted = this.graph.edges.slice(0).sort((n0,n1) => n1.weight-n0.weight);
      let connections = sorted.filter(e => e.source === this.graph['self-id'] || e.target === this.graph['self-id']);
      let ids = connections.map(e => e.source !== this.graph['self-id'] ? e.source : e.target);
      return ids.map(id => this.graph.nodes.find(n => n.id === id));
    }
  },
  methods: {
    unitColor: function (node){
      let unit = this.units.find(u => u.name === node.unit);
      return unit ? unit.color : 'white';
    }
  }
};
</script>

<style lang="scss" scoped>

    table {
        border-collapse: collapse;
    }

    tr:first-child{
        font-weight: bold;
        background: lightgray;
    }

    td {
        border: 1px solid black;
        padding: 0.5em;
        
    }

    td:first-child{
        color: black;
        font-weight: bold;
    }
  

</style>
