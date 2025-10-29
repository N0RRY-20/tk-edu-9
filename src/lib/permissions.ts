import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";
import { createAccessControl } from "better-auth/plugins/access";

/**
 * make sure to use `as const` so typescript can infer the type correctly
 */
export const statement = {
  ...defaultStatements,
  User: ["create", "share", "update", "delete", "list"],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  User: ["list", "create", "update", "delete"],
  ...adminAc.statements,
});

export const guru = ac.newRole({
  User: ["create", "update"],
});

export const walimurid = ac.newRole({
  User: ["list", "create"],
});
