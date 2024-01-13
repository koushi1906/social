import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const navigationMenu = [
    {
        id: 1,
        title: "Home",
        icon: <HomeIcon />,
        path: '/'
    },
    {
        id: 2,
        title: "Reels",
        icon: <ExploreIcon />,
        path: '/reels'
    },
    {
        id: 3,
        title: "Create Reels",
        icon: <ControlPointIcon />,
        path: '/create-reels'
    },
    {
        id: 4,
        title: "Notifications",
        icon: <NotificationsIcon />,
        path: '/'
    },
    {
        id: 5,
        title: "Message",
        icon: <MessageIcon />,
        path: '/message'
    },
    {
        id: 6,
        title: "Lists",
        icon: <ListAltIcon />,
        path: '/'
    },
    {
        id: 7,
        title: "Communities",
        icon: <GroupIcon />,
        path: '/'
    },
    {
        id: 8,
        title: "Profile",
        icon: <AccountCircleIcon />,
        path: '/profile'
    },
]

export default navigationMenu;