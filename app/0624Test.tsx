import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const [inviteCount, setInviteCount] = useState(0);
  const [searchText, setSearchText] = useState("");

  const [users, setUsers] = useState([
    { id: 1, name: "손흥민", phone: "010-1234-5678", status: "normal" },
    { id: 2, name: "이재용", phone: "010-9876-5432", status: "normal" },
    { id: 3, name: "홍명보", phone: "010-1111-2222", status: "normal" },
    { id: 4, name: "messi", phone: "010-3333-4444", status: "normal" },
    { id: 5, name: "Cristiano Ronaldo", phone: "010-7777-8888", status: "joined" },
    { id: 6, name: "Donald Trump", phone: "010-3333-2222", status: "normal" },
    { id: 7, name: "Elon Musk", phone: "010-5555-2222", status: "normal" },
    { id: 8, name: "Michael Jackson", phone: "010-4444-2222", status: "normal" },
  ]);

  // 초대 토글 (normal ↔ invited)
  const toggleInvite = (id) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id !== id) return user;
        if (user.status === "joined") return user;

        const isInvited = user.status === "invited";

        return {
          ...user,
          status: isInvited ? "normal" : "invited",
        };
      })
    );

    // 카운트 업데이트
    const target = users.find((u) => u.id === id);
    if (!target || target.status === "joined") return;

    setInviteCount((prev) =>
      target.status === "invited" ? prev - 1 : prev + 1
    );
  };

  // 검색 필터
  const filteredUsers = users.filter((user) => {
    const keyword = searchText.toLowerCase();

    return (
      user.name.toLowerCase().includes(keyword) ||
      user.phone.includes(keyword)
    );
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* 헤더 */}
            <View style={styles.header}>
              <Text style={styles.title}>소셜</Text>

              <View style={styles.countBox}>
                <View style={styles.iconCircle}>
                  <MaterialCommunityIcons
                    name="email-plus-outline"
                    size={22}
                    color="#fff"
                  />
                </View>

                <Text
                  style={[
                    styles.countText,
                    inviteCount === 0 && styles.countZero,
                  ]}
                >
                  {inviteCount}
                </Text>
              </View>
            </View>

            {/* 검색 */}
            <View style={styles.searchBox}>
              <Feather name="search" size={20} color="gray" />
              <TextInput
                style={styles.input}
                placeholder="이름,전화번호 검색"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>

            {/* 배너 */}
            <Image
              source={require("../assets/images/cash.png")}
              style={styles.banner}
            />
          </>
        }
        renderItem={({ item: user }) => (
          <View style={styles.listItem}>
            <View>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.phone}>{user.phone}</Text>
            </View>

            <TouchableOpacity
              onPress={() => toggleInvite(user.id)}
              disabled={user.status === "joined"}
              style={[
                styles.inviteBtn,
                user.status === "invited" && styles.invitedBtn,
                user.status === "joined" && styles.joinedBtn,
              ]}
            >
              <Text
                style={
                  user.status === "joined"
                    ? styles.joinedText
                    : user.status === "invited"
                    ? styles.invitedText
                    : styles.inviteText
                }
              >
                {user.status === "joined"
                  ? "가입됨"
                  : user.status === "invited"
                  ? "초대됨"
                  : "초대하기"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  countBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E5E7EB", // 회색 원
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },

  countText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
  },

  countZero: {
    color: "#000",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f7f7f7",
    marginBottom: 10,
  },

  input: {
    flex: 1,
    marginLeft: 10,
  },

  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  name: {
    fontSize: 16,
    fontWeight: "500",
  },

  phone: {
    fontSize: 13,
    color: "#888",
    marginTop: 3,
  },

  inviteBtn: {
    borderWidth: 1,
    borderColor: "#EF4444",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  inviteText: {
    color: "#EF4444",
    fontWeight: "600",
  },

  invitedBtn: {
    backgroundColor: "#EF4444",
    borderColor: "#EF4444",
  },

  invitedText: {
    color: "#fff",
    fontWeight: "600",
  },

  joinedBtn: {
    borderWidth: 1,
    borderColor: "#9CA3AF",
    backgroundColor: "transparent",
  },

  joinedText: {
    color: "#9CA3AF",
    fontWeight: "600",
  },
  banner: {
  width: "100%",
  height: 120,
   resizeMode: "cover",
  borderRadius: 12,
  marginTop: 15,
},
});