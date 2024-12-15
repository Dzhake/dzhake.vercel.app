"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getClientSupabase } from "./useSupabase";
import type { SupabaseSession } from "@lib/database/types";
export type { SupabaseUser, SupabaseSession } from "@lib/database/types";

const SupabaseContext = createContext<SupabaseSession | null | undefined>(undefined);

export default function useSupabaseSession(): SupabaseSession | null {
  const context = useContext(SupabaseContext);
  if (context === undefined) console.warn("useSupabaseSession was used without <SupabaseProvider>");
  return context ?? null;
}

export interface SupabaseProviderProps extends React.PropsWithChildren {
  initialSession?: SupabaseSession | null;
}

export function SupabaseProvider({ initialSession, children }: SupabaseProviderProps) {
  const [session, setSession] = useState<SupabaseSession | null>(initialSession ?? null);

  useEffect(() => {
    let latestSessionJson: string;
    const updateSession = (_event: string, newSession: SupabaseSession | null) => {
      const newSessionJson = JSON.stringify(newSession);
      if (latestSessionJson !== newSessionJson) setSession(newSession);
      latestSessionJson = newSessionJson;
    };

    const supabase = getClientSupabase();
    const { data } = supabase.auth.onAuthStateChange(updateSession);
    return data.subscription.unsubscribe;
  }, []);

  return <SupabaseContext.Provider value={session}>{children}</SupabaseContext.Provider>;
}
