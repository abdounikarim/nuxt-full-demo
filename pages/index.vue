<script setup lang="ts">
const config = useRuntimeConfig()
const { data } = await useFetch(config.public.booksApiUrl + '/books');
let books = [];
if (data) {
  books = data.value['hydra:member'];
}
</script>

<template>
  <div>
    <Header />
    <div v-if="books">
      <h2>Books</h2>
      <ul>
        <li v-for="book in books" :key="book.book">
          {{ book.title }}
        </li>
      </ul>
    </div>
  </div>
</template>
