export interface SideNavObj {
    title: string;
    url: string;
    icon: string;
    svgIcon?: string;
    heading?: string;
    isHide?: boolean;
    moduleId?: number;
    allowed: boolean;
    subMenu?: Array<SideNavObj>;
}

export const SideNavMenuList: SideNavObj[] = [
    {
        title: "",
        url: "",
        icon: "",
        // heading: "Main",
        allowed: true,
        subMenu: [
            {
                title: "Dashboard",
                url: "/app/dashboard",
                svgIcon: "dashboardSvgIcon",
                icon: "",
                allowed: true,
                subMenu: [],
            },
            {
                title: "Merchant Management",
                url: "/app/merchant",
                svgIcon: "merchantManagementSvgIcon",
                icon: "",
                allowed: true,
                subMenu: [
                    { title: "Create Merchant", icon: "", url: "/app/merchant/create-merchant", allowed: true },
                    { title: "Merchant logs", icon: "", url: "/app/merchant/merchat-logs", allowed: true },
                ],
            },
            // {
            //     title: "Settings",
            //     url: "",
            //     svgIcon: "settingSvgIcon",
            //     icon: "",
            //     allowed: true,
            //     subMenu: [
            //         { title: "My Profile", icon: "", url: "/app/settings/my-profile", allowed: true },
            //         { title: "Security", icon: "", url: "/app/settings/security", allowed: true },
            //     ],
            // },
        ],
    },
];