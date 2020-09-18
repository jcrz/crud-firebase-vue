import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		tareas: [],
		tarea: { nombre: "", id: "" },
	},
	mutations: {
		setTareas(state, payload) {
			state.tareas = payload;
		},
		setTarea(state, payload) {
			state.tarea = payload;
		},
		setEliminarTarea(state, payload) {
			const tareasFiltradas = state.tareas.filter(
				(tarea) => tarea.id !== payload
			);
			return (state.tareas = tareasFiltradas);
		},
	},
	actions: {
		getTareas({ commit }) {
			const tareas = [];
			db.collection("Tareas")
				.get()
				.then((res) => {
					res.forEach((doc) => {
						let tarea = doc.data();
						tarea.id = doc.id;
						tareas.push(tarea);
					});
					commit("setTareas", tareas);
				});
		},
		getTarea({ commit }, idTarea) {
			db.collection("Tareas")
				.doc(idTarea)
				.get()
				.then((doc) => {
					let tarea = doc.data();
					tarea.id = doc.id;
					commit("setTarea", tarea);
				});
		},
		editarTarea({ commit }, tarea) {
			db.collection("Tareas")
				.doc(tarea.id)
				.update({
					nombre: tarea.nombre,
				})
				.then(() => {
					//alert("Tarea editada!");
					router.push("/");
				});
		},
		agregarTarea({ commit }, nombreTarea) {
			db.collection("Tareas")
				.add({
					nombre: nombreTarea,
				})
				.then(() => {
					//alert("Tarea Agregada con exito!");
					router.push("/");
				});
		},
		eliminarTarea({ commit }, idTarea) {
			db.collection("Tareas")
				.doc(idTarea)
				.delete()
				.then(() => {
					//alert("Tarea eliminada!");
					commit("setEliminarTarea", idTarea);
				});
		},
	},
	modules: {},
});
