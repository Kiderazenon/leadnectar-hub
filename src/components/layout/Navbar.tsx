
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, Search, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface NavbarProps {
  onMenuToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { user, profile, signOut } = useAuth();
  
  // Obtenir les initiales du nom de l'utilisateur
  const getInitials = () => {
    if (profile?.firstname && profile?.lastname) {
      return `${profile.firstname[0]}${profile.lastname[0]}`.toUpperCase();
    } else if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };
  
  // Obtenir le nom complet de l'utilisateur
  const getFullName = () => {
    if (profile?.firstname && profile?.lastname) {
      return `${profile.firstname} ${profile.lastname}`;
    } else if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'Utilisateur';
  };

  return (
    <nav className="glass border-b border-b-border/40 sticky top-0 z-30 w-full">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="md:hidden transition-all duration-300 hover:bg-accent"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className={cn(
            "flex items-center transition-all duration-300",
            isSearchExpanded ? "w-full" : "w-auto"
          )}>
            <div className={cn(
              "relative transition-all duration-300 ease-in-out",
              isSearchExpanded ? "w-full" : "w-[180px] md:w-[240px]"
            )}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-9 h-9 w-full bg-secondary/80 border-none focus-visible:ring-primary/20 rounded-full transition-all"
                onFocus={() => setIsSearchExpanded(true)}
                onBlur={() => setIsSearchExpanded(false)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <Button variant="ghost" size="icon" className="rounded-full transition-all duration-300 hover:bg-accent">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="rounded-full transition-all duration-300 hover:bg-accent">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="gap-2 rounded-full transition-all duration-300 hover:bg-accent"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-primary text-white font-medium">{getInitials()}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block font-medium">{getFullName()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass w-52">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/settings">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
              </Link>
              <Link to="/settings">
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive" onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Se déconnecter</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
