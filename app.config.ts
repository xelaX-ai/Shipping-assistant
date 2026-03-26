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
  plugins: ["expo-router", "expo-asset"],
  experiments: {
    baseUrl: "/Shipping-assistant",
  },
  scheme: "shipping-assistant",
  extra: {
    GEMINI_API_KEY: process.env.OPENROUTER_API_KEY,
  },
};

export default config;
