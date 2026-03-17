from fastapi import APIRouter
from app.models.client_models import LoginRequest
from app.services.client_service import login_user

router = APIRouter()

@router.post("/login")
async def login(data: LoginRequest):
    return login_user(data.token)