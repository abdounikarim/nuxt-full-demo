<script setup lang="ts">
import type { BookJsonld, ApiBooksGetCollection200View } from "~/types/bookJsonld";
const config = useRuntimeConfig()
const route = useRoute()

const currentPage = computed(() => route.query.page ? parseInt(route.query.page as string) : 1)

const { data, pending, error } = await useFetch<{'member': BookJsonld[], 'view': ApiBooksGetCollection200View}>(
    () => `${config.public.bilemoApiUrl}/books?page=${currentPage.value}`,
    {
      // Key is used to force refresh
      key: () => `books-page-${currentPage.value}`,
    }
)

function extractPageWithURLSearchParams(url: string) {
  try {
    const urlObj = new URL(url, config.public.bilemoApiUrl); // Base URL for relative URLs
    const page = urlObj.searchParams.get('page') || '';
    return parseInt(page);
  } catch {
    return 1;
  }
}

const books = computed<BookJsonld[]>(() => data.value?.member || [])
const pagination = computed<ApiBooksGetCollection200View>(() => data.value?.view || {})
const lastPage = extractPageWithURLSearchParams(pagination.value.last);

</script>

<template>
  <div>
    <Header />
    <div>
      <div v-if="pending">
        <p>Pending...</p>
      </div>
      <div v-else-if="error">
        <p>Error while fetching books</p>
      </div>
      <div v-else-if="books.length > 0">
        <h2>Books</h2>
        <div v-for="book in books" :key="book.id" class="m-4">
          <a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
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

    <nav aria-label="Page navigation example">
      <ul class="flex justify-center items-center -space-x-px h-10 text-base">
        <li>
          <NuxtLink :to="currentPage > 1 ? '/?page=' + (currentPage - 1) : '#'" class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span class="sr-only">Previous</span>
            <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
          </NuxtLink>
        </li>
        <li v-for="page in lastPage" :key="page">
          <NuxtLink :to="'/?page=' + page" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{ page }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="currentPage < lastPage ? '/?page=' + (currentPage + 1) : '#'" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span class="sr-only">Next</span>
            <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
