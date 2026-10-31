/* Landing page localization: editorial entries and source quotations remain in Indonesian. */
(() => {
  'use strict';
  const key = 'ensiklopedia-interface-language';
  const translations = {
    id: {nav:['Tentang','Jelajahi','Marga & Kekerabatan','Metodologi','Kamus Mandailing','Kontribusi'],hero:'Mengenal<br>Mandailing,<br><em>Merawat Warisan<br>Budaya.</em>',intro:'Menelusuri sejarah, memahami adat, dan mendekatkan kembali warisan Mandailing kepada setiap generasi. Berangkat dari sumber, tumbuh bersama masyarakat.',explore:'Jelajahi Ensiklopedia',about:'Tentang Proyek',notice:''},
    ms: {nav:['Tentang','Terokai','Marga & Kekeluargaan','Metodologi','Kamus Mandailing','Sumbangan'],hero:'Mengenali<br>Mandailing,<br><em>Memelihara Warisan<br>Budaya.</em>',intro:'Meneroka sejarah, memahami adat dan mendekatkan warisan Mandailing kepada setiap generasi. Berasaskan sumber, berkembang bersama masyarakat.',explore:'Terokai Ensiklopedia',about:'Tentang Projek',notice:'Kandungan artikel dan rujukan masih dalam bahasa Indonesia.'},
    en: {nav:['About','Explore','Clans & Kinship','Methodology','Mandailing Dictionary','Contribute'],hero:'Discover<br>Mandailing,<br><em>Preserve Cultural<br>Heritage.</em>',intro:'Explore history, understand traditions, and bring Mandailing heritage closer to every generation. Grounded in sources and shaped with the community.',explore:'Explore the Encyclopedia',about:'About the Project',notice:'Articles and references are currently available in Indonesian.'},
    btm: {nav:['Tentang','Jelajahi','Marga & Kekerabatan','Metodologi','Kontribusi'],hero:'Mengenal<br>Mandailing,<br><em>Merawat Warisan<br>Budaya.</em>',intro:'Menelusuri sejarah, memahami adat, dan mendekatkan kembali warisan Mandailing kepada setiap generasi. Berangkat dari sumber, tumbuh bersama masyarakat.',explore:'Jelajahi Ensiklopedia',about:'Tentang Proyek',notice:'Terjemahan antarmuka Mandailing sedang ditinjau penutur. Teks sementara ditampilkan dalam bahasa Indonesia.'}
  };
  const nav = ['#navigasi a[href="#tentang"]','#navigasi a[href="#jelajahi"]','#navigasi a[href="#kekerabatan"]','#navigasi a[href="#metodologi"]','#navigasi a[href="https://kamusmandailing.github.io/"]','#navigasi a[href="kontributor.html"]'];
  const setText = (selector, value) => {const node=document.querySelector(selector);if(node)node.textContent=value;};
  function apply(code) {
    const lang=Object.prototype.hasOwnProperty.call(translations,code)?code:'id';
    const t=translations[lang];
    nav.forEach((selector,i)=>setText(selector,t.nav[i]));
    const heading=document.querySelector('#hero-title');
    if(heading)heading.innerHTML=t.hero;
    setText('.hero-description',t.intro);
    const explore=document.querySelector('.hero-actions a[href="#entri"]');
    if(explore && explore.firstChild)explore.firstChild.textContent=t.explore+' ';
    const about=document.querySelector('.hero-actions a[href="#tentang"]');
    if(about && about.firstChild)about.firstChild.textContent=t.about+' ';
    const notice=document.querySelector('#translation-status');
    if(notice){notice.textContent=t.notice;notice.hidden=!t.notice;}
    const select=document.querySelector('#landing-language');
    if(select)select.value=lang;
    // btm content is a fallback, so mark the page as Indonesian rather than falsely tagging it as Mandailing.
    document.documentElement.lang=lang==='btm'?'id':lang;
    try{localStorage.setItem(key,lang);}catch(_){}
  }
  function init(){
    const select=document.querySelector('#landing-language');
    if(!select)return;
    let initial='id';
    try{initial=localStorage.getItem(key)||'id';}catch(_){}
    apply(initial);
    select.addEventListener('change',()=>apply(select.value));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
