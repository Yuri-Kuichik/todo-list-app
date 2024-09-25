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
    <div class="tl-actions__check-all">
      <SharedElementButton 
        @click="globalStore.setAllCompleted"
        :class="{'is--invisible': !isActiveTasks }"
        text="Check all"
      />
    </div>
    
    
    <div class="tl-actions__filter-block">
      <SharedElementButton
        @click="applyFilterAll" 
        :type="globalStore.isFilterAll ? 'primary' : ''"
        text="All"
      />
      <SharedElementButton 
        v-show="isPossibleFilter"
        @click="applyFilterActive" 
        :type="globalStore.isFilterActive ? 'primary' : ''"
        text="Active"
      />
      <SharedElementButton
        v-show="isPossibleFilter"
        @click="applyFilterCompleted" 
        :type="globalStore.isFilterCompleted ? 'primary' : ''"
        text="Completed"
      />
    </div>

    <div class="tl-actions__clear-complited">
      <SharedElementButton
        @click="globalStore.removeCompletedTasks"
        text="Clear complited" 
        :class="{'is--invisible': !isCompletedTasks }"
      />
    </div>
      
  </section>
</template>

<style lang="scss" scoped>
.tl-actions {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  grid-template-areas:
  "check filter clear";
  width: 100%;
  justify-content: center;

  &__check-all {
    grid-area: check;
  }

  &__filter-block {
    grid-area: filter;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
  }

  &__clear-complited {
    grid-area: clear;
    display: inline-flex;
    justify-content: end;
  }

  .el-button.is--invisible {
    visibility: hidden;
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "check  clear"
      "filter filter";
    grid-template-rows: auto auto; 
  }

  @media (min-width: 768px) {
    &__filter-block {
      justify-content: center;
    }
  }
}
</style>

