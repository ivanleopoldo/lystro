import { Toaster as BaseToaster } from "sonner-native";
import { cssInterop } from "nativewind";

const Toaster = cssInterop(BaseToaster, {
  toastClassName: {
    target: "toastOptions.style",
  },
});

export { Toaster };
