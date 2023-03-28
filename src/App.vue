<template>
  
  <component @setPage="setPage" :is="currentTab"  class="tab" ></component>
</template>

<script>
import NavHeader from './components/NavHeader.vue';
import TextOpenAI from './components/TextOpenAI.vue';





export default {
  name: 'App',
  components: {
    TextOpenAI,
    NavHeader
},
data() {
        return {
            currentTab: 'NavHeader',
            tabs: ['AddProduct', 'TextOpenAI'],
           
        }
    },
  mounted(){
   
  },
  methods:{
    setPage(page){
      this.currentTab = page
    }
  },
}
</script>

<style>

</style>
