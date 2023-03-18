import { TopBar, ActionList, Icon, Frame, Text } from '@shopify/polaris';
import { ToolsMajor, QuestionMarkMajor } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import UpdatePodModal from './UpdatePodModal';

export default function TopBarComponent() {
    const auth = useSelector((state) => state.auth);

    const logo = {
        width: 124,
        topBarSource:
            '../../publick/logo.svg',
        url: '/',
        accessibilityLabel: 'LettuceGrow',
    };

    function decodeToken(token) {
        if (token) {
            //jwt decode
            //return user details/fetch from server
        }
    }

    const userMenuMarkup = (
        <TopBar.UserMenu
            name="Demo"
            detail="Demo Pod"
            initials="D"
        />
    );

    const topBarMarkup = (
        <TopBar
            userMenu={userMenuMarkup}
        />
    );

    return (
        <div style={{ height: '50px' }}>
            <Frame topBar={topBarMarkup} logo={logo} />
        </div>
    );
}