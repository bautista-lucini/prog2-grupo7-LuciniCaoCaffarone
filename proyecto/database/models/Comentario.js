module.exports = function(sequelize,dataTypes){

    let alias = "Comentario"
    
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        productos_id:{
            type: dataTypes.INTEGER,
        },
        usuario_id:{
            type: dataTypes.INTEGER,
        },
        texto_comentario:{
            type: dataTypes.STRING,
        },
        createdAt:{
            type: dataTypes.DATE,
        },
        updatedAt:{
            type: dataTypes.DATE,
        },
        deletedAt:{
            type: dataTypes.DATE,
        },
    }
    
    
    
    let config =  { 
        tableName: "comentqrio",
        timestamps: true, 
        underscored: true
    }
    
    
    let Comentario = sequelize.define(alias, cols, config)
    return Comentario
     
    }