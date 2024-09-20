<script setup>
import { shallowRef, ref } from 'vue';

const globalStore = useGlobalStore();
const { todoList } = storeToRefs(globalStore);

const dragging = shallowRef(false);

function checkMove(e) {
  window.console.log("Future index: " + e.draggedContext.futureIndex);
  console.log(e.draggedContext)
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
        <li class="todo-list__item handle">
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

  &__content {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__item {
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    overflow: hidden;
  }

  .handle {
    cursor: grab;
  }

  .ghost {
    opacity: 0.5;
    background: var(--color-gray);
  }
}

</style>