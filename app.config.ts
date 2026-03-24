import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Shipping Assistant",
  slug: "shipping-assistant",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    backgroundColor: "#0F172A",
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#0F172A",
    },
    package: "com.yourcompany.shippingassistant",
  },
  web: {
    bundler: "metro",
    output: "single",
    favicon: "./assets/favicon.png",
  },
  plugins: ["expo-router", "expo-asset"],
  scheme: "shipping-assistant",
  extra: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
};

export default config;
