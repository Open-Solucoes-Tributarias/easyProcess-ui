export const dateConverter = (date) => {
  return new Date(date).toLocaleDateString('pt-BR');
}

export const dateAndHrConverter = (date) => {
  return new Date(date).toLocaleString('pt-BR');
}

//mes atual, para utilizar nos filtro mensais
export const getCurrentMonth = () => {
  const hoje = new Date();
  return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`;
};

//funcao de filtro mensal de atividades
export const filterDateMonth = (atividades = [], dateRef) => {
  if (!dateRef) return atividades; // se não há filtro, retorna tudo

  return atividades.filter((atv) => {
    if (!atv.dataLimite) return false;

    const d = new Date(atv.dataLimite);
    if (isNaN(d)) return false;

    // monta "YYYY-MM" com ano e mês da dataLimite das atividades
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

    return ym === dateRef;
  });
};

//funcao de criacao de atividade de um contrato, de forma recorrente ou não

// helpers de data
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const addMonths = (d, n) => { const x = new Date(d); x.setMonth(x.getMonth() + n); return x; };
const addYears = (d, n) => { const x = new Date(d); x.setFullYear(x.getFullYear() + n); return x; };

/**
 * periodo:
 * 1 = a cada X dias (usa intervaloEmDias; se 0/undefined => 1)
 * 2 = semanal (7 dias)
 * 3 = quinzenal (14 dias)
 * 4 = mensal
 * 5 = trimestral
 * 6 = anual
 */
const proximaData = (periodo, base, intervaloEmDias = 0) => {
  switch (Number(periodo)) {
    case 1: return addDays(base, Math.max(1, Number(intervaloEmDias || 0)));
    case 2: return addDays(base, 7);
    case 3: return addDays(base, 14);
    case 4: return addMonths(base, 1);
    case 5: return addMonths(base, 3);
    case 6: return addYears(base, 1);
    case 7: return addMonths(base, 6);
    default: return null;
  }
};

const montarDescricao = (atv) =>
  `${atv?.nome}${atv?.instrucao?.trim() ? " | " + atv.instrucao : ""}`;

export const criarAtvRecorrentes = (atvs = [], contrato = {}) => {

  if (!Array.isArray(atvs) || !contrato?.id) return [];

  const fim = new Date(contrato?.dataFim);
  const uid = Number(contrato?.supervisorUsuarioId);
  const nomeResp = contrato?.nomeSupervisor;

  const saida = [];

  atvs.forEach((atv) => {
    const baseObj = {
      id: 0,
      contratoId: Number(contrato.id),
      atividadeId: atv?.id,
      usuarioDelegadoId: uid,
      statusAtividade: 0,
      nomeUsuarioDelegado: nomeResp,
    };

    const tipo = Number(atv?.tipo ?? 1);     // 1 = única, 2 = recorrente
    const periodo = Number(atv?.periodo ?? 0);
    let atual = new Date(atv?.proximaExecucao || Date.now());

    // ÚNICA (tipo 1) OU se dataFim inválida → cria só uma
    if (tipo !== 2 || !(fim instanceof Date) || isNaN(fim)) {
      saida.push({
        ...baseObj,
        sequencia: saida.length,
        descricaoCustomizada: montarDescricao(atv),
        dataLimite: atv?.proximaExecucao ? new Date(atv.proximaExecucao) : new Date(),
      });
      return;
    }

    // RECORRENTE (tipo 2), usa PERIODO para frequência
    let i = 0;
    while (atual <= fim) {
      saida.push({
        ...baseObj,
        sequencia: saida.length,
        descricaoCustomizada: montarDescricao(atv),
        dataLimite: new Date(atual),
      });

      const next = proximaData(periodo, atual, atv?.intervaloEmDias);
      if (!next || next.getTime() === atual.getTime()) break; // segurança
      atual = next;

      if (++i > 5000) break; // trava de segurança
    }
  });

  return saida;
};
