import {storage} from '../core/storage.js';
const windows=[['hour',3600000],['ten',600000],['due',0]];
export const requestNotifications=()=>('Notification'in window?Notification.requestPermission():Promise.resolve('denied'));
export const notificationCandidates=tasks=>{const now=Date.now(),seen=storage.loadNotifications();return tasks.flatMap(t=>{if(t.status==='done'||!t.deadline)return[];const delta=new Date(t.deadline).getTime()-now;const w=windows.find(([,ms])=>delta<=ms&&delta>ms-60000);if(!w||seen[`${t.id}:${w[0]}`])return[];return[{task:t,kind:w[0]}]})};
export const markNotified=(id,kind)=>{const seen=storage.loadNotifications();seen[`${id}:${kind}`]=Date.now();storage.saveNotifications(seen)};
export const snoozeTask=(task,minutes=10)=>new Date(Math.max(Date.now(),new Date(task.deadline).getTime())+minutes*60000).toISOString();
