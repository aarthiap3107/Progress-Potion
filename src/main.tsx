// @ts-nocheck
import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { supabase } from './supabase'
import App from './App'
import LoginPage from './LoginPage'

function Root() {
  const [user, setUser] = useState(undefined); // undefined = checking, null = logged out

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (user === undefined) {
    return (
      <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#0d0b1e 0%,#1a0a2e 55%,#0a1628 100%)',display:'flex',alignItems:'center',justifyContent:'center',color:'#c9a84c',fontSize:22,fontFamily:"'Segoe UI',sans-serif",letterSpacing:2}}>
        ✨ Summoning your realm...
      </div>
    );
  }

  if (!user) return <LoginPage />;
  return <App user={user} />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
