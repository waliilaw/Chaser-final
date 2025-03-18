import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
from typing import Dict, List, Tuple, Optional, Any
import json

class FinanceAnalyzer:
    """
    A class for analyzing financial data, including expenses, income, and budgets.
    This class provides methods for categorizing expenses, tracking spending over time,
    and generating insights about financial patterns.
    """
    
    def __init__(self, user_id: str):
        """
        Initialize the FinanceAnalyzer with a user ID.
        
        Args:
            user_id: The unique identifier for the user
        """
        self.user_id = user_id
        self.expenses = []
        self.income = []
        self.budget = {}
        self.categories = [
            "Housing", "Food", "Transportation", "Entertainment", 
            "Utilities", "Healthcare", "Shopping", "Education", 
            "Personal Care", "Travel", "Debt Payments", "Other"
        ]
    
    def load_data(self, expenses_file: Optional[str] = None, income_file: Optional[str] = None) -> None:
        """
        Load financial data from files or use mock data if files are not provided.
        
        Args:
            expenses_file: Path to the expenses CSV file
            income_file: Path to the income CSV file
        """
        if expenses_file:
            try:
                self.expenses = pd.read_csv(expenses_file)
            except Exception as e:
                print(f"Error loading expenses file: {e}")
                self.expenses = self._generate_mock_expenses()
        else:
            self.expenses = self._generate_mock_expenses()
            
        if income_file:
            try:
                self.income = pd.read_csv(income_file)
            except Exception as e:
                print(f"Error loading income file: {e}")
                self.income = self._generate_mock_income()
        else:
            self.income = self._generate_mock_income()
    
    def _generate_mock_expenses(self) -> pd.DataFrame:
        """
        Generate mock expense data for testing and demonstration.
        
        Returns:
            DataFrame containing mock expense data
        """
        # Create date range for the last 90 days
        end_date = datetime.now()
        start_date = end_date - timedelta(days=90)
        dates = pd.date_range(start=start_date, end=end_date, freq='D')
        
        # Generate random expenses
        num_expenses = 150
        random_dates = np.random.choice(dates, size=num_expenses)
        random_categories = np.random.choice(self.categories, size=num_expenses, p=[
            0.25, 0.20, 0.10, 0.08, 0.10, 0.05, 0.07, 0.03, 0.04, 0.03, 0.03, 0.02
        ])
        
        # Generate amounts based on category (more realistic)
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
        merchants = []
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
        
        # Create DataFrame
        expenses_df = pd.DataFrame({
            'date': random_dates,
            'amount': amounts,
            'category': random_categories,
            'merchant': merchants,
            'user_id': self.user_id
        })
        
        # Add descriptions based on merchant and category
        descriptions = []
        for _, row in expenses_df.iterrows():
            descriptions.append(f"{row['category']} - {row['merchant']}")
        
        expenses_df['description'] = descriptions
        
        # Sort by date
        expenses_df = expenses_df.sort_values('date')
        
        return expenses_df
    
    def _generate_mock_income(self) -> pd.DataFrame:
        """
        Generate mock income data for testing and demonstration.
        
        Returns:
            DataFrame containing mock income data
        """
        # Create date range for the last 90 days
        end_date = datetime.now()
        start_date = end_date - timedelta(days=90)
        
        # Generate monthly salary income
        salary_dates = pd.date_range(start=start_date, end=end_date, freq='MS')  # Month Start
        salary_amounts = np.random.uniform(3000, 5000, size=len(salary_dates))
        salary_df = pd.DataFrame({
            'date': salary_dates,
            'amount': salary_amounts,
            'source': 'Salary',
            'description': 'Monthly Salary',
            'user_id': self.user_id
        })
        
        # Generate some random additional income (freelance, etc.)
        num_additional = np.random.randint(3, 8)
        additional_dates = np.random.choice(pd.date_range(start=start_date, end=end_date, freq='D'), size=num_additional)
        additional_amounts = np.random.uniform(100, 1000, size=num_additional)
        additional_sources = np.random.choice(['Freelance', 'Interest', 'Gift', 'Refund', 'Other'], size=num_additional)
        
        additional_df = pd.DataFrame({
            'date': additional_dates,
            'amount': additional_amounts,
            'source': additional_sources,
            'description': [f"Income from {source}" for source in additional_sources],
            'user_id': self.user_id
        })
        
        # Combine and sort
        income_df = pd.concat([salary_df, additional_df])
        income_df = income_df.sort_values('date')
        
        return income_df
    
    def analyze_expenses_by_category(self, start_date: Optional[str] = None, end_date: Optional[str] = None) -> Dict[str, float]:
        """
        Analyze expenses by category within a date range.
        
        Args:
            start_date: Start date for analysis (format: 'YYYY-MM-DD')
            end_date: End date for analysis (format: 'YYYY-MM-DD')
            
        Returns:
            Dictionary mapping categories to total expenses
        """
        df = self.expenses.copy()
        
        # Filter by date range if provided
        if start_date:
            df = df[df['date'] >= start_date]
        if end_date:
            df = df[df['date'] <= end_date]
        
        # Group by category and sum amounts
        category_totals = df.groupby('category')['amount'].sum().to_dict()
        
        return category_totals
    
    def analyze_expenses_over_time(self, frequency: str = 'W') -> pd.DataFrame:
        """
        Analyze expenses over time with specified frequency.
        
        Args:
            frequency: Frequency for grouping ('D' for daily, 'W' for weekly, 'M' for monthly)
            
        Returns:
            DataFrame with expenses aggregated by time period
        """
        df = self.expenses.copy()
        
        # Convert date to datetime if it's not already
        if not pd.api.types.is_datetime64_any_dtype(df['date']):
            df['date'] = pd.to_datetime(df['date'])
        
        # Group by date with specified frequency and sum amounts
        expenses_over_time = df.groupby(pd.Grouper(key='date', freq=frequency))['amount'].sum().reset_index()
        
        return expenses_over_time
    
    def analyze_income_vs_expenses(self, frequency: str = 'M') -> pd.DataFrame:
        """
        Compare income and expenses over time.
        
        Args:
            frequency: Frequency for grouping ('W' for weekly, 'M' for monthly)
            
        Returns:
            DataFrame with income, expenses, and savings by time period
        """
        # Prepare expenses
        expenses_df = self.expenses.copy()
        if not pd.api.types.is_datetime64_any_dtype(expenses_df['date']):
            expenses_df['date'] = pd.to_datetime(expenses_df['date'])
        
        expenses_by_period = expenses_df.groupby(pd.Grouper(key='date', freq=frequency))['amount'].sum()
        
        # Prepare income
        income_df = self.income.copy()
        if not pd.api.types.is_datetime64_any_dtype(income_df['date']):
            income_df['date'] = pd.to_datetime(income_df['date'])
        
        income_by_period = income_df.groupby(pd.Grouper(key='date', freq=frequency))['amount'].sum()
        
        # Combine into a single DataFrame
        comparison = pd.DataFrame({
            'income': income_by_period,
            'expenses': expenses_by_period
        }).fillna(0)
        
        # Calculate savings
        comparison['savings'] = comparison['income'] - comparison['expenses']
        
        return comparison
    
    def get_top_merchants(self, n: int = 5) -> pd.DataFrame:
        """
        Get the top merchants by total spending.
        
        Args:
            n: Number of top merchants to return
            
        Returns:
            DataFrame with top merchants and their total amounts
        """
        merchant_totals = self.expenses.groupby('merchant')['amount'].sum().reset_index()
        top_merchants = merchant_totals.sort_values('amount', ascending=False).head(n)
        
        return top_merchants
    
    def predict_monthly_expenses(self) -> Dict[str, float]:
        """
        Predict expenses for the next month based on historical data.
        
        Returns:
            Dictionary with predicted expenses by category
        """
        # Get expenses from the last 3 months
        three_months_ago = datetime.now() - timedelta(days=90)
        recent_expenses = self.expenses[pd.to_datetime(self.expenses['date']) >= three_months_ago]
        
        # Group by category and calculate average monthly spending
        monthly_avg = recent_expenses.groupby('category')['amount'].sum() / 3
        
        # Create prediction dictionary
        predictions = monthly_avg.to_dict()
        
        return predictions
    
    def generate_budget_recommendations(self) -> Dict[str, float]:
        """
        Generate budget recommendations based on income and historical spending.
        
        Returns:
            Dictionary with recommended budget amounts by category
        """
        # Calculate average monthly income
        monthly_income = self.income['amount'].sum() / 3  # Assuming 3 months of data
        
        # Get average monthly expenses by category
        monthly_expenses = self.predict_monthly_expenses()
        
        # Apply 50/30/20 rule (50% needs, 30% wants, 20% savings)
        needs_categories = ["Housing", "Food", "Transportation", "Utilities", "Healthcare", "Debt Payments"]
        wants_categories = ["Entertainment", "Shopping", "Personal Care", "Travel"]
        savings_amount = monthly_income * 0.2
        
        # Calculate current spending on needs and wants
        current_needs = sum(monthly_expenses.get(cat, 0) for cat in needs_categories)
        current_wants = sum(monthly_expenses.get(cat, 0) for cat in wants_categories)
        
        # Calculate target spending
        target_needs = monthly_income * 0.5
        target_wants = monthly_income * 0.3
        
        # Adjust budget recommendations
        budget_recommendations = {}
        
        # Adjust needs categories
        if current_needs > 0:
            needs_adjustment_factor = target_needs / current_needs
            for cat in needs_categories:
                if cat in monthly_expenses:
                    budget_recommendations[cat] = monthly_expenses[cat] * needs_adjustment_factor
        
        # Adjust wants categories
        if current_wants > 0:
            wants_adjustment_factor = target_wants / current_wants
            for cat in wants_categories:
                if cat in monthly_expenses:
                    budget_recommendations[cat] = monthly_expenses[cat] * wants_adjustment_factor
        
        # Add savings category
        budget_recommendations["Savings"] = savings_amount
        
        return budget_recommendations
    
    def export_data_to_json(self, filename: str) -> None:
        """
        Export financial data to a JSON file.
        
        Args:
            filename: Name of the output JSON file
        """
        # Prepare data for export
        export_data = {
            "user_id": self.user_id,
            "expenses": self.expenses.to_dict(orient='records'),
            "income": self.income.to_dict(orient='records'),
            "analysis": {
                "expenses_by_category": self.analyze_expenses_by_category(),
                "top_merchants": self.get_top_merchants().to_dict(orient='records'),
                "predicted_expenses": self.predict_monthly_expenses(),
                "budget_recommendations": self.generate_budget_recommendations()
            }
        }
        
        # Write to file
        with open(filename, 'w') as f:
            json.dump(export_data, f, indent=2, default=str)
    
    def generate_expense_report(self, start_date: Optional[str] = None, end_date: Optional[str] = None) -> Dict[str, Any]:
        """
        Generate a comprehensive expense report for a specified date range.
        
        Args:
            start_date: Start date for the report (format: 'YYYY-MM-DD')
            end_date: End date for the report (format: 'YYYY-MM-DD')
            
        Returns:
            Dictionary containing the expense report data
        """
        # Filter expenses by date range
        df = self.expenses.copy()
        if start_date:
            df = df[pd.to_datetime(df['date']) >= pd.to_datetime(start_date)]
        if end_date:
            df = df[pd.to_datetime(df['date']) <= pd.to_datetime(end_date)]
        
        # Calculate total expenses
        total_expenses = df['amount'].sum()
        
        # Expenses by category
        expenses_by_category = df.groupby('category')['amount'].sum().to_dict()
        
        # Expenses by merchant
        expenses_by_merchant = df.groupby('merchant')['amount'].sum().sort_values(ascending=False).head(10).to_dict()
        
        # Daily expenses
        daily_expenses = df.groupby(pd.to_datetime(df['date']).dt.date)['amount'].sum().to_dict()
        
        # Compile report
        report = {
            "start_date": start_date or df['date'].min(),
            "end_date": end_date or df['date'].max(),
            "total_expenses": total_expenses,
            "expenses_by_category": expenses_by_category,
            "expenses_by_merchant": expenses_by_merchant,
            "daily_expenses": daily_expenses,
            "transaction_count": len(df)
        }
        
        return report

# Example usage
if __name__ == "__main__":
    analyzer = FinanceAnalyzer(user_id="user123")
    analyzer.load_data()
    
    # Print some analysis
    print("Expenses by Category:")
    print(analyzer.analyze_expenses_by_category())
    
    print("\nTop 5 Merchants:")
    print(analyzer.get_top_merchants())
    
    print("\nBudget Recommendations:")
    print(analyzer.generate_budget_recommendations())
    
    # Export data
    analyzer.export_data_to_json("financial_analysis.json")
    
    print("\nData exported to financial_analysis.json")

