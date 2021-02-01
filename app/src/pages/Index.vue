<template>
  <q-page class="flex column flex-center">
    <h3>
      {{ graph["self-id"] }}
    </h3>
    <q-btn label="testRouting" to="/" />
    <q-btn label="log in" @click="signIn" />
    <q-btn label="log out" @click="logOut" />
    

    <div class="flex justify-around full-width">
      <ChartEmployee :graph="graph" class="col" />
      <TablesEmployee :graph="graph" class="col" />
    </div>
    
    <LogEmployeeGraph :graph="graph" />
  </q-page>
</template>

<script>

import graph from 'assets/json-export/1611314014/1611314014_knn_graph_al-shishtawy.json';

import TablesEmployee from 'components/TablesEmployee';
import ChartEmployee from 'components/ChartEmployee';
import LogEmployeeGraph from 'src/components/LogEmployeeGraph.vue';

export default {
  name: 'PageIndex',
  components: {
    TablesEmployee,
    ChartEmployee,
    LogEmployeeGraph
  },
  data: () => {
    return {
      graph: graph
    };
  },
  created(){
    // let authState = this.$msal.isAuthenticated();
    // console.log(authState);
  },
  beforeRouteEnter(to, from, next){
    console.log('gonna enter the index route');
    next();
  },
  beforeRouteUpdate(){
    // let authState = this.$msal.isAuthenticated();
    // console.log(authState);
  },
  methods: {
    signIn(){
      this.$msal.signIn();
    },
    logOut(){
      this.$msal.signOut();
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
