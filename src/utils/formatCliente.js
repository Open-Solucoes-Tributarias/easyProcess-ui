// utils/formatCliente.js

// mantém só dígitos
const onlyDigits = (s) => (s || "").replace(/\D+/g, "");

// CPF: 000.000.000-00
export function formatCPF(value) {
  const v = onlyDigits(value).slice(0, 11);
  const p1 = v.slice(0, 3);
  const p2 = v.slice(3, 6);
  const p3 = v.slice(6, 9);
  const p4 = v.slice(9, 11);

  if (v.length <= 3) return p1;
  if (v.length <= 6) return `${p1}.${p2}`;
  if (v.length <= 9) return `${p1}.${p2}.${p3}`;
  return `${p1}.${p2}.${p3}-${p4}`;
}

// CNPJ: 00.000.000/0000-00
export function formatCNPJ(value) {
  const v = onlyDigits(value).slice(0, 14);
  const p1 = v.slice(0, 2);
  const p2 = v.slice(2, 5);
  const p3 = v.slice(5, 8);
  const p4 = v.slice(8, 12);
  const p5 = v.slice(12, 14);

  if (v.length <= 2) return p1;
  if (v.length <= 5) return `${p1}.${p2}`;
  if (v.length <= 8) return `${p1}.${p2}.${p3}`;
  if (v.length <= 12) return `${p1}.${p2}.${p3}/${p4}`;
  return `${p1}.${p2}.${p3}/${p4}-${p5}`;
}

/** Formata conforme flags */
export function formatCliente(value, opts) {
  if (opts?.isCpf) return formatCPF(value);
  if (opts?.isCnpj) return formatCNPJ(value);
  return value ?? "";
}

// Detecta tipo pelo número de dígitos (edição)
export function inferTipoDocumento(value) {
  const d = onlyDigits(value);
  if (d.length === 14) return "CNPJ";
  if (d.length === 11) return "CPF";
  return "OUTRO";
}

// Remeasca o valor atual para um novo tipo
export function remaskDocumento(value, novoTipo) {
  const d = onlyDigits(value);
  if (novoTipo === "CNPJ") return formatCNPJ(d);
  if (novoTipo === "CPF") return formatCPF(d);
  return value ?? "";
}

export const unmaskDigits = (s) => onlyDigits(s);
