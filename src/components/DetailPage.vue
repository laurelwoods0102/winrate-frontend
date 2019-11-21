<template>
 <div class="detail">
    <div class="header">
      <h1>{{ userId }}</h1>
    </div>
    
    <div class="body">
      <div class="assist">
        <b-button v-b-toggle.collapse-predict variant="outline-primary">Pick Assistant</b-button>
        <b-collapse id="collapse-predict">
          <h1>the world of sound</h1>          
          <span v-for="champion in championList">
            <img v-bind:src="splashLoader(champion)">
          </span>
        </b-collapse>
      </div>    

      <div class="team">
        <div class="team_summary">
          <div class="team_best">
            <h1>Best : {{ nameTranslator(inference_team[0]['id']) }}</h1>
            <img v-bind:src="splashLoader(inference_team[0]['id'])">
          </div>
          <div class="team_worst">
            <h1>Worst {{ nameTranslator(inference_team[inference_team.length - 1]['id']) }}</h1>
            <img v-bind:src="splashLoader(inference_team[inference_team.length - 1]['id'])">          
          </div>
        </div>
        <b-button v-b-toggle.collapse-1 variant="primary">More</b-button>
        <b-collapse id="collapse-1">
          <b-container fluid class="wrap">
            <b-row class="items flex-row flex-nowrap">
              <template v-for="team, index in inference_team">
                <b-card class="card">
                  <img v-bind:src="splashLoader(team['id'])">
                  <h3>{{ index + 1 }}. {{ nameTranslator(team['id']) }}</h3>
                </b-card>
              </template>
            </b-row>
          </b-container>
        </b-collapse>
      </div>

      <div class="myPick">
      </div>
    </div>
  </div>
</template>

<script>
import championTable from '../assets/champion_table.json';

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
      splash: [],
      championList: Array.from(Array(145).keys())
    }
  },
  created () {
    this.axios.get('http://127.0.0.1:8000/GameData/search/', { params: { game_id: 'laurelwoods' }})
    .then((response) => {
      this.userPk = response.data.id;
      this.userId = response.data.game_id;
      // inference : team
      this.axios.get('http://127.0.0.1:8000/GameData/' + this.userPk + '/inference/', { params: { model_type: 'team' } })
      .then((response) => { this.inference_team = response.data; })

      // inference : enemy
      this.axios.get('http://127.0.0.1:8000/GameData/' + this.userPk + '/inference/', { params: { model_type: 'enemy' } })
      .then((response) => { this.inference_enemy = response.data; })

      // inference : secondary
      this.axios.get('http://127.0.0.1:8000/GameData/' + this.userPk + '/inference/', { params: { model_type: 'secondary' } })
      .then((response) => {
        this.inference_secondary = response.data; })
      
      // average : myPick
      this.axios.get('http://127.0.0.1:8000/GameData/' + this.userPk + '/average/')
      .then((response) => { this.myPick = response.data; })
    })
    .catch((error) => { 
      console.log(error.response)
    })
  },
  methods: {
    nameTranslator: function (championId) {      
      return championTable[championId]['name_ko']
    },
    splashLoader: function (championId) {
      const path = require('../assets/splash/' + String(championId) + '.png')
      return path
    }
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
  min-height: 200px;
  min-width: 250px;
}
</style>
