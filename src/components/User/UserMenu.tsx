import { Avatar, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import useSwitch from '../../hook/useSwitch'
import { v4 } from 'uuid'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signOut } from '../../redux/slice/UserSlice'
import useCookie from '../../hook/useCookie'
import { Frontend } from '../../common/constants/frontend'
import avatar from '../../assets/images/avatar.jpg'
import { collectStyles } from '../../common/functions/style'
import LogoutIcon from '@mui/icons-material/Logout'
import CookieKey = Frontend.CookieKey

export function UserMenu(): JSX.Element {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [isMenuOpen, openMenu, closeMenu] = useSwitch()
    const dispatch = useDispatch()

    const [, , removeUserIdCookie] = useCookie(CookieKey.UserId)
    const [, , removeTokenCookie] = useCookie(CookieKey.Token)
    const [, , removeUsernameCookie] = useCookie(CookieKey.Username)

    const avatarButtonId = v4()

    function handleButtonClick(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget)
        openMenu()
    }

    function handleLogout() {
        closeMenu()
        setAnchorEl(null)

        removeUserIdCookie()
        removeTokenCookie()
        removeUsernameCookie()
        dispatch(signOut)

        window.location.reload()
    }

    const styles = collectStyles({
        avatar: {
            width: '32px',
            height: '32px',
            cursor: 'pointer',
        },
        menuPaper: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
            },
            '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                backgroundColor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
            },
        },
    })

    return (
        <>
            <Avatar
                alt='User Avatar'
                src={avatar}
                sx={styles.avatar}
                id={avatarButtonId}
                aria-controls={isMenuOpen ? 'Menu' : undefined}
                aria-haspopup='true'
                aria-expanded={isMenuOpen ? 'true' : undefined}
                onClick={handleButtonClick}
            />

            <Menu
                aria-labelledby={avatarButtonId}
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={closeMenu}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: styles.menuPaper,
                    },
                }}
            >
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>Sign Out</ListItemText>
                </MenuItem>
            </Menu>
        </>
    )
}