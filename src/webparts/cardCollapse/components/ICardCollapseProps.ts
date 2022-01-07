import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICardCollapseProps {
  title:string;
  icon:string;
  responsable:string;
  collapsedText: string;
  spcontext:WebPartContext;
}
