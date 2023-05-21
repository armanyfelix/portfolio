import { ProyectWhereInput } from "./ProyectWhereInput";
import { ProyectOrderByInput } from "./ProyectOrderByInput";

export type ProyectFindManyArgs = {
  where?: ProyectWhereInput;
  orderBy?: Array<ProyectOrderByInput>;
  skip?: number;
  take?: number;
};
