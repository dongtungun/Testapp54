import { router } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
        >
         <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

      <Text style={styles.title}>로그인</Text>

      <TextInput
        style={styles.input}
        placeholder="아이디를 입력하세요"
      />

      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력하세요"
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.signupText}>회원가입</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 40,
    textAlign: "center",
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  loginButton: {
    height: 50,
    backgroundColor: "#5CB6CC",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  backButton: {
    position: "absolute",
     top: 60,
    left: 20,
   },

    backText: {
        fontSize: 18,
        color: "#333",
    },

    signupText: {
        marginTop: 25,
        fontSize: 16,
        color: "#5CB6CC",
        textAlign: "center",
},
});