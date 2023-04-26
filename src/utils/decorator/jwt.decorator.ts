import { SetMetadata } from "@nestjs/common";

export const isNoAuth = () => SetMetadata('isNoAuth', true)