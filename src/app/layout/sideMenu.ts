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
          { title: "Create Merchant", icon: "", url: "/app/merchant/create", allowed: true },
          { title: "Edit Merchant", icon: "", url: "/app/merchant/edit", allowed: true },
          { title: "Merchant Logs", icon: "", url: "/app/merchant/logs", allowed: true },
        ],
      },
      {
        title: "Role Management",
        url: "/app/role-management",
        svgIcon: "merchantManagementSvgIcon",
        icon: "",
        allowed: true,
        subMenu: [
          { title: "Loans Management", icon: "", url: "/app/role-management/create-loan", allowed: true },
          { title: "Request Loan", icon: "", url: "/app/role-management/request-loan", allowed: true },
          { title: "Loan Approver", icon: "", url: "/app/role/loan-approver", allowed: true },
          { title: "Loan Logs", icon: "", url: "/app/role-management/loan-logs", allowed: true },
        ],
      },
    ],
  },
];