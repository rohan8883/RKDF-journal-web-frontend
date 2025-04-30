import{ useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription,  
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AreaChart, 
  BarChart, 
  PieChart, 
  LineChart 
} from 'recharts';
import { 
  Area, 
  Bar, 
  CartesianGrid, 
  Cell, 
  Legend, 
  Line,
  Pie, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { 
  BadgeDollarSign,
  CreditCard, 
  DollarSign, 
  Home, 
  // LineChart as LineChartIcon,
  // PieChart as PieChartIcon,
  TrendingUp,
} from 'lucide-react';

// Define types for our data structures
interface LoanSummaryItem {
  name: string;
  value: number;
  amount: number;
  count: number;
  color: string;
}

interface MonthlyDistributionItem {
  month: string;
  mortgage: number;
  personal: number;
  auto: number;
  business: number;
  education: number;
}

interface RiskDistributionItem {
  riskCategory: string;
  percentage: number;
  amount: number;
  color: string;
}

interface RegionDistributionItem {
  region: string;
  mortgage: number;
  personal: number;
  auto: number;
  business: number;
  education: number;
}

interface InterestRateTrendItem {
  month: string;
  mortgage: number;
  personal: number;
  auto: number;
  business: number;
  education: number;
}

interface BorrowerIncomeItem {
  name: string;
  value: number;
  color: string;
}

interface BorrowerAgeItem {
  age: string;
  value: number;
}

interface DelinquencyRateItem {
  type: string;
  '30days': number;
  '60days': number;
  '90days': number;
}

 

type TimeRangeOption = '1m' | '3m' | '6m' | '1y' | '3y';
type LoanTypeOption = 'all' | 'mortgage' | 'personal' | 'auto' | 'business' | 'education';

export default function home() {
  const [timeRange, setTimeRange] = useState<TimeRangeOption>('1y');
  const [loanType, setLoanType] = useState<LoanTypeOption>('all');
  
  // Sample data - in a real app, this would come from your API
  const loanSummaryData: LoanSummaryItem[] = [
    { name: 'Mortgage', value: 45, amount: 12450000, count: 425, color: '#0088FE' },
    { name: 'Personal', value: 25, amount: 3250000, count: 820, color: '#00C49F' },
    { name: 'Auto', value: 15, amount: 2150000, count: 530, color: '#FFBB28' },
    { name: 'Business', value: 12, amount: 5680000, count: 125, color: '#FF8042' },
    { name: 'Education', value: 3, amount: 875000, count: 210, color: '#8884d8' }
  ];
  
  const monthlyDistributionData: MonthlyDistributionItem[] = [
    { month: 'Jan', mortgage: 980000, personal: 250000, auto: 180000, business: 420000, education: 75000 },
    { month: 'Feb', mortgage: 1050000, personal: 270000, auto: 175000, business: 460000, education: 72000 },
    { month: 'Mar', mortgage: 1120000, personal: 290000, auto: 190000, business: 480000, education: 78000 },
    { month: 'Apr', mortgage: 990000, personal: 310000, auto: 195000, business: 510000, education: 80000 },
    { month: 'May', mortgage: 1080000, personal: 320000, auto: 210000, business: 490000, education: 76000 },
    { month: 'Jun', mortgage: 1150000, personal: 325000, auto: 225000, business: 520000, education: 79000 },
    { month: 'Jul', mortgage: 1040000, personal: 340000, auto: 215000, business: 540000, education: 82000 },
    { month: 'Aug', mortgage: 1020000, personal: 310000, auto: 190000, business: 510000, education: 74000 },
    { month: 'Sep', mortgage: 1070000, personal: 290000, auto: 180000, business: 480000, education: 70000 },
    { month: 'Oct', mortgage: 1100000, personal: 280000, auto: 185000, business: 500000, education: 68000 },
    { month: 'Nov', mortgage: 1160000, personal: 270000, auto: 190000, business: 530000, education: 71000 },
    { month: 'Dec', mortgage: 1200000, personal: 295000, auto: 205000, business: 560000, education: 80000 }
  ];
  
  const riskDistributionData: RiskDistributionItem[] = [
    { riskCategory: 'Low Risk', percentage: 45, amount: 8750000, color: '#4CAF50' },
    { riskCategory: 'Medium Risk', percentage: 38, amount: 7250000, color: '#FFC107' },
    { riskCategory: 'High Risk', percentage: 17, amount: 3500000, color: '#F44336' }
  ];
  
  const regionDistributionData: RegionDistributionItem[] = [
    { region: 'North', mortgage: 3250000, personal: 980000, auto: 580000, business: 1450000, education: 280000 },
    { region: 'South', mortgage: 4120000, personal: 1150000, auto: 720000, business: 1680000, education: 320000 },
    { region: 'East', mortgage: 2780000, personal: 680000, auto: 450000, business: 1250000, education: 150000 },
    { region: 'West', mortgage: 2300000, personal: 440000, auto: 400000, business: 1300000, education: 125000 }
  ];
  
  const interestRateTrendData: InterestRateTrendItem[] = [
    { month: 'Jan', mortgage: 4.25, personal: 9.8, auto: 5.2, business: 7.1, education: 6.4 },
    { month: 'Feb', mortgage: 4.28, personal: 9.7, auto: 5.3, business: 7.0, education: 6.3 },
    { month: 'Mar', mortgage: 4.30, personal: 9.7, auto: 5.2, business: 7.2, education: 6.2 },
    { month: 'Apr', mortgage: 4.32, personal: 9.8, auto: 5.1, business: 7.3, education: 6.3 },
    { month: 'May', mortgage: 4.35, personal: 9.9, auto: 5.0, business: 7.4, education: 6.4 },
    { month: 'Jun', mortgage: 4.38, personal: 9.8, auto: 5.2, business: 7.3, education: 6.5 },
    { month: 'Jul', mortgage: 4.40, personal: 9.7, auto: 5.3, business: 7.2, education: 6.4 },
    { month: 'Aug', mortgage: 4.45, personal: 9.6, auto: 5.4, business: 7.1, education: 6.3 },
    { month: 'Sep', mortgage: 4.50, personal: 9.7, auto: 5.5, business: 7.0, education: 6.2 },
    { month: 'Oct', mortgage: 4.48, personal: 9.8, auto: 5.4, business: 7.1, education: 6.1 },
    { month: 'Nov', mortgage: 4.45, personal: 9.9, auto: 5.3, business: 7.2, education: 6.2 },
    { month: 'Dec', mortgage: 4.42, personal: 9.8, auto: 5.2, business: 7.3, education: 6.3 }
  ];
  
  const borrowerIncomeData: BorrowerIncomeItem[] = [
    { name: 'Low Income', value: 22, color: '#e53935' },
    { name: 'Middle Income', value: 45, color: '#43a047' },
    { name: 'High Income', value: 33, color: '#1e88e5' }
  ];
  
  const borrowerAgeData: BorrowerAgeItem[] = [
    { age: '18-24', value: 8 },
    { age: '25-34', value: 28 },
    { age: '35-44', value: 32 },
    { age: '45-54', value: 22 },
    { age: '55-64', value: 7 },
    { age: '65+', value: 3 }
  ];
  
  const delinquencyRatesData: DelinquencyRateItem[] = [
    { type: 'Mortgage', '30days': 1.2, '60days': 0.7, '90days': 0.4 },
    { type: 'Personal', '30days': 3.8, '60days': 2.1, '90days': 1.2 },
    { type: 'Auto', '30days': 2.5, '60days': 1.6, '90days': 0.9 },
    { type: 'Business', '30days': 1.8, '60days': 0.9, '90days': 0.5 },
    { type: 'Education', '30days': 4.2, '60days': 2.5, '90days': 1.4 }
  ];
  

  const totalLoanAmount: number = loanSummaryData.reduce((sum, item) => sum + item.amount, 0);
  const totalLoanCount: number = loanSummaryData.reduce((sum, item) => sum + item.count, 0);
  const avgInterestRate: number = 5.8; // Sample average interest rate
  
  // Calculate top performing loan type
  const topLoanType: LoanSummaryItem = [...loanSummaryData].sort((a, b) => b.amount - a.amount)[0];
  
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Loan Distribution Analytics</h1>
        <div className="flex items-center gap-4">
          <Select value={loanType} onValueChange={(value: LoanTypeOption) => setLoanType(value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Loan Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Loans</SelectItem>
              <SelectItem value="mortgage">Mortgage</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="auto">Auto</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeRange} onValueChange={(value: TimeRangeOption) => setTimeRange(value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
              <SelectItem value="3y">Last 3 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalLoanAmount / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
              +8.2% from last period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLoanCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
              +5.4% from last period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Interest Rate</CardTitle>
            <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgInterestRate}%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
              +0.3% from last period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Top Loan Type</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topLoanType.name}</div>
            <p className="text-xs text-muted-foreground">
              {topLoanType.value}% of portfolio
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 w-full md:w-1/2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          {/* Loan Distribution by Type */}
          <Card>
            <CardHeader>
              <CardTitle>Loan Distribution by Type</CardTitle>
              <CardDescription>Portfolio breakdown by loan category</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={loanSummaryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {loanSummaryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                {loanSummaryData.map((loan) => (
                  <div key={loan.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: loan.color }}></div>
                        <span className="text-sm font-medium">{loan.name}</span>
                      </div>
                      <span className="text-sm font-medium">${(loan.amount / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: `${loan.value}%`, backgroundColor: loan.color }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{loan.count} loans</span>
                      <span>{loan.value}% of portfolio</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Monthly Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Loan Distribution</CardTitle>
              <CardDescription>Loan amount distribution by month and type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyDistributionData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value:any) => `$${(value / 1000).toFixed(0)}K`} />
                    <Legend />
                    <Area type="monotone" dataKey="mortgage" stackId="1" stroke="#0088FE" fill="#0088FE" name="Mortgage" />
                    <Area type="monotone" dataKey="personal" stackId="1" stroke="#00C49F" fill="#00C49F" name="Personal" />
                    <Area type="monotone" dataKey="auto" stackId="1" stroke="#FFBB28" fill="#FFBB28" name="Auto" />
                    <Area type="monotone" dataKey="business" stackId="1" stroke="#FF8042" fill="#FF8042" name="Business" />
                    <Area type="monotone" dataKey="education" stackId="1" stroke="#8884d8" fill="#8884d8" name="Education" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="distribution" className="space-y-4 mt-4">
          {/* Regional Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Regional Loan Distribution</CardTitle>
              <CardDescription>Loan amounts by region and loan type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={regionDistributionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip formatter={(value:any) => `$${(value / 1000000).toFixed(2)}M`} />
                    <Legend />
                    <Bar dataKey="mortgage" name="Mortgage" stackId="a" fill="#0088FE" />
                    <Bar dataKey="personal" name="Personal" stackId="a" fill="#00C49F" />
                    <Bar dataKey="auto" name="Auto" stackId="a" fill="#FFBB28" />
                    <Bar dataKey="business" name="Business" stackId="a" fill="#FF8042" />
                    <Bar dataKey="education" name="Education" stackId="a" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Customer Demographics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Borrower Income Distribution</CardTitle>
                <CardDescription>Loan distribution by borrower income level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={borrowerIncomeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {borrowerIncomeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Borrower Age Distribution</CardTitle>
                <CardDescription>Loan distribution by borrower age group</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={borrowerAgeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Bar dataKey="value" name="Percentage" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="risk" className="space-y-4 mt-4">
          {/* Risk Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Loan Risk Analysis</CardTitle>
              <CardDescription>Distribution of loans by risk category</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                      label={({ riskCategory, percent }) => `${riskCategory}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {riskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-6">
                {riskDistributionData.map((risk) => (
                  <div key={risk.riskCategory} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: risk.color }}></div>
                        <span className="text-sm font-medium">{risk.riskCategory}</span>
                      </div>
                      <span className="text-sm font-medium">${(risk.amount / 1000000).toFixed(2)}M</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: `${risk.percentage}%`, backgroundColor: risk.color }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{risk.percentage}% of portfolio</span>
                      <span>Avg. interest: {(risk.riskCategory === 'Low Risk' ? 4.5 : risk.riskCategory === 'Medium Risk' ? 6.2 : 8.7).toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Delinquency Rates */}
          <Card>
            <CardHeader>
              <CardTitle>Delinquency Rates by Loan Type</CardTitle>
              <CardDescription>Late payment statistics across loan categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={delinquencyRatesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Bar dataKey="30days" name="30+ Days Late" fill="#ffb74d" />
                    <Bar dataKey="60days" name="60+ Days Late" fill="#ff9800" />
                    <Bar dataKey="90days" name="90+ Days Late" fill="#f57c00" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-4 mt-4">
          {/* Interest Rate Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Interest Rate Trends</CardTitle>
              <CardDescription>Average interest rates by loan type over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={interestRateTrendData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 'dataMax + 1']} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Line type="monotone" dataKey="mortgage" name="Mortgage" stroke="#0088FE" dot={{ r: 1 }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="personal" name="Personal" stroke="#00C49F" dot={{ r: 1 }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="auto" name="Auto" stroke="#FFBB28" dot={{ r: 1 }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="business" name="Business" stroke="#FF8042" dot={{ r: 1 }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="education" name="Education" stroke="#8884d8" dot={{ r: 1 }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          </TabsContent>
          </Tabs>
          </div>
  )}
 