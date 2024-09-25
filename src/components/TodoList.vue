<script setup>
import { shallowRef, ref } from 'vue';

const globalStore = useGlobalStore();
const { todoList } = storeToRefs(globalStore);

const dragging = shallowRef(false);

function checkMove(e) {
  // console.log(e.draggedContext)
}

function startDragging() {
  console.log('startDragging')
  dragging.value = true
}

</script>

<template>
  <section class="todo-list">
    <draggable 
      class="todo-list__content draggable"
      v-model="todoList" 
      handle=".handle" 
      item-key="id"
      :move="checkMove"
      @start="startDragging"
      @end="dragging = false"
      animation="200"
      :disabled=false
      ghost-class="ghost"
      tag="ul"
    >
      <template #item="{element}">
        <li class="todo-list__item">
          <TodoItem :model="element"/>
        </li>
      </template>
    </draggable>
  </section>
</template>

<style lang="scss" scoped>
.todo-list {
  flex-grow: 1;
  width: 100%;
  height: 100px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
    background-color: transparent;
    border-radius: var(--radius);
    max-height: 80px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(32, 36, 39, 0.1);
  }

  &__content {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .ghost {
    opacity: 0.5;
  }

  @media (min-width: 768px) {
    height: 85px;
  }
}

</style>