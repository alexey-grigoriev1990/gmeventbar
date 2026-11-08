export function BrandLogo({rootHref = './', className = '', onClick}: {rootHref?: string; className?: string; onClick?: () => void}) {
  const asset = '/grigoryev-malygin-bar/images/GM_EVENT_logo_volume.svg';
  const source = asset.startsWith('./') ? rootHref + asset.slice(2) : asset;
  return <a href={`${rootHref}#home`} className={`brand-logo ${className}`} aria-label="GM EVENT — на главную" onClick={onClick}>
    <img className="brand-image" src={source} alt="GM EVENT — выездной бар" width={1254} height={1254} loading="eager"/>
  </a>;
}
