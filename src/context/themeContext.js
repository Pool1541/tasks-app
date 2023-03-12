import { createContext, useState } from "react";

export const ThemeContext = createContext();

const schemes = {
  dark: {
    name: "dark",
    bg: "rgb(31, 32, 36)",
    bgHead: "rgb(31, 32, 36)",
    bgTask: "rgb(41, 42, 47)",
    bgOptions: "rgb(58, 59, 64)",
    title: "rgb(221, 221, 221)",
    paragraph: "rgb(141, 147, 154)",
    shadowOptions: "rgb(95 99 104 / 24%) 0px 0px 0px 3px",
  },
  light: {
    name: "light",
    bg: "rgb(225, 225, 225)",
    bgHead: "rgb(255,255,255)",
    bgTask: "rgb(255,255,255)",
    bgOptions: "rgb(255,255,255)",
    title: "rgb(59, 61, 63)",
    paragraph: "rgb(141, 147, 154)",
    shadowOptions: "rgb(95 99 104 / 24%) 0px 0px 0px 3px",
  },
};

export function ThemeContextProvider(props) {
  const savedTheme = JSON.parse(localStorage.getItem("theme")) || schemes.light;
  const [theme, setTheme] = useState(savedTheme);

  function changeTheme() {
    setTheme(theme.name === "light" ? schemes.dark : schemes.light);
    localStorage.setItem(
      "theme",
      JSON.stringify(theme.name === "light" ? schemes.dark : schemes.light)
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
