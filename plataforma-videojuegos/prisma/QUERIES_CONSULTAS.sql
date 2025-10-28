-- ============================================
-- QUERIES DE CONSULTA PARA LA BASE DE DATOS
-- ============================================

-- --------------------------------------------
-- 1. CONSULTAS BÁSICAS DE JUEGOS
-- --------------------------------------------

-- Obtener todos los juegos con su desarrollador
SELECT 
    j.id,
    j.nombre,
    j.precio,
    j.descripcion,
    d.nombre AS desarrollador
FROM Juego j
INNER JOIN Desarrollador d ON j.desarrolladorId = d.id;

-- Obtener juegos con precio menor a 30
SELECT 
    id,
    nombre,
    precio,
    descripcion
FROM Juego
WHERE precio < 30
ORDER BY precio ASC;

-- Obtener juegos gratuitos
SELECT 
    id,
    nombre,
    descripcion
FROM Juego
WHERE precio = 0;

-- --------------------------------------------
-- 2. CONSULTAS DE JUEGO_GENERO (Relación N:N)
-- --------------------------------------------

-- Obtener todos los géneros de un juego específico (The Witcher 3, id=1)
SELECT 
    j.nombre AS juego,
    g.nombre AS genero,
    jg.detalle
FROM Juego_Genero jg
INNER JOIN Juego j ON jg.juegoId = j.id
INNER JOIN Genero g ON jg.generoId = g.id
WHERE j.id = 1;

-- Obtener todos los juegos de un género específico (RPG, id=1)
SELECT 
    j.id,
    j.nombre,
    j.precio,
    g.nombre AS genero,
    jg.detalle
FROM Juego_Genero jg
INNER JOIN Juego j ON jg.juegoId = j.id
INNER JOIN Genero g ON jg.generoId = g.id
WHERE g.id = 1
ORDER BY j.nombre;

-- Contar cuántos juegos tiene cada género
SELECT 
    g.nombre AS genero,
    COUNT(jg.juegoId) AS cantidad_juegos
FROM Genero g
LEFT JOIN Juego_Genero jg ON g.id = jg.generoId
GROUP BY g.id, g.nombre
ORDER BY cantidad_juegos DESC;

-- Obtener juegos con múltiples géneros
SELECT 
    j.id,
    j.nombre,
    j.precio,
    GROUP_CONCAT(g.nombre SEPARATOR ', ') AS generos
FROM Juego j
LEFT JOIN Juego_Genero jg ON j.id = jg.juegoId
LEFT JOIN Genero g ON jg.generoId = g.id
GROUP BY j.id, j.nombre, j.precio
ORDER BY j.nombre;

-- --------------------------------------------
-- 3. CONSULTAS COMPLETAS DE JUEGOS
-- --------------------------------------------

-- Obtener juego con todos sus datos (géneros, plataformas, imágenes)
SELECT 
    j.id,
    j.nombre,
    j.precio,
    j.descripcion,
    d.nombre AS desarrollador,
    GROUP_CONCAT(DISTINCT g.nombre SEPARATOR ', ') AS generos,
    GROUP_CONCAT(DISTINCT p.nombre SEPARATOR ', ') AS plataformas,
    img.url AS imagen_principal
FROM Juego j
INNER JOIN Desarrollador d ON j.desarrolladorId = d.id
LEFT JOIN Juego_Genero jg ON j.id = jg.juegoId
LEFT JOIN Genero g ON jg.generoId = g.id
LEFT JOIN Juego_Plataforma jp ON j.id = jp.juegoId
LEFT JOIN Plataforma p ON jp.plataformaId = p.id
LEFT JOIN Imagen img ON j.mainImagenId = img.id
WHERE j.id = 1
GROUP BY j.id, j.nombre, j.precio, j.descripcion, d.nombre, img.url;

-- Obtener todos los juegos con información completa
SELECT 
    j.id,
    j.nombre,
    j.precio,
    d.nombre AS desarrollador,
    GROUP_CONCAT(DISTINCT g.nombre ORDER BY g.nombre SEPARATOR ', ') AS generos,
    COUNT(DISTINCT jp.plataformaId) AS cantidad_plataformas
