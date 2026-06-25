# fastapi 패키지에서 FastAPI 클래스를 가져오기
from fastapi import FastAPI

# 실제 서버 객체 만들기
# main:app -> main.py 파일 안에 있는 app 객체를 실행해라
app = FastAPI()

# 접속 확인용
@app.get("/")
def root():
    return {"message": "FastAPI 서버 정상 실행"}


# 서버 상태 확인용
@app.get("/test")
def test_check():
    return {"status": "ok"}