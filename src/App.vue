<template>
  <div>
    
    <form @submit.prevent = "estatusEditar ? updateTodo() : addTodo()">
        <div>
          <h2>Books</h2>
          <table>
            <tr>
              <td>
                ID
              </td>
              <td>
                <input type="text" v-model="book_id">
              </td>
            </tr>
            <tr>
              <td>
                Titulo
              </td>
              <td>
                <input type="text" v-model="titulo">
              </td>
            </tr>
            <tr>
              <td>
                Autor
              </td>
              <td>
                <input type="text" v-model="autor">
              </td>
            </tr>
          </table>
        </div>
        
        <button type="submit">{{estatusEditar ? "Editar": "Agregar"}}</button>
        <button v-if="estatusEditar" @click="estatusEditar = false, name = ''">Cancelar</button>
    </form>
    <img src="https://media.tenor.com/images/44b6c3070ca5ac7f30da763e98525d28/tenor.gif" v-if="cargando">
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{todo.book_id}}, {{todo.titulo}}, {{todo.autor}} - <button @click="deleteTodo(todo)">Eliminar</button>
        <button @click="selectTodo(todo)">Editar</button>
      </li>
    </ul>
  </div>
</template>

<script>
import {db} from './firebase'

export default {
  name: 'App',
  data() {
    return {
      todos: [],
      id: "",
      book_id: "",
      titulo: "",
      autor: "",
      cargando: false,
      estatusEditar: false
    }
  },
  created(){
    this.listarTodos();
  },
  methods: {
    async listarTodos(){
      this.cargando = true;
      const data = await db.collection("todos").get();
      this.todos = data.docs.map(doc => ({
        id: doc.id, ...doc.data()
      }))
      this.cargando = false;
      console.log(this.todos);
    },

    async addTodo() {
      await db.collection('todos').add(
        {
          book_id: this.book_id,
          titulo: this.titulo,
          autor: this.autor
        }
      )
      this.book_id = "";
      this.titulo = "";
      this.autor = "";
      this.listarTodos();
    },
    async deleteTodo(todo){
      confirm(`estas deguro que deseas eliminar ${todo.book_id}`);
      await db.collection('todos').doc(todo.id).delete();
      this.listarTodos();
    },
    selectTodo(todo){
      this.estatusEditar = true;
      this.id = todo.id;
      this.book_id = todo.book_id;
      this.titulo = todo.titulo;
      this.autor = todo.autor;
    },
    async updateTodo() {
      await db.collection('todos').doc(this.id).set(
        {
          book_id: this.book_id,
          titulo: this.titulo,
          autor: this.autor
        }
      );
      this.estatusEditar = false;
      this.id = "";
      this.book_id = "";
      this.titulo = "";
      this.autor = "";
      this.listarTodos();
    },
  },
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
table{
  margin-left: auto;
  margin-right: auto;
}
</style>
