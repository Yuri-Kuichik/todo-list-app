<script setup>
import { shallowRef, computed } from 'vue';
import {
  Check,
  Delete,
  Edit,
} from '@element-plus/icons-vue'

const globalStore = useGlobalStore();
const { loading } = storeToRefs(globalStore);
const open = shallowRef(false);

const props = defineProps({
  model: {
    type: Object,
    default: {}
  }
})

const newText = shallowRef(props.model.text)

const rootClasses = computed(() => {
  return {
    'todo-item_completed': props.model.completed
  }
})

function deleteTask() {
  globalStore.deleteTodoItem(props.model.id)
}

function changeStatus() {
  globalStore.editTodoItem(props.model.id, { completed: !props.model.completed})
}

function openModal() {
  newText.value = props.model.text
  open.value = true
}

function closeModal() {
  open.value = false
  newText.value = ''
}

async function editTask() {
  if (newText.value === props.model.text) return 

  await globalStore.editTodoItem(props.model.id, { text: newText.value })
  closeModal()
}

</script>

<template>
  <div class="todo-item" :class="rootClasses"> 
    <NuxtImg width="16" height="16" class="todo-item__druggable handle" src="/images/druggable-icon.svg" />
    
    <div class="todo-item__left">
      <SharedElenmentCheckbox :is-completed="model.completed" @click="changeStatus" />
      <p> {{ model.text }} </p>
    </div>

    <div class="todo-item__right">
      <NuxtImg width="16" height="16" src="/images/edit-icon.svg" @click="openModal" />
      <NuxtImg width="16" height="16" src="/images/delete-icon.svg" @click="deleteTask"/>
    </div>

    <SharedBoxModal v-if="open" @close="closeModal">
      <template #header>Edit todo</template>
      <el-input v-model="newText" placeholder="Edit todo..." @keyup.enter="editTask" />
      <template #footer>
        <el-button 
          class="modal-btn" 
          type="primary" 
          @click.stop="editTask"
          :loading="loading"
          :disabled="loading"
        >
          Edit
        </el-button>
        <el-button 
          class="modal-btn" 
          @click="closeModal" 
          :disabled="loading"
        >
          Close
        </el-button>
      </template>
    </SharedBoxModal>
    
  </div>
</template>

<style lang="scss" scoped>
.todo-item {
  $this: &;

  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding-right: 8px;
  padding-left: 24px;

  &:hover {
    #{ $this }__druggable {
      opacity: 1;
    }
  }

  &__druggable {
    position: absolute;
    left: 0;
    top: calc(50% - 10px);   
    -webkit-transition: opacity 0.3s;
    transition: opacity 0.3s;

    &.handle {
      cursor: grab;
    }
  }

  &__left {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    line-height: 1.15;
  }

  &__right {
    display: inline-flex;
    gap: 16px;

    img {
      cursor: pointer;
    }
  }

  &_completed {
    color: var(--text-color-light);
  }

  @media (min-width: 768px) {
    padding: 0;

    &__druggable {
      left: -22px;
      opacity: 0;
    }
  }
}

.modal-btn {
  margin: 0;
  width: 50%;
}
    
</style>