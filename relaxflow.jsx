import { useState } from "react";

/* ═══════════════════════════════════════════════════════
   RELAXFLOW — Complete SaaS Platform
   Public Site + App + Legal + Support
═══════════════════════════════════════════════════════ */

const T = {
  bg:"#06090f", surface:"#0c1219", raised:"#111a24",
  border:"#1c2a3a", borderHi:"#253648",
  teal:"#0ea5e9", tealHi:"#38bdf8", tealLo:"#0ea5e91a",
  violet:"#8b5cf6", violetLo:"#8b5cf61a",
  emerald:"#10b981", emeraldLo:"#10b9811a",
  amber:"#f59e0b", red:"#f87171", redLo:"#f871711a",
  t1:"#e8f0f8", t2:"#7a93aa", t3:"#364f63",
};

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html,body,#root{height:100%}
    body{font-family:'Plus Jakarta Sans',sans-serif;background:${T.bg};color:${T.t1};font-size:14px;line-height:1.6;-webkit-font-smoothing:antialiased}
    ::-webkit-scrollbar{width:4px;height:4px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:${T.border};border-radius:99px}
    input,select,textarea,button{font-family:'Plus Jakarta Sans',sans-serif}
    input::placeholder,textarea::placeholder{color:${T.t3}}
    input:focus,select:focus,textarea:focus{outline:none;border-color:${T.teal}!important}
    select{appearance:none}
    @keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
    @keyframes glow{0%,100%{opacity:.6}50%{opacity:1}}
    .au{animation:up .38s cubic-bezier(.16,1,.3,1) both}
    .a1{animation-delay:.06s}.a2{animation-delay:.12s}.a3{animation-delay:.18s}
    .rh:hover{background:${T.raised}!important;cursor:default}
    .hl{transition:transform .18s,box-shadow .18s}
    .hl:hover{transform:translateY(-3px);box-shadow:0 14px 40px #0ea5e918}
  `}</style>
);

/* ── ATOMS ─────────────────────────────────────────── */
const Badge = ({s}) => {
  const m={Active:{bg:T.emeraldLo,c:T.emerald},Pending:{bg:"#f59e0b1a",c:T.amber},Paid:{bg:T.tealLo,c:T.teal},
    Overdue:{bg:T.redLo,c:T.red},Signed:{bg:T.emeraldLo,c:T.emerald},Review:{bg:T.violetLo,c:"#a78bfa"},
    Completed:{bg:T.tealLo,c:T.teal},Negotiating:{bg:"#f59e0b1a",c:T.amber},Draft:{bg:T.border,c:T.t2},
    Free:{bg:T.border,c:T.t2},Pro:{bg:T.tealLo,c:T.teal},Premium:{bg:T.violetLo,c:"#a78bfa"},Enterprise:{bg:"#f59e0b1a",c:T.amber}};
  const r=m[s]||m.Draft;
  return <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 9px",borderRadius:99,background:r.bg,color:r.c,fontSize:11,fontWeight:600}}>
    <span style={{width:4,height:4,borderRadius:"50%",background:r.c}}/>{s}
  </span>;
};

const Btn = ({children,v="primary",onClick,sm,icon,full,style:sx={}}) => {
  const [hv,sh]=useState(false);
  const base={display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,
    padding:sm?"6px 14px":"10px 22px",borderRadius:9,fontSize:sm?12:13.5,fontWeight:600,
    cursor:"pointer",border:"1px solid transparent",transition:"all .14s",whiteSpace:"nowrap",
    width:full?"100%":"auto",...sx};
  const vs={primary:{background:hv?"#0284c7":T.teal,color:"#fff",borderColor:hv?"#0284c7":T.teal},
    secondary:{background:"transparent",color:T.t2,borderColor:hv?T.borderHi:T.border},
    ghost:{background:hv?T.raised:"transparent",color:hv?T.t1:T.t2,borderColor:"transparent"},
    danger:{background:hv?"#dc262622":T.redLo,color:T.red,borderColor:hv?T.red:"transparent"},
    outline:{background:hv?T.tealLo:"transparent",color:T.teal,borderColor:T.teal}};
  return <button style={{...base,...(vs[v]||vs.primary)}} onClick={onClick} onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}>
    {icon&&<span style={{fontSize:sm?11:13}}>{icon}</span>}{children}
  </button>;
};

const Card = ({children,style:sx={},noPad,hover}) => (
  <div className={hover?"hl":""} style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,padding:noPad?0:"22px 24px",...sx}}>
    {children}
  </div>
);

const Fld = ({label,placeholder,value,onChange,type="text",rows,style:sx={}}) => (
  <div style={{display:"flex",flexDirection:"column",gap:5,...sx}}>
    {label&&<label style={{fontSize:12,color:T.t2,fontWeight:600}}>{label}</label>}
    {rows
      ? <textarea value={value||""} onChange={onChange} placeholder={placeholder} rows={rows}
          style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:8,padding:"10px 12px",color:T.t1,fontSize:13,resize:"vertical",width:"100%"}}/>
      : <input type={type} value={value||""} onChange={onChange} placeholder={placeholder}
          style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:8,padding:"10px 12px",color:T.t1,fontSize:13,width:"100%"}}/>
    }
  </div>
);

const Div = ({my=16}) => <div style={{height:1,background:T.border,margin:`${my}px 0`}}/>;

const SH = ({title,sub,action}) => (
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
    <div>
      <p style={{fontSize:13,fontWeight:700,color:T.t1}}>{title}</p>
      {sub&&<p style={{fontSize:12,color:T.t2,marginTop:2}}>{sub}</p>}
    </div>
    {action}
  </div>
);

const Lbl = ({children}) => <p style={{fontSize:10,color:T.t3,fontWeight:700,letterSpacing:1.3,textTransform:"uppercase",marginBottom:6}}>{children}</p>;

/* ── CHARTS ────────────────────────────────────────── */
const Spark = ({data,color=T.teal,h=34}) => {
  const mx=Math.max(...data),mn=Math.min(...data),rng=mx-mn||1,W=200;
  const pts=data.map((v,i)=>[(i/(data.length-1))*W,h-((v-mn)/rng)*(h-6)-3]);
  const d=pts.map((p,i)=>`${i===0?"M":"L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area=`${d} L${W},${h} L0,${h} Z`;
  const id=`sg${color.replace(/\W/g,"")}`;
  return <svg viewBox={`0 0 ${W} ${h}`} preserveAspectRatio="none" style={{width:"100%",height:h,display:"block"}}>
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={color} stopOpacity=".22"/><stop offset="100%" stopColor={color} stopOpacity="0"/>
    </linearGradient></defs>
    <path d={area} fill={`url(#${id})`}/><path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx={pts.at(-1)[0]} cy={pts.at(-1)[1]} r="2.8" fill={color}/>
  </svg>;
};

const Area = ({data,labels,color=T.teal,h=120}) => {
  const mx=Math.max(...data),mn=Math.min(...data)*.85,rng=mx-mn||1,W=600,p=4;
  const xs=data.map((_,i)=>p+(i/(data.length-1))*(W-p*2));
  const ys=data.map(v=>h-((v-mn)/rng)*(h-16)-8);
  const d=xs.map((x,i)=>`${i===0?"M":"L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const area=`${d} L${xs.at(-1)},${h} L${xs[0]},${h} Z`;
  const id="area"+color.replace(/\W/g,"");
  return <svg viewBox={`0 0 ${W} ${h+20}`} preserveAspectRatio="none" style={{width:"100%",height:h+20,display:"block",overflow:"visible"}}>
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={color} stopOpacity=".18"/><stop offset="80%" stopColor={color} stopOpacity="0"/>
    </linearGradient></defs>
    {[.25,.5,.75].map(t=><line key={t} x1={0} y1={(h*t).toFixed(0)} x2={W} y2={(h*t).toFixed(0)} stroke={T.border} strokeWidth="1"/>)}
    <path d={area} fill={`url(#${id})`}/><path d={d} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    {labels&&xs.map((x,i)=>i%2===0&&<text key={i} x={x} y={h+15} textAnchor="middle" fill={T.t3} style={{fontSize:9,fontFamily:"'Plus Jakarta Sans'",fontWeight:600}}>{labels[i]}</text>)}
  </svg>;
};

const Bars = ({data,labels,colors}) => {
  const mx=Math.max(...data);
  return <div style={{display:"flex",alignItems:"flex-end",gap:8,height:110}}>
    {data.map((v,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5}}>
      <div style={{width:"100%",background:colors?.[i]||T.teal,borderRadius:"4px 4px 0 0",height:`${(v/mx)*88}%`,minHeight:4,opacity:.5+(v/mx)*.5}}/>
      <span style={{fontSize:9.5,color:T.t3,fontWeight:600}}>{labels?.[i]}</span>
    </div>)}
  </div>;
};

const Donut = ({segs,size=100}) => {
  let cum=0;const tot=segs.reduce((a,b)=>a+b.v,0),r=36,c=50,ci=2*Math.PI*r;
  return <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx={c} cy={c} r={r} fill="none" stroke={T.border} strokeWidth="11"/>
    {segs.map((s,i)=>{const da=(s.v/tot)*ci,off=ci*(1-cum/tot);cum+=s.v;
      return <circle key={i} cx={c} cy={c} r={r} fill="none" stroke={s.c} strokeWidth="11"
        strokeDasharray={`${da} ${ci-da}`} strokeDashoffset={off}
        style={{transform:"rotate(-90deg)",transformOrigin:"50px 50px"}}/>;
    })}
    <circle cx={c} cy={c} r={27} fill={T.surface}/>
  </svg>;
};

/* ── DATA ──────────────────────────────────────────── */
const DEALS=[
  {id:"DL-001",brand:"Nike",       type:"Sponsored Post",      value:"$12,000",status:"Active",      due:"Jun 30",platform:"Instagram",del:"3 Posts · 5 Stories"},
  {id:"DL-002",brand:"Adobe",      type:"YouTube Integration", value:"$8,500", status:"Pending",     due:"Jul 15",platform:"YouTube",  del:"2 Videos"},
  {id:"DL-003",brand:"Squarespace",type:"Podcast Sponsorship", value:"$4,200", status:"Completed",   due:"Jun 10",platform:"Podcast",  del:"4 Episodes"},
  {id:"DL-004",brand:"NordVPN",    type:"Dedicated Video",     value:"$15,000",status:"Negotiating", due:"Aug 1", platform:"YouTube",  del:"1 Video"},
  {id:"DL-005",brand:"Notion",     type:"Newsletter Sponsor",  value:"$2,800", status:"Active",      due:"Jun 25",platform:"Newsletter",del:"2 Editions"},
  {id:"DL-006",brand:"Shopify",    type:"Instagram Story",     value:"$3,600", status:"Overdue",     due:"Jun 5", platform:"Instagram",del:"6 Stories"},
];
const INVS=[
  {id:"INV-001",client:"Nike",        amt:"$12,000",iss:"Jun 1", due:"Jun 30",status:"Pending",items:[{d:"Sponsored Posts ×3",q:3,r:3000},{d:"Story Package ×5",q:5,r:600}]},
  {id:"INV-002",client:"Adobe",       amt:"$8,500", iss:"Jun 5", due:"Jul 5", status:"Paid",   items:[{d:"YouTube Integration ×2",q:2,r:4250}]},
  {id:"INV-003",client:"Squarespace", amt:"$4,200", iss:"May 20",due:"Jun 10",status:"Paid",   items:[{d:"Podcast Episodes ×4",q:4,r:1050}]},
  {id:"INV-004",client:"Shopify",     amt:"$3,600", iss:"May 25",due:"Jun 5", status:"Overdue",items:[{d:"Story Campaign ×6",q:6,r:600}]},
];
const CTRS=[
  {id:"CT-001",brand:"Nike",   type:"Partnership Agreement",    sz:"2.4 MB",up:"Jun 1", exp:"Dec 31",status:"Signed"},
  {id:"CT-002",brand:"Adobe",  type:"Creator Service Agreement",sz:"1.8 MB",up:"Jun 5", exp:"Sep 30",status:"Signed"},
  {id:"CT-003",brand:"NordVPN",type:"Collaboration Contract",   sz:"3.1 MB",up:"Jun 12",exp:"Aug 1", status:"Review"},
  {id:"CT-004",brand:"Notion", type:"Brand Ambassador Agreement",sz:"2.0 MB",up:"Jun 8",exp:"Dec 31",status:"Signed"},
];
const ACT=[
  {icon:"💰",txt:"Payment received from Adobe — $8,500",time:"2h ago",c:T.emerald},
  {icon:"⚠️",txt:"Invoice INV-004 (Shopify) is overdue", time:"4h ago",c:T.red},
  {icon:"🤝",txt:"New deal added — NordVPN $15K",        time:"1d ago",c:T.teal},
  {icon:"📝",txt:"Contract signed with Notion",          time:"2d ago",c:"#a78bfa"},
  {icon:"🔔",txt:"Nike deliverable due in 5 days",       time:"2d ago",c:T.amber},
];
const MO=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const RV=[28,31,24,38,35,42,39,47,44,52,49,58];
const PL=[{n:"YouTube",v:45,c:T.red},{n:"Instagram",v:28,c:"#c084fc"},{n:"Newsletter",v:14,c:T.teal},{n:"Podcast",v:13,c:T.amber}];

/* ── APP SIDEBAR ───────────────────────────────────── */
const ANAV=[{id:"app-dashboard",icon:"⊞",lbl:"Dashboard"},{id:"app-deals",icon:"🤝",lbl:"Brand Deals",b:"6"},
  {id:"app-invoices",icon:"📄",lbl:"Invoices"},{id:"app-payments",icon:"💳",lbl:"Payments",b:"2"},
  {id:"app-analytics",icon:"📊",lbl:"Analytics"},{id:"app-contracts",icon:"📋",lbl:"Contracts"},
  {id:"app-settings",icon:"⚙️",lbl:"Settings"}];

const AppSide = ({active,onNav}) => (
  <aside style={{width:218,background:T.surface,borderRight:`1px solid ${T.border}`,display:"flex",flexDirection:"column",padding:"0 10px",flexShrink:0,height:"100vh",position:"sticky",top:0}}>
    <div style={{padding:"18px 12px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:9}}>
      <div style={{width:28,height:28,borderRadius:7,background:`linear-gradient(135deg,${T.teal},${T.violet})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🌊</div>
      <span style={{fontWeight:800,fontSize:15,color:T.t1,letterSpacing:-.3}}>RelaxFlow</span>
    </div>
    <nav style={{flex:1,paddingTop:12,display:"flex",flexDirection:"column",gap:1}}>
      <Lbl>Main Menu</Lbl>
      {ANAV.map(n=>{
        const on=active===n.id;
        return <button key={n.id} onClick={()=>onNav(n.id)} style={{
          display:"flex",alignItems:"center",gap:9,padding:"8px 10px",borderRadius:8,border:"none",
          background:on?T.tealLo:"transparent",color:on?T.teal:T.t2,cursor:"pointer",fontSize:13,
          fontWeight:on?600:400,textAlign:"left",transition:"all .12s",width:"100%",position:"relative"}}
          onMouseEnter={e=>{if(!on){e.currentTarget.style.background=T.raised;e.currentTarget.style.color=T.t1;}}}
          onMouseLeave={e=>{if(!on){e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.t2;}}}>
          {on&&<span style={{position:"absolute",left:0,top:"50%",transform:"translateY(-50%)",width:3,height:14,background:T.teal,borderRadius:"0 3px 3px 0"}}/>}
          <span style={{fontSize:15,opacity:on?1:.65}}>{n.icon}</span>
          <span style={{flex:1}}>{n.lbl}</span>
          {n.b&&<span style={{fontSize:10,fontWeight:700,background:on?T.tealLo:T.border,color:on?T.teal:T.t3,borderRadius:5,padding:"1px 6px"}}>{n.b}</span>}
        </button>;
      })}
    </nav>
    <div style={{padding:"12px",borderTop:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:9}}>
      <div style={{width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg,${T.teal},${T.violet})`,
        display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#fff",flexShrink:0}}>A</div>
      <div style={{flex:1,minWidth:0}}>
        <p style={{fontSize:12.5,fontWeight:600,color:T.t1}}>Alex Rivera</p>
        <p style={{fontSize:11,color:T.t3}}>Pro Plan</p>
      </div>
    </div>
  </aside>
);

const AppTop = ({title,sub}) => (
  <header style={{height:54,padding:"0 26px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${T.border}`,background:T.surface,flexShrink:0}}>
    <div>
      <h1 style={{fontSize:14,fontWeight:700,color:T.t1}}>{title}</h1>
      {sub&&<p style={{fontSize:12,color:T.t2,marginTop:1}}>{sub}</p>}
    </div>
    <div style={{display:"flex",gap:8,alignItems:"center"}}>
      <div style={{display:"flex",alignItems:"center",gap:7,background:T.bg,border:`1px solid ${T.border}`,borderRadius:8,padding:"6px 12px",width:180,cursor:"text"}}>
        <span style={{fontSize:12,color:T.t3}}>🔍</span>
        <span style={{fontSize:12.5,color:T.t3,flex:1}}>Search...</span>
        <span style={{fontSize:10,color:T.t3,background:T.border,padding:"1px 5px",borderRadius:4,fontWeight:700}}>⌘K</span>
      </div>
      <div style={{position:"relative",cursor:"pointer"}}>
        <div style={{width:32,height:32,borderRadius:7,background:T.bg,border:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🔔</div>
        <span style={{position:"absolute",top:7,right:7,width:5,height:5,borderRadius:"50%",background:T.amber,border:`1.5px solid ${T.surface}`}}/>
      </div>
    </div>
  </header>
);

/* ── APP PAGES ─────────────────────────────────────── */
const AppDash = ({onNav}) => (
  <div style={{flex:1,overflowY:"auto",padding:"22px 26px",display:"flex",flexDirection:"column",gap:18}}>
    <div className="au" style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:T.surface,border:`1px solid ${T.border}`,borderRadius:12,padding:"14px 20px"}}>
      <div>
        <p style={{fontWeight:700,color:T.t1,fontSize:14}}>Good morning, Alex 👋</p>
        <p style={{fontSize:12.5,color:T.t2,marginTop:2}}>2 invoices pending · 1 payment overdue</p>
      </div>
      <div style={{display:"flex",gap:7}}>
        <Btn icon="+" onClick={()=>onNav("app-deals")}>New Deal</Btn>
        <Btn v="secondary" icon="📄" onClick={()=>onNav("app-invoices")}>Invoice</Btn>
        <Btn v="secondary" icon="📋" onClick={()=>onNav("app-contracts")}>Contract</Btn>
      </div>
    </div>
    <div className="au a1" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
      {[{l:"Monthly Revenue",v:"$58,200",d:"+18.3%",sp:RV.slice(-8),c:T.teal,ic:"💰"},
        {l:"Active Deals",   v:"12",     d:"+3",    sp:[7,9,10,11,12,11,13,12],c:T.violet,ic:"🤝"},
        {l:"Pending Payments",v:"$18,400",d:"-5.2%",sp:[22,18,24,20,18,22,20,18],c:T.red,ic:"⏳"},
        {l:"Collected",      v:"$12,700",d:"+22%",  sp:[6,8,9,11,9,12,11,13],c:T.emerald,ic:"✅"},
      ].map(s=>(
        <Card key={s.l} style={{padding:"16px 18px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <Lbl>{s.l}</Lbl><span style={{fontSize:16}}>{s.ic}</span>
          </div>
          <p style={{fontSize:22,fontWeight:800,color:T.t1,marginBottom:4,letterSpacing:-.5}}>{s.v}</p>
          <p style={{fontSize:11.5,color:s.d.startsWith("+")?T.emerald:T.red,fontWeight:600,marginBottom:8}}>
            {s.d} <span style={{color:T.t3,fontWeight:400}}>vs last mo.</span>
          </p>
          <Spark data={s.sp} color={s.c} h={32}/>
        </Card>
      ))}
    </div>
    <div className="au a2" style={{display:"grid",gridTemplateColumns:"1fr 255px",gap:14}}>
      <Card>
        <SH title="Revenue Overview" sub="Monthly earnings across all platforms"
          action={<div style={{display:"flex",gap:4}}>
            {["3M","6M","1Y"].map((t,i)=><button key={t} style={{padding:"3px 10px",borderRadius:5,
              border:`1px solid ${i===2?T.teal:T.border}`,background:i===2?T.tealLo:"transparent",
              color:i===2?T.teal:T.t3,fontSize:11,cursor:"pointer",fontWeight:600}}>{t}</button>)}
          </div>}/>
        <Area data={RV} labels={MO} color={T.teal} h={130}/>
        <Div my={14}/>
        <div style={{display:"flex",gap:24}}>
          {[{l:"Total YTD",v:"$446K"},{l:"Monthly Avg",v:"$37.2K"},{l:"Peak Month",v:"Dec"}].map(s=>(
            <div key={s.l}><Lbl>{s.l}</Lbl><p style={{fontSize:15,fontWeight:800,color:T.t1}}>{s.v}</p></div>
          ))}
        </div>
      </Card>
      <Card>
        <SH title="By Platform" sub="Revenue split"/>
        <div style={{display:"flex",justifyContent:"center",marginBottom:14}}>
          <Donut segs={PL.map(p=>({v:p.v,c:p.c}))} size={100}/>
        </div>
        {PL.map(p=>(
          <div key={p.n} style={{display:"flex",alignItems:"center",gap:8,marginBottom:9}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:p.c,flexShrink:0}}/>
            <span style={{fontSize:12,color:T.t2,flex:1}}>{p.n}</span>
            <span style={{fontSize:12,fontWeight:700,color:T.t1}}>{p.v}%</span>
            <div style={{width:36,height:3,borderRadius:99,background:T.border}}>
              <div style={{height:"100%",width:`${p.v}%`,background:p.c,borderRadius:99}}/>
            </div>
          </div>
        ))}
      </Card>
    </div>
    <div className="au a3" style={{display:"grid",gridTemplateColumns:"1fr 255px",gap:14}}>
      <Card noPad>
        <div style={{padding:"14px 20px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <p style={{fontWeight:700,color:T.t1,fontSize:13}}>Recent Deals</p>
          <Btn v="ghost" sm onClick={()=>onNav("app-deals")}>View all →</Btn>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:T.bg}}>
            {["Brand","Type","Value","Status","Due"].map(h=><th key={h} style={{padding:"9px 20px",textAlign:"left",fontSize:10,color:T.t3,fontWeight:700,letterSpacing:1.2,textTransform:"uppercase",borderBottom:`1px solid ${T.border}`}}>{h}</th>)}
          </tr></thead>
          <tbody>{DEALS.slice(0,5).map(d=>(
            <tr key={d.id} className="rh" style={{borderBottom:`1px solid ${T.border}`}}>
              <td style={{padding:"10px 20px"}}><div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:26,height:26,borderRadius:6,background:T.border,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:T.teal}}>{d.brand[0]}</div>
                <span style={{fontSize:13,fontWeight:500,color:T.t1}}>{d.brand}</span>
              </div></td>
              <td style={{padding:"10px 20px"}}><span style={{fontSize:12,color:T.t2}}>{d.type}</span></td>
              <td style={{padding:"10px 20px"}}><span style={{fontSize:13,fontWeight:700,color:T.t1}}>{d.value}</span></td>
              <td style={{padding:"10px 20px"}}><Badge s={d.status}/></td>
              <td style={{padding:"10px 20px"}}><span style={{fontSize:12,color:T.t2}}>{d.due}</span></td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
      <Card>
        <SH title="Activity" sub="Recent updates"/>
        {ACT.map((a,i)=>(
          <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:i<ACT.length-1?13:0}}>
            <div style={{width:28,height:28,borderRadius:7,background:`${a.c}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>{a.icon}</div>
            <div>
              <p style={{fontSize:12,color:T.t2,lineHeight:1.45}}>{a.txt}</p>
              <p style={{fontSize:11,color:T.t3,marginTop:2}}>{a.time}</p>
            </div>
          </div>
        ))}
      </Card>
    </div>
  </div>
);

const AppDeals = () => {
  const [q,sq]=useState(""), [f,sf]=useState("All");
  const STS=["All","Active","Pending","Completed","Negotiating","Overdue"];
  const rows=DEALS.filter(d=>(f==="All"||d.status===f)&&(d.brand.toLowerCase().includes(q.toLowerCase())||d.type.toLowerCase().includes(q.toLowerCase())));
  return (
    <div style={{flex:1,overflowY:"auto",padding:"22px 26px",display:"flex",flexDirection:"column",gap:16}}>
      <div className="au" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
        {[{l:"Total Deals",v:"12",c:T.teal},{l:"Pipeline Value",v:"$89.4K",c:T.violet},{l:"Active",v:"5",c:T.emerald},{l:"Avg Size",v:"$7.4K",c:T.amber}].map(s=>(
          <Card key={s.l} style={{padding:"14px 18px"}}><Lbl>{s.l}</Lbl><p style={{fontSize:22,fontWeight:800,color:s.c}}>{s.v}</p></Card>
        ))}
      </div>
      <Card className="au a1" noPad>
        <div style={{padding:"13px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:7,background:T.bg,border:`1px solid ${T.border}`,borderRadius:7,padding:"7px 11px",flex:1,minWidth:160}}>
            <span style={{fontSize:12,color:T.t3}}>🔍</span>
            <input placeholder="Search deals..." value={q} onChange={e=>sq(e.target.value)}
              style={{border:"none",background:"transparent",color:T.t1,fontSize:13,outline:"none",width:"100%"}}/>
          </div>
          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
            {STS.map(s=><button key={s} onClick={()=>sf(s)} style={{padding:"5px 11px",borderRadius:6,border:`1px solid ${f===s?T.teal:T.border}`,background:f===s?T.tealLo:"transparent",color:f===s?T.teal:T.t3,fontSize:11.5,cursor:"pointer",fontWeight:600}}>{s}</button>)}
          </div>
          <Btn icon="+">New Deal</Btn>
        </div>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr style={{background:T.bg}}>
            {["ID","Brand","Value","Platform","Deliverables","Due","Status",""].map(h=><th key={h} style={{padding:"9px 18px",textAlign:"left",fontSize:10,color:T.t3,fontWeight:700,letterSpacing:1.1,textTransform:"uppercase",borderBottom:`1px solid ${T.border}`}}>{h}</th>)}
          </tr></thead>
          <tbody>{rows.map(d=>(
            <tr key={d.id} className="rh" style={{borderBottom:`1px solid ${T.border}`}}>
              <td style={{padding:"12px 18px"}}><span style={{fontSize:11.5,color:T.t3,fontWeight:600}}>{d.id}</span></td>
              <td style={{padding:"12px 18px"}}><div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:26,height:26,borderRadius:6,background:T.border,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:T.teal}}>{d.brand[0]}</div>
                <span style={{fontSize:13,fontWeight:500,color:T.t1}}>{d.brand}</span>
              </div></td>
              <td style={{padding:"12px 18px"}}><span style={{fontSize:13,fontWeight:700,color:T.t1}}>{d.value}</span></td>
              <td style={{padding:"12px 18px"}}><span style={{fontSize:12,color:T.t2}}>{d.platform}</span></td>
              <td style={{padding:"12px 18px"}}><span style={{fontSize:12,color:T.t2}}>{d.del}</span></td>
              <td style={{padding:"12px 18px"}}><span style={{fontSize:12,color:d.status==="Overdue"?T.red:T.t2}}>{d.due}</span></td>
              <td style={{padding:"12px 18px"}}><Badge s={d.status}/></td>
              <td style={{padding:"12px 18px"}}><div style={{display:"flex",gap:4}}><Btn v="ghost" sm>Edit</Btn><Btn v="ghost" sm>Invoice→</Btn></div></td>
            </tr>
          ))}</tbody>
        </table>
        {rows.length===0&&<div style={{padding:40,textAlign:"center",color:T.t3}}>No deals match your search.</div>}
        <div style={{padding:"9px 18px",borderTop:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <p style={{fontSize:12,color:T.t3}}>{rows.length} result{rows.length!==1?"s":""}</p>
          <div style={{display:"flex",gap:3}}>
            {["←","1","2","→"].map(p=><button key={p} style={{width:27,height:27,borderRadius:5,border:`1px solid ${T.border}`,background:p==="1"?T.tealLo:"transparent",color:p==="1"?T.teal:T.t3,fontSize:12,cursor:"pointer",fontWeight:700}}>{p}</button>)}
          </div>
        </div>
      </Card>
    </div>
  );
};

const AppInv = () => {
  const [inv,si]=useState({num:"INV-005",client:"NordVPN",email:"partnerships@nordvpn.com",date:"2024-06-20",due:"2024-07-20",items:[{d:"Dedicated YouTube Video",q:1,r:15000}],notes:"Payment within 30 days. Wire transfer preferred."});
  const sub=inv.items.reduce((s,i)=>s+i.q*i.r,0),tax=sub*.1,tot=sub+tax;
  const up=p=>si(v=>({...v,...p}));
  return (
    <div style={{flex:1,overflowY:"auto",padding:"22px 26px"}}>
      <div className="au" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,alignItems:"start"}}>
        <Card style={{display:"flex",flexDirection:"column",gap:14}}>
          <p style={{fontWeight:700,color:T.t1,fontSize:13}}>Invoice Details</p><Div my={0}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <Fld label="Invoice #" value={inv.num} onChange={e=>up({num:e.target.value})}/>
            <Fld label="Client Name" value={inv.client} onChange={e=>up({client:e.target.value})}/>
            <Fld label="Client Email" value={inv.email} onChange={e=>up({email:e.target.value})} style={{gridColumn:"1/-1"}}/>
            <Fld label="Issue Date" type="date" value={inv.date} onChange={e=>up({date:e.target.value})}/>
            <Fld label="Due Date" type="date" value={inv.due} onChange={e=>up({due:e.target.value})}/>
          </div>
          <Div my={0}/>
          <Lbl>Line Items</Lbl>
          {inv.items.map((item,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 52px 80px 28px",gap:7,alignItems:"end"}}>
              <Fld placeholder="Description" value={item.d} onChange={e=>{const it=[...inv.items];it[i].d=e.target.value;up({items:it});}}/>
              <Fld placeholder="Qty" type="number" value={item.q} onChange={e=>{const it=[...inv.items];it[i].q=+e.target.value;up({items:it});}}/>
              <Fld placeholder="Rate" type="number" value={item.r} onChange={e=>{const it=[...inv.items];it[i].r=+e.target.value;up({items:it});}}/>
              <button onClick={()=>up({items:inv.items.filter((_,j)=>j!==i)})} style={{height:36,borderRadius:7,border:`1px solid ${T.border}`,background:"transparent",color:T.red,cursor:"pointer",fontSize:16}}>×</button>
            </div>
          ))}
          <Btn v="ghost" sm icon="+" onClick={()=>up({items:[...inv.items,{d:"",q:1,r:0}]})}>Add Line Item</Btn>
          <Div my={0}/>
          <Fld label="Payment Notes" placeholder="Payment terms, bank details..." value={inv.notes} onChange={e=>up({notes:e.target.value})} rows={3}/>
          <div style={{display:"flex",gap:7}}><Btn>Send Invoice</Btn><Btn v="secondary">Save Draft</Btn><Btn v="ghost" icon="⬇">PDF</Btn></div>
        </Card>
        {/* Live preview */}
        <div style={{background:"#fff",borderRadius:12,padding:"28px",color:"#1e293b",border:"1px solid #e2e8f0"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:22,height:22,borderRadius:6,background:`linear-gradient(135deg,#0ea5e9,#8b5cf6)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11}}>🌊</div>
              <span style={{fontWeight:800,fontSize:14,color:"#0f172a"}}>RelaxFlow</span>
            </div>
            <div style={{textAlign:"right"}}>
              <p style={{fontSize:15,fontWeight:800,color:"#0ea5e9",letterSpacing:1}}>INVOICE</p>
              <p style={{fontSize:11,color:"#94a3b8",marginTop:2}}>#{inv.num}</p>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18}}>
            <div>
              <p style={{fontSize:8.5,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1.3,marginBottom:3,fontWeight:700}}>Bill To</p>
              <p style={{fontSize:13,fontWeight:700,color:"#0f172a"}}>{inv.client||"—"}</p>
              <p style={{fontSize:11.5,color:"#64748b"}}>{inv.email||"—"}</p>
            </div>
            <div style={{textAlign:"right"}}>
              <p style={{fontSize:8.5,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1.3,marginBottom:3,fontWeight:700}}>Details</p>
              <p style={{fontSize:11.5,color:"#64748b"}}>Issued: {inv.date||"—"}</p>
              <p style={{fontSize:11.5,color:"#64748b"}}>Due: {inv.due||"—"}</p>
            </div>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse",marginBottom:12}}>
            <thead><tr style={{background:"#f8fafc"}}>
              {["Description","Qty","Rate","Total"].map(h=><th key={h} style={{padding:"7px 9px",textAlign:h==="Description"?"left":"right",fontSize:8.5,color:"#94a3b8",fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>{h}</th>)}
            </tr></thead>
            <tbody>{inv.items.map((it,i)=>(
              <tr key={i} style={{borderBottom:"1px solid #f1f5f9"}}>
                <td style={{padding:"8px 9px",fontSize:12}}>{it.d||"—"}</td>
                <td style={{padding:"8px 9px",fontSize:12,textAlign:"right",color:"#64748b"}}>{it.q}</td>
                <td style={{padding:"8px 9px",fontSize:12,textAlign:"right",color:"#64748b"}}>${it.r.toLocaleString()}</td>
                <td style={{padding:"8px 9px",fontSize:12,textAlign:"right",fontWeight:700}}>${(it.q*it.r).toLocaleString()}</td>
              </tr>
            ))}</tbody>
          </table>
          <div style={{display:"flex",justifyContent:"flex-end"}}>
            <div style={{width:176}}>
              {[{l:"Subtotal",v:`$${sub.toLocaleString()}`},{l:"Tax (10%)",v:`$${tax.toLocaleString()}`}].map(r=>(
                <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",fontSize:11,color:"#64748b"}}><span>{r.l}</span><span>{r.v}</span></div>
              ))}
              <div style={{display:"flex",justifyContent:"space-between",padding:"7px 0 0",borderTop:"2px solid #0f172a",marginTop:5}}>
                <span style={{fontWeight:800,color:"#0f172a",fontSize:13}}>Total</span>
                <span style={{fontWeight:800,color:"#0ea5e9",fontSize:14}}>${tot.toLocaleString()}</span>
              </div>
            </div>
          </div>
          {inv.notes&&<div style={{marginTop:16,padding:"9px 11px",background:"#f8fafc",borderRadius:7,borderLeft:"3px solid #0ea5e9"}}>
            <p style={{fontSize:8.5,color:"#94a3b8",textTransform:"uppercase",letterSpacing:1.2,marginBottom:2,fontWeight:700}}>Notes</p>
            <p style={{fontSize:11.5,color:"#475569"}}>{inv.notes}</p>
          </div>}
        </div>
      </div>
    </div>
  );
};

const AppPay = () => (
  <div style={{flex:1,overflowY:"auto",padding:"22px 26px",display:"flex",flexDirection:"column",gap:16}}>
    <div className="au" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
      {[{l:"Collected",v:"$24,700",c:T.emerald,ic:"✅",sp:[6,8,7,9,10,11,9,12]},
        {l:"Pending",  v:"$18,400",c:T.amber,  ic:"⏳",sp:[12,10,14,11,10,12,10,10]},
        {l:"Overdue",  v:"$3,600", c:T.red,    ic:"⚠️",sp:[4,5,3,5,4,3,4,4]}].map(s=>(
        <Card key={s.l} style={{padding:"16px 18px"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><Lbl>{s.l}</Lbl><span style={{fontSize:16}}>{s.ic}</span></div>
          <p style={{fontSize:22,fontWeight:800,color:s.c,marginBottom:8}}>{s.v}</p>
          <Spark data={s.sp} color={s.c} h={28}/>
        </Card>
      ))}
    </div>
    <Card className="au a1" noPad>
      <div style={{padding:"13px 20px",borderBottom:`1px solid ${T.border}`}}><p style={{fontWeight:700,color:T.t1,fontSize:13}}>Payment Tracker</p></div>
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr style={{background:T.bg}}>
          {["Invoice","Client","Amount","Issued","Due","Status","Action"].map(h=><th key={h} style={{padding:"9px 20px",textAlign:"left",fontSize:10,color:T.t3,fontWeight:700,letterSpacing:1.1,textTransform:"uppercase",borderBottom:`1px solid ${T.border}`}}>{h}</th>)}
        </tr></thead>
        <tbody>{INVS.map(inv=>(
          <tr key={inv.id} className="rh" style={{borderBottom:`1px solid ${T.border}`}}>
            <td style={{padding:"12px 20px"}}><span style={{fontSize:12,color:T.teal,fontWeight:700}}>{inv.id}</span></td>
            <td style={{padding:"12px 20px"}}><div style={{display:"flex",alignItems:"center",gap:7}}>
              <div style={{width:24,height:24,borderRadius:6,background:T.border,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:T.teal}}>{inv.client[0]}</div>
              <span style={{fontSize:13,fontWeight:500,color:T.t1}}>{inv.client}</span>
            </div></td>
            <td style={{padding:"12px 20px"}}><span style={{fontSize:13,fontWeight:700,color:T.t1}}>{inv.amt}</span></td>
            <td style={{padding:"12px 20px"}}><span style={{fontSize:12,color:T.t2}}>{inv.iss}</span></td>
            <td style={{padding:"12px 20px"}}><span style={{fontSize:12,color:inv.status==="Overdue"?T.red:T.t2}}>{inv.due}</span></td>
            <td style={{padding:"12px 20px"}}><Badge s={inv.status}/></td>
            <td style={{padding:"12px 20px"}}><div style={{display:"flex",gap:5}}>
              {inv.status==="Pending"&&<Btn v="secondary" sm>Remind</Btn>}
              {inv.status==="Overdue"&&<Btn v="danger" sm>Escalate</Btn>}
              {inv.status==="Paid"   &&<Btn v="ghost" sm>Receipt</Btn>}
              <Btn v="ghost" sm>View</Btn>
            </div></td>
          </tr>
        ))}</tbody>
      </table>
    </Card>
    <Card className="au a2">
      <SH title="Collection Rate" sub="June 2024 · $46,700 total invoiced"/>
      <div style={{height:7,background:T.border,borderRadius:99,overflow:"hidden",marginBottom:10}}>
        <div style={{height:"100%",width:"53%",background:`linear-gradient(90deg,${T.teal},${T.emerald})`,borderRadius:99}}/>
      </div>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <p style={{fontSize:12.5,color:T.t2}}>$24,700 collected — <span style={{color:T.emerald,fontWeight:700}}>53%</span></p>
        <p style={{fontSize:12.5,color:T.t3}}>$22,000 outstanding</p>
      </div>
    </Card>
  </div>
);

const AppAna = () => (
  <div style={{flex:1,overflowY:"auto",padding:"22px 26px",display:"flex",flexDirection:"column",gap:16}}>
    <div className="au" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
      {[{l:"Lifetime Revenue",v:"$446K",c:T.teal},{l:"Avg Deal Value",v:"$7.4K",c:T.violet},{l:"Deals Closed",v:"47",c:T.emerald},{l:"Win Rate",v:"68%",c:T.amber}].map(s=>(
        <Card key={s.l} style={{padding:"14px 18px"}}><Lbl>{s.l}</Lbl><p style={{fontSize:24,fontWeight:800,color:s.c}}>{s.v}</p></Card>
      ))}
    </div>
    <div className="au a1" style={{display:"grid",gridTemplateColumns:"1fr 255px",gap:14}}>
      <Card>
        <SH title="Revenue Trend" sub="12-month performance"/>
        <Area data={RV} labels={MO} color={T.teal} h={130}/>
        <Div my={14}/>
        <div style={{display:"flex",gap:24}}>
          {[{l:"YoY Growth",v:"+34%",c:T.emerald},{l:"MoM Avg",v:"+3.2%",c:T.teal},{l:"Best Month",v:"Dec",c:T.amber}].map(s=>(
            <div key={s.l}><Lbl>{s.l}</Lbl><p style={{fontSize:15,fontWeight:800,color:s.c}}>{s.v}</p></div>
          ))}
        </div>
      </Card>
      <Card>
        <SH title="Deal Pipeline" sub="By stage"/>
        {[{l:"Outreach",v:8,c:T.border},{l:"Negotiating",v:5,c:T.amber},{l:"Contract",v:3,c:"#a78bfa"},{l:"Active",v:5,c:T.teal},{l:"Completed",v:12,c:T.emerald}].map(s=>(
          <div key={s.l} style={{marginBottom:11}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
              <span style={{fontSize:12,color:T.t2}}>{s.l}</span>
              <span style={{fontSize:12,fontWeight:700,color:T.t1}}>{s.v}</span>
            </div>
            <div style={{height:5,background:T.border,borderRadius:99}}>
              <div style={{height:"100%",width:`${(s.v/12)*100}%`,background:s.c,borderRadius:99}}/>
            </div>
          </div>
        ))}
      </Card>
    </div>
    <div className="au a2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      <Card><SH title="Revenue by Platform" sub="% share of earnings"/><Bars data={[45,28,14,13]} labels={["YouTube","Instagram","Newsletter","Podcast"]} colors={[T.red,"#c084fc",T.teal,T.amber]}/></Card>
      <Card>
        <SH title="Payment Health" sub="On-time vs late"/>
        <div style={{display:"flex",gap:18,alignItems:"center"}}>
          <Donut segs={[{v:68,c:T.emerald},{v:18,c:T.amber},{v:14,c:T.red}]} size={100}/>
          <div style={{flex:1,display:"flex",flexDirection:"column",gap:11}}>
            {[{l:"Paid on time",v:"68%",c:T.emerald},{l:"Pending",v:"18%",c:T.amber},{l:"Overdue",v:"14%",c:T.red}].map(s=>(
              <div key={s.l}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:12,color:T.t2,display:"flex",alignItems:"center",gap:5}}>
                    <span style={{width:6,height:6,borderRadius:"50%",background:s.c}}/>{s.l}
                  </span>
                  <span style={{fontSize:12,fontWeight:700,color:s.c}}>{s.v}</span>
                </div>
                <div style={{height:4,background:T.border,borderRadius:99}}>
                  <div style={{height:"100%",width:s.v,background:s.c,borderRadius:99}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const AppCtr = () => {
  const [drag,sd]=useState(false);
  return (
    <div style={{flex:1,overflowY:"auto",padding:"22px 26px",display:"flex",flexDirection:"column",gap:16}}>
      <div className="au" onDragOver={e=>{e.preventDefault();sd(true);}} onDragLeave={()=>sd(false)} onDrop={e=>{e.preventDefault();sd(false);}}
        style={{border:`2px dashed ${drag?T.teal:T.border}`,borderRadius:12,padding:"28px 20px",textAlign:"center",background:drag?T.tealLo:"transparent",transition:"all .18s",cursor:"pointer"}}>
        <div style={{fontSize:32,marginBottom:10}}>📁</div>
        <p style={{fontWeight:700,color:T.t1,fontSize:14,marginBottom:5}}>Drop contract files here</p>
        <p style={{fontSize:13,color:T.t2,marginBottom:16}}>PDF, DOCX · up to 50 MB · AI summary available</p>
        <Btn>Browse Files</Btn>
      </div>
      <Card className="au a1" noPad>
        <div style={{padding:"13px 20px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <p style={{fontWeight:700,color:T.t1,fontSize:13}}>All Contracts</p>
          <span style={{fontSize:12,color:T.t2}}>{CTRS.length} files</span>
        </div>
        {CTRS.map((c,i)=>(
          <div key={c.id} className="rh" style={{display:"flex",alignItems:"center",gap:12,padding:"14px 20px",borderBottom:i<CTRS.length-1?`1px solid ${T.border}`:"none"}}>
            <div style={{width:38,height:38,borderRadius:9,background:T.raised,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>📄</div>
            <div style={{flex:1,minWidth:0}}>
              <p style={{fontSize:13,fontWeight:600,color:T.t1}}>{c.brand} — {c.type}</p>
              <p style={{fontSize:12,color:T.t2,marginTop:2}}>{c.sz} · Uploaded {c.up} · Expires {c.exp}</p>
            </div>
            <Badge s={c.status}/>
            <div style={{display:"flex",gap:5}}>
              <Btn v="ghost" sm icon="🤖">AI Summary</Btn>
              <Btn v="ghost" sm>👁 View</Btn>
              <Btn v="ghost" sm>⬇</Btn>
              <Btn v="danger" sm>🗑</Btn>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

const AppSet = () => {
  const [nm,sn]=useState("Alex Rivera"), [em,se]=useState("alex@alexcreates.com"), [notif,snf]=useState(true);
  return (
    <div style={{flex:1,overflowY:"auto",padding:"22px 26px"}}>
      <div className="au" style={{display:"grid",gridTemplateColumns:"220px 1fr",gap:18}}>
        <div style={{display:"flex",flexDirection:"column",gap:2}}>
          {["Profile","Billing","Notifications","Integrations","Team","Security","API Keys"].map((s,i)=>(
            <button key={s} style={{padding:"9px 14px",borderRadius:8,border:"none",background:i===0?T.tealLo:"transparent",color:i===0?T.teal:T.t2,cursor:"pointer",fontSize:13,fontWeight:i===0?600:400,textAlign:"left",transition:"all .1s"}}
              onMouseEnter={e=>{if(i!==0)e.currentTarget.style.background=T.raised}}
              onMouseLeave={e=>{if(i!==0)e.currentTarget.style.background="transparent"}}>{s}</button>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <Card>
            <p style={{fontWeight:700,color:T.t1,fontSize:13,marginBottom:16}}>Profile Information</p>
            <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:20}}>
              <div style={{width:64,height:64,borderRadius:"50%",background:`linear-gradient(135deg,${T.teal},${T.violet})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:700,color:"#fff",flexShrink:0}}>A</div>
              <div><Btn v="secondary" sm>Change Photo</Btn><p style={{fontSize:11.5,color:T.t3,marginTop:6}}>JPG, PNG · max 5 MB</p></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <Fld label="Full Name" value={nm} onChange={e=>sn(e.target.value)}/>
              <Fld label="Email" value={em} onChange={e=>se(e.target.value)}/>
              <Fld label="Creator Handle" value="@alexcreates" style={{gridColumn:"1/-1"}}/>
              <Fld label="Primary Platform" value="YouTube"/>
              <Fld label="Country" value="United States"/>
            </div>
            <div style={{marginTop:16}}><Btn>Save Changes</Btn></div>
          </Card>
          <Card>
            <p style={{fontWeight:700,color:T.t1,fontSize:13,marginBottom:16}}>Notifications</p>
            {[{l:"Payment received",d:"Notify when a client pays an invoice"},
              {l:"Invoice overdue",d:"Alert when payment is past due date"},
              {l:"Deal deadline",d:"Remind 5 days before deliverable due"},
              {l:"Weekly summary",d:"Weekly revenue & activity digest"}].map((item,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:i<3?`1px solid ${T.border}`:"none"}}>
                <div>
                  <p style={{fontSize:13,fontWeight:500,color:T.t1}}>{item.l}</p>
                  <p style={{fontSize:12,color:T.t2,marginTop:2}}>{item.d}</p>
                </div>
                <div onClick={()=>snf(v=>!v)} style={{width:40,height:22,borderRadius:99,background:notif?T.teal:T.border,cursor:"pointer",position:"relative",transition:"background .2s",flexShrink:0}}>
                  <div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:3,left:notif?21:3,transition:"left .2s"}}/>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   PUBLIC WEBSITE
══════════════════════════════════════════════════════ */
const PubNav = ({onNav,cur}) => (
  <nav style={{position:"sticky",top:0,zIndex:100,background:`${T.bg}ee`,backdropFilter:"blur(16px)",borderBottom:`1px solid ${T.border}`,padding:"0 5%",display:"flex",alignItems:"center",justifyContent:"space-between",height:60}}>
    <div style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer"}} onClick={()=>onNav("home")}>
      <div style={{width:26,height:26,borderRadius:7,background:`linear-gradient(135deg,${T.teal},${T.violet})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>🌊</div>
      <span style={{fontWeight:800,fontSize:15,color:T.t1,letterSpacing:-.3}}>RelaxFlow</span>
    </div>
    <div style={{display:"flex",alignItems:"center",gap:2}}>
      {[{id:"home",l:"Home"},{id:"features",l:"Features"},{id:"pricing",l:"Pricing"},{id:"about",l:"About"},{id:"contact",l:"Contact"}].map(n=>(
        <button key={n.id} onClick={()=>onNav(n.id)} style={{padding:"6px 14px",borderRadius:7,border:"none",background:cur===n.id?T.raised:"transparent",color:cur===n.id?T.t1:T.t2,cursor:"pointer",fontSize:13,fontWeight:500,transition:"all .12s"}}
          onMouseEnter={e=>e.currentTarget.style.color=T.t1}
          onMouseLeave={e=>{if(cur!==n.id)e.currentTarget.style.color=T.t2}}>{n.l}</button>
      ))}
    </div>
    <div style={{display:"flex",gap:8}}>
      <Btn v="ghost" sm onClick={()=>onNav("login")}>Sign In</Btn>
      <Btn sm onClick={()=>onNav("signup")}>Start Free →</Btn>
    </div>
  </nav>
);

const Footer = ({onNav}) => (
  <footer style={{background:T.surface,borderTop:`1px solid ${T.border}`,padding:"48px 5% 28px"}}>
    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr",gap:32,marginBottom:40}}>
      <div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
          <div style={{width:24,height:24,borderRadius:6,background:`linear-gradient(135deg,${T.teal},${T.violet})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>🌊</div>
          <span style={{fontWeight:800,fontSize:14,color:T.t1}}>RelaxFlow</span>
        </div>
        <p style={{fontSize:13,color:T.t2,lineHeight:1.75,maxWidth:230}}>The creator business OS. Manage deals, invoices, and brand partnerships all in one place.</p>
      </div>
      {[{h:"Product",  lks:["Features","Pricing","Changelog","Roadmap"]},
        {h:"Company",  lks:["About","Blog","Careers","Press"]},
        {h:"Legal",    lks:["Privacy Policy","Terms of Service","Cookie Policy","Refund Policy"]},
        {h:"Support",  lks:["Help Center","FAQ","Contact","Status"]}].map(col=>(
        <div key={col.h}>
          <Lbl>{col.h}</Lbl>
          {col.lks.map(l=><p key={l} onClick={()=>{
            const m={"Privacy Policy":"privacy","Terms of Service":"terms","Cookie Policy":"cookies","Refund Policy":"refund","FAQ":"help","Help Center":"help","Contact":"contact"};
            if(m[l])onNav(m[l]);
          }} style={{fontSize:13,color:T.t2,marginBottom:9,cursor:"pointer",transition:"color .12s"}}
          onMouseEnter={e=>e.currentTarget.style.color=T.t1}
          onMouseLeave={e=>e.currentTarget.style.color=T.t2}>{l}</p>)}
        </div>
      ))}
    </div>
    <div style={{borderTop:`1px solid ${T.border}`,paddingTop:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <p style={{fontSize:12,color:T.t3}}>© 2024 RelaxFlow Inc. All rights reserved.</p>
      <p style={{fontSize:12,color:T.t3}}>Made with 🌊 for creators worldwide</p>
    </div>
  </footer>
);

const HomePage = ({onNav}) => (
  <div>
    <section style={{padding:"88px 5% 100px",textAlign:"center",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 60% 50% at 50% 0%,${T.teal}18,transparent)`,pointerEvents:"none"}}/>
      <div style={{position:"absolute",inset:0,backgroundImage:`radial-gradient(${T.border} 1px,transparent 1px)`,backgroundSize:"30px 30px",opacity:.5,pointerEvents:"none"}}/>
      <div className="au" style={{position:"relative",zIndex:1}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:T.tealLo,border:`1px solid ${T.teal}40`,borderRadius:99,padding:"6px 16px",marginBottom:28}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:T.teal,animation:"glow 2s ease-in-out infinite"}}/>
          <span style={{fontSize:12.5,color:T.teal,fontWeight:600}}>Now with AI Contract Summaries</span>
        </div>
        <h1 style={{fontSize:"clamp(36px,5.5vw,68px)",fontWeight:800,color:T.t1,lineHeight:1.12,letterSpacing:-2,marginBottom:22,maxWidth:780,margin:"0 auto 22px"}}>
          The Business OS<br/>
          <span style={{background:`linear-gradient(135deg,${T.teal},${T.violet})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Built for Creators</span>
        </h1>
        <p style={{fontSize:"clamp(15px,1.6vw,18px)",color:T.t2,maxWidth:520,margin:"0 auto 36px",lineHeight:1.8}}>
          Manage brand deals, send invoices, track payments, and grow your creator business — all from one beautiful dashboard.
        </p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginBottom:16}}>
          <Btn onClick={()=>onNav("signup")} style={{padding:"13px 28px",fontSize:15}}>Start Free — No Card Needed</Btn>
          <Btn v="secondary" onClick={()=>onNav("features")} style={{padding:"13px 28px",fontSize:15}}>See Features →</Btn>
        </div>
        <p style={{fontSize:12,color:T.t3}}>Free forever · 5-min setup · 2,400+ creators already onboard</p>
      </div>
    </section>
    <section style={{padding:"20px 5%",borderTop:`1px solid ${T.border}`,borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"center",gap:48,flexWrap:"wrap",background:T.surface}}>
      {["💰 $2.8M+ Tracked","🤝 12,000+ Deals Closed","🌟 4.9/5 Creator Rating","🔒 SOC 2 Compliant"].map(s=><span key={s} style={{fontSize:13.5,color:T.t2,fontWeight:600}}>{s}</span>)}
    </section>
    <section style={{padding:"80px 5%"}}>
      <div style={{textAlign:"center",marginBottom:56}}>
        <h2 style={{fontSize:"clamp(24px,3.5vw,40px)",fontWeight:800,color:T.t1,letterSpacing:-.8,marginBottom:14}}>Everything you need to run<br/>your creator business</h2>
        <p style={{fontSize:16,color:T.t2,maxWidth:480,margin:"0 auto"}}>From first brand outreach to final payment — RelaxFlow handles the business so you can focus on creating.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
        {[{icon:"🤝",title:"Smart Deal Tracker",desc:"Track every brand collaboration with status, deadlines, and deliverable checklists. Never miss a deadline.",c:T.teal},
          {icon:"📄",title:"Invoice Generator",desc:"Create professional invoices in seconds with live preview. Auto-send payment reminders to late brands.",c:T.violet},
          {icon:"📊",title:"Revenue Analytics",desc:"Real-time charts, monthly trends, and platform breakdowns. Know exactly where your money comes from.",c:T.emerald},
          {icon:"🤖",title:"AI Contract Summary",desc:"Upload any brand contract and get an instant plain-English summary of key terms and red flags.",c:T.amber},
          {icon:"💳",title:"Payment Tracking",desc:"Know exactly what's been paid, pending, and overdue. One-click reminders keep brands accountable.",c:"#c084fc"},
          {icon:"🔒",title:"Secure & Compliant",desc:"Bank-grade encryption, SOC 2 compliance, and GDPR-ready data handling. Your data stays private.",c:T.red},
        ].map(f=><Card key={f.title} hover style={{padding:"28px 24px"}}>
          <div style={{width:44,height:44,borderRadius:10,background:`${f.c}1a`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,marginBottom:16}}>{f.icon}</div>
          <p style={{fontWeight:700,fontSize:15,color:T.t1,marginBottom:9}}>{f.title}</p>
          <p style={{fontSize:13.5,color:T.t2,lineHeight:1.72}}>{f.desc}</p>
        </Card>)}
      </div>
    </section>
    <section style={{padding:"72px 5%",textAlign:"center",background:T.surface,borderTop:`1px solid ${T.border}`}}>
      <h2 style={{fontSize:"clamp(24px,3vw,38px)",fontWeight:800,color:T.t1,marginBottom:14,letterSpacing:-.6}}>Start managing your creator business today</h2>
      <p style={{fontSize:16,color:T.t2,marginBottom:32}}>Join 2,400+ creators already using RelaxFlow to get paid faster.</p>
      <Btn onClick={()=>onNav("signup")} style={{padding:"14px 32px",fontSize:15}}>Get Started Free</Btn>
    </section>
    <Footer onNav={onNav}/>
  </div>
);

const FeaturesPage = ({onNav}) => (
  <div>
    <section style={{padding:"72px 5% 48px",textAlign:"center",position:"relative"}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 50% 40% at 50% 0%,${T.violet}16,transparent)`,pointerEvents:"none"}}/>
      <div className="au" style={{position:"relative"}}>
        <p style={{fontSize:11,color:T.teal,fontWeight:700,letterSpacing:2.2,textTransform:"uppercase",marginBottom:14}}>Platform Features</p>
        <h1 style={{fontSize:"clamp(28px,4vw,52px)",fontWeight:800,color:T.t1,letterSpacing:-1.2,marginBottom:16}}>Built for the modern creator</h1>
        <p style={{fontSize:16,color:T.t2,maxWidth:480,margin:"0 auto"}}>Every feature is purpose-built to save creators time and get them paid faster.</p>
      </div>
    </section>
    <section style={{padding:"20px 5% 80px"}}>
      {[{icon:"⊞",title:"Dashboard",color:T.teal,desc:"Your creator command center with real-time KPIs, revenue charts, and quick actions.",buls:["Real-time KPI cards with sparklines","Monthly area revenue chart","Platform breakdown donut chart","Recent deals table + activity feed"]},
        {icon:"🤝",title:"Brand Deal Tracker",color:T.violet,desc:"Log every deal with full details, deliverables, deadlines, and status. Filter and search instantly.",buls:["Full deal table with search & filters","Status badges: Active, Pending, Overdue","Per-deal: platform, value, deliverables","One-click invoice creation from any deal"]},
        {icon:"📄",title:"Invoice Generator",color:T.emerald,desc:"Create beautiful invoices with a live preview. Send directly to brands or download as PDF.",buls:["Two-panel: form + live white preview","Multiple line items with auto-totals","Configurable tax calculation","Send via email or download as PDF"]},
        {icon:"📊",title:"Analytics Dashboard",color:T.amber,desc:"Deep insights into revenue, deal performance, and payment health with beautiful charts.",buls:["12-month revenue area chart","Deal pipeline stage breakdown","Revenue by platform breakdown","Payment health donut chart"]},
        {icon:"🤖",title:"AI Contract Summary",color:"#c084fc",desc:"Upload any brand contract and our AI instantly extracts key terms and highlights red flags.",buls:["PDF & DOCX upload support","Instant plain-English AI summary","Key clause extraction","Red flag detection"]},
        {icon:"💳",title:"Payment Tracking",color:T.red,desc:"Unified payment tracker with automated reminders and escalation tools for overdue invoices.",buls:["Status: Paid, Pending, Overdue","One-click reminder emails","Escalation tools","Collection rate progress bar"]},
      ].map((f,idx)=>(
        <div key={f.title} className="au" style={{display:"grid",gridTemplateColumns:idx%2===0?"1fr 1.1fr":"1.1fr 1fr",gap:48,alignItems:"center",padding:"52px 0",borderBottom:`1px solid ${T.border}`}}>
          <div style={{order:idx%2===0?0:1}}>
            <p style={{fontSize:10.5,color:f.color,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>{f.title}</p>
            <h2 style={{fontSize:"clamp(20px,2.5vw,30px)",fontWeight:800,color:T.t1,letterSpacing:-.5,marginBottom:14,lineHeight:1.3}}>{f.desc}</h2>
          </div>
          <Card style={{padding:"28px",order:idx%2===0?1:0}}>
            <div style={{width:42,height:42,borderRadius:10,background:`${f.color}1a`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,marginBottom:14}}>{f.icon}</div>
            <p style={{fontWeight:800,fontSize:16,color:T.t1,marginBottom:12}}>{f.title}</p>
            {f.buls.map(b=><div key={b} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:9}}>
              <span style={{color:f.color,fontSize:13,marginTop:1,flexShrink:0}}>✓</span>
              <span style={{fontSize:13.5,color:T.t2}}>{b}</span>
            </div>)}
          </Card>
        </div>
      ))}
    </section>
    <Footer onNav={onNav}/>
  </div>
);

const PricingPage = ({onNav}) => {
  const [ann,sa]=useState(false);
  const plans=[
    {name:"Free",price:0,desc:"For creators just starting out",color:T.t3,badge:"Free",
     feats:["5 active deals","3 invoices/month","Basic dashboard","Manual payment tracking","Email support"]},
    {name:"Pro",price:ann?23:29,desc:"For growing creators managing multiple brands",color:T.teal,badge:"Pro",pop:true,
     feats:["Unlimited deals","Unlimited invoices","Full analytics","Payment reminders","Priority support","Custom invoice branding","CSV exports"]},
    {name:"Premium",price:ann?39:49,desc:"For established creators with serious volume",color:T.violet,badge:"Premium",
     feats:["Everything in Pro","AI contract summaries","Team member access","API access","White-label invoices","Advanced analytics","Dedicated account manager"]},
    {name:"Enterprise",price:ann?103:129,desc:"For agencies and creator networks",color:T.amber,badge:"Enterprise",
     feats:["Everything in Premium","Unlimited team seats","Custom integrations","SSO / SAML","SLA guarantee","Custom contracts","Volume discounts","Onboarding & training"]},
  ];
  return (
    <div>
      <section style={{padding:"72px 5% 48px",textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 50% 40% at 50% 0%,${T.teal}12,transparent)`,pointerEvents:"none"}}/>
        <div className="au" style={{position:"relative"}}>
          <p style={{fontSize:11,color:T.teal,fontWeight:700,letterSpacing:2.2,textTransform:"uppercase",marginBottom:14}}>Pricing</p>
          <h1 style={{fontSize:"clamp(28px,4vw,52px)",fontWeight:800,color:T.t1,letterSpacing:-1.2,marginBottom:14}}>Simple, transparent pricing</h1>
          <p style={{fontSize:16,color:T.t2,marginBottom:28}}>Start free. Upgrade when you're ready. No hidden fees.</p>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:T.surface,border:`1px solid ${T.border}`,borderRadius:99,padding:"5px 8px"}}>
            {[{lbl:"Monthly",val:false},{lbl:"Annual",val:true,tag:"Save 20%"}].map(o=>(
              <button key={o.lbl} onClick={()=>sa(o.val)} style={{padding:"6px 16px",borderRadius:99,border:"none",background:ann===o.val?T.teal:"transparent",color:ann===o.val?"#fff":T.t2,cursor:"pointer",fontSize:13,fontWeight:600,transition:"all .2s"}}>
                {o.lbl}{o.tag&&<span style={{fontSize:11,color:ann?"#fff":T.emerald,marginLeft:6,fontWeight:700}}>{o.tag}</span>}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section style={{padding:"0 5% 80px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
          {plans.map(p=>(
            <Card key={p.name} style={{padding:"26px 22px",position:"relative",border:`1px solid ${p.pop?T.teal:T.border}`,background:p.pop?`${T.teal}08`:T.surface}}>
              {p.pop&&<div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:T.teal,color:"#fff",fontSize:10.5,fontWeight:700,padding:"3px 14px",borderRadius:99,letterSpacing:.5,whiteSpace:"nowrap"}}>MOST POPULAR</div>}
              <Badge s={p.badge}/>
              <p style={{fontWeight:800,fontSize:18,color:T.t1,marginTop:11,marginBottom:4}}>{p.name}</p>
              <p style={{fontSize:12.5,color:T.t2,marginBottom:18,lineHeight:1.55}}>{p.desc}</p>
              <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:22}}>
                {p.price===0?<span style={{fontSize:30,fontWeight:800,color:T.t1}}>Free</span>
                  :<><span style={{fontSize:30,fontWeight:800,color:T.t1}}>${p.price}</span><span style={{fontSize:13,color:T.t2}}>/mo</span></>}
              </div>
              <Btn v={p.pop?"primary":"secondary"} full onClick={()=>onNav("app-dashboard")}>{p.price===0?"Get Started":"Subscribe Now"}</Btn>
              <Div my={20}/>
              {p.feats.map(f=><div key={f} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:9}}>
                <span style={{color:p.color===T.t3?T.t2:p.color,fontSize:13,marginTop:1,flexShrink:0}}>✓</span>
                <span style={{fontSize:13,color:T.t2}}>{f}</span>
              </div>)}
            </Card>
          ))}
        </div>
        <div style={{marginTop:40,padding:"26px 32px",background:T.surface,border:`1px solid ${T.border}`,borderRadius:14,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
          <div>
            <p style={{fontWeight:700,fontSize:15,color:T.t1,marginBottom:4}}>Need something custom?</p>
            <p style={{fontSize:13.5,color:T.t2}}>Volume pricing and custom integrations for creator agencies and networks.</p>
          </div>
          <Btn onClick={()=>onNav("contact")}>Contact Sales →</Btn>
        </div>
      </section>
      <Footer onNav={onNav}/>
    </div>
  );
};

const AboutPage = ({onNav}) => (
  <div>
    <section style={{padding:"72px 5% 60px",position:"relative"}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 60% 40% at 30% 50%,${T.teal}10,transparent)`,pointerEvents:"none"}}/>
      <div className="au" style={{position:"relative",maxWidth:700}}>
        <p style={{fontSize:11,color:T.teal,fontWeight:700,letterSpacing:2.2,textTransform:"uppercase",marginBottom:14}}>About Us</p>
        <h1 style={{fontSize:"clamp(26px,4vw,52px)",fontWeight:800,color:T.t1,letterSpacing:-1.2,marginBottom:20,lineHeight:1.2}}>We believe creators deserve better business tools</h1>
        <p style={{fontSize:16,color:T.t2,lineHeight:1.85,marginBottom:14}}>RelaxFlow was founded in 2023 by ex-creators who were tired of managing brand deals in spreadsheets and chasing late payments with no system.</p>
        <p style={{fontSize:16,color:T.t2,lineHeight:1.85}}>We built the platform we wished existed — a true business OS designed specifically for content creators, YouTubers, influencers, and digital freelancers.</p>
      </div>
    </section>
    <section style={{padding:"20px 5% 64px"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:64}}>
        {[{icon:"🎯",title:"Our Mission",desc:"Give every creator the business infrastructure of a Fortune 500 company — without the complexity or cost. Simple tools that save time and make you money."},
          {icon:"🌍",title:"Our Vision",  desc:"A world where creators focus entirely on their craft, knowing their business side is handled automatically, professionally, and transparently."},
          {icon:"💡",title:"Our Values",  desc:"Creator-first design. Radical transparency. Privacy by default. No dark patterns. We build tools we'd use ourselves — and we genuinely care about your success."},
        ].map(v=><Card key={v.title} style={{padding:"26px 22px"}}>
          <div style={{fontSize:26,marginBottom:12}}>{v.icon}</div>
          <p style={{fontWeight:700,fontSize:15,color:T.t1,marginBottom:9}}>{v.title}</p>
          <p style={{fontSize:13.5,color:T.t2,lineHeight:1.75}}>{v.desc}</p>
        </Card>)}
      </div>
      <div style={{textAlign:"center",padding:"48px 0",borderTop:`1px solid ${T.border}`}}>
        <h2 style={{fontSize:"clamp(22px,3vw,34px)",fontWeight:800,color:T.t1,marginBottom:12,letterSpacing:-.5}}>The team behind RelaxFlow</h2>
        <p style={{fontSize:15,color:T.t2,marginBottom:40}}>A small, passionate team of designers, engineers, and ex-creators.</p>
        <div style={{display:"flex",justifyContent:"center",gap:32,flexWrap:"wrap"}}>
          {[{n:"Jordan Lee",r:"CEO & Co-founder",e:"Ex-YouTuber · 1.2M subs"},{n:"Maya Chen",r:"CTO & Co-founder",e:"Ex-Stripe Engineer"},
            {n:"Sam Park",r:"Head of Design",e:"Previously at Linear"},{n:"Priya Shah",r:"Head of Growth",e:"Ex-Creator Economy PM"}].map((m,i)=>(
            <div key={m.n} style={{textAlign:"center"}}>
              <div style={{width:68,height:68,borderRadius:"50%",background:`linear-gradient(135deg,${[T.teal,T.violet,T.emerald,T.amber][i]},${T.bg})`,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:700,color:"#fff",margin:"0 auto 12px"}}>{m.n[0]}</div>
              <p style={{fontWeight:700,fontSize:14,color:T.t1}}>{m.n}</p>
              <p style={{fontSize:12.5,color:T.teal,marginTop:2,fontWeight:600}}>{m.r}</p>
              <p style={{fontSize:12,color:T.t3,marginTop:3}}>{m.e}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer onNav={onNav}/>
  </div>
);

const ContactPage = ({onNav}) => {
  const [form,sf]=useState({name:"",email:"",subject:"",msg:""});
  const [sent,ss]=useState(false);
  return (
    <div>
      <section style={{padding:"72px 5% 80px"}}>
        <div className="au" style={{textAlign:"center",marginBottom:52}}>
          <p style={{fontSize:11,color:T.teal,fontWeight:700,letterSpacing:2.2,textTransform:"uppercase",marginBottom:14}}>Contact</p>
          <h1 style={{fontSize:"clamp(26px,4vw,48px)",fontWeight:800,color:T.t1,letterSpacing:-1,marginBottom:14}}>We're here to help</h1>
          <p style={{fontSize:16,color:T.t2}}>Reach out with questions, feedback, or partnership ideas.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:28,maxWidth:880,margin:"0 auto"}}>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {[{icon:"📧",title:"Email Support",val:"hello@relaxflow.io",sub:"Replies within 24 hours"},
              {icon:"💬",title:"Live Chat",    val:"Available in-app",    sub:"Mon–Fri, 9am–6pm EST"},
              {icon:"🐦",title:"Twitter / X",  val:"@RelaxFlowApp",       sub:"Quick questions & updates"},
              {icon:"📖",title:"Help Center",  val:"docs.relaxflow.io",   sub:"Guides, FAQs, tutorials"}].map(c=>(
              <Card key={c.title} style={{padding:"16px 18px",display:"flex",gap:12,alignItems:"center"}}>
                <div style={{width:38,height:38,borderRadius:9,background:T.tealLo,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0}}>{c.icon}</div>
                <div>
                  <p style={{fontWeight:600,fontSize:13,color:T.t1}}>{c.title}</p>
                  <p style={{fontSize:12.5,color:T.teal,marginTop:2}}>{c.val}</p>
                  <p style={{fontSize:11.5,color:T.t3,marginTop:1}}>{c.sub}</p>
                </div>
              </Card>
            ))}
          </div>
          <Card style={{padding:"26px"}}>
            {sent ? (
              <div style={{textAlign:"center",padding:"40px 0"}}>
                <div style={{fontSize:44,marginBottom:14}}>✅</div>
                <p style={{fontWeight:700,fontSize:17,color:T.t1,marginBottom:8}}>Message sent!</p>
                <p style={{fontSize:14,color:T.t2,marginBottom:22}}>We'll reply within 24 hours.</p>
                <Btn onClick={()=>ss(false)}>Send another</Btn>
              </div>
            ) : (
              <>
                <p style={{fontWeight:700,fontSize:13.5,color:T.t1,marginBottom:18}}>Send us a message</p>
                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
                    <Fld label="Your Name" placeholder="Alex Rivera" value={form.name} onChange={e=>sf(v=>({...v,name:e.target.value}))}/>
                    <Fld label="Email" placeholder="alex@email.com" value={form.email} onChange={e=>sf(v=>({...v,email:e.target.value}))}/>
                  </div>
                  <Fld label="Subject" placeholder="How can we help?" value={form.subject} onChange={e=>sf(v=>({...v,subject:e.target.value}))}/>
                  <Fld label="Message" placeholder="Tell us what's on your mind..." value={form.msg} onChange={e=>sf(v=>({...v,msg:e.target.value}))} rows={5}/>
                  <Btn full onClick={()=>ss(true)}>Send Message →</Btn>
                </div>
              </>
            )}
          </Card>
        </div>
      </section>
      <Footer onNav={onNav}/>
    </div>
  );
};

/* ── LEGAL TEMPLATE ─────────────────────────────────── */
const Legal = ({title,sections,onNav}) => (
  <div>
    <section style={{padding:"64px 5% 80px"}}>
      <div style={{maxWidth:740,margin:"0 auto"}}>
        <p style={{fontSize:11,color:T.teal,fontWeight:700,letterSpacing:2.2,textTransform:"uppercase",marginBottom:12}}>Legal</p>
        <h1 style={{fontSize:"clamp(24px,3.5vw,42px)",fontWeight:800,color:T.t1,letterSpacing:-.8,marginBottom:8}}>{title}</h1>
        <p style={{fontSize:12.5,color:T.t3,marginBottom:44}}>Last updated: June 1, 2024</p>
        {sections.map(s=>(
          <div key={s.h} style={{marginBottom:34}}>
            <h2 style={{fontSize:17,fontWeight:700,color:T.t1,marginBottom:11}}>{s.h}</h2>
            <p style={{fontSize:14.5,color:T.t2,lineHeight:1.88}}>{s.body}</p>
          </div>
        ))}
        <div style={{marginTop:44,padding:"17px 20px",background:T.surface,border:`1px solid ${T.border}`,borderRadius:10}}>
          <p style={{fontSize:13.5,color:T.t2}}>Questions about this policy? <span onClick={()=>onNav("contact")} style={{color:T.teal,cursor:"pointer",fontWeight:600}}>Contact us →</span></p>
        </div>
      </div>
    </section>
    <Footer onNav={onNav}/>
  </div>
);

const PrivacyPage = ({onNav}) => <Legal onNav={onNav} title="Privacy Policy" sections={[
  {h:"1. Information We Collect",body:"We collect information you provide directly when creating an account (name, email, payment info) and data about how you use our platform. This helps us improve RelaxFlow and personalize your experience. We never sell your personal data to third parties."},
  {h:"2. How We Use Your Information",body:"We use collected information to provide and improve our services, process transactions, send technical notices and support messages, respond to questions, and monitor usage trends. All usage data is anonymized and aggregated."},
  {h:"3. Data Storage and Security",body:"All data is stored on secure servers with AES-256 encryption at rest and TLS 1.3 in transit. We are SOC 2 Type II compliant. Access to production data is restricted to authorized personnel and is logged and audited regularly."},
  {h:"4. Cookies and Tracking",body:"We use essential cookies for authentication and session management, and anonymized analytics cookies to understand feature usage. We do not use advertising or third-party tracking cookies. See our Cookie Policy for full details."},
  {h:"5. Your Rights (GDPR / CCPA)",body:"EU and California users have rights including: access to your data, right to correction, right to deletion ('right to be forgotten'), data portability, and right to object to processing. Contact privacy@relaxflow.io to exercise these rights."},
  {h:"6. Contact",body:"Questions about this Privacy Policy? Contact us at privacy@relaxflow.io or RelaxFlow Inc., 123 Creator Avenue, San Francisco, CA 94105."},
]}/>;

const TermsPage = ({onNav}) => <Legal onNav={onNav} title="Terms of Service" sections={[
  {h:"1. Acceptance of Terms",body:"By accessing and using RelaxFlow, you agree to be bound by these Terms of Service. If you do not agree, please do not use our service. We reserve the right to update these terms with reasonable notice."},
  {h:"2. Account Registration",body:"You must create an account to use most features. You agree to provide accurate information and maintain security of your credentials. Accounts may not be shared or transferred."},
  {h:"3. Acceptable Use",body:"You agree not to use RelaxFlow for unlawful purposes, to send spam or fraudulent invoices, impersonate others, attempt unauthorized system access, or interfere with our services."},
  {h:"4. Subscription and Billing",body:"Paid plans bill monthly or annually as selected and auto-renew unless cancelled before the renewal date. All prices are in USD. Price changes will be communicated with 30 days' notice."},
  {h:"5. Intellectual Property",body:"RelaxFlow and its content are owned by RelaxFlow Inc. You retain ownership of content you create (invoices, contracts, etc.). We receive a limited license to process and display your content to provide the service."},
  {h:"6. Limitation of Liability",body:"RelaxFlow is provided 'as is'. We are not liable for indirect, incidental, or consequential damages, including financial losses from invoice disputes or missed payments."},
]}/>;

const CookiePage = ({onNav}) => <Legal onNav={onNav} title="Cookie Policy" sections={[
  {h:"What Are Cookies?",body:"Cookies are small text files stored on your device when you visit a website. They allow us to keep you logged in, remember preferences, and understand how you use RelaxFlow."},
  {h:"Cookies We Use",body:"Essential cookies are required for authentication and platform function. Analytics cookies help us understand feature usage via anonymized data. Preference cookies remember your settings and theme. We do NOT use advertising or third-party ad tracking cookies."},
  {h:"Managing Cookies",body:"You can control cookies through your browser settings. Disabling essential cookies will prevent RelaxFlow from functioning. You can opt out of analytics cookies from Settings > Privacy at any time."},
  {h:"Updates",body:"We may update this Cookie Policy as we add new features. We will notify you of significant changes via email or in-app notice."},
]}/>;

const RefundPage = ({onNav}) => <Legal onNav={onNav} title="Refund & Subscription Policy" sections={[
  {h:"Free Plan",body:"The Free plan is available at no cost indefinitely. Downgrading from a paid plan to Free takes effect at the end of the current billing period."},
  {h:"Subscription Billing",body:"Paid subscriptions bill on a recurring basis. Payments are processed via Stripe. You receive an email receipt for every charge."},
  {h:"Cancellation",body:"You may cancel at any time from Settings > Billing. Access continues until the end of your billing period. No cancellation fees. Cancellations within 24 hours of a renewal may qualify for a refund of that renewal."},
  {h:"Refund Policy",body:"We offer a 14-day money-back guarantee on all first-time paid subscriptions. After 14 days, refunds are issued at our discretion for documented technical failures. Partial refunds are not offered for unused time."},
  {h:"Failed Payments",body:"Failed payments are retried 3 times over 7 days. If payment is not received, your account downgrades to Free. All data is preserved for 90 days."},
]}/>;

/* ── HELP PAGE ─────────────────────────────────────── */
const HelpPage = ({onNav}) => {
  const [open,so]=useState(null), [q,sq]=useState("");
  const faqs=[
    {cat:"Getting Started",items:[
      {q:"How do I get started?",a:"Sign up at relaxflow.io, complete your creator profile, and add your first brand deal. Setup takes under 5 minutes with no credit card required for the Free plan."},
      {q:"Do I need a credit card to sign up?",a:"No! The Free plan requires no payment information. You only need billing details when upgrading to a paid plan."},
      {q:"Can I import deals from a spreadsheet?",a:"Yes. From the Deals page, click 'Import' and upload a CSV. We provide a downloadable template to format your data correctly."},
    ]},
    {cat:"Invoices & Payments",items:[
      {q:"How do I send an invoice to a brand?",a:"Go to the Invoices page, click 'New Invoice', fill in the client details and line items, then click 'Send'. The brand receives a professional PDF invoice via email."},
      {q:"What currencies are supported?",a:"RelaxFlow supports USD, EUR, GBP, CAD, AUD, and INR. Your account default currency is set in Settings > Billing."},
      {q:"Can I accept payments directly?",a:"We are building Stripe-integrated payment acceptance for Q3 2024. Currently, RelaxFlow tracks payments made via bank transfer, PayPal, or other methods you arrange with brands."},
    ]},
    {cat:"AI Features",items:[
      {q:"How does AI contract summary work?",a:"Upload a PDF or DOCX contract to the Contracts page. Our AI analyzes it and returns a plain-English summary including payment terms, exclusivity, usage rights, and unusual clauses to review."},
      {q:"Is the AI summary legally binding advice?",a:"No. AI summaries are for informational purposes only and do not constitute legal advice. For significant partnerships, we strongly recommend reviewing contracts with a qualified attorney."},
    ]},
    {cat:"Billing & Plans",items:[
      {q:"Can I change my plan at any time?",a:"Yes. Upgrades take effect immediately (prorated). Downgrades take effect at the start of your next billing period. Change from Settings > Billing."},
      {q:"What happens to my data if I cancel?",a:"Data is preserved for 90 days after cancellation. You can export all deals, invoices, and contracts as CSV/PDF from Settings > Export. After 90 days, data is permanently deleted."},
    ]},
    {cat:"Security & Privacy",items:[
      {q:"Is my financial data secure?",a:"Yes. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We are SOC 2 Type II certified. We never store credit card numbers — all payments are handled by Stripe."},
      {q:"Can I delete my account?",a:"Yes. Go to Settings > Account > Delete Account. This permanently deletes all your data from our servers within 30 days, compliant with GDPR and CCPA."},
    ]},
  ];
  const filtered=faqs.map(c=>({...c,items:c.items.filter(i=>i.q.toLowerCase().includes(q.toLowerCase())||i.a.toLowerCase().includes(q.toLowerCase()))})).filter(c=>c.items.length>0);
  return (
    <div>
      <section style={{padding:"64px 5% 28px",textAlign:"center"}}>
        <p style={{fontSize:11,color:T.teal,fontWeight:700,letterSpacing:2.2,textTransform:"uppercase",marginBottom:12}}>Help Center</p>
        <h1 style={{fontSize:"clamp(26px,4vw,48px)",fontWeight:800,color:T.t1,letterSpacing:-1,marginBottom:18}}>How can we help you?</h1>
        <div style={{maxWidth:500,margin:"0 auto",display:"flex",alignItems:"center",gap:9,background:T.surface,border:`1px solid ${T.border}`,borderRadius:10,padding:"10px 16px"}}>
          <span style={{fontSize:16,color:T.t3}}>🔍</span>
          <input placeholder="Search for answers..." value={q} onChange={e=>sq(e.target.value)}
            style={{border:"none",background:"transparent",color:T.t1,fontSize:14,outline:"none",flex:1}}/>
        </div>
      </section>
      <section style={{padding:"28px 5% 80px",maxWidth:800,margin:"0 auto"}}>
        {filtered.map(cat=>(
          <div key={cat.cat} style={{marginBottom:32}}>
            <p style={{fontSize:10.5,color:T.teal,fontWeight:700,letterSpacing:1.8,textTransform:"uppercase",marginBottom:12}}>{cat.cat}</p>
            <Card noPad>
              {cat.items.map((item,i)=>(
                <div key={i}>
                  <button onClick={()=>so(open===`${cat.cat}${i}`?null:`${cat.cat}${i}`)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"15px 20px",background:"transparent",border:"none",cursor:"pointer",textAlign:"left"}}
                    onMouseEnter={e=>e.currentTarget.style.background=T.raised}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <span style={{fontSize:14,fontWeight:600,color:T.t1}}>{item.q}</span>
                    <span style={{fontSize:18,color:T.t3,flexShrink:0,marginLeft:14,transform:open===`${cat.cat}${i}`?"rotate(45deg)":"none",transition:"transform .2s"}}>+</span>
                  </button>
                  {open===`${cat.cat}${i}`&&<div style={{padding:"0 20px 16px",borderTop:`1px solid ${T.border}`}}>
                    <p style={{fontSize:14,color:T.t2,lineHeight:1.82,paddingTop:13}}>{item.a}</p>
                  </div>}
                  {i<cat.items.length-1&&<div style={{height:1,background:T.border,margin:"0 20px"}}/>}
                </div>
              ))}
            </Card>
          </div>
        ))}
        {filtered.length===0&&<div style={{textAlign:"center",padding:"48px 0",color:T.t3}}>No results found for "{q}"</div>}
        <Card style={{marginTop:20,textAlign:"center",padding:"26px"}}>
          <p style={{fontWeight:700,fontSize:14.5,color:T.t1,marginBottom:7}}>Still need help?</p>
          <p style={{fontSize:13,color:T.t2,marginBottom:16}}>Our support team replies within 24 hours.</p>
          <Btn onClick={()=>onNav("contact")}>Contact Support →</Btn>
        </Card>
      </section>
      <Footer onNav={onNav}/>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════ */
const LoginPage = ({onNav}) => {
  const [email, se] = useState("");
  const [pass, spass] = useState("");
  
  const handleLogin = (e) => {
    e.preventDefault();
    onNav("app-dashboard");
  };

  return (
    <div style={{minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px", background:T.bg, position:"relative"}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 40% 50% at 50% 0%,${T.teal}10,transparent)`,pointerEvents:"none"}}/>
      <div className="au" style={{width:"100%", maxWidth:420, position:"relative"}}>
        <div style={{textAlign:"center", marginBottom:32}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,cursor:"pointer",marginBottom:24}} onClick={()=>onNav("home")}>
            <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${T.teal},${T.violet})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🌊</div>
            <span style={{fontWeight:800,fontSize:18,color:T.t1,letterSpacing:-.3}}>RelaxFlow</span>
          </div>
          <h1 style={{fontSize:24,fontWeight:800,color:T.t1,letterSpacing:-.5,marginBottom:8}}>Welcome back</h1>
          <p style={{fontSize:14,color:T.t2}}>Enter your details to sign in to your account</p>
        </div>
        
        <Card style={{padding:"32px"}}>
          <form onSubmit={handleLogin} style={{display:"flex", flexDirection:"column", gap:16}}>
            <Fld label="Email" type="email" placeholder="alex@creator.com" value={email} onChange={e=>se(e.target.value)} />
            <div>
              <div style={{display:"flex", justifyContent:"space-between", marginBottom:5}}>
                <label style={{fontSize:12,color:T.t2,fontWeight:600}}>Password</label>
                <span style={{fontSize:12,color:T.teal,cursor:"pointer",fontWeight:600}}>Forgot password?</span>
              </div>
              <input type="password" value={pass} onChange={e=>spass(e.target.value)} placeholder="••••••••" style={{background:T.bg,border:`1px solid ${T.border}`,borderRadius:8,padding:"10px 12px",color:T.t1,fontSize:13,width:"100%"}} />
            </div>
            
            <Btn full type="submit" style={{marginTop:8}}>Sign In</Btn>
            
            <div style={{display:"flex", alignItems:"center", gap:12, margin:"16px 0"}}>
              <div style={{height:1,background:T.border,flex:1}}/>
              <span style={{fontSize:12,color:T.t3,fontWeight:600}}>OR</span>
              <div style={{height:1,background:T.border,flex:1}}/>
            </div>
            
            <Btn full v="secondary" icon="G">Sign in with Google</Btn>
          </form>
        </Card>
        
        <p style={{textAlign:"center", fontSize:13.5, color:T.t2, marginTop:24}}>
          Don't have an account? <span onClick={()=>onNav("signup")} style={{color:T.teal,cursor:"pointer",fontWeight:600}}>Sign up free</span>
        </p>
      </div>
    </div>
  );
};

const SignupPage = ({onNav}) => {
  const [name, sn] = useState("");
  const [email, se] = useState("");
  const [pass, spass] = useState("");
  
  const handleSignup = (e) => {
    e.preventDefault();
    onNav("app-dashboard");
  };

  return (
    <div style={{minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px", background:T.bg, position:"relative"}}>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 40% 50% at 50% 0%,${T.violet}10,transparent)`,pointerEvents:"none"}}/>
      <div className="au" style={{width:"100%", maxWidth:420, position:"relative"}}>
        <div style={{textAlign:"center", marginBottom:32}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,cursor:"pointer",marginBottom:24}} onClick={()=>onNav("home")}>
            <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${T.teal},${T.violet})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🌊</div>
            <span style={{fontWeight:800,fontSize:18,color:T.t1,letterSpacing:-.3}}>RelaxFlow</span>
          </div>
          <h1 style={{fontSize:24,fontWeight:800,color:T.t1,letterSpacing:-.5,marginBottom:8}}>Create your account</h1>
          <p style={{fontSize:14,color:T.t2}}>Get Started for free. No credit card required.</p>
        </div>
        
        <Card style={{padding:"32px"}}>
          <form onSubmit={handleSignup} style={{display:"flex", flexDirection:"column", gap:16}}>
            <Fld label="Company / Client Name" placeholder="Alex Rivera Content" value={name} onChange={e=>sn(e.target.value)} />
            <Fld label="Email" type="email" placeholder="alex@creator.com" value={email} onChange={e=>se(e.target.value)} />
            <Fld label="Password" type="password" placeholder="Create a strong password" value={pass} onChange={e=>spass(e.target.value)} />
            
            <Btn full type="submit" style={{marginTop:8}}>Create Account</Btn>
            
            <p style={{fontSize:11.5, color:T.t3, textAlign:"center", lineHeight:1.5, marginTop:4}}>
              By signing up, you agree to our <span onClick={()=>onNav("terms")} style={{color:T.teal,cursor:"pointer"}}>Terms</span> and <span onClick={()=>onNav("privacy")} style={{color:T.teal,cursor:"pointer"}}>Privacy Policy</span>.
            </p>
          </form>
        </Card>
        
        <p style={{textAlign:"center", fontSize:13.5, color:T.t2, marginTop:24}}>
          Already have an account? <span onClick={()=>onNav("login")} style={{color:T.teal,cursor:"pointer",fontWeight:600}}>Sign in</span>
        </p>
      </div>
    </div>
  );
};

const APP_MAP={
  "app-dashboard":{title:"Dashboard",   sub:"June 2024",                     P:AppDash},
  "app-deals":    {title:"Brand Deals", sub:"12 active collaborations",       P:AppDeals},
  "app-invoices": {title:"Invoices",    sub:"Create & send invoices",         P:AppInv},
  "app-payments": {title:"Payments",    sub:"Track payment status",           P:AppPay},
  "app-analytics":{title:"Analytics",   sub:"Business performance",           P:AppAna},
  "app-contracts":{title:"Contracts",   sub:"Brand agreements & AI summaries",P:AppCtr},
  "app-settings": {title:"Settings",    sub:"Account & preferences",          P:AppSet},
};

export default function App(){
  const [page,sp]=useState("home");
  const isApp=page.startsWith("app-");

  if(isApp){
    const {title,sub,P}=APP_MAP[page]||APP_MAP["app-dashboard"];
    return <>
      <Styles/>
      <div style={{display:"flex",height:"100vh",overflow:"hidden"}}>
        <AppSide active={page} onNav={sp}/>
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",background:T.bg}}>
          <AppTop title={title} sub={sub}/>
          <P onNav={sp}/>
        </div>
      </div>
    </>;
  }

  const PUB={home:<HomePage onNav={sp}/>,features:<FeaturesPage onNav={sp}/>,pricing:<PricingPage onNav={sp}/>,
    about:<AboutPage onNav={sp}/>,contact:<ContactPage onNav={sp}/>,
    privacy:<PrivacyPage onNav={sp}/>,terms:<TermsPage onNav={sp}/>,
    cookies:<CookiePage onNav={sp}/>,refund:<RefundPage onNav={sp}/>,help:<HelpPage onNav={sp}/>,
    login:<LoginPage onNav={sp}/>,signup:<SignupPage onNav={sp}/>};

  if(page==="login") return PUB.login;
  if(page==="signup") return PUB.signup;

  return <>
    <Styles/>
    <div style={{height:"100vh",overflowY:"auto",background:T.bg}}>
      <PubNav onNav={sp} cur={page}/>
      {PUB[page]||PUB.home}
    </div>
  </>;
}
