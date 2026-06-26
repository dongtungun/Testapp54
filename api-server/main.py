# fastapi 패키지에서 FastAPI 클래스를 가져오기
from typing import Optional
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select



# =========================
# DB 테이블 모델
# =========================
class User(SQLModel, table=True):
    __tablename__ = "tb_user"

    user_idx: Optional[int] = Field(default=None, primary_key=True) #기본키
    id: str = Field(index=True, unique=True)
    name: str
    hp: Optional[str] = None #Optional: string 일수도 있고 아닐 수도 있다.

# =========================
# 요청 Body 모델
# =========================
class UserCreate(SQLModel):
    id: str
    name: str
    hp: Optional[str] = None

# =========================
# MySQL DB 설정
# =========================
MYSQL_USER = "root"
MYSQL_PASSWORD = "1234"
MYSQL_HOST = "localhost"
MYSQL_PORT = 3306
MYSQL_DATABASE = "aihops"


# mysql 접속 주소
mysql_url = (
    f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}"
    f"@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DATABASE}?charset=utf8mb4"
)

# mysql 연결 객체
engine = create_engine(
    mysql_url, 
    echo=True, # 실행되는 SQL을 터미널에 출력
    pool_pre_ping=True, # 연결이 끊겼는지 미리 확인
)


# =========================
# 실제 서버 객체 만들기
# main:app -> main.py 파일 안에 있는 app 객체를 실행해라
# =========================
app = FastAPI()

# =========================
# CORS 설정
# -> React Native, 웹 프론트엔드 같은 외부 클라이언트가 FastAPI API를 호출할 수 있게 허용하는 설정
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 접속 확인용
@app.get("/")
def root():
    return {"message": "FastAPI 서버 정상 실행"}


# 서버 상태 확인용
@app.get("/test")
def test_check():
    return {"status": "ok"}


# 사용자 목록 조회 API
@app.get("/users")
def get_users():
    with Session(engine) as session:
        users = session.exec(select(User)).all()
        return [
            {
                "user_idx": user.user_idx,
                "id": user.id,
                "name": user.name,
                "phone": user.hp,
            }
            for user in users
        ]

