import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null; 

  return (
    <Switch onClick={toggleTheme} className="dark:bg-emerald-400">
      {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </Switch>
  );
};

export default ThemeToggle;
