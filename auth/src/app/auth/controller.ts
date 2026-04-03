import type { Request, Response } from "express";
import { randomBytes, createHmac } from "node:crypto";
import db from "../../db";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { signUpPayloadModel } from "./models";

export default class AuthenticationController {
  public async handleSignUp(req: Request, res: Response) {
    const validationResult = await signUpPayloadModel.safeParseAsync(req.body);

    if (validationResult.error)
      return res.status(400).json({
        message: "body validation failed",
        error: validationResult.error.issues,
      });

    const { firstName, lastName, email, password } = validationResult.data;
    const userEmailResult = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (userEmailResult.length > 0)
      return res.status(400).json({
        error: "email already exists",
      });

    const salt = randomBytes(32).toString("hex");
    const hash = createHmac("sha256", salt).update(password).digest("hex");

    const result = await db
      .insert(usersTable)
      .values({
        firstName,
        lastName,
        email,
        password: hash,
        salt: salt,
      })
      .returning({
        id: usersTable.id,
      });

    return res.status(201).json({
      message: "user created successfully",
      userId: result[0]?.id,
    });
  }
}
