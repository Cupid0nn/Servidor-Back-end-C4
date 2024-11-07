Para diseñar y planificar el Diagrama Entidad-Relación (DER) de tu proyecto de e-commerce, debes tener en cuenta las siguientes entidades y sus relaciones:

### Entidades Principales:

1. **Usuario**
   - **Atributos**: `usuario_id` (PK), `nombre`, `apellido`, `email`, `contraseña`, `fecha_registro`, `es_admin` (booleano para determinar si es un administrador).
   - **Relaciones**: Un Usuario puede emitir muchas Órdenes de Compra.

2. **Producto**
   - **Atributos**: `producto_id` (PK), `nombre`, `descripcion`, `precio`, `stock`, `imagen_url` (almacenada en un servicio de nube).
   - **Relaciones**: Un Producto puede aparecer en muchos Detalles de Compras.

3. **Orden de Compra**
   - **Atributos**: `orden_id` (PK), `fecha`, `total`, `usuario_id` (FK).
   - **Relaciones**: Una Orden de Compra pertenece a un Usuario y tiene un Detalle de Compra.

4. **Detalle de Compra**
   - **Atributos**: `detalle_id` (PK), `orden_id` (FK), `producto_id` (FK), `cantidad` (en este caso siempre 1), `precio_unitario`.
   - **Relaciones**: Un Detalle de Compra pertenece a una Orden de Compra y a un Producto.

### Relaciones:

- **Usuario - Orden de Compra**: 
   - Un Usuario puede tener muchas Órdenes de Compra.
   - Una Orden de Compra pertenece a un único Usuario.
   
- **Orden de Compra - Detalle de Compra**:
   - Una Orden de Compra puede tener muchos Detalles de Compra.
   - Un Detalle de Compra pertenece a una única Orden de Compra.
   
- **Producto - Detalle de Compra**:
   - Un Producto puede estar en muchos Detalles de Compra.
   - Un Detalle de Compra contiene un único Producto.

### Consideraciones Adicionales:

- **Usuario Administrador**: 
   - Puede modificar los atributos de los Productos, como `nombre`, `descripcion`, `precio`, `stock`, e `imagen_url`.

Con estas entidades y relaciones, tu DER puede ser diagramado con los identificadores de claves primarias y foráneas correctamente definidos. Cada entidad debe reflejar claramente las relaciones establecidas, con especial atención a las claves externas que conectan las órdenes de compra con los usuarios y productos.

<img src="./assets/tabla de relaciones.JPG"/>
<img src="./assets/tabla usuarios.JPG"/>
<img src="./assets/tabla producto.JPG"/>
<img src="./assets/tabla orden de compra.JPG"/>
<img src="./assets/tabla compra.JPG"/>