FROM Juego j
INNER JOIN Desarrollador d ON j.desarrolladorId = d.id
LEFT JOIN Juego_Genero jg ON j.id = jg.juegoId
LEFT JOIN Genero g ON jg.generoId = g.id
LEFT JOIN Juego_Plataforma jp ON j.id = jp.juegoId
GROUP BY j.id, j.nombre, j.precio, d.nombre
ORDER BY j.nombre;

-- --------------------------------------------
-- 4. CONSULTAS DE BIBLIOTECA DE USUARIO
-- --------------------------------------------

-- Obtener todos los juegos de un usuario (Usuario 6)
SELECT 
    uj.id,
    uj.detalle,
    uj.fecha,
    j.id AS juego_id,
    j.nombre AS juego_nombre,
    j.precio,
    d.nombre AS desarrollador,
    GROUP_CONCAT(DISTINCT g.nombre SEPARATOR ', ') AS generos
FROM Usuario_Juego uj
INNER JOIN Juego j ON uj.juegoId = j.id
INNER JOIN Desarrollador d ON j.desarrolladorId = d.id
LEFT JOIN Juego_Genero jg ON j.id = jg.juegoId
LEFT JOIN Genero g ON jg.generoId = g.id
WHERE uj.usuarioId = 6
GROUP BY uj.id, uj.detalle, uj.fecha, j.id, j.nombre, j.precio, d.nombre
ORDER BY uj.fecha DESC;

-- Contar juegos por usuario
SELECT 
    u.id,
    u.nombre,
    u.apellido,
    COUNT(uj.juegoId) AS cantidad_juegos
FROM Usuario u
LEFT JOIN Usuario_Juego uj ON u.id = uj.usuarioId
GROUP BY u.id, u.nombre, u.apellido
ORDER BY cantidad_juegos DESC;

-- --------------------------------------------
-- 5. CONSULTAS DE PLATAFORMAS
-- --------------------------------------------

-- Obtener todas las plataformas de un juego
SELECT 
    j.nombre AS juego,
    p.nombre AS plataforma
FROM Juego_Plataforma jp
INNER JOIN Juego j ON jp.juegoId = j.id
INNER JOIN Plataforma p ON jp.plataformaId = p.id
WHERE j.id = 1;

-- Contar juegos por plataforma
SELECT 
    p.nombre AS plataforma,
    COUNT(jp.juegoId) AS cantidad_juegos
FROM Plataforma p
LEFT JOIN Juego_Plataforma jp ON p.id = jp.plataformaId
GROUP BY p.id, p.nombre
ORDER BY cantidad_juegos DESC;

-- --------------------------------------------
-- 6. CONSULTAS DE IMÁGENES
-- --------------------------------------------

-- Obtener todas las imágenes de un juego
SELECT 
    i.id,
    i.url,
    i.alt,
    i.orden,
    i.isMain,
    j.nombre AS juego
FROM Imagen i
INNER JOIN Juego j ON i.juegoId = j.id
WHERE j.id = 1
ORDER BY i.orden;

-- Obtener solo la imagen principal de cada juego
SELECT 
    j.id,
    j.nombre,
    i.url AS imagen_principal
FROM Juego j
LEFT JOIN Imagen i ON j.mainImagenId = i.id;

-- --------------------------------------------
-- 7. CONSULTAS DE WISHLIST
-- --------------------------------------------

-- Obtener wishlist de un usuario
SELECT 
    u.nombre AS usuario,
    j.nombre AS juego,
    j.precio,
    d.nombre AS desarrollador
FROM Wishlist w
INNER JOIN Usuario u ON w.usuarioId = u.id
INNER JOIN Juego j ON w.juegoId = j.id
INNER JOIN Desarrollador d ON j.desarrolladorId = d.id
WHERE u.id = 6;

-- Juegos más deseados (más en wishlists)
SELECT 
    j.nombre AS juego,
    j.precio,
    COUNT(w.id) AS veces_en_wishlist
FROM Juego j
LEFT JOIN Wishlist w ON j.id = w.juegoId
GROUP BY j.id, j.nombre, j.precio
HAVING COUNT(w.id) > 0
ORDER BY veces_en_wishlist DESC;

