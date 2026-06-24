import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSignup = () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("모든 항목을 입력해주세요");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }

    console.log({ name, email, password });
    alert("회원가입 성공!");
  };

  return (
    <View style={styles.container}>
      {/* 뒤로가기 */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      {/* 제목 */}
      <Text style={styles.title}>회원가입 페이지</Text>

      {/* 폼 영역 */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="이름"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={onSignup}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
  },

  backText: {
    fontSize: 28,
    color: "#333",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
  },

  form: {
  width: "100%",
  paddingHorizontal: 30,
  marginTop: 30,
},

input: {
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 10,
  padding: 12,
  marginBottom: 12,
  fontSize: 16,
},

button: {
  backgroundColor: "#5CB6CC",
  padding: 15,
  borderRadius: 10,
  marginTop: 10,
},

buttonText: {
  color: "#fff",
  textAlign: "center",
  fontWeight: "600",
},
});