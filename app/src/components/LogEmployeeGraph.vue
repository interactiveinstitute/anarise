<template>
  <div class="flex column flex-center">
    <div class="flex justify-around full-width">
      <div>
        <h4>
          Employees (nodes)
        </h4>
        <table>
          <tr>
            <td>
              ID (name)
            </td>
            <td>
              Co-author
            </td>
            <td>
              RISE unit
            </td>
          </tr>
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
          Connections (edges)
        </h4>
        <table>
          <tr>
            <td>
              Weight
            </td>
            <td>
              ID, source
            </td>
            <td>
              ID, target
            </td>
          </tr>
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
  </div>
</template>

<script>

export default {
  name: 'LogEmployeeGraph',
  props: {
    graph: {
      type: Object,
      required: true
    }
  },
};
</script>

<style lang="scss" scoped>

  table {
    border-collapse: collapse;
  }

  td {
    border: 1px solid gray;
    padding: 0.5em;
  }

  tr:first-child{
    background: lightgray;
  }

</style>
