const { FOREIGNKEYS } = require("sequelize/lib/query-types");

module.exports = function(sequelize,dataTypes){

    let alias = "Usuario";
    
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            notNull : true,
            type: dataTypes.INTEGER.UNSIGNED,
        },
        nombre:{
            notNull : true,
            type: dataTypes.STRING,

        },
        usuario:{
            notNull : true,
            type: dataTypes.STRING,

            
        },
        email:{
            notNull : true,
            type: dataTypes.STRING,

            
        },
        contraseña:{
            notNull : true,
            type: dataTypes.STRING,

            
        },
        fecha:{
            notNull : true,
            type: dataTypes.DATE,
        },
        dni:{
            notNull : true,
            type: dataTypes.INTEGER,
        }, 
        foto_perfil:{
            notNull : true,
            type: dataTypes.STRING,
            
        },
    
        createdAt:{
            notNull : true,
            type: dataTypes.DATE,
        },
        updatedAt:{
            notNull : true,
            type: dataTypes.DATE,
        },
        deletedAt:{
            notNull : true,
            type: dataTypes.DATE,
        },
    }
    
    
    
    let config =  { 
        tableName: "usuarios",
        timestamps: true, 
        underscored: false,
    }
    
    
    let Usuario = sequelize.define(alias,cols,config);
    Usuario.associate = function(models){
        Usuario.hasMany(models.Producto, {
            as: "medias", //nombre de la relacion
            foreignKey: "id",

        })

        Usuario.hasMany(models.Comentario,{
            as: "comentarios",
            foreignKey: "id",


        })


    }



    return Usuario
    
    }