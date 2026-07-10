export function normalizeTitle(title) {
  return title
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[™®©]/g, '')                              // remove símbolos de marca
    .replace(/[:\-–—]/g, ' ')                            // troca : - – — por espaço
    .replace(/[^a-z0-9\s]/g, '')                         // remove qualquer outro símbolo
    .replace(/\s+/g, ' ')                                // colapsa espaços múltiplos
    .trim();
}