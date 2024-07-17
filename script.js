function calcular() {
  // Obter valores dos campos
  const ano = document.getElementById("ano").value;
  const tipoDisciplina = document.getElementById("tipoDisciplina").value;
  const frequencia = parseFloat(document.getElementById("frequencia").value);
  const prova1 = parseFloat(document.getElementById("prova1").value) || 0;
  const prova2 = parseFloat(document.getElementById("prova2").value) || 0;
  const prova3 = parseFloat(document.getElementById("prova3").value) || 0;
  const pim1 = parseFloat(document.getElementById("pim1").value) || 0;
  const pim2 = parseFloat(document.getElementById("pim2").value) || 0;
  const relatorio1 = parseFloat(document.getElementById("relatorio1").value) || 0;
  const relatorio2 = parseFloat(document.getElementById("relatorio2").value) || 0;
  const relatorioFinal = parseFloat(document.getElementById("relatorioFinal").value) || 0;
  const trabalhoCurso = parseFloat(document.getElementById("trabalhoCurso").value) || 0;
  const banca = parseFloat(document.getElementById("banca").value) || 0;
  const exame = parseFloat(document.getElementById("exame").value) || 0;

  // Validar frequência
  if (frequencia < 75) {
    alert("Reprovado por frequência!");
    return;
  }

  // Calcular média da disciplina (MD)
  let md = 0;
  switch (tipoDisciplina) {
    case "teorica":
    case "tecnica":
      md = (9 * prova1 + prova2 + prova3 + 1 * avaliacaoVirtual()) / 10;
      break;
    case "pratica":
      md =
        (2 * (relatorio1 + relatorio2) +
          7 * relatorioFinal +
          1 * avaliacaoVirtual()) /
        10;
      break;
    case "laboratorio":
      md = (3 * (relatorio1 + relatorio2) + 7 * prova1) / 10;
      break;
    case "tcc":
      md = (7 * trabalhoCurso + 3 * banca) / 10;
      break;
    case "estagio":
      // Implementar cálculo de média de aproveitamento ou carga horária
      break;
    case "pim":
      // Implementar cálculo de média de aproveitamento
      break;
  }

  // Arredondamento da MD
  if (ano === "2022" && md >= 5.7 && md < 6) {
    md = 6;
  } else if (md >= 6.7 && md < 7) {
    md = 7;
  }

  // Calcular média final (MF)
  let mf = 0;
  if (md < (ano === "2022" ? 6 : 7)) {
    mf = (md + exame) / 2;
  } else {
    mf = md;
  }

  // Arredondamento da MF
  if (mf >= 4.75 && mf < 5) {
    mf = 5;
  }

  // Exibir resultados
  document.getElementById("md").textContent = md.toFixed(1);
  document.getElementById("mf").textContent = mf.toFixed(1);

  if (mf >= (ano === "2022" ? 5 : 5)) {
    alert("Aprovado!");
  } else {
    alert("Reprovado!");
  }
}

function avaliacaoVirtual() {
  // Implementar cálculo da participação e interação no ambiente virtual (10%)
  return 0; // Valor inicializado com 0
}

// Adicionar evento de clique ao botão "Calcular"
document
  .getElementById("formCalculo")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar envio do formulário
    calcular();
  });
