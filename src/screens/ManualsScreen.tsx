import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  LayoutAnimation,
} from "react-native";
import { MANUALS, Manual, ManualSection } from "../data/manuals";
import { Ionicons } from "@expo/vector-icons";

function SectionCard({
  section,
  accentColor,
}: {
  section: ManualSection;
  accentColor: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.sectionCard}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setExpanded((v) => !v);
        }}
        activeOpacity={0.7}
      >
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionEmoji}>{section.emoji}</Text>
          <Text style={styles.sectionTitle}>{section.title}</Text>
        </View>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={18}
          color="#6B7280"
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.sectionBody}>
          <Text style={styles.sectionContent}>{section.content}</Text>
          {section.tips && section.tips.length > 0 && (
            <View style={[styles.tipsBox, { borderLeftColor: accentColor }]}>
              <Text style={[styles.tipsLabel, { color: accentColor }]}>
                💡 Поради
              </Text>
              {section.tips.map((tip, i) => (
                <Text key={i} style={styles.tipText}>
                  • {tip}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

function CarrierBlock({ manual }: { manual: Manual }) {
  const [open, setOpen] = useState(true);

  return (
    <View style={styles.carrierBlock}>
      <TouchableOpacity
        style={[styles.carrierHeader, { backgroundColor: manual.color }]}
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setOpen((v) => !v);
        }}
        activeOpacity={0.85}
      >
        <Text style={styles.carrierEmoji}>{manual.logoEmoji}</Text>
        <Text style={styles.carrierName}>{manual.carrier}</Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={20}
          color="white"
        />
      </TouchableOpacity>

      {open && (
        <View style={styles.sectionsContainer}>
          {manual.sections.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              accentColor={manual.accentColor}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export default function ManualsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📚 Мануали</Text>
        <Text style={styles.headerSub}>Інструкції по відправці</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {MANUALS.map((manual) => (
          <CarrierBlock key={manual.id} manual={manual} />
        ))}
        <Text style={styles.footer}>
          Мануали містять загальну інформацію. Тарифи уточнюйте на офіційних
          сайтах перевізників.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#0F172A",
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "700" },
  headerSub: { color: "#64748B", fontSize: 13, marginTop: 2 },
  scroll: { padding: 16, gap: 16, paddingBottom: 32 },
  carrierBlock: {
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  carrierHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 16,
  },
  carrierEmoji: { fontSize: 22 },
  carrierName: { flex: 1, color: "white", fontSize: 17, fontWeight: "700" },
  sectionsContainer: { padding: 12, gap: 8 },
  sectionCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
  },
  sectionTitleRow: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
  sectionEmoji: { fontSize: 18 },
  sectionTitle: { fontSize: 15, fontWeight: "600", color: "#1F2937", flex: 1 },
  sectionBody: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 12,
    gap: 12,
  },
  sectionContent: { color: "#374151", fontSize: 14, lineHeight: 22 },
  tipsBox: {
    backgroundColor: "#FFFBEB",
    borderLeftWidth: 3,
    borderRadius: 8,
    padding: 12,
    gap: 6,
  },
  tipsLabel: { fontSize: 13, fontWeight: "700", marginBottom: 4 },
  tipText: { color: "#78350F", fontSize: 13, lineHeight: 20 },
  footer: {
    color: "#9CA3AF",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
});
