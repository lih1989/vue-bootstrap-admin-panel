<template>
  <div class="d-flex flex-wrap-reverse justify-content-center">
    <div style="flex: 1">
      <h3>
        Список контактов
      </h3>
      <div class="table-responsive">
        <table class="table table-bordered table-striped ">
          <thead>
          <tr>
            <th class="text-center">#</th>
            <th>ФИО</th>
            <th>Телефон</th>
          </tr>
          </thead>
          <tbody>
          <template v-if="list.length">
            <tr :style="{...(loading)&&{filter: 'blur(2px)'}}" v-for="(item, index) in list" :key="index">
              <th class="text-center" scope="row">{{ index + 1 }}</th>
              <td>{{ item.fullName }}</td>
              <td>{{ item.phone }}</td>
            </tr>
          </template>
          <template v-else-if="!list.length && loading">
            <tr>
              <td colspan="99">
                <spinner color="var(--bg-first-color)"/>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="99" class="text-muted text-center">
                Нет данных
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="ml-2" style="width: 250px; position: relative">
      <filter-block @change="fetchContacts"/>
    </div>
  </div>
</template>

<script>
import {contactsRequest} from '@/api/api'
import Spinner from "@/components/Spinner";
import FilterBlock from "@/components/filter/Filter";

export default {
  name: "Contacts",
  components: {FilterBlock, Spinner},
  data() {
    return {
      loading: false,
      list: []
    }
  },
  methods: {
    fetchContacts(filters={name: '', phone: ''}) {
      this.loading = true;
      contactsRequest(filters).then((result) => {
        this.list = result.list;
      }).finally(() => {
        this.loading = false;
      });
    }
  },
  mounted() {
    this.fetchContacts();
  }
}
</script>