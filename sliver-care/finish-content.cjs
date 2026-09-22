const fs=require('node:fs'),path=require('node:path');
const file=path.join(__dirname,'plans.js');let s=fs.readFileSync(file,'utf8');
const replacements=[
 ['/* Presentation only: no checkout, subscription state or care permissions. */','/* Pricing display; local workspace handles the simulated subscription. */'],
 ['Current demo and planned subscription benefits','Working offline plan benefits'],
 ['<small>Planned</small>','<small>Offline workspace</small>'],
 ['Both options have the same planned coordination features.','Both options have the same working offline coordination features.'],
 [' proposed AI generations',' local template generations per monthly demo cycle'],
 [' generations / month',' simulations / monthly cycle'],
 ['The proposed limit only affects new AI generations.','The demo allowance only affects new local template generations.'],
 ['Shared family access, without charging each caregiver separately.','The proposed connected service charges per family. This edition keeps roles on one local device.'],
 ['Cross-recipient & handover summaries','Recipient overview, daily activity & handovers']
];
for(const [a,b] of replacements)s=s.replaceAll(a,b);fs.writeFileSync(file,s);
const build=path.join(__dirname,'build-content.cjs');s=fs.readFileSync(build,'utf8').replace('A Pro report adds recipient overview and handover records.','A Pro report adds recipient overview, daily activity counts and handover records. Daily activity reflects the dates of recorded events; it is not a clinical adherence measure.').replace('Sliver Care — Product & Commercialisation Report','Sliver Care Product and Commercialisation Report');fs.writeFileSync(build,s);
