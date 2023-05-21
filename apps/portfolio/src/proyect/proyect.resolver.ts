import * as graphql from "@nestjs/graphql";
import { ProyectResolverBase } from "./base/proyect.resolver.base";
import { Proyect } from "./base/Proyect";
import { ProyectService } from "./proyect.service";

@graphql.Resolver(() => Proyect)
export class ProyectResolver extends ProyectResolverBase {
  constructor(protected readonly service: ProyectService) {
    super(service);
  }
}
