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

    async findByUserid(userId) {

    },

    /**
     * 用户登出删除token
     * @param {object} user 
     */
    async delete(user) {
        // let user_sql = "SELECT id FROM ?? WHERE name = ? ";
        let token_sql = "SELECT id FROM ?? WHERE userId = ? ";


        // let userId = await dbUtils.query(user_sql, ["user_info", user.name]);

        let id = await dbUtils.query(token_sql, ["access_token", user.id]);

        let result = await dbUtils.deleteDataById("access_token", id[0].id);

        return result;
    },


    /**
     * 取相应用户的已登录token
     * @param {object} user 
     */
    async getToken(user) {
        // let user_sql = "SELECT id FROM ?? WHERE name = ? ";
        let token_sql = "SELECT * FROM ?? WHERE userId = ? ";
        let set_token_sql = "UPDATE ?? SET deadline = ? WHERE userId = ?";
        let deadline = new Date().getTime() + (365 * 24 * 60 * 60 * 1000);

        // let userId = await dbUtils.query(user_sql, ["user_info", user.name]);
        console.log(user.id);
        let result = await dbUtils.query(token_sql, ["access_token", user.id]);

        // if (result) {
        await dbUtils.query(set_token_sql, ["access_token", deadline, user.id]);
        // }


        return result;

    }



}


module.exports = token