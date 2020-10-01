<template>
  <div class="form-group input-group-sm">
    <label>{{ fieldName }}</label>
    <input :value="value"
           @input="handleInput"
           type="text"
           class="form-control"
           :placeholder="fieldPlaceholder">
    <small v-if="fieldDesc" class="form-text text-muted">{{ fieldDesc }}</small>
  </div>
</template>

<script>
export default {
  name: "FilterField",
  props: {
    value: {},
    fieldName: {
      required: true
    },
    fieldDesc: {
      default: ''
    },
    fieldPlaceholder: {
      default: ''
    }
  },
  methods: {
    handleInput(event) {
      this.$emit("input", event.target.value);
    }
  }
}
</script>