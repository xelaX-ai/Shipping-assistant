import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: "" };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ errorInfo: info.componentStack || "" });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>⚠️ Помилка застосунку</Text>
            <Text style={styles.subtitle}>
              Скопіюй текст нижче і відправ розробнику
            </Text>
          </View>
          <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.label}>Помилка:</Text>
            <Text style={styles.errorText}>
              {this.state.error?.toString() ?? "Невідома помилка"}
            </Text>
            {this.state.errorInfo ? (
              <>
                <Text style={styles.label}>Stack trace:</Text>
                <Text style={styles.stackText}>{this.state.errorInfo}</Text>
              </>
            ) : null}
          </ScrollView>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.setState({ hasError: false, error: null, errorInfo: "" })
            }
          >
            <Text style={styles.buttonText}>Спробувати знову</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    color: "#F87171",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 13,
  },
  scroll: {
    flex: 1,
    backgroundColor: "#1E293B",
    borderRadius: 10,
    marginBottom: 16,
  },
  scrollContent: {
    padding: 14,
    gap: 8,
  },
  label: {
    color: "#64748B",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    marginTop: 8,
    marginBottom: 4,
  },
  errorText: {
    color: "#F87171",
    fontSize: 13,
    fontFamily: "monospace",
    lineHeight: 20,
  },
  stackText: {
    color: "#CBD5E1",
    fontSize: 11,
    fontFamily: "monospace",
    lineHeight: 18,
  },
  button: {
    backgroundColor: "#E8003D",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
});
