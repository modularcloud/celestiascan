export const isHeight = (term: string) => !!term.match(/^[0-9]{1,30}$/);
export const isHash = (term: string) => !!term.match(/^(0x)?[a-zA-Z0-9]{64}$/);
export const isAddress = (term: string) => !!term.match(/^\w{42}$/);
export const isSignature = (term: string) => !!term.match(/^\w{88}$/);

export function isSearchable(term: string): boolean {
  return isHeight(term) || isHash(term) || isAddress(term) || isSignature(term);
}
