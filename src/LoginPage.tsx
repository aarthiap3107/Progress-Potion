// @ts-nocheck
import { useState } from 'react';
import { supabase } from './supabase';

const C = {
  bg:'#0d0b1e',gold:'#c9a84c',goldL:'#f0d060',cream:'#f0e0c0',
  text:'#dcc9a8',dim:'#7a6a50',border:'rgba(201,168,76,0.28)',
};
const STARS = Array.from({length:60},(_,i)=>({left:`${(i*17+7)%100}%`,top:`${(i*23+11)%100}%`,size:i%5===0?2.5:i%3===0?1.5:1,op:0.1+((i*7)%10)*0.07,dur:`${2.5+((i*13)%25)*0.15}s`,delay:`${((i*11)%40)*0.1}s`}));

export default function LoginPage() {
  const [mode,setMode]=useState('login');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirm,setConfirm]=useState('');
  const [name,setName]=useState('');
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);

  const submit = async e => {
    e.preventDefault();
    setError('');
    if (mode==='register'&&password!==confirm){setError('Passwords do not match!');return;}
    setLoading(true);
    try {
      if (mode==='login') {
        const {error:err}=await supabase.auth.signInWithPassword({email,password});
        if(err) throw err;
      } else {
        const {error:err}=await supabase.auth.signUp({email,password,options:{data:{display_name:name.trim()||email.split('@')[0]}}});
        if(err) throw err;
      }
    } catch(err){
      setError(err.message||'Something went wrong.');
    }
    setLoading(false);
  };

  const inp = {width:'100%',background:'rgba(255,255,255,0.06)',border:`1px solid ${C.border}`,borderRadius:8,color:C.cream,padding:'10px 13px',fontSize:14,outline:'none',boxSizing:'border-box'};

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#0d0b1e 0%,#1a0a2e 55%,#0a1628 100%)',fontFamily:"'Segoe UI',sans-serif",position:'relative',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <style>{`
        @keyframes twinkle{0%,100%{opacity:.05}50%{opacity:.85}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glow{0%,100%{box-shadow:0 0 18px rgba(201,168,76,.12)}50%{box-shadow:0 0 40px rgba(201,168,76,.28)}}
      `}</style>

      <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0}}>
        {STARS.map((s,i)=>(<div key={i} style={{position:'absolute',width:s.size,height:s.size,background:'#fff',borderRadius:'50%',left:s.left,top:s.top,animation:`twinkle ${s.dur} ${s.delay} ease-in-out infinite`}}/>))}
      </div>

      <div style={{position:'relative',zIndex:1,width:'100%',maxWidth:400,margin:'0 auto',padding:'0 16px',animation:'fadeSlideUp .5s ease'}}>
        <div style={{textAlign:'center',marginBottom:28}}>
          <div style={{fontSize:26,fontWeight:'bold',color:C.gold,letterSpacing:3,textShadow:'0 0 24px rgba(201,168,76,.5)',marginBottom:8}}>⚡ PROGRESS POTION ⚡</div>
          <div style={{fontSize:13,color:C.text,fontStyle:'italic',fontFamily:'Georgia,serif'}}>"The magic you're looking for is in the work you're doing."</div>
        </div>

        <div style={{background:'rgba(255,255,255,0.045)',border:`1px solid ${C.border}`,borderRadius:16,padding:28,boxShadow:'0 8px 40px rgba(0,0,0,0.5)',animation:'glow 4s ease-in-out infinite'}}>
          <div style={{display:'flex',gap:4,marginBottom:22,background:'rgba(255,255,255,0.04)',borderRadius:10,padding:4}}>
            {[['login','🔮 Login'],['register','✨ Register']].map(([m,lbl])=>(
              <button key={m} onClick={()=>{setMode(m);setError('');}} style={{flex:1,padding:'9px',borderRadius:8,border:'none',background:mode===m?C.gold:'transparent',color:mode===m?'#1a0a2e':C.dim,fontWeight:'bold',cursor:'pointer',fontSize:14,transition:'all .25s'}}>
                {lbl}
              </button>
            ))}
          </div>

          <form onSubmit={submit}>
            {mode==='register'&&(
              <div style={{marginBottom:14}}>
                <div style={{color:C.dim,fontSize:12,marginBottom:5}}>Your Wizard Name</div>
                <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="What shall we call you?" style={inp}/>
              </div>
            )}
            <div style={{marginBottom:14}}>
              <div style={{color:C.dim,fontSize:12,marginBottom:5}}>Email</div>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" required style={inp}/>
            </div>
            <div style={{marginBottom:mode==='register'?14:22}}>
              <div style={{color:C.dim,fontSize:12,marginBottom:5}}>Password</div>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required style={inp}/>
            </div>
            {mode==='register'&&(
              <div style={{marginBottom:22}}>
                <div style={{color:C.dim,fontSize:12,marginBottom:5}}>Confirm Password</div>
                <input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="••••••••" required style={inp}/>
              </div>
            )}
            {error&&<div style={{color:'#e74c3c',fontSize:12,marginBottom:14,textAlign:'center',background:'rgba(192,57,43,0.1)',borderRadius:8,padding:'8px 12px'}}>{error}</div>}
            <button type="submit" disabled={loading}
              style={{width:'100%',background:`linear-gradient(135deg,${C.gold},#8a5e20)`,border:'none',borderRadius:10,color:'#1a0a2e',fontWeight:'bold',cursor:loading?'not-allowed':'pointer',padding:'12px',fontSize:15,opacity:loading?.7:1,transition:'transform .15s'}}
              onMouseEnter={e=>{if(!loading)e.currentTarget.style.transform='scale(1.02)'}}
              onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}>
              {loading?'✨ Casting spell...':(mode==='login'?'🔮 Enter the Realm':'✨ Begin Your Journey')}
            </button>
          </form>
        </div>

        <div style={{textAlign:'center',marginTop:20,color:C.dim,fontSize:11,fontStyle:'italic',fontFamily:'Georgia,serif'}}>
          "It takes a great deal of bravery to stand up and begin." ✨
        </div>
      </div>
    </div>
  );
}
