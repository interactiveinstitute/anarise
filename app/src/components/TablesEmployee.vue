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
      <tr v-for="node in matches" :key="node.id">
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

export default {
  name: 'TablesEmployee',
  props: {
    graph: {
      type: Object,
      required: true
    }
  },
  computed: {
    matches: function () {
      let sorted = this.graph.edges.slice(0).sort((n0,n1) => n1.weight-n0.weight);
      let connections = sorted.filter(e => e.source === this.graph['self-id'] || e.target === this.graph['self-id']);
      let ids = connections.map(e => e.source !== this.graph['self-id'] ? e.source : e.target);
      return ids.map(id => this.graph.nodes.find(n => n.id === id));
    }
  }
};
</script>

<style lang="scss" scoped>

    table {
        border-collapse: collapse;
    }

    tr:first-child{
        background: lightgray;
    }

    td {
        border: 1px solid gray;
        padding: 0.5em;
    }

    td:first-child{
        font-weight: bold;
    }
  

</style>
