import { SortOrder } from "../../util/SortOrder";

export type ProyectOrderByInput = {
  createdAt?: SortOrder;
  description?: SortOrder;
  id?: SortOrder;
  images?: SortOrder;
  name?: SortOrder;
  source?: SortOrder;
  stack?: SortOrder;
  updatedAt?: SortOrder;
  url?: SortOrder;
};
