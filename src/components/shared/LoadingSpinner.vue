<template>
  <div class="loading-wrapper">
    <div class="loading-spinner" :class="loadingClass">
      <svg class="circular" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none"></circle>
      </svg>
    </div>   
  </div>
</template>

<script setup>

const props = defineProps({
  size: {
    type: String,
    default: 's'
  }
})

const loadingClass = computed(() => {
  return {
    [`loading-spinner_size--${props.size}`]: true
  }
})
</script>

<style lang="scss" scoped>
.loading-wrapper {
  position: relative;
}

.loading-mask {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
  margin: 0;
}

.loading-spinner {
  margin-top: calc((0px - var(--loading-spinner-size)) / 2);
  position: absolute;
  text-align: center;
  top: 50%;
  width: 100%;

  &_size--s {
    --loading-spinner-size: 24px
  }

  &_size--m {
    --loading-spinner-size: 36px
  }

  &_size--l {
    --loading-spinner-size: 48px
  }

  .circular {
    animation: spinner-rotate 2s linear infinite;
    display: inline;
    height: var(--loading-spinner-size);
    width: var(--loading-spinner-size);

    @keyframes spinner-rotate{
      to{transform:rotate(1turn)}
    }

    .path {
      animation: loading-dash 1.5s ease-in-out infinite;
      stroke-dasharray: 90, 150;
      stroke-dashoffset: 0;
      stroke-width: 2;
      stroke: var(--color-primary);
      stroke-linecap: round;
    }
  }
}

</style>