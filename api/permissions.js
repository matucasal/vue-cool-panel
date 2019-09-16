import axios from './../axios';

export default {

    getRoles: function () {
        return axios.get('role');
    },
    getPermisos: function () {
        return axios.get('permission');
    },

    deletePermissionFromRole: function (roleId, permissionId){
        return axios.delete('role/' + roleId+ '/permission/' + permissionId)
    },

    addPermissionToRole: function (roleId, permissionId){
        return axios.post('role/' + roleId+ '/permission/' + permissionId)
    },

    getUsersRoles: function(val){
        return axios.get('users/' + val);
    },

    addRoleToUser: function (userId, roleId ){
        return axios.post('users/' + userId+ '/role/' + roleId)
    },

    deleteRoleFromUser: function (userId, roleId){
        return axios.delete('users/' + userId+ '/role/' + roleId)
    },
}
