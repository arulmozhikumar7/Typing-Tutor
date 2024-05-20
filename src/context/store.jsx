import { create } from "zustand";
import { getHighScore, saveHighScore } from "../Auth/firebaseConfig";
const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  text: "",
  setText: (text) => set({ text }),
  points: 0,
  setPoints: (points) => set({ points }),
  currentpoint: 0,
  setCurrentpoint: (currentpoint) => set({ currentpoint }),
  index: Math.floor(Math.random() * 178187),
  setIndex: (index) => set({ index }),
  count: 60,
  setCount: (count) => set({ count }),
  isRunning: false,
  setIsRunning: (isRunning) => set({ isRunning }),
  best: 0,
  setBest: (best) => set({ best }),
  saveHighScore: async (userId, score) => {
    try {
      await saveHighScore(userId, score);
      set({ best: score });
    } catch (e) {
      console.error(e);
    }
  },
  getHighScore: async (userId) => {
    try {
      const highScore = await getHighScore(userId);
      set({ best: highScore });
    } catch (e) {
      console.error(e);
    }
  },
}));

export default useStore;
