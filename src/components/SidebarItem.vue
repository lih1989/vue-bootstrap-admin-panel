<template>
  <li :class="[...(item.to && item.to.name === $route.name) && ['active']]">
    <router-link
        class="px-3" v-if="item.to" :to="item.to">{{ item.title }}
    </router-link>
    <a v-else
       data-toggle="collapse" aria-expanded="false"
       class="dropdown-toggle px-3"
       @click.stop="subMenuToggle">
      {{ item.title }}
    </a>

    <template v-if="item.children && subVisible">
      <ul class="list-unstyled">
        <li v-for="(sub_item, sub_index) of item.children"
            :key="sub_index"
            :class="[...(sub_item.to && sub_item.to.name === $route.name)&&['active']]">
          <router-link :to="sub_item.to">{{ sub_item.title }}</router-link>
        </li>
      </ul>
    </template>
  </li>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      subVisible: false
    }
  },
  methods: {
    subMenuToggle() {
      this.subVisible = !this.subVisible;
    }
  },
}
</script>