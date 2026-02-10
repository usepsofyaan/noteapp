import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddNoteModal() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Oops", "Judul dan isi catatan wajib diisi");
      return;
    }

    // 🔜 nanti kita ganti ke AsyncStorage / DB
    console.log("NOTE BARU:", {
      title,
      content,
      createdAt: new Date().toISOString(),
    });

    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="close" size={26} color="#111827" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Tambah Catatan</Text>

          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveText}>Simpan</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <TextInput placeholder="Judul" style={styles.titleInput} value={title} onChangeText={setTitle} autoFocus />

          <TextInput placeholder="Tulis catatan di sini..." style={styles.contentInput} value={content} onChangeText={setContent} multiline textAlignVertical="top" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  saveText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6366F1",
  },
  form: {
    padding: 16,
  },
  titleInput: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#111827",
  },
  contentInput: {
    fontSize: 15,
    lineHeight: 22,
    color: "#374151",
    minHeight: 200,
  },
});
