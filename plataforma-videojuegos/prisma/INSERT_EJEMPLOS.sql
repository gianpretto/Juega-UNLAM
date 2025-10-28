-- ============================================
-- INSERTS DE EJEMPLO PARA LA BASE DE DATOS
-- ============================================

-- --------------------------------------------
-- 1. TIPO_USUARIO
-- --------------------------------------------
INSERT INTO Tipo_Usuario (id, descripcion) VALUES
(1, 'Administrador'),
(2, 'Usuario Premium'),
(3, 'Usuario Básico');

-- --------------------------------------------
-- 2. DESARROLLADORES
-- --------------------------------------------
INSERT INTO Desarrollador (id, nombre) VALUES
(1, 'CD Projekt Red'),
(2, 'Rockstar Games'),
(3, 'FromSoftware'),
(4, 'Valve'),
(5, 'Nintendo'),
(6, 'Santa Monica Studio'),
(7, 'Naughty Dog'),
(8, 'Bethesda Game Studios'),
(9, 'Ubisoft'),
(10, 'Epic Games');

-- --------------------------------------------
-- 3. GÉNEROS
-- --------------------------------------------
INSERT INTO Genero (id, nombre) VALUES
(1, 'RPG'),
(2, 'Acción'),
(3, 'Aventura'),
(4, 'Shooter'),
(5, 'Estrategia'),
(6, 'Deportes'),
(7, 'Carreras'),
(8, 'Simulación'),
(9, 'Horror'),
(10, 'Plataformas');

-- --------------------------------------------
-- 4. PLATAFORMAS
-- --------------------------------------------
INSERT INTO Plataforma (id, nombre) VALUES
(1, 'PC'),
(2, 'PlayStation 5'),
(3, 'PlayStation 4'),
(4, 'Xbox Series X/S'),
(5, 'Xbox One'),
(6, 'Nintendo Switch');

-- --------------------------------------------
-- 5. JUEGOS
-- --------------------------------------------
INSERT INTO Juego (id, nombre, precio, descripcion, desarrolladorId) VALUES
(1, 'The Witcher 3: Wild Hunt', 39.99, 'Juego de rol de mundo abierto basado en la saga de novelas de Andrzej Sapkowski. Sigue la historia de Geralt de Rivia en su búsqueda de Ciri.', 1),
(2, 'Red Dead Redemption 2', 59.99, 'Épica historia del forajido Arthur Morgan y la banda de Dutch van der Linde en el ocaso del Viejo Oeste.', 2),
(3, 'Elden Ring', 49.99, 'Juego de rol de acción desarrollado por FromSoftware en colaboración con George R.R. Martin. Explora las Tierras Intermedias.', 3),
(4, 'Half-Life 2', 9.99, 'Shooter en primera persona revolucionario que continúa la historia de Gordon Freeman.', 4),
(5, 'The Legend of Zelda: Breath of the Wild', 59.99, 'Aventura de mundo abierto donde Link despierta de un sueño de 100 años para salvar Hyrule.', 5),
(6, 'God of War', 49.99, 'Kratos y su hijo Atreus se embarcan en un viaje personal por los reinos nórdicos.', 6),
(7, 'The Last of Us Part II', 59.99, 'Secuela del aclamado juego de aventura y supervivencia en un mundo post-apocalíptico.', 7),
(8, 'Skyrim', 39.99, 'El quinto juego de la serie The Elder Scrolls. Explora la provincia de Skyrim como el Dragonborn.', 8),
(9, 'Assassins Creed Valhalla', 59.99, 'Vive la era vikinga como Eivor y lidera tu clan desde las gélidas tierras de Noruega.', 9),
(10, 'Fortnite', 0.00, 'Battle Royale gratuito con construcción y combate en un mundo colorido y dinámico.', 10),
(11, 'Cyberpunk 2077', 49.99, 'RPG de mundo abierto ambientado en Night City, una metrópolis obsesionada con el poder y las modificaciones corporales.', 1),
(12, 'Dark Souls III', 39.99, 'Juego de rol de acción desafiante en un mundo oscuro y apocalíptico.', 3),
(13, 'Portal 2', 19.99, 'Secuela del revolucionario juego de puzzles en primera persona con el portal gun.', 4),
(14, 'Grand Theft Auto V', 29.99, 'Tres criminales muy diferentes arriesgan todo en una serie de atracos atrevidos y peligrosos en Los Santos.', 2),
(15, 'Hades', 24.99, 'Roguelike de acción donde juegas como Zagreus intentando escapar del inframundo.', 10);

