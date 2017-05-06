const allConfig = require("./../../config")
const config = allConfig.database
const mysql = require("mysql")

const pool = mysql.createPool({
    host: config.HOST,
    user: config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE
})

let query = function(sql, values) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                resolve(err)
            } else {
                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })

}

/**
 * 
 * @param {String} table 表名
 * @param {Array} options 对象数组，包含所有表元素及其属性（每个object包括name, limit）
 */
let createTable = function(table, options) {
    let _sql = "CREATE TABLE ?? (";
    for (let colume in options.colume) {
        _sql = _sql + "`" + colume.name + "` " + colume.limit + ",";
    }
    for (let property in options.property) {
        _sql = _sql + property + ",";
    }
    _sql = _sql + ") ENGINE=InnoDB DEFAULT CHARSET=utf8;";
    return query(_sql, [table]);
}


let findDataById = function(table, id) {
    let _sql = "SELECT * FROM ?? WHERE id = ? "
    return query(_sql, [table, id, start, end])
}


let findDataByPage = function(table, keys, start, end) {
    let _sql = "SELECT ?? FROM ??  LIMIT ? , ?"
    return query(_sql, [keys, table, start, end])
}


let insertData = function(table, values) {
    let _sql = "INSERT INTO ?? SET ?"
    return query(_sql, [table, values])
}


let updateData = function(table, values, id) {
    let _sql = "UPDATE ?? SET ? WHERE id = ?"
    return query(_sql, [table, values, id])
}


let deleteDataById = function(table, id) {
    let _sql = "DELETE FROM ?? WHERE id = ?"
    return query(_sql, [table, id])
}


let selectDateByName = function(table, keys, name) {
    let _sql = "SELECT ?? FROM ?? WHERE name = ?"
    return query(_sql, [keys, table, name]);
}

let count = function(table) {
    let _sql = "SELECT COUNT(*) AS total_count FROM ?? "
    return query(_sql, [table])
}

module.exports = {
    query,
    createTable,
    findDataById,
    findDataByPage,
    deleteDataById,
    insertData,
    updateData,
    selectDateByName,
    count,
}