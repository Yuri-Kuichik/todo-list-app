<script setup>
import { shallowRef, computed } from 'vue'

const globalStore = useGlobalStore();
const { todoList, loading } = storeToRefs(globalStore);

const inputText = shallowRef('');

const isInputText = computed(() => {
  return !!inputText.value.length
})

const isTodos = computed(() => {
  return !!todoList.value.length
})

useHead(() => ({
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: '/images/todo-list-illustration.png',
    },
  ],
}));

async function addNewTodo() {
  await globalStore.addNewTodo(inputText.value)
  inputText.value = ''
}

async function fetch() {
  await globalStore.fetchTodoList()
}

const res = await useFetch(async () => await fetch())
</script>

<template>
  <div class="home-page">
    <div class="home-page__header">
      <NuxtImg
        class="home-page__image" 
        src="/images/todo-list-illustration.png" 
      />
      <h2 class="home-page__title">Today I need to</h2>
      <div class="home-page__input-wrapper">
        <el-input 
          :class="$style['el-input']"
          v-model="inputText" 
          placeholder="Add new todo..." 
          size="large"
          @keyup.enter="addNewTodo"
          clearable
        />
        <el-button 
          v-if="isInputText"
          :class="$style['el-button']"
          @click="addNewTodo" 
          type="primary"
          size="large"
          :loading="loading"
          :disabled="loading"
        >
          Добавить
        </el-button>
      </div>
    </div>

    <div class="home-page__content">
      <SharedLoadingSpinner v-if="loading" class="home-page__spinner" size="l" />
    
      <template v-if="isTodos">
        <TodoList/>
        <TodoListActions />
        <TodoListProgressBar />
      </template>
    </div>

    <div v-if="!isTodos && !loading" class="home-page__no-tasks">
      <NuxtImg
        height="24"
        class="home-page__image" 
        src="/images/checkmark.svg" 
      />
      <span>Congrat, you have no more tasks to do</span>
    </div>
    
  </div>

</template>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  gap: 32px;

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    gap: 28px;
  }

  &__image {
    max-width: 180px;
  }

  &__input-wrapper {
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  &__title {
    margin: 0;
    font-size: 24px;
    line-height: 1.2;
  }

  &__no-tasks {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    line-height: 1.15;
    color: var(--color-gray);
  }

  &__spinner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    flex-grow: 1;
    border-radius: 24px;
    background: rgba(0, 0, 0, 0.06);
  }

  @media (min-width: 768px) {
    gap: 48px;

    &__header {
      gap: 48px;
    }

    &__content {
      gap: 40px;
    }
  }

}
</style>

<style lang="scss" module scoped>
.el-input {
  flex-grow: 1;
  max-width: 317px;
  --el-input-border-radius: var(--radius);

  @media (max-width: 767px) {
    --el-component-size-large: 32px;
  }
}

.el-button {
  --el-border-radius-base: var(--radius);
  padding-left: 30px;
  padding-right: 30px;

  @media (max-width: 767px) {
    --el-button-size: 32px;
  }
}
</style>
