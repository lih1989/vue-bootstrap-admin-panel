<template>
  <div>
    <nav style="height: 50px" class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-1 m-0 shadow">
      <button class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              @click="toggleSidebar"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link class="navbar-brand pl-2" :to="{name: 'home'}">
        AdminPanel
      </router-link>
      <div class="ml-auto">
        <ul class="navbar-nav flex-row">
          <li class="nav-item mx-1 pa-1">
            <router-link class="nav-link" v-if="$store.getters['userInfo']" :to="{name: 'profile'}">
              {{ $store.getters['userInfo'].name }}
            </router-link>
          </li>
          <li class="nav-item mx-1">
            <a @click.stop="logout"
               class="nav-link">
              Выход
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="wrapper">
      <!-- Sidebar  -->
      <nav id="sidebar">
        <div style="position: sticky;top: 50px;">
          <div class="sidebar-header d-flex">
            <div class="m-auto p-1">
              <img src="@/assets/logo.png" width="50px"/>
            </div>
          </div>

          <ul class="list-unstyled">
            <template v-for="(item, index) of menuList">
              <sidebar-item :item="item" :key="index"/>
            </template>
          </ul>
        </div>
      </nav>

      <!-- Page Content  -->
      <div id="content">
        <div v-if="$route.meta && $route.meta.breadcrumbs && $route.meta.breadcrumbs.length"
             style="position: sticky;top: 50px;" class="breadcrumb-sticky bg-light pt-2 pb-2 mb-3 border-bottom">
          <nav class="px-3" aria-label="breadcrumb">
            <ol class="breadcrumb p-1 mb-0 bg-transparent">
              <li class="breadcrumb-item"
                  :class="[...(item.toName === $route.name)&&['active']]"
                  v-for="(item, index) of $route.meta.breadcrumbs"
                  :key="index">
                <router-link v-if="item.toName && item.toName !== $route.name" :to="{name: item.toName}">
                  {{ item.title }}
                </router-link>
                <template v-else>
                  {{ item.title }}
                </template>
              </li>
            </ol>
          </nav>
        </div>
        <!-- Sub View  -->
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarItem from "@/components/SidebarItem";
export default {
  name: 'AdminPanel',
  components: {SidebarItem},
  data() {
    return {
      menuList: [
        {
          title: 'Главная',
          to: {name: 'home'}
        },
        {
          title: 'CRM',
          children: [
            {
              title: 'Контакты',
              to: {name: 'contacts'}
            },
          ]
        }
      ]
    }
  },
  methods: {
    toggleSidebar() {
      document.getElementById('sidebar').classList.toggle('active');
    },
    logout(){
      this.$store.dispatch('logout').then(() => {
        this.$router.push({name: 'Auth'});
      });
    }
  },
}
</script>