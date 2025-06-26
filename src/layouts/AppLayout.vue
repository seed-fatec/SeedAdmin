<script setup lang="ts"></script>

<template>
  <div class="flex flex-row bg-gray-200 w-screen h-screen">
    <Sidebar />
    <div class="w-full flex flex-col p-4">
      <div
        class="bg-white w-full border border-gray-300 shadow-sm rounded-lg p-8"
      >
        <RouterView />
      </div>
    </div>
  </div>
</template>
