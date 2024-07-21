function calcular() {
    // Obter valores dos campos
    const anoIngresso = document.getElementById('anoIngresso').value;
    const dp = document.getElementById('dp').value;
    const tipoDisciplina = document.getElementById('tipoDisciplina').value;
    const prova1 = parseFloat(document.getElementById('prova1').value) || 0;
    const prova2 = parseFloat(document.getElementById('prova2').value) || 0;
    const prova3 = parseFloat(document.getElementById('prova3').value) || 0;
    const pim1 = parseFloat(document.getElementById('pim1').value) || 0;
    const pim2 = parseFloat(document.getElementById('pim2').value) || 0;
    const relatorio1 = parseFloat(document.getElementById('relatorio1').value) || 0;
    const relatorio2 = parseFloat(document.getElementById('relatorio2').value) || 0;
    const relatorioFinal = parseFloat(document.getElementById('relatorioFinal').value) || 0;
    const exame = parseFloat(document.getElementById('exame').value) || 0;

    // Esconder/Mostrar seções de acordo com o tipo de disciplina
    mostrarSecao('secaoProvas', tipoDisciplina === "teoricaTradicional");
    mostrarSecao('secaoPims', tipoDisciplina === 'teoricaTecnologica');
    mostrarSecao('secaoRelatorios', tipoDisciplina === 'praticaLicenciatura');
    mostrarSecao('secaoLaboratorio', tipoDisciplina === 'praticaLaboratorio');

    // Limpar campos de seções não utilizadas
    limparSecao('secaoProvas', tipoDisciplina !== 'teoricaTradicional');
    limparSecao('secaoPims', tipoDisciplina !== 'teoricaTecnologica');
    limparSecao('secaoRelatorios', tipoDisciplina !== 'praticaLicenciatura');
    limparSecao('secaoLaboratorio', tipoDisciplina !== 'praticaLaboratorio');

    // Calcular média da disciplina (MD)
    let md = 0;
    switch (tipoDisciplina) {
        case 'teoricaTradicional':
            md = calcularMediaTeoricaTradicional(prova1, prova2, prova3);
            break;
        case 'teoricaTecnologica':
            md = calcularMediaTeoricaTecnologica(prova1, prova2, prova3, pim1, pim2);
            break;
        case 'praticaLicenciatura':
            md = calcularMediaPraticaLicenciatura(relatorio1, relatorio2, relatorioFinal);
            break;
        case 'praticaLaboratorio':
            md = calcularMediaPraticaLaboratorio(relatorio1, relatorio2, prova1);
            break;
        case 'tcc':
            md = calcularMediaTcc(trabalhoCurso, banca);
            break;
        // Implementar cálculo para Estágio e PIM
    }

    // Arredondamento da MD
    md = arredondarMedia(md, anoIngresso);

    // Calcular média final (MF)
    let mf = 0;
    if (md < (anoIngresso === '2022' ? 6 : 7)) {
        mf = calcularMediaFinalComExame(md, exame);
    } else {
        mf = md;
    }

    // Arredondamento da MF
    mf = arredondarMedia(mf, anoIngresso);

    // Exibir resultados
    document.getElementById('md').textContent = mf.toFixed(1);
    document.getElementById('mf').textContent = mf.toFixed(1);

    if (mf >= (anoIngresso === '2022' ? 5 : 5)) {
        alert('Aprovado!');
    } else {
        alert('Reprovado!');
    }
}

function mostrarSecao(secaoId, mostrar) {
    const secao = document.getElementById(secaoId);
    secao.style.display = mostrar ? 'block' : 'none';
}

function limparSecao(secaoId, limpar) {
    if (limpar) {
        const inputs = document.getElementById(secaoId).querySelectorAll('input[type="number"]');
        for (const input of inputs) {
            input.value = '';
        }
    }
}

function calcularMediaTeoricaTradicional(prova1, prova2, prova3) {
    return (9 * prova1 + prova2 + prova3) / 10;
}

function calcularMediaTeoricaTecnologica(prova1, prova2, prova3, pim1, pim2) {
    return (7 * (prova1 + prova2 + prova3) + 2 * (pim1 + pim2)) / 10;
}

function calcularMediaPraticaLicenciatura(relatorio1, relatorio2, relatorioFinal) {
    return (2 * (relatorio1 + relatorio2) + 7 * relatorioFinal) / 10;
}

function calcularMediaPraticaLaboratorio(relatorio1, relatorio2, prova1) {
    return (3 * (relatorio1 + relatorio2) + 7 * prova1) / 10;
}

function calcularMediaTcc(trabalhoCurso, banca) {
    return (7 * trabalhoCurso + 3 * banca) / 10;
}

function calcularMediaFinalComExame(md, exame) {
    return (md + exame) / 2;
}

function arredondarMedia(media, anoIngresso) {
    if (anoIngresso === '2022' && media >= 5.7 && media < 6) {
        media = 6;
    } else if (media >= 6.7 && media < 7) {
        media = 7;
    }
    return media;
}