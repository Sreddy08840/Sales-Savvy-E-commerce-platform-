import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { ShoppingBag, User as UserIcon, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

const navCls = ({ isActive }: { isActive: boolean }) =>
  `eyebrow transition-colors hover:text-ink ${isActive ? "text-ink" : "text-muted-foreground"}`;

const Layout = () => {
  const { user, signOut } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-40">
        <div className="container flex items-center justify-between h-20">
          <Link to="/" className="font-display text-2xl tracking-tight">
            Sales <span className="italic text-terracotta">Savvy</span>
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            <NavLink to="/shop" className={navCls}>Shop</NavLink>
            <NavLink to="/shop?category=apparel" className={navCls}>Apparel</NavLink>
            <NavLink to="/shop?category=home" className={navCls}>Home</NavLink>
            <NavLink to="/shop?category=objects" className={navCls}>Objects</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Button variant="ghost" size="icon" onClick={() => navigate("/account")} aria-label="Account">
                  <UserIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={signOut} aria-label="Sign out">
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button variant="ghost" onClick={() => navigate("/auth")} className="eyebrow">
                Sign in
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => navigate("/cart")} aria-label="Cart" className="relative">
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-terracotta text-accent-foreground text-[10px] font-medium rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border/60 mt-24">
        <div className="container py-16 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="font-display text-3xl mb-3">Sales <span className="italic text-terracotta">Savvy</span></div>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              A small studio for considered objects. Slow-made, honestly priced, built to last.
            </p>
          </div>
          <div>
            <div className="eyebrow text-muted-foreground mb-4">Shop</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop?category=apparel" className="hover:text-terracotta">Apparel</Link></li>
              <li><Link to="/shop?category=home" className="hover:text-terracotta">Home</Link></li>
              <li><Link to="/shop?category=objects" className="hover:text-terracotta">Objects</Link></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow text-muted-foreground mb-4">Studio</div>
            <ul className="space-y-2 text-sm">
              <li>About</li>
              <li>Journal</li>
              <li>Stockists</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/60">
          <div className="container py-6 text-xs text-muted-foreground flex justify-between">
            <span>© {new Date().getFullYear()} Sales Savvy</span>
            <span>Made with care</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
