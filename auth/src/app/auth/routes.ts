import express, { Router } from "express";
export type { Router } from "express";

import AuthenticationController from "./controller";

const authenticationController = new AuthenticationController();

export const authRouter: Router = express.Router();

authRouter.post("/sign-up", authenticationController.handleSignUp.bind(authenticationController));