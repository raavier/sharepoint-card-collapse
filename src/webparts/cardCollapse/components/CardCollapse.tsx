import * as React from 'react';
import { ICardCollapseProps } from './ICardCollapseProps';
import { escape, update } from '@microsoft/sp-lodash-subset';
import styled from 'styled-components';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { ICardCollapseState } from './ICardCollapseState';

export interface IURLLink {
  Description:string;
  Url: string;
}

export interface IImageIcon {
  Description:string;
  Url: string;
}

export interface IItem {
Title: string;
collapsedtext: React.ReactChildren;
imageIcon: IURLLink;
link:IURLLink;
responsable: string;
collapsedBoolean:boolean;
Id:string;
}
export interface IExpanded {
  expanded: boolean;
  Id:string;
}

var classes = null;
var spObj = null;  
export default class CardCollapse extends React.Component<ICardCollapseProps, ICardCollapseState> {
  
  constructor(props: ICardCollapseProps, state:ICardCollapseState){
    super(props);
    this.state = {items:[], expandedItem:[]};
    sp.setup({
      spfxContext: this.props.spcontext
    });
    spObj = sp;
  }
  
  public handleExpandClick = (index) => {
    let expandedItems = [...this.state.expandedItem]
    let expandedItem = {...expandedItems[index]}
    expandedItem.expanded = !expandedItem.expanded
    expandedItems[index] =expandedItem
    this.setState({
      expandedItem:expandedItems,
    })
  ;}
  public async componentDidMount(){
    
    const items: IItem[] = await sp.web.lists.getByTitle("Home Collapse Cards").items.get();
    items.map((item) => (
      this.state.expandedItem.push({Id:item.Id,expanded:false})
    ))
    this.setState({items:items});
  }
  
  public render(): React.ReactElement<ICardCollapseProps> {
    return (
      <InitialContainer>
        <TitleContainer>Acesso Rápido</TitleContainer>
          {this.state.items.map((item:IItem,index:number) =>(
          <AccordionFirstWrapper>
            <AccordionWrapper>
              <LinkText href="www.google.com">{item.Title}</LinkText>
              <ContainerButton onClick={() => this.handleExpandClick(index)}>
                  +
              </ContainerButton>
          </AccordionWrapper>
          <InternalWrapper open={this.state.expandedItem[index] ? this.state.expandedItem[index].expanded : null}>
            <StrongText>Descrição:</StrongText>
            <TextCollapesed>{item.collapsedtext}</TextCollapesed>
            <strong>Responsável:</strong>
            <TextCollapesed>{item.responsable}</TextCollapesed>
          </InternalWrapper>
       </AccordionFirstWrapper>)
        )} 
      </InitialContainer>
      
    );
  }
}

const StrongText =styled.strong`
  padding-top:15px;
`

const ContainerButton = styled.div`
  float: right;
  padding: 2px 7px;
  border-radius: 100%;
  border: 1px solid #007e7a;
  font-size: 12px;
  width: 20px;
  height: 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 10px 0 auto auto;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-direction: normal;
  position:relative;
  right:-10px;
`

const LinkText = styled.a`
  color: #707070;
  font-size: 14px;
  line-height: 25px;
  display: inline-block;
  text-decoration: none;
  max-height: 125px;
  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;
  ::before{
    content: "";
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: 0;
    left: 0;
    background-color: #edb111;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }
  :hover::before{
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
`

const InitialContainer = styled.div`
    background: #fff 0 0 no-repeat padding-box;
    -webkit-box-shadow: 0 3px 4px rgb(0 0 0 / 3%);
    box-shadow: 0 3px 4px rgb(0 0 0 / 3%);
    border-radius: 4px;
    display: inline-block;
    width: 100%;
`

const TitleContainer = styled.h3`
    letter-spacing: 0;
    color: #007e7a;
    font-size: 18px;
    border-left: 3px solid #edb111;
    padding-left: 20px;
    margin: 20px 0;
    font-family: CaeciliaLTStd-Roman;
`
const AccordionFirstWrapper = styled.div`
    display: flex;
    -webkit-box-direction: normal;
    position: relative;
    text-decoration: none;
    margin: 8px 20px;
    background: #fbfbfb 0 0 no-repeat padding-box;
    border: 1px solid #f1f1f1;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0;
    -webkit-box-orient: vertical;
    -ms-flex-direction: column;
    flex-direction: column;
    width: calc(100% - 40px);
    font-family: CaeciliaLTStd-Roman;
`


const AccordionWrapper = styled.div`
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: lightgrey;
    border-radius: 10px;
    height: auto;
    padding: 2%;
    text-align: center; */
    -webkit-box-orient: horizontal;
    -ms-flex-direction: row;
    flex-direction: row;
    margin-left: 5px;
    display: flex;
    -webkit-box-direction: normal;
    position: relative;
    text-decoration: none;
    margin: 8px 20px;
    background: #fbfbfb 0 0 no-repeat padding-box;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0;
    -webkit-box-orient: vertical;
    font-family: CaeciliaLTStd-Roman;
    // transition: all 0.6s ease-in-out;
`;

const InternalWrapper = styled.div`
    width: 90%;
    max-height: ${(props) => (props.open ? '500px' : '0')};
    transition: all 0.4s ease-in-out;
    overflow: hidden;
    border-top: 1px solid #f1f1f1;
    display: flex;
    padding-left: 34px;
    font-family: MyriadPro-Regular;
    color: #707070;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
`;

const TextCollapesed = styled.p`
    padding-right:25px;
    font-family: MyriadPro-Regular;
    color: #707070;

`

/* 
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
})); */
/* expand={this.state.expanded}
onClick={this.handleExpandClick()}
aria-expanded={this.state.expanded}
aria-label="show more" */