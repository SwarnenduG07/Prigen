import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="bg-emerald-400 dark:bg-gray-700"
    >
      {theme === "light" ? "Switch to dark Mode" : "Switch to Light Mode"}
    </Switch>
  );
};

export default ThemeToggle;
