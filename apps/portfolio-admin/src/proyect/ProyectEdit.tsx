import * as React from "react";
import { Edit, SimpleForm, EditProps, TextInput } from "react-admin";

export const ProyectEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput label="Description" multiline source="description" />
        <TextInput label="Images" source="images" />
        <TextInput label="Name" source="name" />
        <TextInput label="Source" source="source" />
        <TextInput label="Stack" multiline source="stack" />
        <TextInput label="Url" source="url" />
      </SimpleForm>
    </Edit>
  );
};
