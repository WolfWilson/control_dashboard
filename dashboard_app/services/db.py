from django.db import connection

def exec_sp_datos_expte(letra, actuacion, ejercicio):
    with connection.cursor() as c:
        c.execute(
            "EXEC Will_Datos_Expte @letra=%s, @actuacion=%s, @ejercicio=%s",
            [letra, actuacion, ejercicio]
        )
        cols = [col[0] for col in c.description]
        rows = c.fetchone()
    return dict(zip(cols, rows)) if rows else None
