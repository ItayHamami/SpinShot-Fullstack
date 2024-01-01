import Product from "./Product";

export default interface Cart{
    id?:number;
    userId:string;
    products:Product[],
    active:boolean;

}