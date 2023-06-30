<script setup>
import { computed, ref } from 'vue'
const props = defineProps({
  carrito: {
    type: Array
  },
  guitarra: {
    type: Object
  }
})
defineEmits([
  'decrementar-cantidad',
  'incrementar-cantidad',
  'agregar-carrito',
  'vaciar-carrito',
  'eliminar-producto'
])

const total = computed(() => {
  return props.carrito.reduce((total, producto) => total + producto.cantidad * producto.precio, 0)
})
const open = ref(false)
const toggleOpen = () => {
  open.value = !open.value
}

</script>

<template>
  <header class="header grid">
    <div class="container relative z-20">
      <div>
        <nav class="flex justify-between items-center mt-5">
          <div class="hidden md:block"></div>
          <div>
            <img class="w-20 mx-auto" src="/img/logo.png" alt="imagen logo">
          </div>
          <div class="carrito">
            <div class="text-cream text-xl">
              <i class="fa-solid fa-cart-shopping hover:text-primary" @click="toggleOpen"></i>
            </div>
            <div id="carrito" class="bg-black p-8" :class="open ? 'active' : ''">
              <p v-if="carrito.length === 0" class="text-center">El carrito esta vacio</p>
              <table v-else class="w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="guitarra in carrito" :key="guitarra.id">
                    <td>
                      <img class="w-10 rotate-[10deg]" :src="`/img/${guitarra.imagen}.png`" :alt="guitarra.nombre">
                    </td>
                    <td>{{ guitarra.nombre }}</td>
                    <td>
                      ${{ guitarra.precio }}
                    </td>
                    <td>
                      <div class="flex justify-center items-center">
                      <button class="bg-black p-2 rounded w-8"  @click="$emit('decrementar-cantidad', guitarra.id)"
                        :disabled="guitarra.cantidad <= 1">
                        -
                      </button>
                      <span class="px-2">{{ guitarra.cantidad }}</span>
                      <button class="bg-black p-2 rounded w-8" @click="$emit('incrementar-cantidad', guitarra.id)">
                        +
                      </button>
                    </div>
                    </td>
                    <td>
                      <button class="bg-red-500 w-6 rounded-full h-6 font-bold mx-auto" type="button" @click="$emit('eliminar-producto', guitarra.id)">
                        X
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-if="carrito.length !== 0">
                <p class="text-end my-3">Total pagar: <span class="font-bold">${{ total }}</span></p>
                <button
                  class="button button-dark w-full"
                  :disabled="carrito.length === 0"
                  @click="$emit('vaciar-carrito')"
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div><!--.row-->

      <div class="h-full grid md:grid-cols-[0.7fr,1fr] gap-5 items-center">
        <div class="container text-cream">
          <h1 class="text-[4rem] font-bold">{{ guitarra.nombre }}</h1>
          <p class="text-xl">{{ guitarra.descripcion }}</p>
          <p class="my-5 text-primary font-bold text-[3rem]">${{ guitarra.precio }}</p>
          <button
          @click="$emit('agregar-carrito', guitarra)"
          class="button font-bold"
          >
          Agregar al Carrito
        </button>
      </div>
      <img class="hidden md:block w-[55%] mr-5 rotate-[30deg] mx-auto" :src="`/img/${guitarra.imagen}.png`" alt="imagen header">
      </div>
    </div>

  </header>
</template>