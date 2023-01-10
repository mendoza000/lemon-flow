import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

interface Move {
  amount: number;
  title: string;
  description: string;
  id: string;
  date: Date;
  type: string;
}

export const useLemonStore = defineStore("lemon", () => {
  let movements = ref<Move[]>([]);

  const deleteMovement = (id: string) => {
    movements.value = movements.value.filter((e) => e.id !== id);
    saveMovements();
    // console.log(movements.value);
  };

  const addMovement = (
    amount: number,
    description: string,
    title: string,
    type: string
  ) => {
    const data = {
      amount,
      title,
      description,
      id: uuidv4(),
      date: new Date(),
      type: type,
    };

    movements.value.push(data);
    saveMovements();
  };

  const saveMovements = () => {
    localStorage.setItem("lf-movements", JSON.stringify(movements.value));
  };

  const getMovements = () => {
    const x = localStorage.getItem("lf-movements");
    if (x !== null) {
      movements.value = JSON.parse(x);
    }
  };

  return { movements, addMovement, deleteMovement, getMovements };
});
