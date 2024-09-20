<script  setup>
const emits = defineEmits(['close']);

function onClose() {
  emits('close')
}
</script>

<template>
  <ClientOnly>
    <Teleport to="#teleports">
      <div class="modal-wrapper">
        <div class="modal">
          <div v-click-outside="onClose" class="modal__content">
            <h2 v-if="$slots.header" class="modal__title">
              <slot name="header"></slot>
            </h2>
            <slot></slot>
            <div v-if="$slots.footer" class="modal__actions">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
  
</template>

<style lang="scss" scoped>
.modal-wrapper {
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.36);

  &__content {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    flex-grow: 1;
    height: max-content;
    max-width: 320px;
    border-radius: 8px;  
    background: var(--color-white);
  }

  &__title {
    padding: 0.5rem;
    font-size: 24px;
    line-height: 1.2;
  }

  &__actions {
    display: inline-flex;
    width: 100%;
    gap: 12px;
  }

  @media (min-width: 768px) {
    &__content {
      padding: 2rem;
    }
  }
}
</style>