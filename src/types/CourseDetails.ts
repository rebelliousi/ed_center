export interface levels{
   id:number,
   name:string,
    courses:Courses[],
    teachers:Teachers[]
}
interface Courses{
   name:string,
   description:string,
   price:string,
   duration:string,
   category:number
}

interface Teachers{
    name:string,
    surname:string,
    subject:string,
    experience:string,
    image:string,
    likes:number,
    id:number
}
