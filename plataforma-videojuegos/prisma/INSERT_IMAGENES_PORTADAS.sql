-- INSERT DE IMÁGENES DE PORTADA PARA LOS JUEGOS
-- Ejecutar después de tener los juegos insertados en la base de datos

-- The Witcher 3: Wild Hunt (ID: 1)
INSERT INTO Imagen (url, alt, juegoId, isMain, creadoAt, updatedAt) VALUES
('https://image.api.playstation.com/vulcan/img/rnd/202211/0711/kh4MUIuMbzsQvUkq5RVvmwJt.png', 'The Witcher 3 Wild Hunt Cover', 1, 1, NOW(), NOW());

-- Red Dead Redemption 2 (ID: 2)
INSERT INTO Imagen (url, alt, juegoId, isMain, creadoAt, updatedAt) VALUES
('https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png', 'Red Dead Redemption 2 Cover', 2, 1, NOW(), NOW());

-- Elden Ring (ID: 3)
INSERT INTO Imagen (url, alt, juegoId, isMain, creadoAt, updatedAt) VALUES
('https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aGhopp3MHppi7kooGE2Dtt8C.png', 'Elden Ring Cover', 3, 1, NOW(), NOW());

-- Half-Life 2 (ID: 4)
INSERT INTO Imagen (url, alt, juegoId, isMain, creadoAt, updatedAt) VALUES
('https://cdn.cloudflare.steamstatic.com/steam/apps/220/header.jpg', 'Half-Life 2 Cover', 4, 1, NOW(), NOW());

-- The Legend of Zelda: Breath of the Wild (ID: 5)
INSERT INTO Imagen (url, alt, juegoId, isMain, creadoAt, updatedAt) VALUES
('https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58', 'The Legend of Zelda Breath of the Wild Cover', 5, 1, NOW(), NOW());

-- God of War (ID: 6)
INSERT INTO Imagen (url, alt, juegoId, isMain, creadoAt, updatedAt) VALUES
('https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF8IU3GjUX3kJbwkJHS.png', 'God of War Cover', 6, 1, NOW(), NOW());

-- The Last of Us Part II (ID: 7)
INSERT INTO Imagen (url, alt, juegoId, isMain, creadoAt, updatedAt) VALUES
('https://image.api.playstation.com/vulcan/img/rnd/202010/2618/Y02ljdBodKFBiziorYgqftTA.png', 'The Last of Us Part II Cover', 7, 1, NOW(), NOW());

-- Skyrim (ID: 8)
INSERT INTO Imagen (url, alt, juegoId, isMain, creadoAt, updatedAt) VALUES
('https://cdn.cloudflare.steamstatic.com/steam/apps/489830/header.jpg', 'The Elder Scrolls V Skyrim Cover', 8, 1, NOW(), NOW());

-- Assassins Creed Valhalla (ID: 9)
INSERT INTO Imagen (url, alt, juegoId, isMain, creadoAt, updatedAt) VALUES
('https://image.api.playstation.com/vulcan/ap/rnd/202008/1318/8XGEPtD1xoasNyMUFGVF5OtI.png', 'Assassins Creed Valhalla Cover', 9, 1, NOW(), NOW());

-- Fortnite (ID: 10)
INSERT INTO Imagen (url, alt, juegoId, isMain, creadoAt, updatedAt) VALUES
('https://cdn2.unrealengine.com/fortnite-chapter-5-season-1-key-art-1920x1080-47d14c816a82.jpg', 'Fortnite Cover', 10, 1, NOW(), NOW());

-- Cyberpunk 2077 (ID: 11)
INSERT INTO Imagen (url, alt, juegoId, isMain, creadoAt, updatedAt) VALUES
('https://image.api.playstation.com/vulcan/ap/rnd/202111/3013/cKZ4tKNFj9C00giTzYtH8PF1.png', 'Cyberpunk 2077 Cover', 11, 1, NOW(), NOW());

