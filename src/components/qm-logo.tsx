export function QMLogo({ className }: { className?: string }) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 512 512"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <style>{`
          .logo-main { fill: var(--foreground); }
          .logo-secondary { fill: var(--foreground); opacity: 0.7; }
        `}</style>
      </defs>
      {/* Main rectangle - dark in light theme, white in dark theme */}
      <rect 
        x="100" 
        y="100" 
        width="300" 
        height="300" 
        rx="20" 
        ry="20" 
        className="logo-main"
      />
      {/* Top bars - dark in light theme, white in dark theme */}
      <rect 
        x="130" 
        y="130" 
        width="80" 
        height="20" 
        className="logo-secondary"
      />
      <rect 
        x="220" 
        y="130" 
        width="60" 
        height="20" 
        className="logo-secondary"
      />
      <rect 
        x="290" 
        y="130" 
        width="80" 
        height="20" 
        className="logo-secondary"
      />
      {/* Letter Q - dark in light theme, white in dark theme */}
      <text 
        x="150" 
        y="300" 
        className="logo-secondary"
        style={{ fontSize: "140px", fontFamily: "sans-serif", fontWeight: "bold" }}
      >
        Q
      </text>
      {/* Circle - dark in light theme, white in dark theme */}
      <circle 
        cx="350" 
        cy="300" 
        r="60" 
        className="logo-secondary"
      />
    </svg>
  )
}

