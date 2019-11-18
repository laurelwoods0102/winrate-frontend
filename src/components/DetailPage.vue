<template>
 <div class="detail">
    <div class="header">
      <h1>{{ userId }}</h1>
    </div>
    <div class="body">
      <div class="assist">
        <b-button>Pick Assistant</b-button>
      </div>
      <div class="team">
        <div class="team_best">
          <h1>tb {{ inference_team[0]['id'] }}</h1>
        </div>
        <div class="team_worst">
          <h1>tw {{ inference_team[inference_team.length -1]['id'] }}</h1>
        </div>
      </div>

      <b-container fluid class="wrap">
        <b-row class="items flex-row flex-nowrap">
          <template v-for="team in inference_team">
            <b-card class="card">
              <b-card-text>{{ team['id'] }}</b-card-text>
              <b-card-text>{{ team['coefficient'] }}</b-card-text>
            </b-card>
          </template>
        </b-row>
      </b-container>

      <div class="wrap">
        <div class="items">
          <h1>1234123412348123840182304981-23841-2034812-384123479012374917340917394073907409172394071092374901723940172394710923749012734091723407102374</h1>
        </div>
      </div>

      <div class="enemy">
        <div class="enemy_best">
          <h1>eb {{ inference_enemy[0]["id"] }}</h1>
        </div>
        <div class="enemy_worst">
          <h1>ew {{ inference_enemy[inference_enemy.length -1]["id"] }}</h1>
        </div>
      </div>
      <div class="myPick">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailPage',
  data () {
    return {
      userId: null,
      userPk: null,
      inference_team: [],
      inference_enemy: [],
      inference_secondary: [],
      myPick: [],
    }
  },
  created () {
    //this.userId = $route.params.userId
    //this.axios.post('http://127.0.0.1:8000/GameData/search/', {'game_id': "laurelwoods"}, {
    //  headers: { 'Content-Type': 'application/json'}
    //})
    this.axios.get('http://127.0.0.1:8000/GameData/search/', { params: { game_id: 'laurelwoods' }})
    .then((response) => {
      this.userPk = response.data.id;
      this.userId = response.data.game_id;
      // inference : team
      this.axios.get('http://127.0.0.1:8000/GameData/' + this.userPk + '/inference/', { params: { model_type: 'team'}})
      .then((response) => { this.inference_team = response.data; })

      // inference : enemy
      this.axios.get('http://127.0.0.1:8000/GameData/' + this.userPk + '/inference/', { params: { model_type: 'enemy'}})
      .then((response) => { this.inference_enemy = response.data; })

      // inference : secondary
      this.axios.get('http://127.0.0.1:8000/GameData/' + this.userPk + '/inference/', { params: { model_type: 'secondary'}})
      .then((response) => {
        this.inference_secondary = response.data; })
      
      // average : myPick
      this.axios.get('http://127.0.0.1:8000/GameData/' + this.userPk + '/average/')
      .then((response) => { this.myPick = response.data; })
    })
    .catch((error) => { 
      console.log(error.response)
    })

  }
}
</script>

<style scoped>
.warp {
  display: flex;
  flex-direction: column;
  height: 500px;
}
.items {
  display: flex;
  flex: 1;
  overflow: auto;
}
.card {
  min-height: 300px;
  min-width: 300px;
}
</style>