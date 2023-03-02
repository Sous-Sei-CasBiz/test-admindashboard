<template>
    <div>
        <Navigation />
        <div class="max-w-screen-lg m-auto px-4 py-20 ">
            <div class="mt-10">
                <div class="border rounded-md px-4 py-2 bg-white flex items-center justify-between gap-2">
                    <input type="text" v-model.trim="name" class="px-4 py-2 rounded-md outline-none w-full"
                        placeholder="Add your task here..." autofocus />
                    <div v-if="name">
                        <button @click="addTodo()" title="Add Todo"
                            class=" py-1 px-2 border-2 border-slate-200 rounded-md hover:bg-lime-700 hover:text-white hover:border-lime-700">
                            <i class="pi pi-plus"></i>
                        </button>
                    </div>
                    <div v-else>
                        <button title="Add todo first "
                            class="py-1 px-2 border-2 border-slate-200 rounded-md hover:bg-lime-700 hover:text-white hover:border-lime-700 cursor-not-allowed">
                            <i class="pi pi-plus"></i>
                        </button>
                    </div>
                    <button @click="searchTodo" title="Search Todo" type="button"
                        class=" py-1 px-2 border-2 border-slate-200 rounded-md hover:bg-blue-700 hover:text-white hover:border-blue-700 ">
                        <i class="pi pi-search-plus"></i>
                    </button>
                </div>
            </div>
            <div class="mt-4">
                <div class="grid md:grid-cols-4 sm:grid-cols-3 grid-cols- gap-4">
                    <div v-for="todoList in todos" :key="todoList.id"
                        class="px-4 py-2 borderborder-b-slate-400 hover:bg-slate-300 bg-slate-100 rounded-md mt-1 cursor-pointer border-2">
                        <div>

                            <div class="flex flex-col justify-between h-full">
                                <div>
                                    <span v-if="todoList.completed">
                                        <s class="text-red-700" title="completed">{{ todoList.todo }}</s>
                                    </span>
                                    <span v-else>
                                        {{ todoList.todo }}
                                    </span>
                                </div>
                                <!-- ================ -->
                                <div class="flex gap-2 mt-4">
                                    <button @click="completedTodo(todoList.id)">
                                        <div>
                                            <span v-if="!todoList.completed" title="Make it completed">
                                                <i
                                                    class="pi pi-check text-lime-700 hover:text-white rounded-md p-1 border-2 hover:border-lime-600 hover:bg-lime-600"></i>
                                            </span>
                                            <span v-else title="Undo">
                                                <i class="pi pi-undo border-2 text-white rounded-md p-1 bg-lime-600"></i>
                                            </span>
                                        </div>
                                    </button>
                                    <button @click="editTodo(todoList.id)" v-show="!todoList.completed">
                                        <span title="Edit to do">
                                            <i
                                                class=" pi pi-file-edit text-blue-700 hover:text-white rounded-md p-1 border-2 hover:border-blue-600 hover:bg-blue-600 "></i>
                                        </span>
                                    </button>
                                    <button @click="removeTodo(todoList.id)" title="Delete">
                                        <i
                                            class="pi pi-trash hover:text-white text-red-600 rounded-md p-1 border-2 hover:border-red-600 hover:bg-red-600 "></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!-- ============ -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Dialog header="Header" v-model:visible="displayModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '50vw' }" :modal="true">
        <textarea name="" id="" cols="20" rows="10" v-model="editText" class="w-full p-4 rounded-md" autofocus>

                    </textarea>
        <template #footer>
            <Button label="No" icon="pi pi-times" @click="cancelTodo()" class="p-button-text" />
            <Button label="Yes" icon="pi pi-check" @click="saveTodo()" autofocus />
        </template>
    </Dialog>
</template>
<script >
import Navigation from '@/components/Navigation.vue';
export default {
    name: 'TodoVue',
    components: {
        Navigation
    },
    data() {
        return {
            edit: false,
            name: "",
            editText: "",
            search: "",
            todos: [],
            edit_id: "",
            displayModal: false,
        };
    },
    mounted() {
        this.todos = JSON.parse(localStorage.getItem("todos")) || [];
        //check local storage have data
        if (this.todos.length == 0) {
            fetch("https://dummyjson.com/todos")
                .then((res) => res.json())
                .then((response) => {
                    this.todos = response.todos;
                    localStorage.setItem("todos", JSON.stringify(this.todos));
                });
        }
    },
    methods: {
        // =================
        searchTodo() {
            this.todos = JSON.parse(localStorage.getItem("todos")) || [];
            this.todos = this.todos.filter((todos) =>
                todos.todo.toLowerCase().includes(this.name.toLowerCase())
            );
        },
        // ==============
        addTodo() {
            this.todos = JSON.parse(localStorage.getItem("todos")) || [];
            var index;
            switch (this.todos.length) {
                case 0:
                    index = 1;
                    break;
                default:
                    var max = this.todos[0].id;
                    this.todos.forEach(e => {
                        if (max > e.id) {
                            index = max;
                        } else {
                            index = e.id
                            max = e.id
                        }
                    })
                    index = index + 1;
            }
            //object store data
            var obj = {
                id: index,
                todo: this.name,
            };
            //add obj to todo list
            this.todos.unshift(obj);
            localStorage.setItem("todos", JSON.stringify(this.todos));
        },
        // ===================
        removeTodo(id) {
            this.todos = JSON.parse(localStorage.getItem("todos")) || [];
            this.todos.forEach((todoList) => {
                if (id == todoList.id) {
                    this.todos.splice(this.todos.indexOf(todoList), 1);
                }
            });
            localStorage.setItem("todos", JSON.stringify(this.todos));
        },
        // ================
        completedTodo(id) {
            this.todos = JSON.parse(localStorage.getItem("todos")) || [];
            this.todos.forEach((todoList) => {
                if (id == todoList.id) {
                    todoList.completed = !todoList.completed;
                }
            });
            this.todos.filter((todoList) => todoList.completed != false);
            localStorage.setItem("todos", JSON.stringify(this.todos));

        },
        // =====================
        editTodo(id) {
            this.todos = JSON.parse(localStorage.getItem("todos")) || [];
            this.todos.forEach((todoList) => {
                if (id == todoList.id) {
                    this.edit_id = id
                    todoList.edit = true;
                    this.editText = todoList.todo;
                    this.displayModal = true;

                } else {
                    todoList.edit = false;
                }
            });
        },
        // ===================
        saveTodo() {
            this.todos = JSON.parse(localStorage.getItem("todos")) || [];
            this.todos.forEach((todoList) => {
                if (this.edit_id == todoList.id) {
                    todoList.edit = false;
                    todoList.todo = this.editText;
                    this.displayModal = false;
                }
            });
            this.edit = false;
            localStorage.setItem("todos", JSON.stringify(this.todos));
        },
        cancelTodo() {
            this.todos = JSON.parse(localStorage.getItem("todos")) || [];
            this.todos.forEach((todoList) => {
                if (this.edit_id == todoList.id) {
                    todoList.edit = false;
                    todoList.todo;
                    this.displayModal = false;
                }
            });
            this.edit = false;
        },

    },
};
</script>
<style lang="scss">
.p-button {
    margin: 0.3rem .5rem;
    min-width: 10rem;
}

p {
    margin: 0;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}

.p-dialog .p-button {
    min-width: 6rem;
}
</style>