from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    dob: str
    level: str = "Level 1 Reader"
    success_streak: int = 0

class UserInDB(UserBase):
    id: str = Field(alias="_id")
    password: str

class PassageSchema(BaseModel):
    title: str
    text: str
    cefr_level: str
    lexile_score: int
    category: str

class DiagnosticProfile(BaseModel):
    linguistic: Dict[str, Any]
    acoustic: Dict[str, Any]

class ReportSchema(BaseModel):
    user_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    data: Dict[str, Any] # Final report structure
