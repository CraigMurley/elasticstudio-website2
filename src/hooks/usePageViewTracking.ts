import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "es_session_id";

const getSessionId = () => {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
};

/** Records one row per page view so the admin dashboard can report real traffic. */
export const usePageViewTracking = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hostname === "localhost") return;

    const path = pathname + (search || "");
    let cancelled = false;

    const timer = window.setTimeout(() => {
      if (cancelled) return;
      void supabase.from("page_views").insert({
        path,
        referrer: document.referrer || null,
        session_id: getSessionId(),
        user_agent: navigator.userAgent,
      });
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [pathname, search]);
};
