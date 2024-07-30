function selecaoItens() {
    // Obter valores dos campos
    const situacaoDisciplina = document.getElementById("situacaoDisciplina").value;
    const tipoDisciplina = document.getElementById("tipoDisciplina").value;
    const anoIngresso = document.getElementById("anoIngresso").value;

    // Limpar campos para não ficar nota calculada errada
    limparAll();
    ocultarAll();

    //Incluir Avaliação de Aprendizagem
    mostrarSecao("avaliacaoAprendizagem2023", anoIngresso === "2023");
    mostrarSecao("avaliacaoAprendizagem2022", anoIngresso === "2022");
    
    // Definir quais inputs serão inseridos
    switch (tipoDisciplina) {
        case "teoricaTradicional":
            mostrarSecao("secaoProvas", situacaoDisciplina === "regular" || "dp");
            mostrarSecao("secaoAva", situacaoDisciplina === "regular");
            mostrarSecao("secaoExame", situacaoDisciplina === "regular" || "dp");
            mostrarSecao("avaliacaoTeoricasGraduacao", situacaoDisciplina === "regular" || "dp");
            break;
        case "teoricaTecnologica":
            mostrarSecao("secaoProvas", situacaoDisciplina === "regular" || "dp");
            mostrarSecao("secaoPims", situacaoDisciplina === "regular");
            mostrarSecao("secaoAva", situacaoDisciplina === "regular");
            mostrarSecao("secaoExame", situacaoDisciplina === "regular" || "dp");
            mostrarSecao("avaliacaoTeoricasTecnologos", situacaoDisciplina === "regular" || "dp");
            break;
        case "praticaLaboratorio":
            mostrarSecao("secaoProvas", situacaoDisciplina === "regular" || "dp");
            mostrarSecao("secaoRelatorios", situacaoDisciplina === "regular");
            mostrarSecao("secaoExame", situacaoDisciplina === "regular" || "dp");
            mostrarSecao("avaliacaoPraticaLabotarios", situacaoDisciplina === "regular" || "dp");
            break;
        case "praticaLicenciatura":
            mostrarSecao("secaoRelatorios", situacaoDisciplina === "regular" || "dp");
            mostrarSecao("secaoRelatoriosLic", situacaoDisciplina === "regular" || "dp");
            mostrarSecao("secaoChat", situacaoDisciplina === "regular");
            mostrarSecao("secaoExame", situacaoDisciplina === "regular" || "dp");
            mostrarSecao("avaliacaoPraticaLicenciaturas", situacaoDisciplina === "regular" || "dp");
            break;
        case "tcc":
            mostrarSecao("secaoTcc", situacaoDisciplina === "regular" || "dp");
            mostrarSecao("avaliacaoTcc", situacaoDisciplina === "regular" || "dp");
            break;
    }
}

function calcular() {
    // Obter valores dos campos
    const anoIngresso = document.getElementById("anoIngresso").value;
    const situacaoDisciplina = document.getElementById("situacaoDisciplina").value;
    const tipoDisciplina = document.getElementById("tipoDisciplina").value;
    const prova1 = parseFloat(document.getElementById("prova1").value) || 0;
    const ava = parseFloat(document.getElementById("ava").value) || 0;
    const pim1 = parseFloat(document.getElementById("pim1").value) || 0;
    const relatorio1 =
        parseFloat(document.getElementById("relatorio1").value) || 0;
    const relatorioFinal =
        parseFloat(document.getElementById("relatorioFinal").value) || 0;
    const chat1 = parseFloat(document.getElementById("chat1").value) || 0;
    const tcc1 = parseFloat(document.getElementById("tcc1").value) || 0;
    const banca = parseFloat(document.getElementById("banca").value) || 0;
    const exame = parseFloat(document.getElementById("exame").value) || 0;

    // Calcular média da disciplina (MD)
    let md = 0;
    switch (tipoDisciplina) {
        case "teoricaTradicional":
            if (situacaoDisciplina === "dp") {
                md = prova1;
            } else {
                md = prova1 * 0.9 + ava * 0.1;
            }
            break;
        case "teoricaTecnologica":
            if (situacaoDisciplina === "dp") {
                md = prova1;
            } else {
                md = prova1 * 0.7 + pim1 * 0.2 + ava * 0.1;
            }
            break;
        case "praticaLicenciatura":
            if (situacaoDisciplina === "dp") {
                md = relatorio1 * 0.3 + relatorioFinal * 0.7;
            } else {
                md = relatorio1 * 0.2 + relatorioFinal * 0.7 + (chat1 === 0 ? 0 : 1);
            }
            break;
        case "praticaLaboratorio":
            if (situacaoDisciplina === "dp") {
                md = prova1;
            } else {
                md = prova1 * 0.7 + relatorio1 * 0.3;
            }
            break;
        case "tcc":
            md = tcc1 * 0.7 + banca * 0.3;
            break;
    }

    // Arredondamento da MD
    if (anoIngresso === "2022" && md >= 5.7 && md < 6) {
        md = 6;
    } else if (md >= 6.7 && md < 7) {
        md = 7;
    }

    // Calcular média final (MF)
    let mf = 0;
    if (md < (anoIngresso === "2022" ? 6 : 7)) {
        mf = md * 0.5 + exame * 0.5;
    } else {
        mf = md;
    }

    // Arredondamento da MF
    if (mf >= 4.75 && mf < 5) {
        mf = 5;
    }

    // Exibir resultados
    document.getElementById("md").textContent = md.toFixed(2);
    document.getElementById("mf").textContent = mf.toFixed(2);

    if (mf >= (anoIngresso === "2022" ? 5 : 5)) {
        document.getElementById("situacaoResultado").textContent = "Aprovado";
        document.getElementById("situacaoResultado").className = "aprovado";
        alert("Aprovado!");
    } else if (exame === 0) {
        document.getElementById("situacaoResultado").textContent = "Você precisa fazer exame, com pelo menos " + (10 - md).toFixed(2) + " pontos.";
        document.getElementById("situacaoResultado").className = "reprovado";
        alert("Você precisa fazer exame, com nota acima de: " + (10 - md).toFixed(2));
    } else {
        document.getElementById("situacaoResultado").textContent = "Reprovado";
        document.getElementById("situacaoResultado").className = "reprovado";
        alert("Reprovado!");
    }
}

function mostrarSecao(secaoId, mostrar) {
    const secao = document.getElementById(secaoId);
    secao.style.display = mostrar ? "block" : "none";
}

function limparAll() {
    const inputs = document.querySelectorAll('input[type="number"]');
    for (const input of inputs) {
        input.value = "";
    }
    document.getElementById("situacaoResultado").textContent = "";
    document.getElementById("md").textContent = "";
    document.getElementById("mf").textContent = "";
}

function ocultarAll() {
    const sections = document.getElementsByTagName("section");
    for (const section of sections) {
        section.style.display = "none";
    }
}