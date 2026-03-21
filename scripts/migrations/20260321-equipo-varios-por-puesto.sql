-- Varios equipos por puesto (PC, impresora, etc.): eliminar UNIQUE en pj.equipo.puesto_id
-- que Postgres creaba con la relación OneToOne anterior.
--
-- En desarrollo con TypeORM synchronize=true suele aplicarse solo al arrancar.
-- En producción (synchronize=false), ejecutar este script una vez contra la BD.

DO $$
DECLARE
  con_name text;
BEGIN
  SELECT c.conname INTO con_name
  FROM pg_constraint c
  JOIN pg_class t ON c.conrelid = t.oid
  JOIN pg_namespace n ON t.relnamespace = n.oid
  WHERE n.nspname = 'pj'
    AND t.relname = 'equipo'
    AND c.contype = 'u'
    AND pg_get_constraintdef(c.oid) LIKE '%puesto_id%';

  IF con_name IS NOT NULL THEN
    EXECUTE format('ALTER TABLE pj.equipo DROP CONSTRAINT %I', con_name);
    RAISE NOTICE 'Dropped unique constraint on puesto_id: %', con_name;
  ELSE
    RAISE NOTICE 'No unique constraint on puesto_id found (already migrated or different schema).';
  END IF;
END $$;
