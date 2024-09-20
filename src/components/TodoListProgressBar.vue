<script setup>
import { computed } from 'vue';
const globalStore = useGlobalStore();

function getPercentage(val) {
  return !!val ? Math.round(100 / globalStore.todosCollection.length * val) : 0
}

const qtyCompletedTasks = computed(() => globalStore.getCompletedTasks.length);

const qtyActiveTasks = computed(() => globalStore.getActiveTasks.length)

</script>

<template>
  <section class="progress-bar-section">
    
    <el-progress
      :text-inside="true"
      :stroke-width="18"
      :percentage="getPercentage(qtyCompletedTasks)"
      status="success"
    />
    <span class="progress-bar-section__text">Выполнено ({{ qtyCompletedTasks }})</span>

    <el-progress
      :text-inside="true"
      :stroke-width="18"
      :percentage="getPercentage(qtyActiveTasks)"
      status="exception"
    />
    <span class="progress-bar-section__text">К выполнению ({{ qtyActiveTasks }})</span>
  </section>

</template>

<style lang="scss" scoped>
.progress-bar-section {
  display: grid;
  width: 100%; 

  &__text {
    margin: 5px 0 1rem;
    color: var(--color-black);
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    gap: 15px;

    &__text {
      margin: 0 0 0 15px;
    }
  }
}

</style>

