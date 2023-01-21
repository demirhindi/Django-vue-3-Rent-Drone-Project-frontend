<template>
  <Navbar/> 
  <router-view/>
</template>

<script>
import axios from 'axios'
import Navbar from './components/Navbar.vue';
export default{
  name:"App",
  components:{Navbar},
  beforeCreate() {
    this.$store.commit('initializeStore')

    const token = this.$store.state.user.token

    if (token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  }
 
  
}
</script>

<style>

</style>
