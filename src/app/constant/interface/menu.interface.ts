export interface ModuleMenu {
    menuId: number;
    parentMenuId?: number;
    name: string;
    description?: string;
    active: boolean;
    icon?: string;
    sequenceNumber: number;
    actionCode: string;
    url?: string;
    version?: number;
    moduleId: number;
    allowed: boolean;
    childMenuList?: ModuleMenu[];
}