-- --------------------------------------------
-- 6. JUEGO_GENERO (Relación N:N)
-- --------------------------------------------
INSERT INTO Juego_Genero (id, juegoId, generoId, detalle) VALUES
-- The Witcher 3
(1, 1, 1, 'RPG principal'),
(2, 1, 2, 'Combate de acción'),
(3, 1, 3, 'Mundo abierto'),

-- Red Dead Redemption 2
(4, 2, 2, 'Acción western'),
(5, 2, 3, 'Aventura narrativa'),
(6, 2, 4, 'Tiroteos'),

-- Elden Ring
(7, 3, 1, 'RPG de acción'),
(8, 3, 2, 'Combate desafiante'),
(9, 3, 3, 'Exploración'),

-- Half-Life 2
(10, 4, 4, 'FPS clásico'),
(11, 4, 2, 'Acción intensa'),

-- Zelda Breath of the Wild
(12, 5, 3, 'Aventura épica'),
(13, 5, 1, 'Elementos RPG'),
(14, 5, 10, 'Escalada y exploración'),

-- God of War
(15, 6, 2, 'Acción'),
(16, 6, 3, 'Aventura narrativa'),

-- The Last of Us Part II
(17, 7, 2, 'Acción'),
(18, 7, 3, 'Aventura'),
(19, 7, 9, 'Terror psicológico'),

-- Skyrim
(20, 8, 1, 'RPG de mundo abierto'),
(21, 8, 3, 'Aventura épica'),

-- Assassin's Creed Valhalla
(22, 9, 2, 'Acción vikinga'),
(23, 9, 3, 'Aventura histórica'),
(24, 9, 1, 'Elementos RPG'),

-- Fortnite
(25, 10, 4, 'Battle Royale'),
(26, 10, 2, 'Acción multijugador'),

-- Cyberpunk 2077
(27, 11, 1, 'RPG futurista'),
(28, 11, 2, 'Acción'),
(29, 11, 4, 'Tiroteos'),

-- Dark Souls III
(30, 12, 1, 'RPG de acción'),
(31, 12, 2, 'Combate táctico'),

-- Portal 2
(32, 13, 5, 'Puzzles'),
(33, 13, 3, 'Aventura de plataformas'),

-- GTA V
(34, 14, 2, 'Acción'),
(35, 14, 3, 'Mundo abierto'),
(36, 14, 4, 'Shooter'),

-- Hades
(37, 15, 2, 'Acción roguelike'),
(38, 15, 1, 'Elementos RPG');

-- --------------------------------------------
-- 7. JUEGO_PLATAFORMA
-- --------------------------------------------
INSERT INTO Juego_Plataforma (juegoId, plataformaId) VALUES
-- The Witcher 3 - Multiplataforma
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
-- Red Dead Redemption 2
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5),
-- Elden Ring
(3, 1), (3, 2), (3, 3), (3, 4), (3, 5),
-- Half-Life 2
(4, 1),
-- Zelda BOTW
(5, 6),
-- God of War
(6, 2), (6, 3),
-- The Last of Us Part II
(7, 2), (7, 3),
-- Skyrim
(8, 1), (8, 2), (8, 3), (8, 4), (8, 5), (8, 6),
-- AC Valhalla
(9, 1), (9, 2), (9, 3), (9, 4), (9, 5),
-- Fortnite
(10, 1), (10, 2), (10, 3), (10, 4), (10, 5), (10, 6),
-- Cyberpunk 2077
(11, 1), (11, 2), (11, 3), (11, 4), (11, 5),
-- Dark Souls III
(12, 1), (12, 2), (12, 3), (12, 4), (12, 5),
-- Portal 2
(13, 1),
-- GTA V
(14, 1), (14, 2), (14, 3), (14, 4), (14, 5),
-- Hades
(15, 1), (15, 2), (15, 3), (15, 6);

