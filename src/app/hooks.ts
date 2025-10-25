import { useStore, useDispatch, useSelector } from 'react-redux';

import type { AppDispatchType, RootStateType, AppStoreType } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatchType>();
export const useAppSelector = useSelector.withTypes<RootStateType>();
export const useAppStore = useStore.withTypes<AppStoreType>();