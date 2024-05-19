import { create } from "zustand";

const useStore = create((set) => ({
  text: "",
  setText: (text) => set({ text }),
  points: 0,
  setPoints: (points) => set({ points }),
  index: Math.floor(Math.random() * 178187),
  setIndex: (index) => set({ index }),
  count: 10,
  setCount: (count) => set({ count }),
  isRunning: false,
  setIsRunning: (isRunning) => set({ isRunning }),
}));

export default useStore;
