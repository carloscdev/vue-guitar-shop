<script setup>
import { ref } from 'vue'
const props = defineProps({
  guitarra: {
    type: Object,
    required: true,
  }
})

defineEmits(['agregar-carrito'])
const star = ref(0)
const without = ref(0)

const generateRandomNumber = () => {
  star.value = Math.floor(Math.random() * 5) + 1
  without.value = 5 - star.value
}
generateRandomNumber()
</script>

<template>
<div class="align-items-center bg-gray rounded-xl group hover:shadow-lg hover:scale-[101%] ease-in duration-200">
  <div class="px-12">
    <img
      class="-mt-12 group-hover:scale-105 ease-in duration-300 group-hover:drop-shadow-xl"
      :src="`/img/${guitarra.imagen}.png`"
      :alt="guitarra.nombre"
    >
  </div>
  <div class="p-4">
    <h3 class="text-cream font-bold uppercase text-[1.5rem]">{{ guitarra.nombre }}</h3>
    <div class="flex gap-1 mt-1">
      <i class="fa-solid fa-star text-primary" v-for="item in star" :key="item"></i>
      <i class="fa-solid fa-star" v-for="item in without"></i>
    </div>
    <p class="text-cream opacity-70 my-5">{{ guitarra.descripcion }}</p>
    <div class="flex items-center justify-between">
      <p class="text-cream text-lg font-bold">${{ guitarra.precio }}</p>
      <button class="button" @click="$emit('agregar-carrito', guitarra)">Agregar al Carrito</button>
    </div>
  </div>
</div><!-- FIN GUITARRA -->
</template>
