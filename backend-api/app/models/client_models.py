from pydantic import BaseModel

# login credentials
class LoginRequest(BaseModel):
    token: str