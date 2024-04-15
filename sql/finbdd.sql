create schema integrador;
use integrador;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    usuario VARCHAR (255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    fecha DATE,
    dni INT,
    foto_perfil TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    imagen_producto TEXT,
    nombre_producto VARCHAR(255),
    descripcion_producto TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productos_id INT,
    usuario_id INT,
    texto_comentario TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL,
    FOREIGN KEY (productos_id) REFERENCES productos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

INSERT INTO usuarios (id,nombre, usuario, email, contraseña, fecha, dni, foto_perfil, createdAt, updatedAt, deletedAt)
VALUES (default,"Lucas Lewis",'LuCaLeWis2021', 'lucaslewis21@gmail.com', 'contraseña123', '2000-01-05', '45544393', 'lucaslewis.jpg', current_timestamp, current_timestamp, NULL),
(default,'Shelly Willis','ShellyWILLIS23', 'shellywillis@gmail,com', 'contraseña123', '1996-03-07', '36783456', 'shellywillis.jpg', current_timestamp, current_timestamp, NULL),
(default,'Nicolas Lorem','NicoLoreXD', 'NicolasLorem@gmail.com', 'contraseña123', '1998-02-08', ' 123456789', 'nicolorem.jpg', current_timestamp, current_timestamp, NULL),
(default,'Antonio Caos','ChinaUwU68', 'antoniacaos@gmail.com', 'contraseña123', '1969-06-09', '42069321', 'AntoniaCaos.jpg', current_timestamp, current_timestamp, NULL),
(default,'Carolina Curtis','Carocurtis78', 'carocurtis@gmail.com', 'contraseña123', '1978-02-04', '22414126', 'CaroCurtis.jpg', current_timestamp, current_timestamp, NULL);


 INSERT INTO productos (id, usuario_id, imagen_producto, nombre_producto, descripcion_producto, createdAt, updatedAt, deletedAt)
VALUES (default, 1, 'images/products/socks1.png', 'Comfort Cotton Socks - TM', 'Medias de algodón suave y transpirable, ideales para el uso diario.', current_timestamp, current_timestamp, NULL),
(default, 1, 'images/products/socks2.png', 'Thermal Winter Socks - TM', 'Medias térmicas diseñadas para mantener los pies calientes en invierno.', current_timestamp, current_timestamp, NULL),
(default, 2, 'images/products/socks3.png', 'Running Compression Socks - TM', 'Medias de compresión para correr, mejoran la circulación y reducen la fatiga.', current_timestamp, current_timestamp, NULL),
(default, 2, 'images/products/socks4.png', 'Eco-friendly Bamboo Socks - TM', 'Medias ecológicas hechas de bambú, suaves y resistentes al olor.', current_timestamp, current_timestamp, NULL),
(default, 3, 'images/products/socks5.png', 'Argyle Dress Socks - TM', 'Medias elegantes de diseño argyle, perfectas para el trabajo o eventos formales.', current_timestamp, current_timestamp, NULL);

INSERT INTO comentarios (id, productos_id, usuario_id, texto_comentario, createdAt, updatedAt, deletedAt)
VALUES (default, 1, 1, '¡Estas medias de TM son increíblemente cómodas y duraderas! Me encanta cómo se sienten.', current_timestamp, current_timestamp, NULL),
(default, 1, 2, 'Realmente aprecio la calidad de estas medias TM. Perfectas para el día a día.', current_timestamp, current_timestamp, NULL),
(default, 1, 3, 'Las mejores medias para uso diario. Ni muy gruesas ni muy delgadas, justo lo necesario.', current_timestamp, current_timestamp, NULL),
(default, 2, 4, 'TM ha hecho un gran trabajo con estas medias térmicas. Mantienen mis pies calientes incluso en los días más fríos.', current_timestamp, current_timestamp, NULL),
(default, 2, 5, 'Son super comodas y cumplen su funcion a la perfeccion.', current_timestamp, current_timestamp, NULL);