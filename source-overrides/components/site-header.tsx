'use client';

import { useEffect, useRef, useState } from 'react';
import { services, serviceHref } from '@/lib/services';

export function SiteHeader({ rootHref = './', currentSlug, showLogo = false }: { rootHref?: string; currentSlug?: string; showLogo?: boolean }) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const contactHref = currentSlug ? `${rootHref}${currentSlug}/#contact` : '#contact';

  useEffect(() => {
    if (!open) return;
    const node = dialog.current;
    const previousOverflow = document.body.style.overflow;
    node?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      node?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return <>
    <header className="header wrap">
      <a className="action-button header-cta" href={contactHref}><span>Обсудить мероприятие</span></a>
      <a href={`${rootHref}#home`} className={showLogo ? "monogram header-logo" : "monogram"} aria-label="GM.EVENT — на главную">{showLogo ? <img className="brand-image" src="/grigoryev-malygin-bar/images/GM_EVENT_logo.svg" alt="GM EVENT — выездной бар" width={1254} height={1254} loading="eager"/> : "GM.EVENT"}</a>
      <button type="button" className="menu-toggle" aria-haspopup="dialog" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(true)}>Меню</button>
    </header>
    <dialog ref={dialog} id="site-menu" className="site-menu" aria-labelledby="site-menu-title" onCancel={() => setOpen(false)} onClose={() => setOpen(false)}>
      <div className="menu-layout wrap">
        <div className="menu-top">
          <a href={`${rootHref}#home`} className="monogram" onClick={() => setOpen(false)} aria-label="GM.EVENT — на главную">GM.EVENT</a>
          <button type="button" className="menu-close" onClick={() => setOpen(false)}>Закрыть меню</button>
        </div>
        <nav className="menu-products" aria-labelledby="site-menu-title">
          <p className="eyebrow" id="site-menu-title">ВЫБЕРИТЕ ФОРМАТ</p>
          {services.map(service => <a key={service.id} href={serviceHref(service, rootHref)} aria-current={service.slug === currentSlug ? 'page' : undefined} onClick={() => setOpen(false)}>
            <span className="menu-product-name">{service.title}</span>
          </a>)}
        </nav>
        <nav className="menu-secondary" aria-label="Разделы сайта">
          <a href={`${rootHref}#presentation`} onClick={() => setOpen(false)}>Подача</a>
          <a href={`${rootHref}#team`} onClick={() => setOpen(false)}>Команда</a>
          <a href={contactHref} onClick={() => setOpen(false)}>Контакты</a>
        </nav>
      </div>
    </dialog>
  </>;
}
