export const monthDays=(year,month)=>{const first=new Date(year,month,1),n=new Date(year,month+1,0).getDate();return {offset:first.getDay(),days:n}};
