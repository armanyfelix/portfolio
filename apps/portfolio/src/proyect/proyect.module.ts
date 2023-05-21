import { Module } from "@nestjs/common";
import { ProyectModuleBase } from "./base/proyect.module.base";
import { ProyectService } from "./proyect.service";
import { ProyectController } from "./proyect.controller";
import { ProyectResolver } from "./proyect.resolver";

@Module({
  imports: [ProyectModuleBase],
  controllers: [ProyectController],
  providers: [ProyectService, ProyectResolver],
  exports: [ProyectService],
})
export class ProyectModule {}
