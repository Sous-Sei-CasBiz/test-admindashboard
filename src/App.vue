<template>
  <div class="flex justify-between flex-col h-screen ">
    <div>
      <router-view />
    </div>
    <div v-if="login">
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from './components/Footer.vue';
export default {
  name: 'App',
  components: {
    Footer,
  }
}
</script>


