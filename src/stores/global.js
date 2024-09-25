import { defineStore } from 'pinia'
import { collection, doc, getDocs, addDoc, setDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore'
const { db, todosRef, collectionName } = useFirebaseClient()

export const useGlobalStore = defineStore('global', {
  state() {
    return {
      todosCollection: [],
      todoList: [],
      filter: 'all',
      loading: false
    }
  },
  
  getters: {
    getActiveTasks(state) {
      return !!state.todosCollection.length 
        ? state.todosCollection.filter(item => !item.completed)
        : []
    },

    getCompletedTasks(state) {
      return !!state.todosCollection.length 
        ? state.todosCollection.filter(item => item.completed)
        : []
    },

    isFilterAll: state => state.filter === 'all',

    isFilterActive: state => state.filter === 'active',

    isFilterCompleted: state => state.filter === 'completed',
  },

  actions: {
    async fetchTodoList() {
      this.loading = true

      try {
        const res = await getDocs(todosRef);
        const data = res.docs.map(doc => ({ ...doc.data(), ...{id: doc.id} }) )

        this.todoList = this.isFilterActive 
          ? data.filter(todo => todo.completed === false) 
          : this.isFilterCompleted 
            ? data.filter(todo => todo.completed === true)
            : data
        this.todosCollection = useCollection(todosRef)
    
        return { data }
    
      } catch(error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async addNewTodo(text) {
      this.loading = true

      const data = {
        text,
        completed: false
      }

      try {
        const docRef = await addDoc(todosRef, data);

        await this.fetchTodoList()
      
        return { data: {...data, ...{ id: docRef.id }} }
      } catch(error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async editTodoItem(id, data) {
      this.loading = true
      const todoDocRef = doc(db, collectionName, id)

      try {
        await updateDoc(todoDocRef, data );

        await this.fetchTodoList()

        // return data
      } catch(error) {
        console.error(error)
        return error
      } finally {
        this.loading = false
      }
    },

    async getActiveTodos() {
      this.loading = true
      const q = query(collection(db, collectionName), where("completed", "==", false));

      try {
        const res = await getDocs(q);
        console.log('todos: ', res.docs)

        this.todoList = res.docs.map(doc => ({ ...doc.data(), ...{id: doc.id} }) )
      } catch(error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async getCompletedTodos() {
      this.loading = true
      const q = query(collection(db, collectionName), where("completed", "==", true));

      try {
        const res = await getDocs(q);
        console.log('todos: ', res.docs)

        this.todoList = res.docs.map(doc => ({ ...doc.data(), ...{id: doc.id} }) )
      } catch(error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async deleteTodoItem(id) {
      this.loading = true
      const todoDocRef = doc(db, collectionName, id)

      try {
        await deleteDoc(todoDocRef);

        await this.fetchTodoList()
      } catch(error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async removeCompletedTasks() {
      this.loading = true
      
      try {
        this.todoList.forEach(async (todo) => {
          if (todo.completed) {
            const todoDocRef = doc(db, collectionName, todo.id)
            await deleteDoc(todoDocRef);
          }
        })

        this.setFilterAll();
        await this.fetchTodoList();
        
      } catch(error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async setAllCompleted() {
      this.loading = true
      
      try {
        this.todoList.forEach(async (todo) => {
          if (!todo.completed) {
            const todoDocRef = doc(db, collectionName, todo.id)
            await updateDoc(todoDocRef, { completed: true });
          }
        })

        if (this.isFilterActive) {
          this.setFilterAll()
        }

        await this.fetchTodoList()
      } catch(error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    setFilterAll() {
      this.filter = 'all';
    },

    setFilterActive() {
      this.filter = 'active';
    },

    setFilterCompleted() {
      this.filter = 'completed';
    },
  }
})