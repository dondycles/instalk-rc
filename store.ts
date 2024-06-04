import { persist } from "zustand/middleware";
import { create } from "zustand";
import { user } from "./lib/global";

type CurrentUser = {
  data: user | null;
  setData: (data: user) => void;
};

export const useCurrentUserData = create<CurrentUser>()(
  persist(
    (set) => ({
      data: null,
      setData: (data) => set(() => ({ data: data })),
    }),
    { name: "current-user" }
  )
);
