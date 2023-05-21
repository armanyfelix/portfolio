import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type ProyectWhereInput = {
  description?: StringNullableFilter;
  id?: StringFilter;
  images?: StringNullableFilter;
  name?: StringNullableFilter;
  source?: StringNullableFilter;
  stack?: StringNullableFilter;
  url?: StringNullableFilter;
};
