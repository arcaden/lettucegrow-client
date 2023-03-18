import { TopBar, ActionList, Icon, Frame, Text } from '@shopify/polaris';
import { ToolsMajor, QuestionMarkMajor } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import UpdatePodModal from './UpdatePodModal';

export default function TopBarComponent() {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const auth = useSelector((state) => state.auth);

    const toggleIsUserMenuOpen = useCallback(
        () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
        [],
    );

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
            actions={[
                {
                    items: [{ content: 'Edit Pod', icon: ToolsMajor }],
                }
            ]}
            name="Demo"
            detail="Demo Pod"
            initials="D"
            open={isUserMenuOpen}
            onToggle={toggleIsUserMenuOpen}
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