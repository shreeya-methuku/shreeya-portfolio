import React from 'react';
import { motion } from 'framer-motion';
import characterImg from '../character.png';

export const PixelCharacter: React.FC = () => {
  return (
    <motion.div
      className="relative select-none"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: 340, overflow: 'visible' }}
    >

      {/* ── FLOATING HOLO PANEL — top left ─────────────────── */}
      <motion.div
        animate={{ y: [0, -7, 0], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', left: -130, top: 60,
          width: 142, height: 108,
          background: 'rgba(2,16,26,0.92)',
          border: '1px solid rgba(34,197,94,0.55)',
          borderRadius: 6, padding: '9px 10px',
          boxShadow: '0 0 24px rgba(34,197,94,0.12), inset 0 0 20px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {/* HUD corners */}
        {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h], i) => (
          <div key={i} style={{
            position:'absolute', [v]:4, [h]:4, width:8, height:8,
            borderTop: v==='top' ? '1.5px solid #4ade80' : undefined,
            borderBottom: v==='bottom' ? '1.5px solid #4ade80' : undefined,
            borderLeft: h==='left' ? '1.5px solid #4ade80' : undefined,
            borderRight: h==='right' ? '1.5px solid #4ade80' : undefined,
          }}/>
        ))}
        <div style={{ color:'#4ade80', fontSize:7.5, fontFamily:'monospace', lineHeight:1.65 }}>
          <div style={{ color:'#86efac', fontSize:8.5, fontWeight:'bold', marginBottom:3 }}>ML MODEL v2.2</div>
          <div style={{ color:'#38bdf8' }}>{'> import tensorflow'}</div>
          <div>{'> model.fit(X_train,y)'}</div>
          <div style={{ color:'#4ade80' }}>{'> accuracy: 98.7%'}</div>
          <div style={{ color:'#34d399' }}>{'[████████░░] 82%'}</div>
          <div style={{ color:'#6ee7b7', marginTop:2 }}>STATUS: TRAINING</div>
        </div>
      </motion.div>

      {/* ── FLOATING HOLO PANEL — top right ────────────────── */}
      <motion.div
        animate={{ y: [0, -6, 0], opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
        style={{
          position: 'absolute', right: -136, top: 42,
          width: 138, height: 100,
          background: 'rgba(2,10,20,0.92)',
          border: '1px solid rgba(34,197,94,0.45)',
          borderRadius: 6, padding: '8px 10px',
          boxShadow: '0 0 18px rgba(34,197,94,0.1)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h], i) => (
          <div key={i} style={{
            position:'absolute', [v]:4, [h]:4, width:7, height:7,
            borderTop: v==='top' ? '1.5px solid #22c55e' : undefined,
            borderBottom: v==='bottom' ? '1.5px solid #22c55e' : undefined,
            borderLeft: h==='left' ? '1.5px solid #22c55e' : undefined,
            borderRight: h==='right' ? '1.5px solid #22c55e' : undefined,
          }}/>
        ))}
        <div style={{ color:'#4ade80', fontSize:7, fontFamily:'monospace', lineHeight:1.65 }}>
          <div style={{ color:'#86efac', fontSize:8, fontWeight:'bold', marginBottom:2 }}>{'~/projects $'}</div>
          <div style={{ color:'#38bdf8' }}>{'def neural_net():'}</div>
          <div>{'  layers=[512,256,10]'}</div>
          <div style={{ color:'#c084fc' }}>{'  return model'}</div>
          <div style={{ color:'#fbbf24' }}>{'# loss: 0.042 ✓'}</div>
        </div>
      </motion.div>

      {/* ── FLOATING HOLO PANEL — right mid ────────────────── */}
      <motion.div
        animate={{ y: [0, -8, 0], opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
        style={{
          position: 'absolute', right: -142, top: 175,
          width: 132, height: 110,
          background: 'rgba(2,10,20,0.92)',
          border: '1px solid rgba(56,189,248,0.45)',
          borderRadius: 6, padding: '8px 9px',
          boxShadow: '0 0 16px rgba(56,189,248,0.1)',
          backdropFilter: 'blur(4px)',
        }}
      >
        {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h], i) => (
          <div key={i} style={{
            position:'absolute', [v]:4, [h]:4, width:7, height:7,
            borderTop: v==='top' ? '1.5px solid #38bdf8' : undefined,
            borderBottom: v==='bottom' ? '1.5px solid #38bdf8' : undefined,
            borderLeft: h==='left' ? '1.5px solid #38bdf8' : undefined,
            borderRight: h==='right' ? '1.5px solid #38bdf8' : undefined,
          }}/>
        ))}
        <div style={{ color:'#38bdf8', fontSize:7.5, fontFamily:'monospace', marginBottom:5, fontWeight:'bold' }}>
          Distributed Hash Table
        </div>
        <svg width="114" height="72" viewBox="0 0 114 72">
          <circle cx="57" cy="36" r="6"   fill="#4ade80" opacity="0.95"/>
          <circle cx="25" cy="15" r="4.5" fill="#38bdf8" opacity="0.85"/>
          <circle cx="89" cy="15" r="4.5" fill="#38bdf8" opacity="0.85"/>
          <circle cx="14" cy="56" r="4.5" fill="#c084fc" opacity="0.85"/>
          <circle cx="100" cy="56" r="4.5" fill="#c084fc" opacity="0.85"/>
          <circle cx="57" cy="66" r="4.5" fill="#38bdf8" opacity="0.85"/>
          <line x1="57" y1="36" x2="25" y2="15"  stroke="#4ade80" strokeWidth="0.9" opacity="0.6"/>
          <line x1="57" y1="36" x2="89" y2="15"  stroke="#4ade80" strokeWidth="0.9" opacity="0.6"/>
          <line x1="57" y1="36" x2="14" y2="56"  stroke="#38bdf8" strokeWidth="0.9" opacity="0.6"/>
          <line x1="57" y1="36" x2="100" y2="56" stroke="#38bdf8" strokeWidth="0.9" opacity="0.6"/>
          <line x1="57" y1="36" x2="57" y2="66"  stroke="#c084fc" strokeWidth="0.9" opacity="0.6"/>
          <line x1="25" y1="15" x2="14" y2="56"  stroke="#4ade80" strokeWidth="0.6" opacity="0.35"/>
          <line x1="89" y1="15" x2="100" y2="56" stroke="#4ade80" strokeWidth="0.6" opacity="0.35"/>
          <line x1="25" y1="15" x2="89" y2="15"  stroke="#38bdf8" strokeWidth="0.6" opacity="0.28"/>
        </svg>
      </motion.div>

      {/* ── CHARACTER IMAGE ─────────────────────────────────── */}
      <div style={{ position: 'relative' }}>
        {/* Outer ambient glow */}
        <div style={{
          position: 'absolute', inset: '-20px',
          background: 'radial-gradient(ellipse at 50% 40%, rgba(34,197,94,0.18) 0%, rgba(124,58,237,0.1) 50%, transparent 75%)',
          pointerEvents: 'none',
        }}/>

        <img
          src={characterImg}
          alt="Shreeya character"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 18px rgba(34,197,94,0.3)) drop-shadow(0 0 40px rgba(124,58,237,0.2))',
          }}
        />

        {/* Scan line sweep */}
        <motion.div
          animate={{ y: ['-5%', '105%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
          style={{
            position: 'absolute', left: 0, right: 0, top: 0,
            height: '3px',
            background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.6), transparent)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* ── FLOATING PARTICLES ──────────────────────────────── */}
      {([
        { x: -18, y:  70, col: '#22c55e', s: 4, dur: 2.4, del: 0   },
        { x: -26, y: 190, col: '#4ade80', s: 3, dur: 3.0, del: 0.6 },
        { x: -14, y: 310, col: '#22c55e', s: 3, dur: 2.8, del: 1.1 },
        { x: 354, y:  90, col: '#4ade80', s: 4, dur: 2.7, del: 0.2 },
        { x: 360, y: 215, col: '#22c55e', s: 3, dur: 2.3, del: 0.8 },
        { x: 352, y: 340, col: '#4ade80', s: 3, dur: 3.1, del: 0.5 },
      ] as const).map((p, i) => (
        <motion.div key={i}
          animate={{ y: [0, -10, 0], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.del }}
          style={{
            position: 'absolute', left: p.x, top: p.y,
            width: p.s, height: p.s, borderRadius: '50%',
            backgroundColor: p.col, boxShadow: `0 0 8px ${p.col}`,
          }}
        />
      ))}

      {/* Ground glow */}
      <div style={{
        position: 'absolute', bottom: -12, left: '50%',
        transform: 'translateX(-50%)',
        width: 220, height: 24,
        background: '#22c55e', borderRadius: '50%',
        filter: 'blur(18px)', opacity: 0.2,
        pointerEvents: 'none',
      }}/>
    </motion.div>
  );
};
