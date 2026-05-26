import { useTheme } from "next-themes";
import { Toaster } from "sonner";
import { toast } from "sonner";

const Sonner = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return <Toaster theme={theme} {...props} />;
};

export { Sonner, toast };
