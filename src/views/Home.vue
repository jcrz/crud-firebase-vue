<template>
  <div class="home">
    <h2>Lista de tareas</h2>
    <hr />
    <router-link to="/agregar">
      <button class="btn btn-success btn-block">Agregar</button>
    </router-link>
    <ul class="list-group mt-3">
      <li class="list-group-item" v-for="(item, index) in tareas" :key="index">
        {{ item.nombre }} - {{ item.id }}
        <div class="float-right">
          <router-link
            class="btn btn-warning btn-sm mr-2"
            :to="{name:'Editar', params: {id: item.id}}"
          >Editar</router-link>
          <button class="btn btn-danger btn-sm" @click="eliminarTarea(item.id)">Eliminar</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Home",
  created() {
    this.getTareas();
  },
  computed: {
    ...mapState(["tareas"]),
  },
  methods: {
    ...mapActions(["getTareas", "eliminarTarea"]),
  },
};
</script>
