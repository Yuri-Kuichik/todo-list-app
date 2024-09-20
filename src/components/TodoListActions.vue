<script setup>
import { shallowRef } from 'vue';

const globalStore = useGlobalStore();

const loading = shallowRef(false);

const isActiveTasks = computed(() => {
  return !!globalStore.getActiveTasks.length
})

const isCompletedTasks = computed(() => {
  return !!globalStore.getCompletedTasks.length
})

const isPossibleFilter = computed(() => {
  return isActiveTasks.value && isCompletedTasks.value 
})

async function applyFilterActive() {
  loading.value = true

  globalStore.setFilterActive()
  await globalStore.getActiveTodos()

  loading.value = false
}

async function applyFilterCompleted() {
  loading.value = true

  globalStore.setFilterCompleted()
  await globalStore.getCompletedTodos()

  loading.value = false
}

async function applyFilterAll() {
  loading.value = true

  globalStore.setFilterAll()
  await globalStore.fetchTodoList()

  loading.value = false
}

</script>

<template>
  <section class="tl-actions">
    <div class="tl-actions__left"> 
      <!-- Отмечает все задачи как выполненые -->
      <el-button 
        v-if="isActiveTasks" 
        @click="globalStore.setAllCompleted"
      >
        Отметить все
      </el-button>

      <!-- очищает список от выполненных задач -->
      <el-button 
        v-if="isCompletedTasks" 
        @click="globalStore.removeCompletedTasks"
      >
        Очистить выполненные
      </el-button>
    </div>
    
    <div class="tl-actions__right">
      <!-- Следующие кнопки имеют состояние активной -->
      <el-button 
        @click="applyFilterAll" 
        :type="globalStore.isFilterAll ? 'primary' : ''"
      >
        Все
      </el-button>

      <el-button 
        v-if="isPossibleFilter"
        @click="applyFilterActive" 
        :type="globalStore.isFilterActive ? 'primary' : ''"
      >
        Активные
      </el-button>

      <el-button 
        v-if="isPossibleFilter"
        @click="applyFilterCompleted" 
        :type="globalStore.isFilterCompleted ? 'primary' : ''"
      >
        Выполненные
      </el-button>
    </div>
    
  </section>
</template>

<style lang="scss" scoped>
.tl-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  width: 100%;

  &__left,
  &__right {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .el-button {
    margin: 0;
    border-radius: var(--radius);
  }

  @media (min-width: 768px) {
    justify-content: space-between;
  }
}
</style>

