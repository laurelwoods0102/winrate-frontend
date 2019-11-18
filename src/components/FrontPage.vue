<template>
  <div class="front">
    <div class="title">
      <h1>Winrate Prediction</h1>
    </div>
    <div class="search">
      <b-form-input v-model="inputUserId" placeholder="Enter your ID"></b-form-input>
      <b-button><router-link :to="{ path: inputUserId }">search</router-link></b-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FrontPage',
    data () {
      return {
        inputUserId: ''
      }
    }    
  }
</script>
