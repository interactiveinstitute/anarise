<template>
  <q-page class="flex column flex-center">
    <h3>
      {{ graph["self-id"] }}
    </h3>

    <ChartEmployee :graph="graph" />

    <div class="flex justify-around full-width">
      <div>
        <h4>
          Nodes
        </h4>
        <table>
          <tr v-for="node in graph.nodes" :key="node.id">
            <td>
              {{ node["id"] }}
            </td>
            <td>
              {{ node["co-author"] }}
            </td>
            <td>
              {{ node["unit"] }}
            </td>
          </tr>
        </table>
      </div>
      <div>
        <h4>
          Edges
        </h4>
        <table>
          <tr v-for="node in graph.edges" :key="node.id">
            <td>
              {{ node["weight"] }}
            </td>
            <td>
              {{ node["source"] }}
            </td>
            <td>
              {{ node["target"] }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </q-page>
</template>

<script>

import graph from 'assets/json-export/1611314014/1611314014_knn_graph_al-shishtawy.json';
import ChartEmployee from 'components/ChartEmployee';

export default {
  name: 'PageIndex',
  components: {
    ChartEmployee
  },
  data: () => {
    return {
      graph: graph
    };
  }
};
</script>

<style lang="scss" scoped>

  table {
    border-collapse: collapse;
  }

  td {
    border: 1px solid lightgray;
    padding: 0.5em;
  }

</style>
