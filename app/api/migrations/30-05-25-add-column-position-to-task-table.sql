-- Migration : ajout d'une colonne d'ordre d'affichage des tâches
-- Date : 2025-05-30

ALTER TABLE tasks
ADD COLUMN position INTEGER DEFAULT 0;
