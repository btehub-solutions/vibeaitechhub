import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-primary font-bold text-2xl">404</span>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-foreground">Page not found</h1>
          <p className="mb-8 text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button variant="hero" asChild className="gap-2">
            <a href="/">
              <ArrowLeft className="w-4 h-4" />
              Return Home
            </a>
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
