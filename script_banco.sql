create database saep_db ; 
USE saep_db;


CREATE TABLE ferramentas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    quantidade INT DEFAULT 0,
    estoque_minimo INT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE movimentacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    ferramenta_id INT NOT NULL,
    tipo ENUM('entrada','saida') NOT NULL,
    quantidade INT NOT NULL,
    descricao TEXT,
    data_alteracao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (ferramenta_id) REFERENCES ferramentas(id)
);

-----------------------------------------
-- INSERIR FERRAMENTAS INICIAIS
-----------------------------------------
INSERT INTO ferramentas (nome, descricao, quantidade, estoque_minimo)
VALUES
('Martelo', 'Martelo de aço reforçado', 10, 2),
('Chave de Fenda', 'Chave de fenda ponta Philips', 25, 5),
('Alicate', 'Alicate universal 8 polegadas', 15, 3),
('Trena', 'Trena de 5 metros', 8, 2),
('Chave Inglesa', 'Chave inglesa ajustável', 12, 4);

-----------------------------------------
-- INSERIR MOVIMENTAÇÕES INICIAIS
-----------------------------------------
INSERT INTO movimentacoes (usuario_id, ferramenta_id, tipo, quantidade, descricao)
VALUES
(1, 1, 'entrada', 5, 'Reabastecimento de martelos'),
(1, 2, 'saida', 3, 'Empréstimo para oficina'),
(1, 3, 'entrada', 10, 'Compra de novos alicates'),
(1, 4, 'saida', 2, 'Uso interno'),
(1, 5, 'entrada', 4, 'Reposição de estoque');
