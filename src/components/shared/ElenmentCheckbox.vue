<script setup>
import {ref} from 'vue'

const checked = ref(false)

const props = defineProps({
  isCompleted: {
    type: Boolean
  }
})

const isChecked = computed(() => {
  return props.isCompleted
})

watch(isChecked, (newVal) => {
  checked.value = newVal
})
</script>

<template>
  <el-checkbox :checked="isCompleted" v-model="checked" class="element-checkbox"/>
</template>

<style lang="scss">
  .element-checkbox {
    --el-checkbox-input-height: 16px;
    --el-checkbox-input-width: 16px;
    --el-checkbox-checked-bg-color: #2578F4;
    --el-border-color: #C7CCD1;

    .el-checkbox__input {
      .el-checkbox__inner {
        width: 16px;
        height: 16px;

        &::after {
          position: absolute;
          left: 6px;
          height: 9px;
        }
      }
    }
  }

</style>