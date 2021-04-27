import { extendTheme } from "@chakra-ui/react"

const colors = {
  primary: {
    100: "#4686C2",
    200: "#3A77B0",
    300: "#33699C",
    400: "#2D5D8A",
    500: "#28527A",
    600: "#23476A",
    700: "#1E3E5C",
    800: "#1A3650",
    900: "#172F46",
  },
  secondary: {
    100: "#FFFFFF",
    200: "#F7FBFC",
    300: "#CEE6EC",
    400: "#AAD4DD",
    500: "#8AC4D0",
    600: "#6AB4C3",
    700: "#4EA6B8",
    800: "#4192A3",
    900: "#397F8E",
  },
  highlight: {
    100: "#FFFFFF",
    200: "#FEFAED",
    300: "#FAEAB8",
    400: "#F7DD89",
    500: "#F4D160",
    600: "#F1C537",
    700: "#EEBB13",
    800: "#D1A30F",
    900: "#B68E0D",
  },
  sidenote: {
    100: "#FFFFFF",
    200: "#FFFFFF",
    300: "#FFFFFF",
    400: "#FEF9E0",
    500: "#FBEEAC",
    600: "#F8E378",
    700: "#F6DA4B",
    800: "#F4D223",
    900: "#E7C30C",
  },
}

const getfitrTheme = extendTheme({ colors })

export default getfitrTheme
