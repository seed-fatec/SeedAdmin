<template>
  <div
    class="animate-pulse overflow-hidden rounded-lg border border-gray-100 bg-white"
  >
    <div
      class="grid grid-cols-5 gap-4 bg-gray-100 p-4 text-sm font-medium text-gray-500"
    >
      <div class="h-4 w-16 rounded bg-gray-200"></div>
      <div class="h-4 w-40 rounded bg-gray-200"></div>
      <div class="h-4 w-64 rounded bg-gray-200"></div>
      <div class="h-4 w-20 rounded bg-gray-200"></div>
      <div class="h-4 w-16 rounded bg-gray-200"></div>
    </div>

    <div
      v-for="i in 6"
      :key="i"
      class="grid grid-cols-5 items-center gap-4 border-b border-gray-100 p-4 text-sm"
    >
      <div class="h-4 w-12 rounded bg-gray-100"></div>
      <div class="h-4 w-36 rounded bg-gray-100"></div>
      <div class="h-4 w-60 rounded bg-gray-100"></div>
      <div class="h-4 w-20 rounded bg-gray-100"></div>
      <div class="flex justify-start">
        <div class="h-6 w-6 rounded-md bg-gray-200"></div>
      </div>
    </div>
  </div>
</template>
