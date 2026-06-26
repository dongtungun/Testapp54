import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const API_BASE_URL = "http://192.168.1.133:8000";

// React Native에서 FastAPI로 회원 생성 요청을 보낼 때 사용하는 데이터 모양
type User = {
  user_idx: number;
  id: number;
  name: string;
  birthday?: string;
  phone?: string | null;
};

const startPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      const data = await response.json();

      setUsers(data);

      console.log("사용자 목록:", data);
    } catch (error) {
      console.log("조회 오류:", error);
    }
  };

  return (
    <View>
      <Text>startPage</Text>

      {users.map((user) => (
        <View key={user.user_idx}>
          <Text>이름: {user.id}</Text>
          <Text>아이디: {user.name}</Text>
          <Text>생년월일: {user.birthday}</Text>
          <Text>전화번호: {user.phone || "-"}</Text>
        </View>
      ))}
    </View>
  );
};

export default startPage;

const styles = StyleSheet.create({});
