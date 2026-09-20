const KEY='focusflow.v1';
const SETTINGS_KEY='focusflow.settings.v1';
const NOTIFICATION_KEY='focusflow.notifications.v1';
const seed=[
 {title:'Review project brief',description:'Read the brief and highlight open questions.',status:'doing',priority:'high',deadline:new Date(Date.now()+86400000).toISOString(),tags:['work'],color:'#6d5dfc'},
 {title:'Book dentist appointment',description:'Call the clinic before Friday.',priority:'medium',deadline:new Date(Date.now()+3*86400000).toISOString(),tags:['personal'],color:'#ef8354'},
 {title:'Plan weekend hike',description:'Choose a trail and invite friends.',priority:'low',deadline:new Date(Date.now()+7*86400000).toISOString(),tags:['personal','fun'],color:'#30a46c'}
];
const uid=()=>globalThis.crypto?.randomUUID?.()||`task-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const normalize=t=>({...t,id:t.id||uid(),subtasks:Array.isArray(t.subtasks)?t.subtasks:[],recurrence:t.recurrence||null,createdAt:t.createdAt||new Date().toISOString(),order:t.order??Date.now()});
export const storage={
 load(){try{const x=JSON.parse(localStorage.getItem(KEY));if(x?.version===1&&Array.isArray(x.tasks))return x.tasks.map(normalize)}catch{}const tasks=seed.map((x,i)=>normalize({...x,order:i}));this.save(tasks);return tasks},
 save(tasks){localStorage.setItem(KEY,JSON.stringify({version:1,updatedAt:new Date().toISOString(),tasks}))},
 loadSettings(){try{const x=JSON.parse(localStorage.getItem(SETTINGS_KEY));if(x)return {theme:x.theme||'auto',view:x.view||'list',calendarDate:x.calendarDate||null}}catch{}return {theme:'auto',view:'list',calendarDate:null}},
 saveSettings(settings){localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings))},
 loadNotifications(){try{return JSON.parse(localStorage.getItem(NOTIFICATION_KEY))||{}}catch{return {}}},
 saveNotifications(value){localStorage.setItem(NOTIFICATION_KEY,JSON.stringify(value))},
 export(data){return JSON.stringify({version:1,exportedAt:new Date().toISOString(),tasks:data.tasks,settings:data.settings,notifications:data.notifications},null,2)}
};