-- Dark Souls III (ID: 12)
INSERT INTO Imagen (url, alt, juegoId, isMain, creadoAt, updatedAt) VALUES
('https://image.api.playstation.com/cdn/UP0700/CUSA03388_00/v8JlD8KcQUtTqaLBmpFnj1ESRR5zMkLk.png', 'Dark Souls III Cover', 12, 1, NOW(), NOW());

-- Portal 2 (ID: 13)
INSERT INTO Imagen (url, alt, juegoId, isMain, creadoAt, updatedAt) VALUES
('https://cdn.cloudflare.steamstatic.com/steam/apps/620/header.jpg', 'Portal 2 Cover', 13, 1, NOW(), NOW());

-- Grand Theft Auto V (ID: 14)
INSERT INTO Imagen (url, alt, juegoId, isMain, creadoAt, updatedAt) VALUES
('https://image.api.playstation.com/vulcan/ap/rnd/202202/2816/82vLy6pgRAXCGLXHO4IJ9Bxf.png', 'Grand Theft Auto V Cover', 14, 1, NOW(), NOW());

-- Hades (ID: 15)
INSERT INTO Imagen (url, alt, juegoId, isMain, creadoAt, updatedAt) VALUES
('https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg', 'Hades Cover', 15, 1, NOW(), NOW());

-- ACTUALIZAR mainImagenId en la tabla Juego
UPDATE Juego SET mainImagenId = (SELECT id FROM Imagen WHERE juegoId = 1 AND isMain = 1) WHERE id = 1;
UPDATE Juego SET mainImagenId = (SELECT id FROM Imagen WHERE juegoId = 2 AND isMain = 1) WHERE id = 2;
UPDATE Juego SET mainImagenId = (SELECT id FROM Imagen WHERE juegoId = 3 AND isMain = 1) WHERE id = 3;
UPDATE Juego SET mainImagenId = (SELECT id FROM Imagen WHERE juegoId = 4 AND isMain = 1) WHERE id = 4;
UPDATE Juego SET mainImagenId = (SELECT id FROM Imagen WHERE juegoId = 5 AND isMain = 1) WHERE id = 5;
UPDATE Juego SET mainImagenId = (SELECT id FROM Imagen WHERE juegoId = 6 AND isMain = 1) WHERE id = 6;
UPDATE Juego SET mainImagenId = (SELECT id FROM Imagen WHERE juegoId = 7 AND isMain = 1) WHERE id = 7;
UPDATE Juego SET mainImagenId = (SELECT id FROM Imagen WHERE juegoId = 8 AND isMain = 1) WHERE id = 8;
UPDATE Juego SET mainImagenId = (SELECT id FROM Imagen WHERE juegoId = 9 AND isMain = 1) WHERE id = 9;
UPDATE Juego SET mainImagenId = (SELECT id FROM Imagen WHERE juegoId = 10 AND isMain = 1) WHERE id = 10;
UPDATE Juego SET mainImagenId = (SELECT id FROM Imagen WHERE juegoId = 11 AND isMain = 1) WHERE id = 11;
UPDATE Juego SET mainImagenId = (SELECT id FROM Imagen WHERE juegoId = 12 AND isMain = 1) WHERE id = 12;
UPDATE Juego SET mainImagenId = (SELECT id FROM Imagen WHERE juegoId = 13 AND isMain = 1) WHERE id = 13;
UPDATE Juego SET mainImagenId = (SELECT id FROM Imagen WHERE juegoId = 14 AND isMain = 1) WHERE id = 14;
UPDATE Juego SET mainImagenId = (SELECT id FROM Imagen WHERE juegoId = 15 AND isMain = 1) WHERE id = 15;

-- VERIFICAR LAS IMÁGENES INSERTADAS
SELECT j.nombre, i.url, i.isMain 
FROM Juego j 
LEFT JOIN Imagen i ON j.id = i.juegoId 
ORDER BY j.id;
