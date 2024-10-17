import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const avatarBgColor = (initialChar?: string) => {
  // background colors map with alphabets
  const avatarBackgroundColorsMap = {
    A: "bg-blue-500",
    B: "bg-yellow-500",
    C: "bg-green-500",
    D: "bg-red-500",
    E: "bg-purple-500",
    F: "bg-indigo-500",
    G: "bg-pink-500",
    H: "bg-cyan-500",
    I: "bg-rose-500",
    J: "bg-emerald-500",
    K: "bg-orange-500",
    L: "bg-violet-500",
    M: "bg-lime-500",
    N: "bg-blue-500",
    O: "bg-yellow-500",
    P: "bg-green-500",
    Q: "bg-red-500",
    R: "bg-purple-500",
    S: "bg-indigo-500",
    T: "bg-pink-500",
    U: "bg-cyan-500",
    V: "bg-rose-500",
    W: "bg-emerald-500",
    X: "bg-orange-500",
    Y: "bg-violet-500",
    Z: "bg-lime-500",
  };
  return (
    avatarBackgroundColorsMap[
      initialChar as keyof typeof avatarBackgroundColorsMap
    ] || "bg-emerald-500"
  );
};
