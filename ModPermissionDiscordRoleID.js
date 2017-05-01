/* Module: PermissionDiscordRoleID -- This module is a permissions provider that turns Discord role IDs into ModUsers permissions. */

var Module = require('./Module.js');

class ModPermissionDiscordRoleID extends Module {

    get requiredEnvironments() { return [
        'Discord'
    ]; }

    get requiredModules() { return [
        'Users'
    ]; }

    constructor(name) {
        super('PermissionDiscordRoleID', name);
    }
    
    
    initialize(opt) {
        if (!super.initialize(opt)) return false;
        
        
        //Register callbacks
        
        this.mod('Users').registerPermissionProvider((passedname, userid, channelid, permissions) => {
            var env = opt.envs[passedname];
            if (env.envName != 'Discord') return [];
        
            var member = env.server.members.get(userid);
            if (!member) return [];
            
            var result = [];
        
            for (let permission of permissions) {
                let role = member.roles.get(permission);
                if (role) result.push(permission);
            }
        
            return result;
        }, this);
        
        
        return true;
    }


}


module.exports = ModPermissionDiscordRoleID;