import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type User = {
  id: number;
  name: string;
  phone: string;
  status: string;
};

const API_URL = "http://192.168.1.134:8000/members";

export default function Profile() {
  const [inviteCount, setInviteCount] = useState(0);
  const [searchText, setSearchText] = useState("");
const [users, setUsers] = useState<User[]>([]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
const [editingId, setEditingId] = useState<number | null>(null);

  const loadMembers = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log("API 오류:", err);
      });
  };

  useEffect(() => {
    loadMembers();
  }, []);

const addMember = async () => {
  try {
    const response = await fetch(
      "http://192.168.1.134:8000/members",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          phone: newPhone,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    alert("회원 추가 완료");

    loadMembers();

    setNewName("");
    setNewPhone("");
  } catch (error) {
    console.log(error);
  }
};
 
const deleteMember = async (id: number) => {
  try {
    await fetch(
      `http://192.168.1.134:8000/members/${id}`,
      {
        method: "DELETE",
      }
    );

    loadMembers();

    alert("삭제 완료");
  } catch (error) {
    console.log(error);
  }
};

const updateMember = async () => {
  try {
    await fetch(
      `http://192.168.1.134:8000/members/${editingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          phone: newPhone,
        }),
      }
    );

    alert("수정 완료");

    loadMembers();

    setEditingId(null);
    setNewName("");
    setNewPhone("");
  } catch (error) {
    console.log(error);
  }
};

  // 초대 토글 (normal ↔ invited)
  const toggleInvite = (id: number) => {
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
            
            <View style={{ marginTop: 20 }}>
  <TextInput
    placeholder="이름"
    value={newName}
    onChangeText={setNewName}
    style={styles.input}
  />

  <TextInput
    placeholder="전화번호"
    value={newPhone}
    onChangeText={setNewPhone}
    style={styles.input}
  />

  <TouchableOpacity
  onPress={
    editingId
      ? updateMember
      : addMember
  }
  style={{
    backgroundColor: editingId
      ? "#2563EB"
      : "#EF4444",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  }}
>
  <Text
    style={{
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
    }}
  >
    {editingId
      ? "회원 수정"
      : "회원 추가"}
  </Text>
</TouchableOpacity>
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

    <View style={{ alignItems: "flex-end" }}>
      {/* 초대 버튼 */}
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

      {/* 삭제 버튼 */}
      <TouchableOpacity
        onPress={() => deleteMember(user.id)}
        style={{
          marginTop: 8,
          backgroundColor: "#DC2626",
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          삭제
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
  onPress={() => {
    setEditingId(user.id);
    setNewName(user.name);
    setNewPhone(user.phone);
  }}
  style={{
    marginTop: 8,
    backgroundColor: "#2563EB",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  }}
>
  <Text
    style={{
      color: "#fff",
      fontWeight: "bold",
    }}
  >
    수정
  </Text>
</TouchableOpacity>

    </View>
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