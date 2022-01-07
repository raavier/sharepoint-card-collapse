import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CardCollapseWebPartStrings';
import CardCollapse from './components/CardCollapse';
import { ICardCollapseProps } from './components/ICardCollapseProps';

export interface ICardCollapseWebPartProps {
  title:string;
  icon:string;
  responsable:string;
  collapsedText: string;
}

export default class CardCollapseWebPart extends BaseClientSideWebPart<ICardCollapseWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICardCollapseProps> = React.createElement(
      CardCollapse,
      {
        title:this.properties.title,        
        icon:this.properties.icon,
        responsable:this.properties.responsable,
        collapsedText: this.properties.collapsedText,
        spcontext:this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.DescriptionFieldLabelTitle
                }),
                PropertyPaneTextField('icon', {
                  label: strings.DescriptionFieldLabelIcon
                }),
                PropertyPaneTextField('responsable', {
                  label: strings.DescriptionFieldLabelResponsable
                }),
                PropertyPaneTextField('collapsedText', {
                  label: strings.DescriptionFieldLabelCollapse
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
