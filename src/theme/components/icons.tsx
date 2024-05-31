type SVGProps = React.SVGProps<SVGSVGElement>

export const Starknet = (props: SVGProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" {...props}>
    <path d="M20.5,20.9,17,31.4a1.1,1.1,0,0,1-1.5.5,1.2,1.2,0,0,1-.5-.5L11.5,20.9a.8.8,0,0,0-.4-.4L.6,17a1.1,1.1,0,0,1-.5-1.5L.6,15l10.5-3.5a.8.8,0,0,0,.4-.4L15,.6A1.1,1.1,0,0,1,16.5.1l.5.5,3.5,10.5.4.4L31.4,15a1.1,1.1,0,0,1,.5,1.5,1.2,1.2,0,0,1-.5.5L20.9,20.5Z" />
  </svg>
)

export const Close = (props: SVGProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
    <line x1="13" y1="3" x2="3" y2="13" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    <line x1="3.2" y1="2.8" x2="12.8" y2="13.2" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
  </svg>
)

export const Logo = (props: SVGProps) => (
  <svg id="b" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 896 896" fill="currentColor" {...props}>
    <polygon
      id="d"
      points="0 597.15 330.1 597.15 330.1 762.55 494.8 762.55 494.8 463.65 165.3 463.65 494.8 133.45 330.1 133.45 0 463.65 0 597.15"
    />
    <polygon id="e" points="565.9 298.75 730.7 133.45 565.9 133.45 565.9 298.75" />
    <polygon
      id="f"
      points="730.7 298.75 565.9 463.65 565.9 628.45 730.7 628.45 730.7 463.65 896 298.75 896 133.45 730.7 133.45 730.7 298.75"
    />
    <polygon id="g" points="896 463.65 730.7 628.45 896 628.45 896 463.65" />
  </svg>
)