-- --------------------------------------------
-- 8. IMÁGENES (ejemplos)
-- --------------------------------------------
INSERT INTO Imagen (url, alt, orden, isMain, creadoAt, updatedAt, juegoId) VALUES
-- The Witcher 3
('https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg', 'The Witcher 3 portada', 0, true, NOW(), NOW(), 1),
('https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_1.jpg', 'Gameplay 1', 1, false, NOW(), NOW(), 1),
('https://cdn.cloudflare.steamstatic.com/steam/apps/292030/ss_2.jpg', 'Gameplay 2', 2, false, NOW(), NOW(), 1),

-- Red Dead Redemption 2
('https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg', 'RDR2 portada', 0, true, NOW(), NOW(), 2),
('https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/ss_1.jpg', 'Gameplay 1', 1, false, NOW(), NOW(), 2),

-- Elden Ring
('https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg', 'Elden Ring portada', 0, true, NOW(), NOW(), 3),
('https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_1.jpg', 'Gameplay 1', 1, false, NOW(), NOW(), 3),

-- Half-Life 2
('https://cdn.cloudflare.steamstatic.com/steam/apps/220/header.jpg', 'Half-Life 2 portada', 0, true, NOW(), NOW(), 4),

-- Zelda BOTW
('https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_2.0/c_scale,w_500/ncom/en_US/games/switch/t/the-legend-of-zelda-breath-of-the-wild-switch/hero', 'Zelda BOTW portada', 0, true, NOW(), NOW(), 5),

-- God of War
('https://image.api.playstation.com/vulcan/img/rnd/202010/2217/p3pYq0QxntZQREXRVdAzmn1w.png', 'God of War portada', 0, true, NOW(), NOW(), 6),

-- The Last of Us Part II
('https://image.api.playstation.com/vulcan/img/rnd/202010/2618/Y02ljdBodKFBiziorYgqftol.png', 'TLOU2 portada', 0, true, NOW(), NOW(), 7),

-- Skyrim
('https://cdn.cloudflare.steamstatic.com/steam/apps/489830/header.jpg', 'Skyrim portada', 0, true, NOW(), NOW(), 8),

-- AC Valhalla
('https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/header.jpg', 'AC Valhalla portada', 0, true, NOW(), NOW(), 9),

-- Fortnite
('https://cdn2.unrealengine.com/14br-consoles-1920x1080-wlogo-1920x1080-d4e82ec8c478.jpg', 'Fortnite portada', 0, true, NOW(), NOW(), 10);

-- Actualizar mainImagenId en Juegos
UPDATE Juego SET mainImagenId = 1 WHERE id = 1;
UPDATE Juego SET mainImagenId = 4 WHERE id = 2;
UPDATE Juego SET mainImagenId = 6 WHERE id = 3;
UPDATE Juego SET mainImagenId = 8 WHERE id = 4;
UPDATE Juego SET mainImagenId = 9 WHERE id = 5;
UPDATE Juego SET mainImagenId = 10 WHERE id = 6;
UPDATE Juego SET mainImagenId = 11 WHERE id = 7;
UPDATE Juego SET mainImagenId = 12 WHERE id = 8;
UPDATE Juego SET mainImagenId = 13 WHERE id = 9;
UPDATE Juego SET mainImagenId = 14 WHERE id = 10;

