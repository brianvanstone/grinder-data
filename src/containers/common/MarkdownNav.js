import React, { Component } from "react";
import { chevronCircleRight } from 'react-icons-kit/fa/chevronCircleRight';
import { chevronRight } from 'react-icons-kit/fa/chevronRight';
import { plus } from 'react-icons-kit/fa/plus';
import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_business_center } from 'react-icons-kit/md/ic_business_center';
import { ic_format_list_bulleted } from 'react-icons-kit/md/ic_format_list_bulleted';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import styled from 'styled-components';
import Icon from "./Icon";


export default class MarkdownNav extends Component {

    navConfig = [
        { key: "/documentation", title: 'Overview', icon: chevronCircleRight },
        { key: "/documentation/architecture", title: 'System Architecture', icon: chevronRight },
        { key: "/documentation/dataModel", title: 'Data Model', icon: chevronRight },
        {
            key: "/documentation/dataAccessLayer",
            title: 'Data Access Layer',
            icon: plus,
            items: [
                { key: "apiSchema", title: 'API Schema' },
                { key: "pubapi", title: 'Public API' },
            ]
        },
        { key: "/documentation/devops", title: 'Devops Pipeline', icon: chevronRight }
    ];



    NavMain = {
        dashboard: { title: 'Dashboard', icon: ic_aspect_ratio },
        products: { title: 'Products', icon: ic_business_center },
        orders: { title: 'Orders', icon: ic_format_list_bulleted }
    };

    wrapNav = (obj) => {
        //dynamically created the navs
        return (
            <Nav key={obj.key} id={obj.key}>
                <NavIcon><Icon size="14" icon={obj.icon} /></NavIcon>
                <NavText> {obj.title} </NavText>
                {obj.items ? obj.items.map(this.wrapNav) : <div />}
            </Nav>
        );
    };

    DocNav = ({ history }) => {
        return <SideNav
            highlightBgColor="#eee"
            defaultSelected="/documentation"
            highlightColor="#E91E63"
            onItemSelection={(id) => {
                history.push(id);
            }}
        >
            <this.SeparatorTitle><div>Documentation</div></this.SeparatorTitle>
            {this.navConfig.map(this.wrapNav)}
        </SideNav>;
    };

    render() {
        var history = this.props.history;
        return (
            <this.BaseContainer
                style={{
                    background: '#FFF',
                    color: '#444',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
                    float: 'left',
                    marginLeft: '10px',
                    height: '100%'
                }}
            >
                <this.DocNav history={history} />
            </this.BaseContainer>
        );
    }

    BaseContainer = props =>
        <div
            style={{
                display: 'inline-block',
                paddingTop: 16,
                paddingBottom: 16,
                fontFamily: 'Roboto',
                width: 240,
                ...props.style
            }}
        >
            {props.children}
        </div>;

    SeparatorTitleContainer = styled.div`
        font-size: 14px;
        color: #AAA;
        margin: 10px 12px;
        padding: 4px 12px 2px;
    `;

    SeparatorTitle = props => {
        return (
            <this.SeparatorTitleContainer>
                {props.children}
                <hr style={{ border: 0, borderTop: '1px solid #E5E5E5' }} />
            </this.SeparatorTitleContainer>
        );
    };
}