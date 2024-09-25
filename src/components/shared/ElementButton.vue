<script setup>
  import { computed } from 'vue'

  const globalStore = useGlobalStore();
 
  const props = defineProps({
    text: {
      type: String,
      default: 'Click me'
    },

    size: {
      type: String,
      default: 'm'
    },

    type: {
      default: ''
    }
  })

  const rootClass = computed(() => {
    return {
      [`element-button_size-${props.size}`]: true,
      [`element-button--${props.type}`]: !!props.type,
    }
  })

</script>

<template>
  <el-button 
    class="element-button"
    :class="rootClass"
    :type="type"
  >
    {{ text }}
  </el-button>

</template>

<style lang="scss" scoped>
  .element-button {
    margin: 0;
    border-radius: var(--radius);
    border: none;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    color: var(--text-color);
    background-color: transparent;
    
    &--primary {
      color: var(--color-white);
      background-color: var(--color-primary);

      &:hover {
        background-color: var(--color-primary-light);
      }
    }

    &_size-s {
      height: 28px;
      padding: 4px 8px;
    }

    &_size-m {
      padding: 8px 12px;
      height: 32px;
    }

    &_size-l {
      padding: 12px 16px;
      height: 40px;
    }
  }

</style>