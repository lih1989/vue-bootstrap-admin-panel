<template>
  <div class="card text-white bg-dark sticky-top" style="top: 100px">
    <div class="card-header px-3 py-2">
      Фильтр
    </div>
    <div class="card-body px-3 py-2">
      <form>
        <filter-text-field @input="changeField"
                           v-model="fields.name"
                           field-name="Имя"
                           field-placeholder="Поиск по имени"/>
        <filter-text-field @input="changeField"
                           v-model="fields.phone"
                           field-name="Телефон"
                           field-placeholder="Поиск по номеру телефона"/>
        <button v-if="!isDefault" @click="reset"
                class="btn btn-secondary btn-block btn-sm">
          Сброс
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import FilterTextField from "@/components/filter/FilterTextField";
import lodashDebounce from 'lodash/debounce';

const defaultFields = function () {
  return {
    name: '',
    phone: ''
  }
};

export default {
  name: "FilterBlock",
  components: {FilterTextField},
  data() {
    return {
      fields: defaultFields()
    }
  },
  methods: {
    changeField() {
      this.debounceFilters();
    },
    debounceFilters: lodashDebounce(function () {
      this.$emit('change', this.fields);
    }, 500),
    reset() {
      this.fields = defaultFields();
      this.changeField();
    }
  },
  computed: {
    isDefault() {
      for (const key in defaultFields()) {
        if (defaultFields()[key] !== this.fields[key]) {
          return false
        }
      }
      return true
    }
  },
}
</script>