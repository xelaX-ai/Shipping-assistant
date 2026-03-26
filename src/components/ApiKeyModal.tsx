import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  loadSlots,
  saveSlots,
  loadActiveIndex,
  saveActiveIndex,
  KeySlot,
} from "../utils/keyStorage";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function ApiKeyModal({ visible, onClose }: Props) {
  const [slots, setSlots] = useState<KeySlot[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (visible) {
      setSlots(loadSlots());
      setActiveIndex(loadActiveIndex());
    }
  }, [visible]);

  const updateKey = (index: number, value: string) => {
    const updated = slots.map((s, i) => (i === index ? { ...s, key: value } : s));
    setSlots(updated);
  };

  const updateLabel = (index: number, value: string) => {
    const updated = slots.map((s, i) => (i === index ? { ...s, label: value } : s));
    setSlots(updated);
  };

  const save = () => {
    saveSlots(slots);
    saveActiveIndex(activeIndex);
    onClose();
  };

  const filledCount = slots.filter((s) => s.key.trim()).length;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>⚙️ API Ключі</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={22} color="#64748B" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Додано ключів: {filledCount}/5 · Активний: Акаунт {activeIndex + 1}
          </Text>

          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            {slots.map((slot, i) => (
              <View key={i} style={styles.slot}>
                <View style={styles.slotHeader}>
                  <TouchableOpacity
                    style={[
                      styles.radioButton,
                      activeIndex === i && styles.radioButtonActive,
                    ]}
                    onPress={() => setActiveIndex(i)}
                  >
                    <View style={activeIndex === i ? styles.radioDot : null} />
                  </TouchableOpacity>
                  <TextInput
                    style={styles.labelInput}
                    value={slot.label}
                    onChangeText={(v) => updateLabel(i, v)}
                    placeholder={`Акаунт ${i + 1}`}
                    placeholderTextColor="#94A3B8"
                  />
                  {slot.key.trim() ? (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>✓</Text>
                    </View>
                  ) : null}
                </View>
                <TextInput
                  style={styles.keyInput}
                  value={slot.key}
                  onChangeText={(v) => updateKey(i, v)}
                  placeholder="AIza..."
                  placeholderTextColor="#475569"
                  secureTextEntry={Platform.OS !== "web"}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            ))}
          </ScrollView>

          <Text style={styles.hint}>
            Отримати ключ безкоштовно: aistudio.google.com/app/apikey
          </Text>

          <TouchableOpacity style={styles.saveButton} onPress={save}>
            <Text style={styles.saveButtonText}>Зберегти</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modal: {
    backgroundColor: "#0F172A",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 480,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  title: { color: "white", fontSize: 18, fontWeight: "700" },
  subtitle: { color: "#64748B", fontSize: 12, marginBottom: 16 },
  scroll: { maxHeight: 380 },
  slot: {
    backgroundColor: "#1E293B",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  slotHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#475569",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonActive: { borderColor: "#16A34A" },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#16A34A",
  },
  labelInput: {
    flex: 1,
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  badge: {
    backgroundColor: "#16A34A",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: { color: "white", fontSize: 11, fontWeight: "700" },
  keyInput: {
    backgroundColor: "#0F172A",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "#94A3B8",
    fontSize: 13,
    fontFamily: "monospace",
  },
  hint: {
    color: "#475569",
    fontSize: 11,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: "#16A34A",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
  },
  saveButtonText: { color: "white", fontSize: 15, fontWeight: "700" },
});
