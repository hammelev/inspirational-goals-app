import { addListener, createListenerMiddleware } from "@reduxjs/toolkit";

import { listenForUpdatesToGoals } from "../features/goals/goals.middleware";
import type { AppDispatchType, RootStateType } from "./store";

export const listenerMiddleware = createListenerMiddleware();

export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootStateType,
  AppDispatchType
>();

export type startAppListeningType = typeof startAppListening;

export const addAppListener = addListener.withTypes<
  RootStateType,
  AppDispatchType
>();

listenForUpdatesToGoals(startAppListening);
