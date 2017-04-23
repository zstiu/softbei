const dbUtils = require('./../utils/db-util')

const token = {


    /**
     * 新建相应用户token数据
     * @param {object} model token 数据 
     */
    async create(model) {

        // let accessToken = 

        let result = await dbUtils.insertData('access_token', model);
        return result;
    },

    /**
     * 用户登出删除token
     * @param {object} user 
     */
    async delete(user) {
        let user_sql = "SELECT id FROM ?? WHERE name = ? ";
        let token_sql = "SELECT * FROM ?? WHERE userId = ? ";
        let userId = await query(user_sql, ["user_info", user.name]);
        let id = await query(token_sql, ["access_token", userId]);
        let result = dbUtils.deleteDataById("access_token", id);
        return result;
    }


}


module.exports = token