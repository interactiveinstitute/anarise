<template>
  <q-page padding>
    <h3>Unauthorized!!!</h3>
    <h5>{{ msg }}</h5>
    <q-btn label="log in" @click="$msal.signIn" />
  </q-page>
</template>

<script>
export default {
  name: 'Unauthorized',
  data () {
    return {
      msg: 'fuck off!'
    };
  }
};
</script>

<style scoped lang="scss">
</style>