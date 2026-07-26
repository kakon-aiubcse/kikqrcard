// lib/bkash/client.js
import axios from "axios";

const BASE_URL = process.env.BKASH_BASE_URL;
const APP_KEY = process.env.BKASH_APP_KEY;
const APP_SECRET = process.env.BKASH_APP_SECRET;
const USERNAME = process.env.BKASH_USERNAME;
const PASSWORD = process.env.BKASH_PASSWORD;

// cached across warm invocations in the same runtime
let cachedToken = null;
let cachedTokenExpiry = 0;
let cachedRefreshToken = null;

function assertConfigured() {
  if (!BASE_URL || !APP_KEY || !APP_SECRET || !USERNAME || !PASSWORD) {
    throw new Error("bKash is not configured. Set BKASH_* env vars.");
  }
}

async function grantToken() {
  assertConfigured();
  const { data } = await axios.post(
    `${BASE_URL}/tokenized/checkout/token/grant`,
    {
      app_key: APP_KEY,
      app_secret: APP_SECRET,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        username: USERNAME,
        password: PASSWORD,
      },
    },
  );

  if (!data?.id_token) {
    throw new Error(data?.msg || "Failed to obtain bKash token");
  }

  cachedToken = data.id_token;
  cachedRefreshToken = data.refresh_token;
  // expires_in is seconds; refresh a bit early
  cachedTokenExpiry = Date.now() + (Number(data.expires_in || 3600) - 60) * 1000;

  return cachedToken;
}

async function refreshToken() {
  assertConfigured();
  if (!cachedRefreshToken) {
    return grantToken();
  }

  try {
    const { data } = await axios.post(
      `${BASE_URL}/tokenized/checkout/token/refresh`,
      {
        app_key: APP_KEY,
        app_secret: APP_SECRET,
        refresh_token: cachedRefreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          username: USERNAME,
          password: PASSWORD,
        },
      },
    );

    if (!data?.id_token) {
      throw new Error("refresh failed");
    }

    cachedToken = data.id_token;
    cachedRefreshToken = data.refresh_token || cachedRefreshToken;
    cachedTokenExpiry = Date.now() + (Number(data.expires_in || 3600) - 60) * 1000;

    return cachedToken;
  } catch {
    return grantToken();
  }
}

export async function getBkashToken() {
  if (cachedToken && Date.now() < cachedTokenExpiry) {
    return cachedToken;
  }
  if (cachedRefreshToken) {
    return refreshToken();
  }
  return grantToken();
}

export async function bkashHeaders() {
  const token = await getBkashToken();
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token,
    "X-App-Key": APP_KEY,
  };
}

export function bkashUrl(path) {
  assertConfigured();
  return `${BASE_URL}${path}`;
}
