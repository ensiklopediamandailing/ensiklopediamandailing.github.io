/* Local-only contributor drafts. No submission endpoint or admin access. */
(() => {
  'use strict';
  const form=document.querySelector('#community-form');
  if(!form)return;
  const status=document.querySelector('#community-status');
  const key='mandailing-community-contribution-draft-v1';
  const fields=['kind','topic','region','text','source','credit'];
  function snapshot(){const values={};for(const field of fields)values[field]=form.elements.namedItem(field).value.trim();return values;}
  function setStatus(message){status.textContent=message;}
  function save(){
    if(!form.reportValidity())return;
    try{localStorage.setItem(key,JSON.stringify(snapshot()));setStatus('Draf tersimpan di browser ini. Belum dikirim ke pengelola.');}
    catch(_){setStatus('Penyimpanan browser tidak tersedia. Gunakan Unduh draf untuk menyimpan salinan.');}
  }
  form.addEventListener('submit',event=>{event.preventDefault();save();});
  document.querySelector('#export-contribution').addEventListener('click',()=>{
    if(!form.reportValidity())return;
    const v=snapshot();
    const content=['USULAN KONTRIBUSI ENSIKLOPEDIA MANDAILING','Status: draf pribadi; belum dikirim','',...fields.map(k=>k.toUpperCase()+': '+v[k])].join('\n');
    const url=URL.createObjectURL(new Blob([content],{type:'text/plain;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='draf-kontribusi-mandailing.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
    setStatus('Draf diunduh. Tidak ada data yang dikirim ke pengelola.');
  });
  document.querySelector('#clear-contribution').addEventListener('click',()=>{
    try{localStorage.removeItem(key);}catch(_){}
    form.reset();setStatus('Draf lokal telah dihapus dari penyimpanan halaman ini.');
  });
  try{const stored=JSON.parse(localStorage.getItem(key)||'null');if(stored&&typeof stored==='object'){for(const field of fields)if(typeof stored[field]==='string')form.elements.namedItem(field).value=stored[field];setStatus('Draf sebelumnya dipulihkan dari browser ini. Belum dikirim.');}}catch(_){}
})();
