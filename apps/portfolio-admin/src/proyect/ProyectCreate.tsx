import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const ProyectCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="Description" multiline source="description" />
        <TextInput label="Images" source="images" />
        <TextInput label="Name" source="name" />
        <TextInput label="Source" source="source" />
        <TextInput label="Stack" multiline source="stack" />
        <TextInput label="Url" source="url" />
      </SimpleForm>
    </Create>
  );
};
