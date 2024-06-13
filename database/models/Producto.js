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
        nombre_producto:{
            type: dataTypes.STRING,
        },
        imagen_producto:{
            type: dataTypes.STRING,
        },
        descripcion_producto:{
            type: dataTypes.STRING,
        },
        createdAt:{
            type: dataTypes.DATE,
            notNull: true,
        },
        updatedAt:{
            type: dataTypes.DATE,
            notNull: true,
        },
        deletedAt:{
            type: dataTypes.DATE,
        },
    }
    
    
    
    let config =  { 
        tableName: "productos",
        timestamps: true, 
        underscored: false,
    }
    
    
    let Producto = sequelize.define(alias, cols, config)
    Producto.associate = function(models){
        Producto.belongsTo(models.Usuario, {
            as: "duenio", 
            foreignKey: "usuario_id"
        })

        Producto.hasMany(models.Comentario, {
            as: "comentarios",
            foreignKey: "productos_id",
        })
    }


    return Producto
    
    }