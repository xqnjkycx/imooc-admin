import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      sidebarOpened: true,
    };
  },
  actions: {
    triggerSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened;
    },
  },
});
