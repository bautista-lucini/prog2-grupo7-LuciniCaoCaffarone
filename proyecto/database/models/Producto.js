module.exports = function(sequelize,dataTypes){

    let alias = "Producto"
    
    let cols = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        usuario_id:{
            type: dataTypes.INTEGER,
        },
        imagen_producto:{
            type: dataTypes.STRING,
        },
        descripcion_producto:{
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
        tableName: "productos",
        timestamps: true, 
        underscored: true
    }
    
    
    let Producto = sequelize.define(alias, cols, config)
    return Producto
    
    }