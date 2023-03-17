import { TopBar, ActionList, Icon, Frame, Text } from '@shopify/polaris';
import { ToolsMajor, QuestionMarkMajor } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

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
            'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
        url: '/',
        accessibilityLabel: 'Jaded Pixel',
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
                    items: [{ content: 'Configure Settings', icon: ToolsMajor }],
                }
            ]}
            name="Demo"
            detail="Demo User"
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
        <div style={{ height: '250px' }}>
            <Frame topBar={topBarMarkup} logo={logo} />
        </div>
    );
}