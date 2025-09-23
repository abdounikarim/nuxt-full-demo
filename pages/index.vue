<script setup lang="ts">
import type { BookJsonld } from "~/types/bookJsonld";
const config = useRuntimeConfig()

let books: BookJsonld[] = [];
await useFetch<{'member': BookJsonld[]}>(config.public.bilemoApiUrl + '/books', {
  method: 'GET',
  onResponse({ response }) {
    books = response._data.member;
  },
})

</script>

<template>
  <div>
    <Header />
    <div>
      <div v-if="books.length > 0">
        <h2>Books</h2>
        <div v-for="book in books" :key="book.id">
          <h3>{{ book.title }}</h3>
          <p>{{ book.id }}</p>
        </div>
      </div>
      <div v-else>
        <p>No books for now...</p>
      </div>
    </div>
  </div>
</template>
