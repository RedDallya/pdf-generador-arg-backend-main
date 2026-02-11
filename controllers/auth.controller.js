import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  getUserByUsername,
  saveRefreshToken,
  revokeRefreshToken,
  isRefreshValid
} from "../models/auth.model.js";
import { JWT_SECRET, JWT_EXPIRES, REFRESH_EXPIRES_DAYS } from "../config/jwt.js";

export const login = async (req, res) => {

  const { username, password } = req.body;

  const user = await getUserByUsername(username);
  if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: "Credenciales inválidas" });

  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );

  const refreshToken = crypto.randomUUID();
  const expires = new Date();
  expires.setDate(expires.getDate() + REFRESH_EXPIRES_DAYS);

  await saveRefreshToken(user.id, refreshToken, expires);

  res.json({ accessToken, refreshToken });
};

export const refresh = async (req, res) => {

  const { refreshToken } = req.body;
  const stored = await isRefreshValid(refreshToken);

  if (!stored) return res.status(401).json({ error: "Refresh inválido" });

  const accessToken = jwt.sign(
    { id: stored.user_id },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );

  res.json({ accessToken });
};

export const logout = async (req, res) => {
  const { refreshToken } = req.body;
  await revokeRefreshToken(refreshToken);
  res.json({ ok: true });
};
