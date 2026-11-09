'use client';

import { useEffect, useRef, useState } from 'react';
import { BrandLogo } from "@/components/brand-logo";
import { services, serviceHref } from '@/lib/services';

export function SiteHeader({ rootHref = './', currentSlug }: { rootHref?: string; currentSlug?: string }) {
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
    <div className="site-header-band"><header className="header wrap">
      <a className="action-button header-cta" href={contactHref}><span>Обсудить мероприятие</span></a>
      <BrandLogo rootHref={rootHref} className="monogram header-logo"/>
      <button type="button" className="menu-toggle" aria-haspopup="dialog" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(true)}>Меню</button>
    </header></div>
    <dialog ref={dialog} id="site-menu" className="site-menu" aria-labelledby="site-menu-title" onCancel={() => setOpen(false)} onClose={() => setOpen(false)}>
      <div className="menu-layout wrap">
        <div className="menu-top">
          <BrandLogo rootHref={rootHref} className="monogram header-logo menu-logo" onClick={() => setOpen(false)}/>
          <button type="button" className="menu-close" onClick={() => setOpen(false)}>Закрыть меню</button>
        </div>
        <nav className="menu-products" aria-labelledby="site-menu-title">
          <p className="eyebrow" id="site-menu-title">ВЫБЕРИТЕ ФОРМАТ</p>
          {services.map(service => <a key={service.id} href={serviceHref(service, rootHref)} aria-current={service.slug === currentSlug ? 'page' : undefined} onClick={() => setOpen(false)}>
            <span className="menu-product-name">{service.title}</span>
          </a>)}
        </nav>
        <nav className="menu-secondary" aria-label="Разделы сайта">
          <a href={`${rootHref}#presentation`} onClick={() => setOpen(false)}>Коктейльная карта</a>
          <a href={`${rootHref}#team`} onClick={() => setOpen(false)}>Команда</a>
          <a href={contactHref} onClick={() => setOpen(false)}>Контакты</a>
        </nav>
      </div>
    </dialog>
  </>;
}
