<template>
  <div>
    <h2>Профиль пользователя</h2>
    <p>Информация о пользователе: {{$store.getters['userInfo']}}</p>
  </div>
</template>

<script>
export default {
  name: "Profile"
}
</script>