
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Mail, 
  Linkedin, 
  PieChart, 
  Settings,
  ChevronRight,
  PanelLeft,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isCollapsed: boolean;
  badge?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  path, 
  isCollapsed,
  badge
}) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  
  const LinkContent = (
    <div className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 group",
      isActive 
        ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium" 
        : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
    )}>
      <div className="flex-shrink-0">
        {icon}
      </div>
      
      {!isCollapsed && (
        <div className="flex flex-1 items-center justify-between">
          <span className={cn(
            "transition-all duration-300",
            isCollapsed ? "opacity-0 w-0" : "opacity-100"
          )}>
            {label}
          </span>
          
          {badge !== undefined && (
            <Badge variant="default" className="ml-auto bg-primary text-white text-xs font-medium">
              {badge}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
  
  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to={path} className="block w-full">
              {LinkContent}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="glass-card font-medium">
            {label}
            {badge !== undefined && (
              <Badge variant="default" className="ml-2 bg-primary text-white text-xs">
                {badge}
              </Badge>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return <Link to={path} className="block w-full">{LinkContent}</Link>;
};

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  return (
    <aside className={cn(
      "bg-sidebar h-screen flex flex-col border-r border-r-sidebar-border/40 transition-all duration-300 ease-in-out z-20",
      isCollapsed ? "w-16" : "w-60"
    )}>
      <div className="h-16 flex items-center px-3 border-b border-b-sidebar-border/40">
        <div className={cn(
          "font-bold text-2xl text-white transition-all duration-300 flex items-center",
          isCollapsed ? "justify-center w-full" : "justify-between w-full"
        )}>
          {isCollapsed ? (
            <span className="text-primary">L</span>
          ) : (
            <>
              <span>Lead<span className="text-primary">Nectar</span></span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onToggle}
                className="text-sidebar-foreground hover:bg-sidebar-accent rounded-full"
              >
                <PanelLeft className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
      
      <div className="flex-1 py-4 px-2 overflow-auto">
        <nav className="space-y-1">
          <SidebarItem 
            icon={<LayoutDashboard className="h-5 w-5" />} 
            label="Tableau de bord" 
            path="/dashboard" 
            isCollapsed={isCollapsed} 
          />
          <SidebarItem 
            icon={<Users className="h-5 w-5" />} 
            label="Contacts" 
            path="/contacts" 
            isCollapsed={isCollapsed}
            badge={5}
          />
          <SidebarItem 
            icon={<Mail className="h-5 w-5" />} 
            label="Campagnes" 
            path="/campaigns" 
            isCollapsed={isCollapsed} 
          />
          <SidebarItem 
            icon={<Linkedin className="h-5 w-5" />} 
            label="LinkedIn" 
            path="/linkedin" 
            isCollapsed={isCollapsed} 
          />
          <SidebarItem 
            icon={<PieChart className="h-5 w-5" />} 
            label="Pipeline" 
            path="/pipeline" 
            isCollapsed={isCollapsed} 
          />
        </nav>
      </div>
      
      <div className="mt-auto border-t border-t-sidebar-border/40 py-4 px-2">
        <nav className="space-y-1">
          <SidebarItem 
            icon={<Settings className="h-5 w-5" />} 
            label="Paramètres" 
            path="/settings" 
            isCollapsed={isCollapsed} 
          />
          <SidebarItem 
            icon={<Shield className="h-5 w-5" />} 
            label="Administration" 
            path="/admin" 
            isCollapsed={isCollapsed} 
          />
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
