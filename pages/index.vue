<script setup lang="ts">
import type { Phone } from "~/types/Phone";
const config = useRuntimeConfig()
await useFetch(config.public.bilemoApiUrl + '/login_check', {
  method: 'POST',
  body: {
    username: 'sfr',
    password: 'pass'
  },
  onResponse({ response }) {
    localStorage.setItem('token', response._data.token)
  },
})

let phones: Phone[] = [];

await useFetch<{'member': Phone[]}>(config.public.bilemoApiUrl + '/phones', {
  method: 'GET',
  onRequest({ options }) {
    options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  },
  onResponse({ response }) {
    phones = response._data.member;
  },
})
</script>

<template>
  <div>
    <Header />
    <div v-if="phones.length > 0">
      <h2>Phones</h2>
      <div v-for="phone in phones" :key="phone.id">
        <h3>{{ phone.name }}</h3>
        <p>{{ phone.price }}€</p>
      </div>
    </div>
  </div>
</template>
