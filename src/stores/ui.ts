import { defineStore } from "pinia";
import { reactive } from "vue";

interface uiView {
  modalCreateMove: boolean;
  modalHistory: boolean;
}

export const useUiStore = defineStore("ui", () => {
  const uiViews = reactive<uiView>({
    modalCreateMove: false,
    modalHistory: false,
  });

  const showModalCreateMove = () => {
    uiViews.modalCreateMove = !uiViews.modalCreateMove;
  };

  const showModalHistory = () => {
    uiViews.modalHistory = !uiViews.modalHistory;
  };

  return { uiViews, showModalCreateMove, showModalHistory };
});
