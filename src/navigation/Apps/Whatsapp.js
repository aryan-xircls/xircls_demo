import { Circle } from "react-feather"
import { DefaultNav } from "./DefualtNav"

export const WhatsappNavigation = [
    ...DefaultNav,
    {
        header: 'Whatsapp'
    },
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: <Circle size={16} />,
        navLink: '/merchant/whatsapp/'
    },
    {
        id: 'message',
        title: 'Templates',
        icon: <Circle size={16} />,
        navLink: '/merchant/whatsapp/message/'
    },
    {
        id: 'project',
        title: 'Projects',
        icon: <Circle size={16} />,
        navLink: '/merchant/whatsapp/is_business/'
    },
    {
        id: 'embedSignUp',
        title: 'Embedded Signup',
        icon: <Circle size={16} />,
        navLink: '/merchant/whatsapp/EmbeddedSignup/'
    },
    {
        id: 'createTemplate',
        title: 'Create Template',
        icon: <Circle size={16} />,
        navLink: '/merchant/whatsapp/is_template/'
    },
    {
        id: 'Groups',
        title: 'Group',
        icon: <Circle size={16} />,
        navLink: '/merchant/whatsapp/create-group/'
    },
    {
        id: 'whatsappContact',
        title: 'Whatsapp Contact',
        icon: <Circle size={16} />,
        navLink: '/merchant/whatsapp/whatsapp_contact/'
    },
    {
        id: 'Catalogue',
        title: 'Catalogue',
        icon: <Circle size={16} />,
        navLink: '/merchant/whatsapp/Catalogue/'
    }
    // {
    //     id: 'businessCreation',
    //     title: 'Business Creation',
    //     icon: <Circle size={16} />,
    //     navLink: '/merchant/whatsapp/business_creation/'
    // },
    // {
    //     id: 'optin',
    //     title: 'Manage Opt-in',
    //     icon: <Circle size={16} />,
    //     navLink: '/merchant/whatsapp/optinManage/'
    // }
]