import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function HomeScreen() {
  const router = useRouter();

  const [notes] = useState<Note[]>([
    {
      id: "1",
      title: "Catatan Pertama",
      content: "Ini adalah isi catatan pertama",
      createdAt: "10 Feb 2026",
    },
    {
      id: "2",
      title: "Belajar Expo Router",
      content: "Struktur app/ jauh lebih rapi",
      createdAt: "10 Feb 2026",
    },
  ]);

  const renderItem = ({ item }: { item: Note }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content} numberOfLines={2}>
        {item.content}
      </Text>
      <Text style={styles.date}>{item.createdAt}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Notes</Text>
      </View>

      {/* List Note */}
      <FlatList data={notes} keyExtractor={(item) => item.id} renderItem={renderItem} contentContainerStyle={{ padding: 16 }} ListEmptyComponent={<Text style={styles.emptyText}>Belum ada catatan</Text>} />

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push("/modal")} activeOpacity={0.8}>
        <MaterialIcons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F5",
  },
  header: {
    padding: 16,
    backgroundColor: "#6366F1",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  content: {
    marginTop: 6,
    fontSize: 14,
    color: "#4B5563",
  },
  date: {
    marginTop: 8,
    fontSize: 12,
    color: "#9CA3AF",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#9CA3AF",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#6366F1",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
});