-- --------------------------------------------
-- 9. USUARIOS
-- --------------------------------------------
INSERT INTO Usuario (id, email, password, nombre, apellido, direccion, saldo, tipoUsuarioId) VALUES
(1, 'admin@juega.com', '$2b$10$abcdefghijklmnopqrstuv', 'Admin', 'Sistema', 'Av. Libertador 1000', 0, 1),
(2, 'juan.perez@gmail.com', '$2b$10$abcdefghijklmnopqrstuv', 'Juan', 'Pérez', 'Calle Falsa 123', 150.50, 3),
(3, 'maria.gomez@gmail.com', '$2b$10$abcdefghijklmnopqrstuv', 'María', 'Gómez', 'Av. Corrientes 456', 300.00, 2),
(4, 'carlos.rodriguez@gmail.com', '$2b$10$abcdefghijklmnopqrstuv', 'Carlos', 'Rodríguez', NULL, 50.00, 3),
(5, 'ana.martinez@gmail.com', '$2b$10$abcdefghijklmnopqrstuv', 'Ana', 'Martínez', 'Calle San Martín 789', 500.00, 2),
(6, 'pedro.sanchez@gmail.com', '$2b$10$abcdefghijklmnopqrstuv', 'Pedro', 'Sánchez', 'Av. Rivadavia 321', 200.00, 3);

-- --------------------------------------------
-- 10. USUARIO_JUEGO (Biblioteca personal)
-- --------------------------------------------
INSERT INTO Usuario_Juego (id, detalle, fecha, usuarioId, juegoId) VALUES
-- Usuario 6 (Pedro) tiene varios juegos
(1, 'Comprado en oferta', '2025-10-01 10:30:00', 6, 1),
(2, 'Regalo de cumpleaños', '2025-10-05 14:20:00', 6, 3),
(3, 'Juego gratuito', '2025-10-10 09:15:00', 6, 10),
(4, 'Compra regular', '2025-10-15 16:45:00', 6, 6),
(5, 'Comprado en bundle', '2025-10-20 11:00:00', 6, 8),

-- Usuario 2 (Juan)
(6, 'Primera compra', '2025-09-15 10:00:00', 2, 2),
(7, 'Comprado en oferta', '2025-09-20 14:30:00', 2, 4),
(8, 'Juego gratuito', '2025-10-01 09:00:00', 2, 10),

-- Usuario 3 (María)
(9, 'Compra especial', '2025-09-10 12:00:00', 3, 5),
(10, 'Comprado', '2025-09-25 15:30:00', 3, 7),
(11, 'Oferta', '2025-10-05 10:15:00', 3, 1),
(12, 'Bundle', '2025-10-10 11:45:00', 3, 11),

-- Usuario 5 (Ana)
(13, 'Compra premium', '2025-10-01 09:30:00', 5, 3),
(14, 'Oferta especial', '2025-10-10 14:00:00', 5, 12),
(15, 'Gratuito', '2025-10-15 10:00:00', 5, 10);

-- --------------------------------------------
-- 11. WISHLIST
-- --------------------------------------------
INSERT INTO Wishlist (usuarioId, juegoId) VALUES
(6, 2), -- Pedro quiere RDR2
(6, 11), -- Pedro quiere Cyberpunk
(2, 1), -- Juan quiere Witcher 3
(2, 3), -- Juan quiere Elden Ring
(3, 3), -- María quiere Elden Ring
(4, 10); -- Carlos quiere Fortnite

-- --------------------------------------------
-- 12. CARRITOS
-- --------------------------------------------
INSERT INTO Carrito (id, usuarioId) VALUES
(1, 2),
(2, 4),
(3, 6);

-- --------------------------------------------
-- 13. CARRITO_JUEGO
-- --------------------------------------------
INSERT INTO Carrito_Juego (carritoId, juegoId) VALUES
(1, 1), -- Juan tiene Witcher 3 en carrito
(1, 5), -- Juan tiene Zelda en carrito
(2, 2), -- Carlos tiene RDR2 en carrito
(3, 14); -- Pedro tiene GTA V en carrito

-- --------------------------------------------
-- 14. REVIEWS
-- --------------------------------------------
INSERT INTO Review (descripcion, usuarioId, juegoId) VALUES
('Increíble juego, la historia es épica y el mundo es enorme', 6, 1),
('Uno de los mejores RPGs que he jugado', 3, 1),
('Gráficos impresionantes y una historia memorable', 2, 2),
('El combate es desafiante pero muy satisfactorio', 6, 3),
('Un clásico que nunca envejece', 2, 4),
('La mejor aventura de Zelda hasta la fecha', 3, 5),
('Historia emotiva y gameplay perfecto', 3, 7),
('Me encanta poder explorar libremente', 6, 8);
