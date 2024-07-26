const candidaturasQueries = {
    createCandidaturaQuery: `INSERT INTO candidaturas (id_candidato, id_empleado, status, fecha_registro)
    VALUES (?, 6, 'Registro', NOW());`,

    readCandidaturasQuery: `SELECT ct.nombre_candidato, ct.apellidos_candidato, cr.*
    FROM candidaturas cr
    INNER JOIN candidatos ct ON ct.id_candidato = cr.id_candidato
    WHERE (cr.id_candidato IN (
        SELECT ct.id_candidato 
        FROM candidatos 
        WHERE ct.nombre_candidato LIKE ?
        OR ct.apellidos_candidato LIKE ?
    ))
    OR cr.id_empleado = COALESCE(?, '')
    OR cr.status = COALESCE(?, '')
    ORDER BY 
        CASE
            WHEN ? = 'nombre_candidato' AND ? LIKE 'desc' THEN ct.nombre_candidato 
        END DESC,
        CASE
            WHEN ? = 'nombre_candidato' AND ? LIKE 'asc' THEN ct.nombre_candidato 
        END ASC,
        CASE
            WHEN ? = 'apellidos_candidato' AND ? LIKE 'desc' THEN ct.apellidos_candidato 
        END DESC,
        CASE
            WHEN ? = 'apellidos_candidato' AND ? LIKE 'asc' THEN ct.apellidos_candidato 
        END ASC,
        CASE
            WHEN ? = 'fecha_registro' AND ? LIKE 'desc' THEN cr.fecha_registro 
        END DESC,
        CASE
            WHEN ? = 'fecha_registro' AND ? LIKE 'asc' THEN cr.fecha_registro 
        END ASC
    LIMIT ?
    OFFSET ?;`,
    // ORDER BY
    //     CASE 
    //         WHEN ? LIKE 'desc' OR ? IS NULL OR ? = '' THEN cr.fecha_registro END DESC,
    //     CASE
    //         WHEN ? LIKE 'asc' THEN cr.fecha_registro END ASC

    updateCandidaturaQuery: `UPDATE candidaturas
    SET id_empleado = COALESCE(?, id_empleado),
    status = COALESCE(?, status)
    WHERE id_candidatura = ?;`,

    deleteCandidaturaQuery: `DELETE FROM candidaturas
    WHERE id_candidatura = ?;`
}
module.exports = candidaturasQueries;