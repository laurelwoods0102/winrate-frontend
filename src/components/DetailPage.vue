<template>
 <div>
    <h1>{{ $route.params.userId }}</h1>
    <h1>{{ userId }}</h1>
    <h1>{{ userPk }}</h1>
    <span></span>
    <ul>
      <li v-for="avg in average">
        <h1>id : {{ avg.id }}</h1>
        <h1>winrate : {{ avg.winrate }}</h1>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DetailPage',
  data () {
    return {
      userId: this.$route.params.userId,
      userPk: null,
      average: [],
    }
  },
  created () {
    //this.userId = $route.params.userId
    //this.axios.post('http://127.0.0.1:8000/GameData/search/', {'game_id': "laurelwoods"}, {
    //  headers: { 'Content-Type': 'application/json'}
    //})
    this.axios.get('http://127.0.0.1:8000/GameData/search/', {
      params: { game_id: 'laurelwoods' }
    })
    .then((response) => {
      this.userPk = response.data.id;
      this.axios.get('http://127.0.0.1:8000/GameData/' + this.userPk + '/average/')
      .then((response) => {
        this.average = response.data;
      })
    })
  }
}
</script>

<style scoped>
</style>
