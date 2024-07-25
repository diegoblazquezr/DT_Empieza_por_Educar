const queries = {
    readEmpleadoByEmail: `SELECT * FROM empleados WHERE email_empleado = ?`,
    createEmpleados: `INSERT INTO empleados (
      nombre_empleado,
      apellidos_empleado,
      email_empleado,
      password,
      rol,
      is_logged,
      last_logged_date
    ) VALUES (?, ?, ?, ?, ?, 0, NOW())`,
    setLoggedTrue: `UPDATE empleados SET is_logged = 1 WHERE email_empleado = ?`,
    setLoggedFalse: `UPDATE empleados SET is_logged = 0 WHERE id_empleado = ?`,
    updateLastLoggedDate: `UPDATE empleados SET last_logged_date = NOW() WHERE id_empleado = ?`
};

module.exports = queries;