const candidaturasQueries = {
    createCandidaturaQuery: `INSERT INTO candidaturas (id_candidato, id_empleado, status, fecha_registro)
    VALUES (?, 1, 'Registro', NOW());`,

    readCandidaturaByIdQuery: `SELECT ct.id_candidato, ct.nombre_candidato, ct.apellidos_candidato, ct.email_candidato, ct.telefono_candidato, ct.edad, ct.carrera, ct.nota_media, ct.nivel_ingles, ct.cv, cc.*, cr.*
    FROM competencias cc
    INNER JOIN candidaturas cr ON cr.id_candidatura = cc.id_candidatura
    INNER JOIN candidatos ct ON ct.id_candidato = cr.id_candidato
    WHERE cc.id_candidatura = ?;`,

    readCandidaturasQuery: `SELECT ct.nombre_candidato, ct.apellidos_candidato, ct.email_candidato, ct.telefono_candidato, cr.*
    FROM candidaturas cr
    INNER JOIN candidatos ct ON ct.id_candidato = cr.id_candidato
    WHERE (cr.id_candidato IN (
        SELECT ct.id_candidato 
        FROM candidatos 
        WHERE ct.nombre_candidato LIKE ?
        OR ct.apellidos_candidato LIKE ?
    ))
    AND (? = '' OR cr.id_empleado = ?)
    AND (? = '' OR cr.status = ?)
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

    readCandidaturasTotalCountQuery: `SELECT COUNT(*) as total
    FROM candidaturas cr
    INNER JOIN candidatos ct ON ct.id_candidato = cr.id_candidato
    WHERE (cr.id_candidato IN (
        SELECT ct.id_candidato 
        FROM candidatos 
        WHERE ct.nombre_candidato LIKE ?
        OR ct.apellidos_candidato LIKE ?
    ))
    AND (? = '' OR cr.id_empleado = ?)
    AND (? = '' OR cr.status = ?);`,

    updateCandidaturaQuery: `UPDATE candidaturas
    SET id_empleado = COALESCE(?, id_empleado),
    status = COALESCE(?, status)
    WHERE id_candidatura = ?;`,

    deleteCandidaturaQuery: `DELETE FROM candidaturas
    WHERE id_candidatura = ?;`
}
module.exports = candidaturasQueries;