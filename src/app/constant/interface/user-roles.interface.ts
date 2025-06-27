
export interface UserRoleMenu {
  assignedBy?: string;
  userEmail: string;
  userId: number;
  roleIds:[]
}
export interface UserRoleMenu {
    roleId: Number,
    roleName: string
}
export interface AssignRolePayload {
  platform: string;
  user: string;
  role: string;
}
