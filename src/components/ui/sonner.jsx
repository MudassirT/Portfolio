import { useTheme } from "next-themes";
import { Toaster , toast } from "sonner";


const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme }
      className="toaster group"
      toastOptions={{
        classNames,
          description,
          actionButton,
          cancelButton,
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
