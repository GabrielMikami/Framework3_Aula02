window.onload = function () {
    LerJson();
};

$(document).ready(function () {
    $('#BotaoImportar').click(function () {
        LerJson();
    })
    $('#BotaoIncluir').click(function () {
        IncluirJson();
    })
    $('#BotaoConsultar').click(function () {
        ConsultarJson();
    })
    $('#BotaoExcluir').click(function () {
        ExcluirJson();
    })
    $('#BotaoAlterar').click(function () {
        AlterarJson();
    })
}
)

function LerJson() {
    let xmlhttp2 = new XMLHttpRequest();
    xmlhttp2.open("GET", "http://localhost:8081/Disciplinas");

    xmlhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let Disciplinas = JSON.parse(this.responseText);
            let tbody = document.getElementById("Resultados");
            tbody.innerHTML = "";

            for (let index = 0; index < Disciplinas.length; index++) {
                tbody.innerHTML += `<td scope="row">${Disciplinas[index].id}</td>` +
                    `<td scope="row">${Disciplinas[index].Descricao}</td>` +
                    `<td scope="row">${formataData(Disciplinas[index].DataInicio)}</td>` +
                    `<td scope="row">${formataValorReais(Disciplinas[index].ValorDisciplina)}</td>` +
                    `<td scope="row">${formataOptativa(Disciplinas[index].Optativa)}</td>`;
            }
        }
    }
    xmlhttp2.send();
}

function IncluirJson() {
    let id = Number((<HTMLInputElement>document.getElementById('id')).value);
    let Descricao = (<HTMLInputElement>document.getElementById('Descricao')).value;
    let DataInicio = (<HTMLInputElement>document.getElementById('DataInicio')).value;
    let ValorDisciplina = Number((<HTMLInputElement>document.getElementById('ValorDisciplina')).value);
    let OptativaNumero = Number((<HTMLInputElement>document.getElementById('Optativa')).value);
    let Optativa;
    let tbody = document.getElementById("Resultados");

    if (OptativaNumero == 1) {
        Optativa = true;
    } else {
        Optativa = false;
    }

    tbody.innerHTML += `<td scope="row">${id}` +
        `<td scope="row">${Descricao}` +
        `<td scope="row">${formataData(DataInicio)}` +
        `<td scope="row">${formataValorReais(ValorDisciplina)}` +
        `<td scope="row">${formataOptativa(Optativa)}`;

    let Disciplina = {
        id: id,
        Descricao: Descricao,
        DataInicio: DataInicio,
        ValorDisciplina: ValorDisciplina,
        Optativa: Optativa
    };

    let json = JSON.stringify(Disciplina);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8081/Disciplinas", true);
    xhr.setRequestHeader("Content-type", 'application/json; charset=utf-8');
    xhr.onload = function () {
        JSON.parse(xhr.responseText);
        LimparCampos();
        alert("Disciplina incluída com sucesso.");
    }
    xhr.send(json);
}

function AlterarJson() {
    let id = Number((<HTMLInputElement>document.getElementById('id')).value);
    let Descricao = (<HTMLInputElement>document.getElementById('Descricao')).value;
    let DataInicio = (<HTMLInputElement>document.getElementById('DataInicio')).value;
    let ValorDisciplina = Number((<HTMLInputElement>document.getElementById('ValorDisciplina')).value);
    let OptativaNumero = Number((<HTMLInputElement>document.getElementById('Optativa')).value);
    let Optativa;

    if (OptativaNumero == 1) {
        Optativa = true;
    } else {
        Optativa = false;
    }

    let Disciplina = {
        id: id,
        Descricao: Descricao,
        DataInicio: DataInicio,
        ValorDisciplina: ValorDisciplina,
        Optativa: Optativa
    };

    let json = JSON.stringify(Disciplina);

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://localhost:8081/Disciplinas/" + id, true);
    xhr.setRequestHeader("Content-type", 'application/json; charset=utf-8');
    xhr.onload = function () {
        JSON.parse(xhr.responseText);
        LimparCampos();
        LerJson();
        alert("Disciplina alterada com sucesso.");
    }
    xhr.send(json);

}

function ConsultarJson() {
    let xmlhttp2 = new XMLHttpRequest();
    let Numero = Number((<HTMLInputElement>document.getElementById('id')).value);
    xmlhttp2.open("GET", "http://localhost:8081/Disciplinas/" + Numero, true);

    xmlhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let Disciplina = JSON.parse(this.responseText);
            let tbody = document.getElementById("Resultados");
            tbody.innerHTML = "";
            tbody.innerHTML = `<td scope="row">${Disciplina.id}</td>` +
            `<td scope="row">${Disciplina.Descricao}` +
            `<td scope="row">${formataData(Disciplina.DataInicio)}` +
            `<td scope="row">${formataValorReais(Disciplina.ValorDisciplina)}` +
            `<td scope="row">${formataOptativa(Disciplina.Optativa)}`;
        } else {
            let tbody = document.getElementById("Resultados");
            tbody.innerHTML = '';
        }
    }
    xmlhttp2.send();
}

function ExcluirJson() {
    let xmlhttp2 = new XMLHttpRequest();
    let Numero = Number((<HTMLInputElement>document.getElementById('id')).value);
    xmlhttp2.open("DELETE", "http://localhost:8081/Disciplinas/" + Numero, true);

    xmlhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            LimparCampos();
            LerJson();
            alert("Disciplina excluída com sucesso.");
        }
    }
    xmlhttp2.send();
}

function formataData(str: string) {
    return str.split("-").reverse().join("/");
}

function formataValorReais(valor: number) {
    return valor.toLocaleString("pt-BR", { style: 'currency', currency: "BRL" });
}

function formataOptativa(optativa: boolean) {
    return optativa ? 'Sim' : 'Não'
}

function LimparCampos() {
    (<HTMLInputElement>document.getElementById('id')).value = "";
    (<HTMLInputElement>document.getElementById('Descricao')).value = "";
    (<HTMLInputElement>document.getElementById('DataInicio')).value = "";
    (<HTMLInputElement>document.getElementById('ValorDisciplina')).value = "";
    (<HTMLSelectElement>document.getElementById('Optativa')).selectedIndex  = 0;
}