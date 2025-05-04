const xhttp = new XMLHttpRequest();
var nome = document.getElementById("nome")
var resumo_div = document.getElementById("sobre")
var img_icon = document.getElementById("img_icon");
var resumo_cv = document.getElementById("nome_instituto")
var evento_div = document.getElementById("eventos");
var formacao_academica = document.getElementById("formacao_academica")
let formacoes_tipo = ["ENSINO-MEDIO-SEGUNDO-GRAU", "GRADUACAO", "MESTRADO", "DOUTORADO"];
var divisoria = "<h2> /<h2>"

xhttp.onload = function(){
    if(this.readyState == 4 && this.status ==200){
    let dados = this.responseXML;
    let dados_gerais = dados.getElementsByTagName("DADOS-GERAIS");
    let dados_complementares = dados.getElementsByTagName("DADOS-COMPLEMENTARES")
    let endereco = dados.getElementsByTagName("ENDERECO")
    let formacao_complementar = dados.getElementsByTagName("ENDERECO")//loop
    let eventos_seminario = dados.getElementsByTagName("PARTICIPACAO-EM-SEMINARIO") //loop
    let info_adicional_instituto = dados.getElementsByTagName("ENDERECO") 
    let info_adicional_cursos = dados.getElementsByTagName("ENDERECO")
    var novo_p = document.createElement('p')
    var academicos = dados.getElementsByTagName("")
    //var graduacao = dados.getElementsByTagName("GRADUACAO")
   
    //nome.innerHTML =  dados_gerais[0].getAttribute("NOME-COMPLETO") //consigo já acessar os daods gerais

    //COLOCNDO O RESUMO
    novo_p.innerHTML = dados_gerais[0].getElementsByTagName("RESUMO-CV")[0].getAttribute("TEXTO-RESUMO-CV-RH") 
    resumo_div.append(novo_p)

    if(dados_gerais[0].getAttribute("SEXO") == "FEMININO")
        img_icon.src="mulher.jpg"
    else
        img_icon.src="homem.jpg"

    //INSTITUICOES GRADUCAO, MESTRADO, DOUTORADO
 

    for(let formacoes of formacoes_tipo){
        console.log("entrou")
        if(formacoes !== null){
        var tipo_formacao = document.createElement('h3')
        var titulo_instituo = document.createElement('p')
        var status = document.createElement('p')
        var ano_inicio = document.createElement('p')
        var graduacao = dados.getElementsByTagName(formacoes)
        var nome_curso = document.createElement('p')
    
        tipo_formacao.innerHTML = formacoes + "<hr>"
        formacao_academica.appendChild(tipo_formacao)
        titulo_instituo.innerHTML = "Nome da Instituicao:"+ graduacao[0].getAttribute("NOME-INSTITUICAO")
        formacao_academica.appendChild(titulo_instituo)
        nome_curso.innerHTML = "Nome do curso" + graduacao[0].getAttribute("NOME-CURSO")
        if(graduacao[0].getAttribute("NOME-CURSO"))formacao_academica.appendChild(nome_curso)
        ano_inicio.innerHTML = "Ano de inicio:"+ graduacao[0].getAttribute("ANO-DE-INICIO") + ":" +  graduacao[0].getAttribute("ANO-DE-CONCLUSAO")
        formacao_academica.appendChild(ano_inicio)
        status.innerHTML = "Status: "+ graduacao[0].getAttribute("STATUS-DO-CURSO")
        formacao_academica.appendChild(status)
        }else{
            console.log("nao tem" +formacoes)
        }
    }
    //eventos_seminario
    for(let i = 0;i<eventos_seminario.length;i++){
        var novo_paragrafo = document.createElement('p')
        console.log("entroou")
        novo_paragrafo.innerHTML = "titulo: "+  eventos_seminario[i].getElementsByTagName("DADOS-BASICOS-DA-PARTICIPACAO-EM-SEMINARIO")[0].getAttribute("TITULO")
        evento_div.appendChild(novo_paragrafo)
    }
    
    //formacao_academica
    for(let i = 0;i<academicos.length;i++){
        var novo_paragrafo = document.createElement('p')
        var graduacao = dados.getElementsByTagName("GRADUACAO")
        console.log("entroou")
 
    }

} else console.log("nao entrou")
}


xhttp.open("GET", "mari_lattes.xml", true)

xhttp.send();