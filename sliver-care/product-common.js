(function(){
 'use strict';
 const C=window.SCare, KEY='sliver-care-offline-product-v1';
 let data=C.newState(), warning='';
 try{const raw=localStorage.getItem(KEY);if(raw)data=C.validate(JSON.parse(raw));}catch(error){warning='Saved data could not be loaded. This page is using a fresh session; the previous value has not been overwritten. Export a backup before closing.';}
 let allowSave=!warning;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function showWarning(){const node=document.getElementById('shared-storage-warning');if(node){node.textContent=warning;node.hidden=!warning;}}
 function save(){if(allowSave){try{localStorage.setItem(KEY,JSON.stringify(data));}catch(error){warning='Browser storage is unavailable. Changes work for this session only. Download a backup before leaving.';allowSave=false;}}showWarning();}
 function transact(fn){if(allowSave){const latest=localStorage.getItem(KEY);if(latest)data=C.validate(JSON.parse(latest));}const next=C.clone(data);const result=fn(next);C.validate(next);data=next;save();return result;}
 let preparedUrl='';
 function download(name,content,type='text/plain;charset=utf-8'){
  const stamp=new Date().toISOString().replace(/[:.]/g,'-'),dot=name.lastIndexOf('.');
  name=(dot>0?name.slice(0,dot):name)+'-'+stamp+(dot>0?name.slice(dot):'');
  if(preparedUrl)URL.revokeObjectURL(preparedUrl);preparedUrl=URL.createObjectURL(new Blob([content],{type}));let notice=document.getElementById('prepared-download');if(!notice){notice=document.createElement('p');notice.id='prepared-download';notice.className='notice';notice.setAttribute('role','status');const anchor=document.getElementById('message')||document.querySelector('.page-intro');if(anchor)anchor.after(notice);else document.querySelector('main').prepend(notice);}notice.textContent='File prepared. Use this link if your browser does not start saving: ';const a=document.createElement('a');a.href=preparedUrl;a.download=name;a.textContent=name;notice.append(a);a.click();
 }
 function csv(rows){return '\uFEFF'+rows.map(row=>row.map(v=>{let value=String(v??'');if(/^[=+@\-\t\r]/.test(value))value="'"+value;return '"'+value.replaceAll('"','""')+'"';}).join(',')).join('\r\n');}
 function header(active){
  const links=[['home','index.html','Product'],['workspace','workspace.html','Care workspace'],['offer','offer.html','Customer offer'],['business','business.html','Business model'],['outreach','outreach.html','Customer outreach'],['presentation','presentation.html','Classroom kit']];
  return '<a class="skip-link" href="#content">Skip to content</a><header class="product-header"><a class="product-brand" href="index.html">SLIVER CARE<span>FAMILY COORDINATION / OFFLINE EDITION</span></a><span class="edition">COURSE MVP / ACTUAL OUTREACH</span></header><nav class="product-nav" aria-label="Product pages">'+links.map(([id,url,label])=>'<a '+(id===active?'aria-current="page" ':'')+'href="'+url+'">'+label+'</a>').join('')+'</nav>';
 }
 function footer(){return '<footer class="product-footer"><span>SLIVER CARE / CARE, CONNECTED.</span><span>Local care and checkout simulation. Actual outreach is documented separately. No live notification, AI or emergency response.</span></footer>';}
 function price(p,b='month'){return '¥'+C.PLANS[p][b]+'/'+(b==='year'?'year':'month');}
 window.Product={C,esc,transact,download,csv,header,footer,price,get state(){return data;},get warning(){return warning;},replace(value){data=C.validate(value);allowSave=true;warning='';save();}};
 const shell=document.getElementById('product-shell');if(shell)shell.innerHTML=header(document.body.dataset.page);
 const foot=document.getElementById('product-footer');if(foot)foot.innerHTML=footer();
 if(shell){const status=document.createElement('p');status.id='shared-storage-warning';status.className='notice';status.setAttribute('role','status');shell.append(status);showWarning();}
})();
