<script setup lang="ts">
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
const { message } = defineProps(["message"]);
</script>

<template>
  <div
    class="flex gap-2 px-3 py-5 bg-yellow-400 border-[3px] border-yellow-400 shadow-md bg-opacity-60 rounded-xl"
  >
    <ExclamationTriangleIcon class="w-6 h-6" />
    <p class="font-semibold">
      {{ message }}
    </p>
  </div>
</template>
