<script setup>

</script>

<template>
  <div class="default-layout">
    <div class="default-layout__container">
      <slot></slot>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  min-height: 100vh;

  &__container {
    position: relative;
    padding: 12px;
    margin: 12px auto;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 719px;
    background: var(--bg-white);
    border-radius: 24px;
  }

  @media (min-width: 768px) {
    &__container {
      padding: 32px;
      margin: 24px auto;
      max-width: 730px;
    }
  }
}

</style>
