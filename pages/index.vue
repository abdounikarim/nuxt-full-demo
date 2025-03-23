<script setup lang="ts">
const config = useRuntimeConfig()
const { data } = await useFetch(config.public.booksApiUrl + '/books');
</script>

<template>
  <div>
    <Header />
    <pre>{{ data }}</pre>
  </div>
</template>
