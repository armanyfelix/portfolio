import { Proyect as TProyect } from "../api/proyect/Proyect";

export const PROYECT_TITLE_FIELD = "name";

export const ProyectTitle = (record: TProyect): string => {
  return record.name || String(record.id);
};
