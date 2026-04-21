#!/usr/bin/env bun

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";
const len = 24;
const pw = Array.from(crypto.getRandomValues(new Uint32Array(len)))
  .map((v) => chars[v % chars.length])
  .join("");

const proc = Bun.spawn(["pbcopy"], { stdin: "pipe" });
proc.stdin.write(pw);
proc.stdin.end();
await proc.exited;

console.log(pw);
console.log("\nCopied to clipboard.");
