<script  setup>
import { computed } from 'vue'
const globalStore = useGlobalStore();

const props = defineProps({
  count: {
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
})

const classProgressLine = computed(() => {
  return {
    [`box-progress-bar__line${props.completed ? '_completed' : ''}`]: true
  } 
})

const qtyTasks = computed(() => {
  return props.completed ? globalStore.getCompletedTasks.length : globalStore.getActiveTasks.length
});

const percentage = computed(() => {
  return !!qtyTasks.value ? Math.round(100 / globalStore.todosCollection.length * qtyTasks.value) : 0
})

</script>

<template>
  <div class="box-progress-bar">
    <div class="box-progress-bar__text">
      <p class="box-progress-bar__subtitle"> {{ `${qtyTasks} tasks` }} </p>
      <h3 class="box-progress-bar__title">{{ completed ? 'Completed' : 'To be finished' }}</h3>
    </div>
    <el-progress
      :class="classProgressLine"
      :text-inside="true"
      :stroke-width="4"
      :percentage="percentage"
    />
  </div>
 
</template>

<style lang="scss" scoped>
.box-progress-bar {
  padding: 16px;
  background: var(--color-black-ultra-light);
  border-radius: var(--radius);


  &__text {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 12px;
  }

  &__subtitle {
    font-weight: 600;
    font-size: 12px;
    line-height: 1.33;
    color: var(--text-color-light);
  }

  &__title {
    font-weight: 700;
    font-size: 14px;
    line-height: 1.21;
  }

  &__line {
    --el-color-primary: var(--color-pink);

    &_completed {
      --el-color-primary: var(--color-plum);
    }
  } 

  &__line_completed,
  &__line {
    --el-border-color-lighter: rgba(32, 36, 39, 0.07);
  }
}

</style>
