<template>
  <div class="text-center m-auto py-3" style="max-width: 300px">
    <h1 class="h3 mb-3 font-weight-normal">Ошибка 404</h1>
    <button class="btn btn-lg btn-primary btn-block btn-sm"
            @click="$router.push('/')"
            type="submit">
      На главную
    </button>
  </div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>