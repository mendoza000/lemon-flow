<script setup lang="ts">
import { watch, onMounted } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { reactive, ref } from "vue";
import { useLemonStore } from "@/stores/lemon";
import { useUiStore } from "@/stores/ui";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const lemonStore = useLemonStore();
const uiStore = useUiStore();
let data = reactive<any>([]);
const totalAmount = ref(0);
// lemonStore.addMovement(100, "", "Carro", "ingreso");

const update = () => {
  totalAmount.value = 0;
  data = [];
  lemonStore.movements.map((e, i) => {
    data[i] = e.amount;
    totalAmount.value = totalAmount.value + e.amount;
  });
};

onMounted(() => {
  setTimeout(() => {
    update();
  }, 300);
});

watch(
  uiStore.uiViews,
  () => {
    update();
    // console.log(uiStore.uiViews);
  },
  { deep: true, immediate: true }
);

watch(
  lemonStore.movements,
  () => {
    update();
    // console.log(lemonStore.movements);
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div class="flex flex-col items-center my-10">
    <h2 class="text-3xl font-bold">Ahorros totales</h2>
    <span class="mb-5 text-2xl font-semibold text-yellow-400"
      >${{ totalAmount }}</span
    >
    <Bar
      id="total"
      :options="{
        responsive: true,
        color: 'transparent',
        backgroundColor: '#ffeb3b',
        borderColor: '#fff',
      }"
      :data="{
        labels: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ],
        datasets: [{ data }],
      }"
      style="position: relative"
    />
  </div>
</template>
