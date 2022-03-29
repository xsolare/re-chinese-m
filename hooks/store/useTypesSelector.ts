import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../store/index";

export const useTypesSelector: TypedUseSelectorHook<RootState> = useSelector;
