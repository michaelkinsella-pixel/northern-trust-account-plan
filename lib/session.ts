export const SITE_COOKIE = "ntr_site";
export const ADMIN_COOKIE = "ntr_admin";

export type SessionRecord = {
  id: string;
  visitorName: string;
  createdAt: number;
  lastSeenAt: number;
  /** Cumulative milliseconds observed in view per section id */
  sections: Record<string, number>;
  /** Last client-reported path/hash for debugging */
  lastPath?: string;
};

export function sessionKey(id: string) {
  return `ntr:session:${id}`;
}
