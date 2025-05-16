<template>
  <div v-if="loading">Cargando...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <h1>Datos:</h1>
    <ul>
      <li v-for="item in data" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { fetchData } from '../api'; // Función a mockear

const data = ref(null);
const loading = ref(true);
const error = ref(null);

const loadData = async () => {
  try {
    data.value = await fetchData();
  } catch (err) {
    error.value = 'Error cargando datos';
  } finally {
    loading.value = false;
  }
};

loadData();
</script>