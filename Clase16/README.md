querys
--------------------------------
CREATE TABLE producto (
    id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre varchar(50),
    precio int,
    foto varchar(200)
);
SELECT * FROM producto
 
 INSERT INTO producto(nombre,precio,foto) 
 VALUES("Hola mundo bd2",25,"https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg")

------------------------------

<div align="center">
    <img src="/public/insert.jpg" width="400px"/> 
</div>
<div align="center">
    <img src="/public/select.jpg" width="400px"/> 
</div>
<div align="center">
    <img src="/public/create_table.jpg" width="400px"/> 
</div>