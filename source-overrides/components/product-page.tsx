'use client';

import { useRef } from "react";
import { useScrollMotion } from "@/hooks/use-scroll-motion";
import Image from 'next/image';
import { SiteHeader } from '@/components/site-header';
import { ContactSection } from '@/components/contact-section';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { services, serviceHref, formatRubles, type Service } from '@/lib/services';

const productImage = (src: string) => src.startsWith('./') ? `../${src.slice(2)}` : src;

export function ProductPage({ service }: { service: Service }) {
  const root = useRef<HTMLElement>(null);
  useScrollMotion(root);
  const pageHref = serviceHref(service, '../');
  return <main ref={root} className="bar-site product-page" id="top">
    <a className="skip-link" href={`${pageHref}#product-details`}>К описанию формата</a>
    <SiteHeader rootHref="../" currentSlug={service.slug}/>
    <div className="wrap">
      <nav className="product-breadcrumbs" aria-label="Путь к странице"><a href="../#formats">Все форматы</a><span aria-current="page">{service.title}</span></nav>
      <section className="product-hero" aria-labelledby="product-title">
        <figure className="product-photo"><Image unoptimized src={productImage(service.image)} alt={service.imageAlt} width={1122} height={1402} loading="eager"/></figure>
        <div className={`product-intro${service.titleLines.some(line => line.length > 12) ? ' product-intro-long' : ''}`}>
          <p className="eyebrow">ФОРМАТ {service.number}</p>
          <h1 id="product-title">{service.titleLines.map((line, index) => <span key={line}>{index > 0 ? ' ' : ''}{line}</span>)}</h1>
          <p className="product-accent">{service.accent}</p>
          <p className="product-description">{service.description}</p>
          {service.pricing && <div className="package-start"><strong>от {formatRubles(service.pricing.packages[0].price)}</strong><p>{service.pricing.minimum} напитков · {service.pricing.packages[0].hours} часа · {formatRubles(service.pricing.perDrink)} за напиток</p><a className="action-button" href={`${pageHref}#contact`}>{service.pricing.cta}</a></div>}
          <a href={`${pageHref}#product-details`} className="product-detail-link">Что входит в формат</a>
        </div>
      </section>
      <section className="product-overview section" id="product-details" aria-labelledby="product-overview-title">
        <div><p className="eyebrow">ПОД ВАШУ КОМПАНИЮ</p><h2 id="product-overview-title">{service.occasion}</h2></div>
        <p>{service.introduction}</p>
      </section>
      <section className="product-offer" aria-label="Что обсудим и подготовим">
        {service.offer.map((item, index) => <article key={item.title}><span className="eyebrow">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}
      </section>
      <section className="product-presentation section" aria-labelledby="product-presentation-title">
        <div className="product-overview"><h2 id="product-presentation-title">{service.presentationTitle}</h2><p>{service.presentationText}</p></div>
        {service.gallery.length > 0 && <div className="product-gallery">{service.gallery.map(item => <figure key={item.src}>
          <Image unoptimized src={productImage(item.src)} alt={item.alt} width={1122} height={1402} loading="lazy"/>
          <figcaption>{item.caption}</figcaption>
        </figure>)}</div>}
      </section>
      <section className="product-cost section" aria-labelledby="product-cost-title">
        {service.pricing ? <>
          <div><p className="eyebrow">ПАКЕТНЫЕ ПРЕДЛОЖЕНИЯ</p><h2 id="product-cost-title">Пакеты<br/>и стоимость</h2><p className="package-cost-note">{formatRubles(service.pricing.perDrink)} за напиток. Минимум заказа: {service.pricing.minimum} напитков.</p></div>
          <div><table className="package-table"><caption>Пакеты «{service.title}»</caption><thead><tr><th scope="col">Объём и гости</th><th scope="col">Время</th><th scope="col">Стоимость</th></tr></thead><tbody>{service.pricing.packages.map(item => <tr key={item.label}><th scope="row">{item.label}</th><td>{item.hours} ч</td><td>{formatRubles(item.price)}</td></tr>)}</tbody></table><p className="package-extra">{service.pricing.separateCosts}</p><a className="action-button package-cta" href={`${pageHref}#contact`}>{service.pricing.cta}</a></div>
        </> : <>
        <div><p className="eyebrow">УСЛОВИЯ</p><h2 id="product-cost-title">Сначала детали,<br/>затем расчёт</h2></div>
        <div><p>Стоимость зависит от меню, числа гостей, времени работы и площадки. После разговора подготовим предложение с составом услуги и итоговой суммой.</p>
          <dl className="product-brief"><div><dt>Когда и где</dt><dd>Дата, площадка и время работы</dd></div><div><dt>Для кого</dt><dd>Число гостей и их предпочтения</dd></div><div><dt>Как подать</dt><dd>Меню, посуда и оформление</dd></div></dl>
          {service.questions.length > 0 && <Accordion className="faq">{service.questions.map((item, index) => <AccordionItem key={item.question} value={String(index)}>
            <AccordionTrigger className="faq-trigger" indicator={<span className="accordion-state" aria-hidden="true"><span className="when-closed">Ответ</span><span className="when-open">Скрыть</span></span>}>{item.question}</AccordionTrigger>
            <AccordionContent className="faq-content">{item.answer}</AccordionContent>
          </AccordionItem>)}</Accordion>}
        </div>
        </>}
      </section>
      <nav className="other-formats" aria-label="Другие форматы"><p className="eyebrow">ДРУГИЕ ФОРМАТЫ</p><div>{services.filter(item => item.id !== service.id).map(item => <a key={item.id} href={serviceHref(item, '../')}>{item.title}</a>)}</div></nav>
    </div>
    <ContactSection rootHref="../" topHref={`${pageHref}#top`} message={`${service.message} Дата: . Гостей: . Площадка: .`}/>
  </main>;
}
