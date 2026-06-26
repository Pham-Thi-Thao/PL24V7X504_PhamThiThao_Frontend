<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      placeholder="Nhập từ khóa cần tìm"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="button">
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
  emits: ["update:modelValue"],
};
</script>