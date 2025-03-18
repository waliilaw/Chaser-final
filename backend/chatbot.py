import numpy as np
import pandas as pd
from typing import Dict, List, Tuple, Optional, Any
import re
import json
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import io
import base64

class FinanceChatbot:
    """
    AI-powered chatbot for financial management and advice.
    This chatbot can analyze user's financial data, provide insights,
    and offer personalized financial advice.
    """
    
    def __init__(self, user_id: str):
        """
        Initialize the FinanceChatbot with a user ID.
        
        Args:
            user_id: The unique identifier for the user
        """
        self.user_id = user_id
        self.expenses_data = None
        self.income_data = None
        self.budget_data = None
        self.conversation_history = []
        
        # Load financial data
        self._load_financial_data()
        
        # Define intent patterns
        self.intent_patterns = {
            'greeting': r'(hello|hi|hey|greetings|howdy)',
            'expense_query': r'(expenses?|spending|spent|cost|paid)',
            'income_query': r'(income|earnings|salary|made|earned)',
            'budget_query': r'(budget|plan|allocation|allocate)',
            'savings_query': r'(savings?|save|saved)',
            'investment_query': r'(invest|investment|stock|bond|mutual fund)',
            'debt_query': r'(debt|loan|credit card|mortgage|owe)',
            'category_query': r'(categor(y|ies)|type|group)',
            'time_query': r'(month|week|year|day|period|time)',
            'comparison_query': r'(compare|comparison|versus|vs|difference)',
            'recommendation_query': r'(recommend|suggestion|advice|tip|help)',
            'forecast_query': r'(forecast|predict|projection|future)',
        }
    
    def _load_financial_data(self) -> None:
        """
        Load the user's financial data from storage.
        In a real application, this would fetch data from a database.
        """
        # For demonstration, we'll create mock data
        # Generate dates for the last 90 days
        end_date = datetime.now()
        start_date = end_date - timedelta(days=90)
        dates = pd.date_range(start=start_date, end=end_date, freq='D')
        
        # Categories
        categories = [
            "Housing", "Food", "Transportation", "Entertainment", 
            "Utilities", "Healthcare", "Shopping", "Education", 
            "Personal Care", "Travel", "Debt Payments", "Other"
        ]
        
        # Generate random expenses
        num_expenses = 150
        random_dates = np.random.choice(dates, size=num_expenses)
        random_categories = np.random.choice(categories, size=num_expenses, p=[
            0.25, 0.20, 0.10, 0.08, 0.10, 0.05, 0.07, 0.03, 0.04, 0.03, 0.03, 0.02
        ])
        
        # Generate amounts based on category
        amounts = []
        for category in random_categories:
            if category == "Housing":
                amounts.append(np.random.uniform(800, 2000))
            elif category == "Food":
                amounts.append(np.random.uniform(10, 200))
            elif category == "Transportation":
                amounts.append(np.random.uniform(5, 150))
            elif category == "Entertainment":
                amounts.append(np.random.uniform(10, 100))
            elif category == "Utilities":
                amounts.append(np.random.uniform(50, 300))
            elif category == "Healthcare":
                amounts.append(np.random.uniform(20, 500))
            elif category == "Shopping":
                amounts.append(np.random.uniform(15, 200))
            elif category == "Education":
                amounts.append(np.random.uniform(50, 500))
            elif category == "Personal Care":
                amounts.append(np.random.uniform(10, 100))
            elif category == "Travel":
                amounts.append(np.random.uniform(100, 1000))
            elif category == "Debt Payments":
                amounts.append(np.random.uniform(100, 500))
            else:  # Other
                amounts.append(np.random.uniform(10, 150))
        
        # Create merchants based on categories

        for category in random_categories:
            if category == "Housing":
                merchants.append(np.random.choice(["Apartment Inc", "Rental Co", "Mortgage Bank"]))
            elif category == "Food":
                merchants.append(np.random.choice(["Grocery Store", "Restaurant", "Cafe", "Fast Food"]))
            elif category == "Transportation":
                merchants.append(np.random.choice(["Gas Station", "Uber", "Public Transit", "Auto Shop"]))
            elif category == "Entertainment":
                merchants.append(np.random.choice(["Cinema", "Streaming Service", "Concert Venue", "Game Store"]))
            elif category == "Utilities":
                merchants.append(np.random.choice(["Electric Co", "Water Co", "Internet Provider", "Phone Company"]))
            else:
                merchants.append(f"{category} Provider")
        
        # Create expenses DataFrame
        self.expenses_data = pd.DataFrame({
            'date': random_dates,
            'amount': amounts,
            'category': random_categories,
            'merchant': merchants,
            'user_id': self.user_id
        })
        
        # Sort by date
        self.expenses_data = self.expenses_data.sort_values('date')
        
        # Generate income data
        # Monthly salary
        salary_dates = pd.date_range(start=start_date, end=end_date, freq='MS')  # Month Start
        salary_amounts = np.random.uniform(3000, 5000, size=len(salary_dates))
        salary_df = pd.DataFrame({
            'date': salary_dates,
            'amount': salary_amounts,
            'source': 'Salary',
            'description': 'Monthly Salary',
            'user_id': self.user_id
        })
        
        # Some random additional income
        num_additional = np.random.randint(3, 8)
        additional_dates = np.random.choice(dates, size=num_additional)
        additional_amounts = np.random.uniform(100, 1000, size=num_additional)
        additional_sources = np.random.choice(['Freelance', 'Interest', 'Gift', 'Refund', 'Other'], size=num_additional)
        
        additional_df = pd.DataFrame({
            'date': additional_dates,
            'amount': additional_amounts,
            'source': additional_sources,
            'description': [f"Income from {source}" for source in additional_sources],
            'user_id': self.user_id
        })
        
        # Combine and sort income data
        self.income_data = pd.concat([salary_df, additional_df])
        self.income_data = self.income_data.sort_values('date')
        
        # Generate budget data (50/30/20 rule)
        monthly_income = salary_amounts.mean()
        self.budget_data = {
            'Housing': monthly_income * 0.3,
            'Food': monthly_income * 0.15,
            'Transportation': monthly_income * 0.05,
            'Utilities': monthly_income * 0.05,
            'Healthcare': monthly_income * 0.05,
            'Debt Payments': monthly_income * 0.1,
            'Entertainment': monthly_income * 0.05,
            'Shopping': monthly_income * 0.05,
            'Personal Care': monthly_income * 0.03,
            'Travel': monthly_income * 0.02,
            'Education': monthly_income * 0.05,
            'Other': monthly_income * 0.05,
            'Savings': monthly_income * 0.2,
        }
    
    def process_message(self, message: str) -> str:
        """
        Process a user message and generate a response.
        
        Args:
            message: The user's message
            
        Returns:
            The chatbot's response
        """
        # Add message to conversation history
        self.conversation_history.append({"role": "user", "message": message})
        
        # Identify intent
        intent = self._identify_intent(message)
        
        # Generate response based on intent
        response = self._generate_response(intent, message)
        
        # Add response to conversation history
        self.conversation_history.append({"role": "bot", "message": response})
        
        return response
    
    def _identify_intent(self, message: str) -> str:
        """
        Identify the user's intent from their message.
        
        Args:
            message: The user's message
            
        Returns:
            The identified intent
        """
        message = message.lower()
        
        # Check each intent pattern
        for intent, pattern in self.intent_patterns.items():
            if re.search(pattern, message):
                return intent
        
        # Default intent if no pattern matches
        return "general"
    
    def _generate_response(self, intent: str, message: str) -> str:
        """
        Generate a response based on the identified intent.
        
        Args:
            intent: The identified intent
            message: The user's message
            
        Returns:
            The generated response
        """
        if intent == "greeting":
            return self._handle_greeting()
        
        elif intent == "expense_query":
            return self._handle_expense_query(message)
        
        elif intent == "income_query":
            return self._handle_income_query(message)
        
        elif intent == "budget_query":
            return self._handle_budget_query(message)
        
        elif intent == "savings_query":
            return self._handle_savings_query(message)
        
        elif intent == "investment_query":
            return self._handle_investment_query(message)
        
        elif intent == "debt_query":
            return self._handle_debt_query(message)
        
        elif intent == "recommendation_query":
            return self._handle_recommendation_query(message)
        
        elif intent == "forecast_query":
            return self._handle_forecast_query(message)
        
        else:
            return self._handle_general_query()
    
    def _handle_greeting(self) -> str:
        """Handle greeting intent"""
        greetings = [
            "Hello! I'm your AI financial assistant. How can I help you today?",
            "Hi there! I'm here to help with your financial questions.",
            "Greetings! I can provide insights about your spending, budget, and financial goals. What would you like to know?"
        ]
        return np.random.choice(greetings)
    
    def _handle_expense_query(self, message: str) -> str:
        """Handle expense-related queries"""
        # Check for time period in the message
        time_period = self._extract_time_period(message)
        
        # Check for category in the message
        category = self._extract_category(message)
        
        # Filter expenses based on time period and category
        filtered_expenses = self._filter_expenses(time_period, category)
        
        # Generate response
        if category and time_period:
            total = filtered_expenses['amount'].sum()
            return f"Your {category.lower()} expenses {time_period} were ${total:.2f}."
        
        elif category:
            total = filtered_expenses['amount'].sum()
            return f"Your total {category.lower()} expenses are ${total:.2f}."
        
        elif time_period:
            total = filtered_expenses['amount'].sum()
            top_categories = filtered_expenses.groupby('category')['amount'].sum().sort_values(ascending=False).head(3)
            response = f"Your total expenses {time_period} were ${total:.2f}. "
            response += "Your top spending categories were: "
            for cat, amount in top_categories.items():
                response += f"{cat} (${amount:.2f}), "
            return response[:-2] + "."
        
        else:
            total = self.expenses_data['amount'].sum()
            monthly_avg = total / 3  # Assuming 3 months of data
            top_categories = self.expenses_data.groupby('category')['amount'].sum().sort_values(ascending=False).head(3)
            
            response = f"Your total expenses over the last 3 months were ${total:.2f}, "
            response += f"with a monthly average of ${monthly_avg:.2f}. "
            response += "Your top spending categories are: "
            for cat, amount in top_categories.items():
                response += f"{cat} (${amount:.2f}), "
            return response[:-2] + "."
    
    def _handle_income_query(self, message: str) -> str:
        """Handle income-related queries"""
        # Check for time period in the message
        time_period = self._extract_time_period(message)
        
        # Filter income based on time period
        if time_period:
            if time_period == "this month":
                current_month = datetime.now().month
                current_year = datetime.now().year
                filtered_income = self.income_data[
                    (pd.to_datetime(self.income_data['date']).dt.month == current_month) &
                    (pd.to_datetime(self.income_data['date']).dt.year == current_year)
                ]
            elif time_period == "last month":
                last_month = (datetime.now().replace(day=1) - timedelta(days=1)).month
                current_year = datetime.now().year
                filtered_income = self.income_data[
                    (pd.to_datetime(self.income_data['date']).dt.month == last_month) &
                    (pd.to_datetime(self.income_data['date']).dt.year == current_year)
                ]
            else:  # Default to all data
                filtered_income = self.income_data
        else:
            filtered_income = self.income_data
        
        # Generate response
        total = filtered_income['amount'].sum()
        sources = filtered_income.groupby('source')['amount'].sum().sort_values(ascending=False)
        
        if time_period:
            response = f"Your total income {time_period} was ${total:.2f}. "
        else:
            response = f"Your total income over the last 3 months was ${total:.2f}. "
        
        if not sources.empty:
            response += "Your income sources are: "
            for source, amount in sources.items():
                response += f"{source} (${amount:.2f}), "
            response = response[:-2] + "."
        
        return response
    
    def _handle_budget_query(self, message: str) -> str:
        """Handle budget-related queries"""
        # Check for category in the message
        category = self._extract_category(message)
        
        if category and category in self.budget_data:
            budget_amount = self.budget_data[category]
            
            # Get actual spending for this category
            actual_spending = self.expenses_data[self.expenses_data['category'] == category]['amount'].sum()
            
            # Calculate percentage of budget used
            percentage_used = (actual_spending / budget_amount) * 100
            
            response = f"Your budget for {category} is ${budget_amount:.2f}. "
            response += f"You've spent ${actual_spending:.2f} ({percentage_used:.1f}% of your budget)."
            
            if percentage_used > 100:
                response += " You've exceeded your budget for this category."
            elif percentage_used > 80:
                response += " You're close to your budget limit for this category."
            else:
                response += f" You still have ${budget_amount - actual_spending:.2f} left in your budget."
            
            return response
        
        else:
            # Return overall budget information
            total_budget = sum(self.budget_data.values())
            total_expenses = self.expenses_data['amount'].sum()
            percentage_used = (total_expenses / total_budget) * 100
            
            response = f"Your total monthly budget is ${total_budget:.2f}. "
            response += f"You've spent ${total_expenses:.2f} over the last 3 months "
            response += f"(average of ${total_expenses/3:.2f} per month, {percentage_used/3:.1f}% of your monthly budget).\n\n"
            
            response += "Here's your budget breakdown:\n"
            for category, amount in self.budget_data.items():
                response += f"- {category}: ${amount:.2f}\n"
            
            return response
    
    def _handle_savings_query(self, message: str) -> str:
        """Handle savings-related queries"""
        # Calculate total income and expenses
        total_income = self.income_data['amount'].sum()
        total_expenses = self.expenses_data['amount'].sum()
        
        # Calculate savings
        savings = total_income - total_expenses
        savings_rate = (savings / total_income) * 100
        
        response = f"Over the last 3 months, you've saved ${savings:.2f}, "
        response += f"which is {savings_rate:.1f}% of your income. "
        
        if savings_rate < 10:
            response += "This is below the recommended savings rate of 20%. "
            response += "Consider reducing expenses in discretionary categories like Entertainment and Shopping."
        elif savings_rate < 20:
            response += "This is a good start, but the recommended savings rate is 20%. "
            response += "You're on the right track!"
        else:
            response += "Great job! You're saving above the recommended rate of 20%. "
            response += "Consider investing some of your extra savings for long-term growth."
        
        return response
    
    def _handle_investment_query(self, message: str) -> str:
        """Handle investment-related queries"""
        response = "Based on your financial profile, here are some investment recommendations:\n\n"
        response += "1. Emergency Fund: Ensure you have 3-6 months of expenses saved in a high-yield savings account.\n"
        response += "2. Retirement: Contribute to tax-advantaged accounts like 401(k) or IRA.\n"
        response += "3. Index Funds: Consider low-cost index funds for long-term growth.\n"
        response += "4. Diversification: Spread investments across different asset classes.\n\n"
        
        response += "For beginners, a simple portfolio might be:\n"
        response += "- 60% Total Stock Market Index Fund\n"
        response += "- 30% Total International Stock Index Fund\n"
        response += "- 10% Total Bond Market Index Fund\n\n"
        
        response += "Remember that investments involve risk, and it's important to consider your time horizon and risk tolerance."
        
        return response
    
    def _handle_debt_query(self, message: str) -> str:
        """Handle debt-related queries"""
        # Check if there are debt payments in the expenses
        debt_expenses = self.expenses_data[self.expenses_data['category'] == 'Debt Payments']
        
        if debt_expenses.empty:
            response = "I don't see any debt payments in your recent transactions. "
            response += "If you have debts, here are some strategies to manage them:\n\n"
        else:
            total_debt_payments = debt_expenses['amount'].sum()
            response = f"You've spent ${total_debt_payments:.2f} on debt payments recently. "
            response += "Here are some strategies to manage your debt:\n\n"
        
        response += "1. Avalanche Method: Pay minimum on all debts, then put extra money toward the highest interest debt.\n"
        response += "2. Snowball Method: Pay minimum on all debts, then put extra money toward the smallest debt for psychological wins.\n"
        response += "3. Consolidation: Consider consolidating high-interest debts into a lower-interest loan.\n"
        response += "4. Refinancing: Look into refinancing options for mortgages or student loans if rates have dropped.\n\n"
        
        response += "The most efficient approach financially is usually the Avalanche Method, but the Snowball Method can be more motivating for some people."
        
        return response
    
    def _handle_recommendation_query(self, message: str) -> str:
        """Handle recommendation-related queries"""
        # Check for specific recommendation types
        if re.search(r'(save|saving|savings)', message.lower()):
            return self._get_savings_recommendations()
        elif re.search(r'(budget|budgeting)', message.lower()):
            return self._get_budget_recommendations()
        elif re.search(r'(invest|investing|investment)', message.lower()):
            return self._handle_investment_query(message)
        elif re.search(r'(debt|loan|credit)', message.lower()):
            return self._handle_debt_query(message)
        else:
            # General financial recommendations
            response = "Here are some general financial recommendations based on your data:\n\n"
            
            # Analyze spending patterns
            total_expenses = self.expenses_data['amount'].sum()
            monthly_expenses = total_expenses / 3  # Assuming 3 months of data
            
            # Get income
            total_income = self.income_data['amount'].sum()
            monthly_income = total_income / 3
            
            # Calculate savings rate
            savings = total_income - total_expenses
            savings_rate = (savings / total_income) * 100
            
            # Top spending categories
            top_categories = self.expenses_data.groupby('category')['amount'].sum().sort_values(ascending=False).head(3)
            
            # Generate recommendations
            if savings_rate < 20:
                response += "1. Increase your savings rate: You're currently saving about "
                response += f"{savings_rate:.1f}% of your income. Aim for at least 20%.\n"
            else:
                response += "1. Great job on your savings rate! Consider investing more for long-term growth.\n"
            
            response += "2. Review your top spending categories:\n"
            for cat, amount in top_categories.items():
                percentage = (amount / total_expenses) * 100
                response += f"   - {cat}: ${amount:.2f} ({percentage:.1f}% of total)\n"
            
            response += "3. Follow the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings/debt.\n"
            response += "4. Build an emergency fund of 3-6 months of expenses.\n"
            response += "5. Regularly review and adjust your budget based on your goals.\n"
            
            return response
    
    def _handle_forecast_query(self, message: str) -> str:
        """Handle forecast-related queries"""
        # Simple linear projection based on current spending
        expenses_by_month = self.expenses_data.groupby(pd.to_datetime(self.expenses_data['date']).dt.to_period('M'))['amount'].sum()
        
        if len(expenses_by_month) >= 2:
            # Calculate average monthly change
            monthly_changes = expenses_by_month.diff().dropna()
            avg_monthly_change = monthly_changes.mean()
            
            # Project next month
            last_month_expenses = expenses_by_month.iloc[-1]
            next_month_projection = last_month_expenses + avg_monthly_change
            
            response = f"Based on your spending patterns, I project that next month's expenses will be around ${next_month_projection:.2f}. "
            
            if avg_monthly_change > 0:
                response += f"This is an increase of ${avg_monthly_change:.2f} from your current monthly spending. "
                response += "You might want to look for ways to reduce expenses."
            else:
                response += f"This is a decrease of ${-avg_monthly_change:.2f} from your current monthly spending. "
                response += "You're on the right track to reducing expenses!"
        else:
            # Not enough data for projection
            avg_monthly_expenses = self.expenses_data['amount'].sum() / 3  # Assuming 3 months
            response = f"Based on your average monthly expenses of ${avg_monthly_expenses:.2f}, "
            response += "I project similar spending next month if your habits remain consistent."
        
        # Add category-specific projections
        response += "\n\nCategory projections for next month:\n"
        for category in self.expenses_data['category'].unique():
            cat_expenses = self.expenses_data[self.expenses_data['category'] == category]['amount'].sum() / 3
            response += f"- {category}: ${cat_expenses:.2f}\n"
        
        return response
    
    def _handle_general_query(self) -> str:
        """Handle general queries"""
        responses = [
            "I can help you analyze your expenses, income, budget, and provide financial recommendations. What would you like to know?",
            "I'm your AI financial assistant. I can provide insights about your spending patterns, help with budgeting, or offer financial advice. How can I assist you today?",
            "You can ask me about your expenses by category, income sources, budget allocation, or request financial recommendations. What are you interested in?"
        ]
        return np.random.choice(responses)
    
    def _extract_time_period(self, message: str) -> Optional[str]:
        """Extract time period from message"""
        message = message.lower()
        
        if re.search(r'this month', message):
            return "this month"
        elif re.search(r'last month', message):
            return "last month"
        elif re.search(r'this year', message):
            return "this year"
        elif re.search(r'last year', message):
            return "last year"
        elif re.search(r'this week', message):
            return "this week"
        elif re.search(r'last week', message):
            return "last week"
        else:
            return None
    
    def _extract_category(self, message: str) -> Optional[str]:
        """Extract category from message"""
        message = message.lower()
        
        # List of categories
        categories = [
            "Housing", "Food", "Transportation", "Entertainment", 
            "Utilities", "Healthcare", "Shopping", "Education", 
            "Personal Care", "Travel", "Debt Payments", "Other"
        ]
        
        # Check for each category in the message
        for category in categories:
            if category.lower() in message:
                return category
        
        return None
    
    def _filter_expenses(self, time_period: Optional[str], category: Optional[str]) -> pd.DataFrame:
        """Filter expenses based on time period and category"""
        filtered_expenses = self.expenses_data.copy()
        
        # Filter by time period
        if time_period:
            if time_period == "this month":
                current_month = datetime.now().month
                current_year = datetime.now().year
                filtered_expenses = filtered_expenses[
                    (pd.to_datetime(filtered_expenses['date']).dt.month == current_month) &
                    (pd.to_datetime(filtered_expenses['date']).dt.year == current_year)
                ]
            elif time_period == "last month":
                last_month = (datetime.now().replace(day=1) - timedelta(days=1)).month
                current_year = datetime.now().year
                filtered_expenses = filtered_expenses[
                    (pd.to_datetime(filtered_expenses['date']).dt.month == last_month) &
                    (pd.to_datetime(filtered_expenses['date']).dt.year == current_year)
                ]
            elif time_period == "this year":
                current_year = datetime.now().year
                filtered_expenses = filtered_expenses[
                    pd.to_datetime(filtered_expenses['date']).dt.year == current_year
                ]
            elif time_period == "last year":
                last_year = datetime.now().year - 1
                filtered_expenses = filtered_expenses[
                    pd.to_datetime(filtered_expenses['date']).dt.year == last_year
                ]
            elif time_period == "this week":
                today = datetime.now()
                start_of_week = today - timedelta(days=today.weekday())
                filtered_expenses = filtered_expenses[
                    pd.to_datetime(filtered_expenses['date']) >= start_of_week
                ]
            elif time_period == "last week":
                today = datetime.now()
                start_of_last_week = today - timedelta(days=today.weekday() + 7)
                end_of_last_week = start_of_last_week + timedelta(days=6)
                filtered_expenses = filtered_expenses[
                    (pd.to_datetime(filtered_expenses['date']) >= start_of_last_week) &
                    (pd.to_datetime(filtered_expenses['date']) <= end_of_last_week)
                ]
        
        # Filter by category
        if category:
            filtered_expenses = filtered_expenses[filtered_expenses['category'] == category]
        
        return filtered_expenses
    
    def _get_savings_recommendations(self) -> str:
        """Generate savings recommendations"""
        # Calculate current savings
        total_income = self.income_data['amount'].sum()
        total_expenses = self.expenses_data['amount'].sum()
        savings = total_income - total_expenses
        savings_rate = (savings / total_income) * 100
        
        response = f"Your current savings rate is {savings_rate:.1f}% of your income. "
        
        if savings_rate < 20:
            response += "Here are some recommendations to increase your savings:\n\n"
            
            # Analyze discretionary spending
            discretionary_categories = ["Entertainment", "Shopping", "Travel", "Personal Care"]
            discretionary_spending = self.expenses_data[
                self.expenses_data['category'].isin(discretionary_categories)
            ]['amount'].sum()
            
            response += f"1. Reduce discretionary spending: You've spent ${discretionary_spending:.2f} on "
            response += "entertainment, shopping, travel, and personal care. Consider cutting back in these areas.\n"
            
            # Find highest expense category
            top_category = self.expenses_data.groupby('category')['amount'].sum().sort_values(ascending=False).index[0]
            top_category_amount = self.expenses_data[self.expenses_data['category'] == top_category]['amount'].sum()
            
            response += f"2. Review your {top_category} expenses: This is your highest spending category at ${top_category_amount:.2f}. "
            response += "Look for ways to reduce these costs.\n"
            
            response += "3. Implement the 50/30/20 rule: Allocate 50% of income to needs, 30% to wants, and 20% to savings.\n"
            response += "4. Set up automatic transfers to a savings account on payday.\n"
            response += "5. Consider using a budgeting app to track expenses and identify areas to cut back.\n"
        else:
            response += "You're doing great with saving! Here are some recommendations to optimize your savings:\n\n"
            response += "1. Make sure you have an emergency fund of 3-6 months of expenses.\n"
            response += "2. Consider investing some of your savings for long-term growth.\n"
            response += "3. Look into tax-advantaged accounts like IRAs or 401(k)s if you're not already using them.\n"
            response += "4. Set specific savings goals for major purchases or life events.\n"
            response += "5. Review your insurance coverage to ensure you're adequately protected.\n"
        
        return response
    
    def _get_budget_recommendations(self) -> str:
        """Generate budget recommendations"""
        # Calculate current spending by category
        category_spending = self.expenses_data.groupby('category')['amount'].sum()
        
        # Calculate total income and expenses
        total_income = self.income_data['amount'].sum()
        monthly_income = total_income / 3  # Assuming 3 months of data
        
        # Apply 50/30/20 rule
        needs_budget = monthly_income * 0.5
        wants_budget = monthly_income * 0.3
        savings_budget = monthly_income * 0.2
        
        # Categorize spending into needs, wants, and savings
        needs_categories = ["Housing", "Food", "Transportation", "Utilities", "Healthcare", "Debt Payments"]
        wants_categories = ["Entertainment", "Shopping", "Personal Care", "Travel"]
        
        # Calculate current spending on needs and wants
        needs_spending = sum(category_spending.get(cat, 0) for cat in needs_categories) / 3
        wants_spending = sum(category_spending.get(cat, 0) for cat in wants_categories) / 3
        
        # Generate response
        response = "Here are budget recommendations based on the 50/30/20 rule:\n\n"
        
        response += "Needs (50% of income):\n"
        response += f"- Recommended: ${needs_budget:.2f} per month\n"
        response += f"- Current spending: ${needs_spending:.2f} per month\n"
        if needs_spending > needs_budget:
            response += f"- You're overspending on needs by ${needs_spending - needs_budget:.2f} per month\n"
        else:
            response += f"- You're within budget for needs (${needs_budget - needs_spending:.2f} under budget)\n"
        
        response += "\nWants (30% of income):\n"
        response += f"- Recommended: ${wants_budget:.2f} per month\n"
        response += f"- Current spending: ${wants_spending:.2f} per month\n"
        if wants_spending > wants_budget:
            response += f"- You're overspending on wants by ${wants_spending - wants_budget:.2f} per month\n"
        else:
            response += f"- You're within budget for wants (${wants_budget - wants_spending:.2f} under budget)\n"
        
        response += "\nSavings (20% of income):\n"
        response += f"- Recommended: ${savings_budget:.2f} per month\n"
        
        # Calculate actual savings
        actual_savings = monthly_income - needs_spending - wants_spending
        response += f"- Current savings: ${actual_savings:.2f} per month\n"
        if actual_savings < savings_budget:
            response += f"- You're under your savings target by ${savings_budget - actual_savings:.2f} per month\n"
        else:
            response += f"- You're exceeding your savings target by ${actual_savings - savings_budget:.2f} per month\n"
        
        return response

# Example usage
if __name__ == "__main__":
    chatbot = FinanceChatbot(user_id="user123")
    
    # Test some queries
    print("User: Hello")
    print("Bot:", chatbot.process_message("Hello"))
    
    print("\nUser: What are my expenses this month?")
    print("Bot:", chatbot.process_message("What are my expenses this month?"))
    
    print("\nUser: How much did I spend on food?")
    print("Bot:", chatbot.process_message("How much did I spend on food?"))
    
    print("\nUser: What's my budget for housing?")
    print("Bot:", chatbot.process_message("What's my budget for housing?"))
    
    print("\nUser: Can you give me some investment advice?")
    print("Bot:", chatbot.process_message("Can you give me some investment advice?"))

