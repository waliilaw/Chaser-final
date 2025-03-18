from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import json
import os
import jwt
from finance_analyzer import FinanceAnalyzer
from chatbot import FinanceChatbot

# Initialize FastAPI app
app = FastAPI(title="Finance AI API", description="API for AI-powered finance management")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Secret key for JWT
SECRET_KEY = "your-secret-key"  # In production, use environment variable
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Mock user database
users_db = {
    "user@example.com": {
        "id": "user1",
        "email": "user@example.com",
        "hashed_password": "password123",  # In production, use hashed passwords
        "name": "John Doe"
    }
}

# Initialize finance analyzers for users
finance_analyzers = {}
chatbots = {}

# Pydantic models
class User(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[str] = None

class Expense(BaseModel):
    amount: float
    category: str
    description: str
    date: str
    merchant: Optional[str] = None

class Income(BaseModel):
    amount: float
    source: str
    description: str
    date: str

class ChatMessage(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

# Authentication functions
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(lambda x: x.headers.get("Authorization").split(" ")[1] if x.headers.get("Authorization") else None)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        token_data = TokenData(user_id=user_id)
    except jwt.PyJWTError:
        raise credentials_exception
    
    # In a real app, you would fetch the user from a database
    # For now, we'll just return the user_id
    return token_data.user_id

# Helper function to get or create finance analyzer for a user
def get_finance_analyzer(user_id: str) -> FinanceAnalyzer:
    if user_id not in finance_analyzers:
        finance_analyzers[user_id] = FinanceAnalyzer(user_id)
        finance_analyzers[user_id].load_data()
    return finance_analyzers[user_id]

# Helper function to get or create chatbot for a user
def get_chatbot(user_id: str) -> FinanceChatbot:
    if user_id not in chatbots:
        chatbots[user_id] = FinanceChatbot(user_id)
    return chatbots[user_id]

# Routes
@app.post("/api/auth/login", response_model=Token)
async def login(user: User):
    if user.email not in users_db or users_db[user.email]["hashed_password"] != user.password:
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user_data = users_db[user.email]
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user_data["id"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/dashboard")
async def get_dashboard_data(user_id: str = Depends(get_current_user)):
    analyzer = get_finance_analyzer(user_id)
    
    # Get current date and date 3 months ago
    end_date = datetime.now()
    start_date = end_date - timedelta(days=90)
    
    # Get expenses by category
    expenses_by_category = analyzer.analyze_expenses_by_category(
        start_date=start_date.strftime("%Y-%m-%d"),
        end_date=end_date.strftime("%Y-%m-%d")
    )
    
    # Get expenses over time
    expenses_over_time = analyzer.analyze_expenses_over_time(frequency="W")
    
    # Get income vs expenses
    income_vs_expenses = analyzer.analyze_income_vs_expenses(frequency="M")
    
    # Get top merchants
    top_merchants = analyzer.get_top_merchants(n=5)
    
    # Generate budget recommendations
    budget_recommendations = analyzer.generate_budget_recommendations()
    
    # Calculate total balance, income, and expenses
    total_income = analyzer.income['amount'].sum()
    total_expenses = analyzer.expenses['amount'].sum()
    total_balance = total_income - total_expenses
    
    # Format data for frontend
    dashboard_data = {
        "totalBalance": float(total_balance),
        "balanceChange": 5.2,  # Mock data, would be calculated from historical data
        "income": float(total_income),
        "incomeChange": 3.1,  # Mock data
        "expenses": float(total_expenses),
        "expensesChange": -2.5,  # Mock data
        "activeAccounts": 3,  # Mock data
        "accountsChange": 1,  # Mock data
        
        # Format overview data for chart
        "overviewData": [
            {
                "name": date.strftime("%b %d"),
                "income": float(income) if not pd.isna(income) else 0,
                "expenses": float(expenses) if not pd.isna(expenses) else 0
            }
            for date, income, expenses in zip(
                income_vs_expenses.index,
                income_vs_expenses['income'],
                income_vs_expenses['expenses']
            )
        ],
        
        # Format expenses by category for pie chart
        "expensesByCategory": [
            {
                "name": category,
                "value": float(amount),
                "color": get_color_for_category(category)
            }
            for category, amount in expenses_by_category.items()
        ],
        
        # Format recent transactions
        "recentTransactions": [
            {
                "id": str(i),
                "description": row['description'],
                "amount": float(row['amount']),
                "date": row['date'].strftime("%Y-%m-%d") if isinstance(row['date'], pd.Timestamp) else row['date'],
                "category": row['category'],
                "type": "expense",
                "merchant": {
                    "name": row['merchant'],
                    "logo": "/placeholder.svg?height=36&width=36"
                }
            }
            for i, row in analyzer.expenses.sort_values('date', ascending=False).head(10).iterrows()
        ]
    }
    
    return dashboard_data

@app.get("/api/expenses")
async def get_expenses(
    user_id: str = Depends(get_current_user),
    category: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None
):
    analyzer = get_finance_analyzer(user_id)
    
    # Filter expenses
    filtered_expenses = analyzer.expenses.copy()
    
    if category:
        filtered_expenses = filtered_expenses[filtered_expenses['category'] == category]
    
    if start_date:
        filtered_expenses = filtered_expenses[pd.to_datetime(filtered_expenses['date']) >= pd.to_datetime(start_date)]
    
    if end_date:
        filtered_expenses = filtered_expenses[pd.to_datetime(filtered_expenses['date']) <= pd.to_datetime(end_date)]
    
    # Calculate total
    total = filtered_expenses['amount'].sum()
    
    # Group by category
    by_category = filtered_expenses.groupby('category')['amount'].agg(['sum', 'count']).reset_index()
    by_category.columns = ['category', 'total', 'count']
    
    return {
        "expenses": filtered_expenses.to_dict(orient='records'),
        "total": float(total),
        "byCategory": by_category.to_dict(orient='records')
    }

@app.post("/api/expenses")
async def add_expense(expense: Expense, user_id: str = Depends(get_current_user)):
    analyzer = get_finance_analyzer(user_id)
    
    # Create new expense
    new_expense = {
        'date': pd.to_datetime(expense.date),
        'amount': expense.amount,
        'category': expense.category,
        'description': expense.description,
        'merchant': expense.merchant or "Unknown",
        'user_id': user_id
    }
    
    # Add to expenses DataFrame
    analyzer.expenses = pd.concat([analyzer.expenses, pd.DataFrame([new_expense])], ignore_index=True)
    
    return {"success": True, "expense": new_expense}

@app.get("/api/income")
async def get_income(
    user_id: str = Depends(get_current_user),
    source: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None
):
    analyzer = get_finance_analyzer(user_id)
    
    # Filter income
    filtered_income = analyzer.income.copy()
    
    if source:
        filtered_income = filtered_income[filtered_income['source'] == source]
    
    if start_date:
        filtered_income = filtered_income[pd.to_datetime(filtered_income['date']) >= pd.to_datetime(start_date)]
    
    if end_date:
        filtered_income = filtered_income[pd.to_datetime(filtered_income['date']) <= pd.to_datetime(end_date)]
    
    # Calculate total
    total = filtered_income['amount'].sum()
    
    # Group by source
    by_source = filtered_income.groupby('source')['amount'].agg(['sum', 'count']).reset_index()
    by_source.columns = ['source', 'total', 'count']
    
    return {
        "income": filtered_income.to_dict(orient='records'),
        "total": float(total),
        "bySource": by_source.to_dict(orient='records')
    }

@app.post("/api/income")
async def add_income(income: Income, user_id: str = Depends(get_current_user)):
    analyzer = get_finance_analyzer(user_id)
    
    # Create new income
    new_income = {
        'date': pd.to_datetime(income.date),
        'amount': income.amount,
        'source': income.source,
        'description': income.description,
        'user_id': user_id
    }
    
    # Add to income DataFrame
    analyzer.income = pd.concat([analyzer.income, pd.DataFrame([new_income])], ignore_index=True)
    
    return {"success": True, "income": new_income}

@app.get("/api/budget")
async def get_budget(user_id: str = Depends(get_current_user)):
    analyzer = get_finance_analyzer(user_id)
    
    # Get budget recommendations
    budget_recommendations = analyzer.generate_budget_recommendations()
    
    # Get actual spending by category
    expenses_by_category = analyzer.analyze_expenses_by_category()
    
    # Calculate monthly spending (assuming 3 months of data)
    monthly_spending = {category: amount / 3 for category, amount in expenses_by_category.items()}
    
    # Combine budget and actual spending
    budget_data = []
    for category, budget_amount in budget_recommendations.items():
        actual_amount = monthly_spending.get(category, 0)
        percentage = (actual_amount / budget_amount * 100) if budget_amount > 0 else 0
        
        budget_data.append({
            "category": category,
            "budgeted": float(budget_amount),
            "actual": float(actual_amount),
            "percentage": float(percentage)
        })
    
    return {"budget": budget_data}

@app.post("/api/chat")
async def chat(message: ChatMessage, user_id: str = Depends(get_current_user)):
    chatbot = get_chatbot(user_id)
    
    # Process message and get response
    response = chatbot.process_message(message.message)
    
    return {"response": response}

@app.get("/api/analysis/expenses-over-time")
async def get_expenses_over_time(
    user_id: str = Depends(get_current_user),
    frequency: str = "W"  # D for daily, W for weekly, M for monthly
):
    analyzer = get_finance_analyzer(user_id)
    
    # Get expenses over time
    expenses_over_time = analyzer.analyze_expenses_over_time(frequency=frequency)
    
    # Format for frontend
    data = [
        {
            "date": date.strftime("%Y-%m-%d"),
            "amount": float(amount)
        }
        for date, amount in zip(expenses_over_time['date'], expenses_over_time['amount'])
    ]
    
    return {"data": data}

@app.get("/api/analysis/income-vs-expenses")
async def get_income_vs_expenses(
    user_id: str = Depends(get_current_user),
    frequency: str = "M"  # W for weekly, M for monthly
):
    analyzer = get_finance_analyzer(user_id)
    
    # Get income vs expenses
    income_vs_expenses = analyzer.analyze_income_vs_expenses(frequency=frequency)
    
    # Format for frontend
    data = [
        {
            "date": date.strftime("%Y-%m-%d"),
            "income": float(income) if not pd.isna(income) else 0,
            "expenses": float(expenses) if not pd.isna(expenses) else 0,
            "savings": float(savings) if not pd.isna(savings) else 0
        }
        for date, income, expenses, savings in zip(
            income_vs_expenses.index,
            income_vs_expenses['income'],
            income_vs_expenses['expenses'],
            income_vs_expenses['savings']
        )
    ]
    
    return {"data": data}

@app.get("/api/analysis/top-merchants")
async def get_top_merchants(
    user_id: str = Depends(get_current_user),
    n: int = 5
):
    analyzer = get_finance_analyzer(user_id)
    
    # Get top merchants
    top_merchants = analyzer.get_top_merchants(n=n)
    
    return {"merchants": top_merchants.to_dict(orient='records')}

@app.get("/api/analysis/category-breakdown")
async def get_category_breakdown(
    user_id: str = Depends(get_current_user),
    start_date: Optional[str] = None,
    end_date: Optional[str] = None
):
    analyzer = get_finance_analyzer(user_id)
    
    # Get expenses by category
    expenses_by_category = analyzer.analyze_expenses_by_category(
        start_date=start_date,
        end_date=end_date
    )
    
    # Calculate total
    total = sum(expenses_by_category.values())
    
    # Format for frontend
    data = [
        {
            "category": category,
            "amount": float(amount),
            "percentage": float(amount / total * 100) if total > 0 else 0,
            "color": get_color_for_category(category)
        }
        for category, amount in expenses_by_category.items()
    ]
    
    return {"data": data, "total": float(total)}

# Helper function to get color for category
def get_color_for_category(category: str) -> str:
    colors = {
        "Housing": "#FF6384",
        "Food": "#36A2EB",
        "Transportation": "#FFCE56",
        "Entertainment": "#4BC0C0",
        "Utilities": "#9966FF",
        "Healthcare": "#FF9F40",
        "Shopping": "#C9CBCF",
        "Education": "#7CFC00",
        "Personal Care": "#FF7F50",
        "Travel": "#00CED1",
        "Debt Payments": "#FF4500",
        "Other": "#808080",
        "Savings": "#32CD32"
    }
    
    return colors.get(category, "#808080")  # Default to gray if category not found

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

