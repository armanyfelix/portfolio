import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { ProyectService } from "./proyect.service";
import { ProyectControllerBase } from "./base/proyect.controller.base";

@swagger.ApiTags("proyects")
@common.Controller("proyects")
export class ProyectController extends ProyectControllerBase {
  constructor(protected readonly service: ProyectService) {
    super(service);
  }
}
