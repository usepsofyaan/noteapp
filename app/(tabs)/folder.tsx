import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../../services/firebaseConfig";

interface Folder {
  id: string;
  name: string;
}

export default function FolderScreen() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const snapshot = await getDocs(collection(db, "folders"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Folder[];

      setFolders(data);
    } catch (error) {
      console.log("Error fetch folder:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Folder }) => (
    <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: "/folder/[id]", params: { id: item.id } })}>
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  // 🔥 CONDITIONAL RENDER
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (folders.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Belum ada folder</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList data={folders} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },

  card: {
    padding: 16,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 12,
  },

  title: { fontSize: 16, fontWeight: "600" },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "gray",
  },
});
