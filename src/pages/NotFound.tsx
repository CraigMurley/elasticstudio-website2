import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Seo from "@/components/site/Seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Seo
        title="404 — Page not found | Elastic Studio"
        description="This page does not exist."
        path={location.pathname}
        noindex
      />
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404 — Page not found</h1>
          <p className="mb-4 text-xl text-muted-foreground">
            This page doesn't exist or has been moved.
          </p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
