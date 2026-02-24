import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../../services/firebaseConfig";

export default function DetailNote() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      if (!id) return;

      const docRef = doc(db, "notes", id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setNote({ id: docSnap.id, ...docSnap.data() });
      }

      setLoading(false);
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  if (!note) {
    return <Text style={{ textAlign: "center", marginTop: 50 }}>Note tidak ditemukan</Text>;
  }

  const createdDate = note.createdAt?.toDate ? note.createdAt.toDate() : new Date(note.createdAt);

  const formattedDate = createdDate.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = createdDate.toLocaleTimeString("id-ID");

  const characterCount = note.content.length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="close" size={26} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Tambah Catatan</Text>
      </View>

      <Text style={styles.title}>{note.title}</Text>

      <Text style={styles.date}>
        {formattedDate} • {formattedTime}
      </Text>

      <Text style={styles.character}>Jumlah karakter: {characterCount}</Text>

      <Text style={styles.content}>{note.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  character: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});
