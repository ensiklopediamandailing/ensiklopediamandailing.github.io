/**
 * Google Apps Script backend for a dedicated, owner-controlled contributor intake.
 * Deploy as two separate web apps/projects: PUBLIC intake and ADMIN moderation.
 * Never publish the ADMIN deployment to anonymous users.
 * Script Properties: INTAKE_FOLDER_ID, ADMIN_EMAIL, MODE=public|admin
 * PUBLIC deployment: execute as owner, access anyone.
 * ADMIN deployment: execute as user accessing app, access restricted to approved Google accounts.
 * Admin must have write access to the intake folder; do not grant public Drive edit permissions.
 */
const FIELDS = ['kind','topic','region','text','source','credit'];
function settings_() {
  const p=PropertiesService.getScriptProperties();
  const folderId=p.getProperty('INTAKE_FOLDER_ID');
  const admin=p.getProperty('ADMIN_EMAIL');
  if(!folderId||!admin||!admin.includes('@'))throw Error('Backend not configured');
  return {folderId,admin:admin.toLowerCase(),mode:p.getProperty('MODE')||'disabled'};
}
function isAdmin_() {
  const email=Session.getActiveUser().getEmail().toLowerCase();
  return !!email && email===settings_().admin;
}
function doGet() {
  const s=settings_();
  if(s.mode==='public')return HtmlService.createHtmlOutputFromFile('PublicForm').setTitle('Kirim usulan Mandailing');
  if(s.mode==='admin'&&isAdmin_())return HtmlService.createHtmlOutputFromFile('AdminPanel').setTitle('Moderasi Ensiklopedia Mandailing');
  return HtmlService.createHtmlOutput('Akses ditolak.');
}
function submitProposal(input) {
  const s=settings_();
  if(s.mode!=='public')throw Error('Penerimaan tidak aktif');
  const lock=LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const value={};
    for(const k of FIELDS)value[k]=String(input&&input[k]||'').trim();
    if(!['Artikel baru','Koreksi','Sumber tertulis','Dokumentasi berizin','Bahasa dan istilah'].includes(value.kind))throw Error('Jenis tidak valid');
    if(value.topic.length<3||value.topic.length>180||value.text.length<20||value.text.length>8000||value.region.length>150||value.source.length>2000||value.credit.length>120)throw Error('Panjang isian tidak valid');
    if(input.consent!==true)throw Error('Persetujuan wajib');
    if(JSON.stringify(input).length>15000)throw Error('Ukuran usulan terlalu besar');
    // Lightweight abuse protection; not a replacement for rate limiting and CAPTCHA.
    if(String(input.website||'').trim())throw Error('Isian tidak valid');
    const id=Utilities.getUuid();
    const record={id,receivedAt:new Date().toISOString(),status:'pending',...value};
    const folder=DriveApp.getFolderById(s.folderId);
    folder.createFile('usulan-'+id+'.json',JSON.stringify(record,null,2),MimeType.PLAIN_TEXT);
    return {id,message:'Usulan diterima untuk ditinjau; belum diterbitkan.'};
  } finally {lock.releaseLock();}
}
function listProposals() {
  const s=settings_();
  if(s.mode!=='admin'||!isAdmin_())throw Error('Akses admin ditolak');
  const files=DriveApp.getFolderById(s.folderId).getFiles();
  const results=[];
  while(files.hasNext()&&results.length<200) {
    const f=files.next();
    if(!/^usulan-[a-f0-9-]+\.json$/.test(f.getName()))continue;
    try {const r=JSON.parse(f.getBlob().getDataAsString('UTF-8'));results.push({fileId:f.getId(),id:r.id,receivedAt:r.receivedAt,kind:r.kind,topic:r.topic,status:r.status,text:r.text,source:r.source,region:r.region,credit:r.credit});}catch(_){}
  }
  return results.sort((a,b)=>b.receivedAt.localeCompare(a.receivedAt));
}
function moderateProposal(fileId,nextStatus) {
  const s=settings_();
  if(s.mode!=='admin'||!isAdmin_())throw Error('Akses admin ditolak');
  if(!['reviewing','approved','rejected'].includes(nextStatus))throw Error('Status tidak valid');
  const file=DriveApp.getFileById(String(fileId));
  const parentIds=[];const parents=file.getParents();while(parents.hasNext())parentIds.push(parents.next().getId());
  if(!parentIds.includes(s.folderId)||!/^usulan-[a-f0-9-]+\.json$/.test(file.getName()))throw Error('Berkas bukan usulan antrean');
  const record=JSON.parse(file.getBlob().getDataAsString('UTF-8'));
  if(!['pending','reviewing','approved','rejected'].includes(record.status))throw Error('Status asal tidak valid');
  record.status=nextStatus;record.reviewedAt=new Date().toISOString();record.reviewedBy=Session.getActiveUser().getEmail();
  file.setContent(JSON.stringify(record,null,2));
  return {id:record.id,status:record.status};
}
