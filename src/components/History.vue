<script setup lang="ts">
import { ref, watch } from "vue";
import { TrashIcon } from "@heroicons/vue/24/outline";
import { useLemonStore } from "@/stores/lemon";
import { useUiStore } from "@/stores/ui";
import { useToast } from "vue-toastification";
import Alert from "./ui/Alert.vue";

const lemonStore = useLemonStore();
const uiStore = useUiStore();
const toast = useToast();
const historyPosition = ref("-bottom-[90%]");
const showAlert = ref(true);

const changeViewHistory = () => {
  switch (historyPosition.value) {
    case "-bottom-[90%]":
      historyPosition.value = "-bottom-[0%]";
      break;
    case "-bottom-[0%]":
      historyPosition.value = "-bottom-[90%]";
      break;
  }

  uiStore.showModalHistory();
};

const defineAmountColor = (amount: number) => {
  if (amount > 0) {
    return "text-green-400";
  } else {
    return "text-red-400";
  }
};

const handleDelete = (id: string) => {
  lemonStore.deleteMovement(id);
  toast.success("Movimiento eliminado! ✨");
  changeShowAlert();
};

const changeShowAlert = () => {
  if (lemonStore.movements.length <= 0) {
    showAlert.value = true;
  } else {
    showAlert.value = false;
  }
};

watch(
  uiStore.uiViews,
  () => {
    changeShowAlert();
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div
    class="absolute flex flex-col items-center min-h-screen duration-300 bg-gray-900 rounded-3xl min-w-[22rem] md:min-w-[30rem] mx-auto lg:min-w-[40rem]"
    :class="historyPosition"
  >
    <button
      class="min-w-[50%] max-h-2 min-h-2 bg-slate-600 rounded-full opacity-70 mt-5 text-transparent text-xs shadow-2xl animate-bounce"
      @click="changeViewHistory"
    >
      -
    </button>

    <h2 class="mt-12 mb-10 text-2xl font-bold">Historial de movimientos</h2>

    <Alert v-show="showAlert" message="No hay movimientos registrados!" />

    <div class="flex flex-col items-center min-w-full gap-4 px-5">
      <div
        class="flex items-center justify-around min-w-full py-2 duration-200 rounded-md shadow-xl bg-slate-800 bg-opacity-80 hover:scale-105"
        v-for="e in lemonStore.movements"
      >
        <h3 class="text-xl font-semibold min-w-[8rem]">{{ e.title }}</h3>
        <div class="flex items-center gap-3">
          <span :class="defineAmountColor(e.amount)">${{ e.amount }}</span>
          <button
            class="p-1 duration-200 bg-yellow-500 rounded-md shadow-md hover:bg-red-500"
            @click="handleDelete(e.id)"
          >
            <TrashIcon class="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
