'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
const phone = '+79196564524';


function PhoneContact({phone, label, message}: {phone: string; label: string; message: string}) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  async function copyPhone() {
    try { await navigator.clipboard.writeText(label); setCopied(true); setCopyError(false); }
    catch { setCopyError(true); }
  }
  return <div className="phone-contact">
            <a className="phone-link" href={'tel:' + phone}>{label}</a>
            <div className="contact-actions">
              <a className="action-button contact-button" href={'tel:' + phone}>Позвонить</a>
              <a className="action-button contact-button outline-button" href={'sms:' + phone + '?body=' + encodeURIComponent(message)}>Написать SMS</a>
            </div>
            <Button className="copy-phone" variant="ghost" onClick={copyPhone}>{copied ? 'Номер скопирован' : 'Скопировать номер'}</Button>
            <output className="copy-status" aria-live="polite">{copyError ? 'Не удалось скопировать. Номер можно выделить выше.' : copied ? 'Номер телефона скопирован.' : ''}</output>
  </div>;
}

export function ContactSection({rootHref = './', topHref = '#home', message = 'Здравствуйте! Хотим обсудить бар для мероприятия. Дата: . Гостей: . Площадка: .'}: {rootHref?: string; topHref?: string; message?: string}) {
  return (
    <footer className="contact" id="contact">
      <div className="wrap section">
        <p className="eyebrow">ЕСТЬ ДАТА? ДАВАЙТЕ ЗНАКОМИТЬСЯ</p>
        <div className="contact-grid">
          <div className="contact-title"><h2 className="paired-heading"><span className="heading-line">ВАШЕ СОБЫТИЕ</span><span className="section-script">наш бар</span></h2></div>
          <div className="contact-info">
            <p>Расскажите, что планируете.<br/>Обсудим бар и подготовим предложение.</p>
            <div className="contact-phones">
              <PhoneContact phone={phone} label="+7 919 656-45-24" message={message}/>
              <PhoneContact phone="+79176636484" label="+7 917 663-64-84" message={message}/>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <a href={`${rootHref}#home`} className="brand" aria-label="GM.EVENT — на главную">GM.EVENT</a>
          <p>Выездной бар<br/>Чебоксары</p>
          <a href={topHref}>Наверх</a>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}
