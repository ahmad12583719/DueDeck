export const nextOccurrence=(date,rule)=>{if(!date||!rule)return date;const d=new Date(date);if(rule==='weekly')d.setDate(d.getDate()+7);return d.toISOString()};
