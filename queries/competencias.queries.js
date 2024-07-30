const queries = {
    createCompetencias: `INSERT INTO 
        competencias 
        (id_candidatura, nombre_competencia, nota)
VALUES
    (?, 'Profesionalidad', 0),
    (?, 'Dominio', 0),
    (?, 'Resiliencia', 0),
    (?, 'HabilidadesSociales', 0),
    (?, 'Liderazgo', 0),
    (?, 'Compromiso', 0),
    (?, 'Colaboración', 0),
    (?, 'Iniciativa', 0);`,
    updateCompetencia: `UPDATE
        competencias
    SET
        nota = ?
    WHERE 
        id_candidatura = ?;`
};



module.exports = queries;

/*id_competencia BIGINT NOT NULL AUTO_INCREMENT,
        id_candidatura BIGINT NOT NULL,
        nombre_competencia VARCHAR(255) NOT NULL,
        nota INTEGER NOT NULL,
        PRIMARY KEY (id_competencia),
        FOREIGN KEY (id_candidatura) REFERENCES candidaturas(id_candidatura)*/