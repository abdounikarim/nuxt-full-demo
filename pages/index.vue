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
        <div v-for="book in books" :key="book.id" class="m-4">
          <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <!--<img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/docs/images/blog/image-4.jpg" alt="">-->
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ book.title }}</h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ book.id }}</p>
            </div>
          </a>
        </div>
      </div>
      <div v-else>
        <p>No books for now...</p>
      </div>
    </div>
  </div>
</template>