-- --------------------------------------------
-- 8. CONSULTAS DE REVIEWS
-- --------------------------------------------

-- Obtener reviews de un juego
SELECT 
    r.id,
    r.descripcion,
    u.nombre AS usuario,
    u.apellido
FROM Review r
INNER JOIN Usuario u ON r.usuarioId = u.id
WHERE r.juegoId = 1;

-- Contar reviews por juego
SELECT 
    j.nombre AS juego,
    COUNT(r.id) AS cantidad_reviews
FROM Juego j
LEFT JOIN Review r ON j.id = r.juegoId
GROUP BY j.id, j.nombre
ORDER BY cantidad_reviews DESC;

-- --------------------------------------------
-- 9. CONSULTAS DE CARRITO
-- --------------------------------------------

-- Obtener contenido del carrito de un usuario
SELECT 
    c.id AS carrito_id,
    u.nombre AS usuario,
    j.nombre AS juego,
    j.precio
FROM Carrito c
INNER JOIN Usuario u ON c.usuarioId = u.id
LEFT JOIN Carrito_Juego cj ON c.id = cj.carritoId
LEFT JOIN Juego j ON cj.juegoId = j.id
WHERE u.id = 6;

-- Calcular total del carrito de un usuario
SELECT 
    u.id,
    u.nombre,
    SUM(j.precio) AS total_carrito
FROM Carrito c
INNER JOIN Usuario u ON c.usuarioId = u.id
LEFT JOIN Carrito_Juego cj ON c.id = cj.carritoId
LEFT JOIN Juego j ON cj.juegoId = j.id
WHERE u.id = 6
GROUP BY u.id, u.nombre;

-- --------------------------------------------
-- 10. CONSULTAS AVANZADAS
-- --------------------------------------------

-- Juegos más populares (más en bibliotecas de usuarios)
SELECT 
    j.id,
    j.nombre,
    j.precio,
    COUNT(uj.id) AS veces_comprado
FROM Juego j
LEFT JOIN Usuario_Juego uj ON j.id = uj.juegoId
GROUP BY j.id, j.nombre, j.precio
ORDER BY veces_comprado DESC
LIMIT 10;

-- Usuarios con más juegos
SELECT 
    u.id,
    u.nombre,
    u.apellido,
    u.email,
    COUNT(uj.juegoId) AS cantidad_juegos,
    SUM(j.precio) AS valor_biblioteca
FROM Usuario u
LEFT JOIN Usuario_Juego uj ON u.id = uj.usuarioId
LEFT JOIN Juego j ON uj.juegoId = j.id
GROUP BY u.id, u.nombre, u.apellido, u.email
ORDER BY cantidad_juegos DESC;

-- Géneros más populares
SELECT 
    g.nombre AS genero,
    COUNT(DISTINCT jg.juegoId) AS juegos_en_genero,
    COUNT(uj.id) AS veces_comprado
FROM Genero g
LEFT JOIN Juego_Genero jg ON g.id = jg.generoId
LEFT JOIN Usuario_Juego uj ON jg.juegoId = uj.juegoId
GROUP BY g.id, g.nombre
ORDER BY veces_comprado DESC;

-- Juegos multiplataforma (disponibles en más de 3 plataformas)
SELECT 
    j.nombre AS juego,
    COUNT(jp.plataformaId) AS cantidad_plataformas,
    GROUP_CONCAT(p.nombre SEPARATOR ', ') AS plataformas
FROM Juego j
INNER JOIN Juego_Plataforma jp ON j.id = jp.juegoId
INNER JOIN Plataforma p ON jp.plataformaId = p.id
GROUP BY j.id, j.nombre
HAVING COUNT(jp.plataformaId) > 3
ORDER BY cantidad_plataformas DESC;

-- Desarrolladores con más juegos
SELECT 
    d.nombre AS desarrollador,
    COUNT(j.id) AS cantidad_juegos,
    AVG(j.precio) AS precio_promedio
FROM Desarrollador d
LEFT JOIN Juego j ON d.id = j.desarrolladorId
GROUP BY d.id, d.nombre
ORDER BY cantidad_juegos DESC;
