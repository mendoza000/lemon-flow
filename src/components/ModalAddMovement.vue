<script lang="ts" setup>
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { useLemonStore } from "@/stores/lemon";
import { useUiStore } from "@/stores/ui";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import "animate.css";

const toast = useToast();
const lemonStore = useLemonStore();
const uiStore = useUiStore();

const title = ref("");
const amount = ref("");
const description = ref("");
const type = ref("ingreso");

const handleSubmit = () => {
  if (title.value == "") {
    toast.error("Debes ingresar un titulo!");
    return;
  }
  if (amount.value == "") {
    toast.error("Debes ingresar un monto!");
    return;
  }

  const intAmount = parseInt(amount.value);

  lemonStore.addMovement(intAmount, description.value, title.value, type.value);
  toast.success("Agregando movimiento ✨");

  title.value = "";
  amount.value = "";
  description.value = "";
};

const handleCloseModal = () => {
  uiStore.showModalCreateMove();
};
</script>

<template>
  <Transition>
    <div
      class="absolute z-10 flex flex-col items-center justify-center min-w-full min-h-screen bg-gray-900 bg-opacity-80 animate__animated animate__faster"
      v-show="uiStore.uiViews.modalCreateMove"
    >
      <div
        class="min-w-[21rem] bg-gray-800 flex flex-col items-center rounded-xl shadow-xl py-8 gap-3 px-6 z-20 relative"
      >
        <button
          class="absolute p-1 duration-200 bg-yellow-500 rounded-md shadow-xl top-3 right-3 hover:bg-red-500"
          @click="handleCloseModal"
        >
          <XMarkIcon class="w-5 h-5 text-black" />
        </button>

        <h2 class="text-2xl font-bold">Nuevo movimiento</h2>
        <label class="flex flex-col min-w-full gap-2 font-semibold">
          Titulo:
          <input
            type="text"
            class="font-normal bg-slate-900 bg-opacity-20 border-[3px] rounded-md outline-none border-slate-900 py-1 px-3 border-opacity-80 focus:border-yellow-500 duration-200"
            placeholder="e.g Compra de telefono"
            v-model="title"
          />
        </label>
        <label
          class="flex flex-col min-w-full gap-2 font-semibold appearance-none"
        >
          Monto:
          <input
            type="number"
            class="font-normal bg-slate-900 bg-opacity-20 border-[3px] rounded-md outline-none border-slate-900 py-1 px-3 border-opacity-80 focus:border-yellow-500 duration-200 appearance-none"
            placeholder="e.g 120"
            v-model="amount"
          />
        </label>
        <label
          class="flex flex-col min-w-full gap-2 font-semibold appearance-none"
        >
          Descripcion:
          <textarea
            type="number"
            class="font-normal bg-slate-900 bg-opacity-20 border-[3px] rounded-md outline-none border-slate-900 py-1 px-3 border-opacity-80 focus:border-yellow-500 duration-200 appearance-none resize-none min-h-[10rem]"
            placeholder="e.g Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in luctus neque."
            v-model="description"
          />
        </label>

        <div
          class="grid items-center justify-center min-w-full grid-cols-2 gap-2"
        >
          <div
            class="flex items-center min-w-full pl-4 border-[3px] rounded-md border-slate-900 border-opacity-80"
          >
            <input
              id="bordered-radio-1"
              type="radio"
              value="ingreso"
              name="bordered-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              checked
              v-model="type"
            />
            <label
              for="bordered-radio-1"
              class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Ingreso</label
            >
          </div>
          <div
            class="flex items-center pl-4 border-[3px] rounded-md border-slate-900 border-opacity-80"
          >
            <input
              id="bordered-radio-2"
              type="radio"
              value="gasto"
              name="bordered-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              v-model="type"
            />
            <label
              for="bordered-radio-2"
              class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Gasto</label
            >
          </div>
        </div>

        <button
          class="px-8 py-2 mt-5 font-semibold text-black duration-200 bg-yellow-400 rounded-md shadow-xl text-md hover:scale-110 hover:rotate-3 hover:bg-yellow-500"
          @click="handleSubmit"
        >
          Agregar movimiento
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s linear;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
