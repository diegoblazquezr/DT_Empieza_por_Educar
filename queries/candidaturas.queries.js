const candidaturasQueries = {
    createCandidaturaQuery: `INSERT INTO candidaturas (id_candidato, id_empleado, status, fecha_registro)
    VALUES (?, 6, 'Registro', NOW());`,

    readCandidaturasQuery: `SELECT ct.nombre_candidato, ct.apellidos_candidato, cr.* 
    FROM candidaturas cr
    INNER JOIN candidatos ct ON ct.id_candidato = cr.id_candidato
    WHERE cr.id_candidato IN (
        SELECT ct.id_candidato 
        FROM candidatos 
        WHERE ct.nombre_candidato LIKE ?
    )
    LIMIT ?
    OFFSET ?;`,

    updateCandidaturaQuery: `UPDATE candidaturas
    SET id_empleado = COALESCE(?, id_empleado),
    status = COALESCE(?, status)
    WHERE id_candidatura = ?;`,

    deleteCandidaturaQuery: `DELETE FROM candidaturas
    WHERE id_candidatura = ?;`
}
module.exports = candidaturasQueries;