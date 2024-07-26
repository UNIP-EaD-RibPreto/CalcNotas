function selecaoItens() {
    // Obter valores dos campos
    const situacaoDisciplina = document.getElementById("situacaoDisciplina").value;
    const tipoDisciplina = document.getElementById("tipoDisciplina").value;

    // Limpar campos para não ficar nota calculada errada
    limparAll();
    ocultarAll();

    // Definir qual inputs serão inseridos
    switch (tipoDisciplina) {
        case "teoricaTradicional":
            mostrarSecao("secaoProvas", situacaoDisciplina === "regular" || "dp");
            mostrarSecao("secaoAva", situacaoDisciplina === "regular");
            mostrarSecao("secaoExame", situacaoDisciplina === "regular" || "dp");
            break;
        case "teoricaTecnologica":
            mostrarSecao("secaoProvas", situacaoDisciplina === "regular" || "dp");
            mostrarSecao("secaoPims", situacaoDisciplina === "regular");
            mostrarSecao("secaoAva", situacaoDisciplina === "regular");
            mostrarSecao("secaoExame", situacaoDisciplina === "regular" || "dp");
            break;
        case "praticaLaboratorio":
            mostrarSecao("secaoProvas", situacaoDisciplina === "regular" || "dp");
            mostrarSecao("secaoRelatorios", situacaoDisciplina === "regular");
            mostrarSecao("secaoExame", situacaoDisciplina === "regular" || "dp");
            break;
        case "praticaLicenciatura":
            mostrarSecao("secaoRelatorios", situacaoDisciplina === "regular" || "dp");
            mostrarSecao("secaoRelatoriosLic", situacaoDisciplina === "regular" || "dp");
            mostrarSecao("secaoChat", situacaoDisciplina === "regular");
            mostrarSecao("secaoExame", situacaoDisciplina === "regular" || "dp");
            break;
        case "tcc":
            mostrarSecao("secaoTcc", tipoDisciplina === "tcc");
            break;
    }
}

function calcular() {
    // Obter valores dos campos
    const anoIngresso = document.getElementById("anoIngresso").value;
    const situacaoDisciplina = document.getElementById("situacaoDisciplina").value;
    const tipoDisciplina = document.getElementById("tipoDisciplina").value;
    const prova1 = parseFloat(document.getElementById("prova1").value) || 0;
    const pim1 = parseFloat(document.getElementById("pim1").value) || 0;
    const relatorio1 =
        parseFloat(document.getElementById("relatorio1").value) || 0;
    const relatorioFinal =
        parseFloat(document.getElementById("relatorioFinal").value) || 0;
    const exame = parseFloat(document.getElementById("exame").value) || 0;

    // Calcular média da disciplina (MD)
    let md = 0;
    switch (tipoDisciplina) {
        case "teoricaTradicional":
            md = calcularMediaTeoricaTradicional(prova1, prova2, prova3);
            break;
        case "teoricaTecnologica":
            md = calcularMediaTeoricaTecnologica(prova1, prova2, prova3, pim1, pim2);
            break;
        case "praticaLicenciatura":
            md = calcularMediaPraticaLicenciatura(
                relatorio1,
                relatorio2,
                relatorioFinal
            );
            break;
        case "praticaLaboratorio":
            md = calcularMediaPraticaLaboratorio(relatorio1, relatorio2, prova1);
            break;
        case "tcc":
            md = calcularMediaTcc(trabalhoCurso, banca);
            break;
    }

    // Arredondamento da MD
    md = arredondarMedia(md, anoIngresso);

    // Calcular média final (MF)
    let mf = 0;
    if (md < (anoIngresso === "2022" ? 6 : 7)) {
        mf = calcularMediaFinalComExame(md, exame);
    } else {
        mf = md;
    }

    // Arredondamento da MF
    mf = arredondarMedia(mf, anoIngresso);

    // Exibir resultados
    document.getElementById("md").textContent = md.toFixed(2);
    document.getElementById("mf").textContent = mf.toFixed(2);

    if (mf >= (anoIngresso === "2022" ? 5 : 5)) {
        alert("Aprovado!");
    } else {
        alert("Reprovado!");
    }
}

function mostrarSecao(secaoId, mostrar) {
    const secao = document.getElementById(secaoId);
    secao.style.display = mostrar ? "block" : "none";
}

function limparSecao(secaoId, limpar) {
    if (limpar) {
        const inputs = document
            .getElementById(secaoId)
            .querySelectorAll('input[type="number"]');
        for (const input of inputs) {
            input.value = "";
        }
    }
}

function limparAll() {
    const inputs = document.querySelectorAll('input[type="number"]');
    for (const input of inputs) {
        input.value = "";
    }
}

function ocultarAll() {
    const sections = document.getElementsByTagName("section");
    for (const section of sections) {
        section.style.display = "none";
    }
}

function calcularMediaTeoricaTradicional(prova1, prova2, prova3) {
    return (9 * prova1 + prova2 + prova3) / 10;
}

function calcularMediaTeoricaTecnologica(prova1, prova2, prova3, pim1, pim2) {
    return (7 * (prova1 + prova2 + prova3) + 2 * (pim1 + pim2)) / 10;
}

function calcularMediaPraticaLicenciatura(
    relatorio1,
    relatorio2,
    relatorioFinal
) {
    return (2 * (relatorio1 + relatorio2) + 7 * relatorioFinal) / 10;
}

function calcularMediaPraticaLaboratorio(relatorio1, relatorio2, prova1) {
    return (3 * (relatorio1 + relatorio2) + 7 * prova1) / 10;
}

function calcularMediaTcc(trabalhoCurso, banca) {
    return (7 * trabalhoCurso + 3 * banca) / 10;
}

function calcularMediaFinalComExame(md, exame,) {
    return (md + exame) / 2;
}

function arredondarMedia(media, anoIngresso) {
    if (anoIngresso === "2022" && media >= 5.7 && media < 6) {
        media = 6;
    } else if (media >= 6.7 && media < 7) {
        media = 7;
    }
    return media;
}
