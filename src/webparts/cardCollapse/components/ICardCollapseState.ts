import { IItem } from "./CardCollapse";
import { IExpanded } from "./CardCollapse";

export interface ICardCollapseState {
   /*  title:string;
    icon:string;
    link:string;
    responsable:string;
    collapsedText: string; */
    items:IItem[];
    expandedItem:IExpanded[];
 }
    