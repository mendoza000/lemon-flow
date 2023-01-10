<script setup lang="ts">
import { ref, onMounted } from "vue";
import { PlusCircleIcon } from "@heroicons/vue/24/solid";
import { useUiStore } from "@/stores/ui";
import History from "./components/History.vue";
import Stats from "./components/Stats.vue";
import TopBar from "./components/TopBar.vue";
import ModalAddMovement from "./components/ModalAddMovement.vue";
import { useLemonStore } from "./stores/lemon";

const uiStore = useUiStore();
const lemonStore = useLemonStore();

onMounted(() => {
  lemonStore.getMovements();
});
</script>

<template>
  <div
    class="flex flex-col items-center min-h-screen text-white bg-gradient-to-tr from-slate-800 to-slate-900"
  >
    <TopBar />
    <Stats />
    <button
      class="flex gap-2 px-5 py-2 mx-auto font-semibold text-black duration-200 bg-green-400 rounded-sm shadow-md item-center hover:bg-green-600 hover:scale-110 hover:rotate-3"
      @click="uiStore.showModalCreateMove"
    >
      <PlusCircleIcon class="h-7 w-7" />
      Agregar movimiento
    </button>

    <ModalAddMovement />

    <History />
  </div>
</template>

<style>
body {
  overflow-y: hidden;
}
</style>
