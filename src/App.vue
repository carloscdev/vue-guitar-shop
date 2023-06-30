<script setup>
import { ref, onMounted, watch } from 'vue'
import { db } from './data/guitarras'
import Guitarra from './components/Guitarra.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const guitarras = ref([])
const carrito = ref([])
const guitarra = ref({})

watch(carrito, () => {
  guardarLocalStorage()
}, { deep: true })

onMounted(() => {
  guitarras.value = db
  generateRandomNumber()
  const carritoStorage = localStorage.getItem('carrito')
  if (carritoStorage) {
    carrito.value = JSON.parse(carritoStorage)
  }
})

const guardarLocalStorage = () => {
  localStorage.setItem('carrito', JSON.stringify(carrito.value))
}

const agregarCarrito = (guitarra) => {
  const existeCarrito = carrito.value.findIndex(producto => producto.id === guitarra.id)
  if (existeCarrito >= 0) {
    carrito.value[existeCarrito].cantidad++
  } else {
    guitarra.cantidad = 1;
    carrito.value.push(guitarra)
  }
}


const vaciarCarrito = () => {
  carrito.value = []
}

const eliminarProducto = (id) => {
  carrito.value = carrito.value.filter(producto => producto.id !== id)
}

const decrementarCantidad = (id) => {
  const index = carrito.value.findIndex(producto => producto.id === id)
  if (carrito.value[index].cantidad <= 1) return
  carrito.value[index].cantidad--
}

const incrementarCantidad = (id) => {
  const index = carrito.value.findIndex(producto => producto.id === id)
  carrito.value[index].cantidad++
}

const generateRandomNumber = () => {
  const random = Math.floor(Math.random() * 11) + 1
  guitarra.value = db[random]
}
</script>

<template>
  <Header
    :guitarra="guitarra"
    :carrito="carrito"
    @decrementar-cantidad="decrementarCantidad"
    @incrementar-cantidad="incrementarCantidad"
    @agregar-carrito="agregarCarrito"
    @vaciar-carrito="vaciarCarrito"
    @eliminar-producto="eliminarProducto"
  />
  <main class="container mt-12">
    <h2 class="font-bold text-[3rem] text-cream">Nuestra Colección</h2>
    <div class="grid tablet:grid-cols-2 laptop:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-16 mt-20">
      <Guitarra
        v-for="guitarra in guitarras"
        :key="guitarra.id"
        :guitarra="guitarra"
        @agregar-carrito="agregarCarrito"
      />
    </div>
  </main>
  <Footer />
</template>
