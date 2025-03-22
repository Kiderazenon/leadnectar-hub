
import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Users, 
  Mail, 
  MessageSquare, 
  DollarSign 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  colorClass?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change,
  colorClass = "bg-primary/10" 
}) => {
  return (
    <div className="glass-card p-6 animate-scale-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h4 className="text-2xl font-semibold mt-1">{value}</h4>
          
          {change && (
            <div className="flex items-center gap-1 mt-2">
              <span className={cn(
                "text-xs font-medium flex items-center",
                change.isPositive ? "text-green-500" : "text-red-500"
              )}>
                {change.isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {change.value}%
              </span>
              <span className="text-xs text-muted-foreground">
                depuis le mois dernier
              </span>
            </div>
          )}
        </div>
        
        <div className={cn(
          "p-3 rounded-lg",
          colorClass
        )}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        title="Nouveaux leads" 
        value="243" 
        icon={<Users className="h-5 w-5 text-primary" />}
        change={{ value: 12, isPositive: true }}
        colorClass="bg-primary/10"
      />
      
      <StatCard 
        title="Emails envoyés" 
        value="1,432" 
        icon={<Mail className="h-5 w-5 text-blue-500" />}
        change={{ value: 8, isPositive: true }}
        colorClass="bg-blue-500/10"
      />
      
      <StatCard 
        title="Taux de réponse" 
        value="24%" 
        icon={<MessageSquare className="h-5 w-5 text-violet-500" />}
        change={{ value: 2, isPositive: false }}
        colorClass="bg-violet-500/10"
      />
      
      <StatCard 
        title="Revenus générés" 
        value="€12,430" 
        icon={<DollarSign className="h-5 w-5 text-green-500" />}
        change={{ value: 18, isPositive: true }}
        colorClass="bg-green-500/10"
      />
    </div>
  );
};

export default DashboardStats;
