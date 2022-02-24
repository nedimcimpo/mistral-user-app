import { globalAction } from '../global/globalAction';
import { PermissionsService } from 'services/PermissionsService';
import { PERMISSIONS } from '../constants';

export const getPermissions = () => globalAction(PERMISSIONS, PermissionsService.getPermissions);
