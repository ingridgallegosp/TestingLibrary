<template>
  <button @click="toggle">Mostrar</button>
  <p v-if="show">Texto oculto</p>
</template>

<script setup>
import { ref } from 'vue';
const show = ref(false);
const toggle = () => { show.value = !show.value; };
</script>